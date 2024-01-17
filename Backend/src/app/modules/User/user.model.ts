import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import { TUser, UserModel } from "./user.interface";

export const userSchema = new Schema<TUser, UserModel>(
  {
    id: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      maxlength: [20, "Password More than 20 Charc Will be Accepted"],
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["admin", "student", "faculty"],
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["in-progress", "blocked"],
      default: "in-progress",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  // console.log(this, "Post hook : we saved our Data");
  const user = this;
  user.password = await bcrypt.hash(user.password, Number(config.saltKey));
  next();
});
//when save data on MongoDB
userSchema.post("save", function (doc, next) {
  // console.log(this, "Post hook : we saved our Data");
  doc.password = "";
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
  return await userModel.findOne({ id }).select("+password");
};
userSchema.statics.isPasswordCorrect = async function (
  plainTextPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const userModel = model<TUser, UserModel>("User", userSchema);
