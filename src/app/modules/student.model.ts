import { Schema, model, connect } from "mongoose";
import validator from "validator";
import {
  StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGurdinan,
  TStudentData,
  TUserName,
} from "./Student/student.interface";
import config from "../config";

//Indiviul Data Schema
const NameSchema = new Schema<TUserName>(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
      maxlength: [10, "More than 10 characters are not allowed"],
      minlength: [3, "More than 3 characters are not allowed"],
      trim: true,
      validate: {
        validator: function (value: string) {
          const name = value.charAt(0).toUpperCase() + value.slice(1);
          return name === value;
        },
        message: "{VALUE} is not a valid",
      },
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
      max: [10, "More than 10 characters are not allowed"],
      min: [3, "More than 3 characters are not allowed"],
      trim: true,
      validate: {
        validator: (value: string) => validator.isAlpha(value),
        message: "{VALUE} is not valid",
      },
    },
  },
  {
    _id: false,
  }
);
const gurdinanSchema = new Schema<TGuardian>(
  {
    fatherName: {
      type: String,
      required: true,
    },
    fatherOccupation: {
      type: String,
      required: true,
    },
    fatherContactNo: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    motherOccupation: {
      type: String,
      required: true,
    },
    motherContactNo: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);
const localGurdinanSchema = new Schema<TLocalGurdinan>(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

//Main Student Schema
const StudentSchema = new Schema<TStudentData, StudentModel, StudentMethods>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "UserId must be unique."],
      unique: true,
      ref: "User",
    },

    name: {
      type: NameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "others"],
        message: "{VALUE} is not supported",
      },
      required: true,
    },
    dateOfBirth: { type: String },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    bloogGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUE} is not supported",
      },
    },
    presentAddress: { type: String, required: true },
    permanentAddres: { type: String, required: true },
    guardian: {
      type: gurdinanSchema,
      required: true,
    },
    localGuardian: {
      type: localGurdinanSchema,
      required: true,
    },
    profileImg: { type: String },
    admissionSemesterId: {
      type: Schema.Types.ObjectId,
      ref: "AcademicSemester",
    },
    isActive: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);
//virtual in Mongoose
StudentSchema.virtual("fullName").get(function () {
  return `(${this.name.firstName} ${this.name.middleName} ${this.name.lastName})`;
});

//pre save middleware/hook : will work on create() and save()

StudentSchema.pre("find", function (next) {
  // console.log(next);
  this.find({ isDeleted: { $ne: true } });
  next();
});
StudentSchema.pre("findOne", function (next) {
  // console.log(next);
  this.find({ isDeleted: { $ne: true } });
  next();
});
StudentSchema.pre("aggregate", function (next) {
  // console.log(next);
  // this.find({ isDeleted: { $ne: true } });
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
StudentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//Now we will make a model based on this Schema
export const Student = model<TStudentData, StudentModel>(
  "Student",
  StudentSchema
);
