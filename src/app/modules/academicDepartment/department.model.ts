import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./department.interface";

const departmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: "AcademicFaculty",
    },
  },
  {
    timestamps: true,
  }
);

//for already existing department on DB
departmentSchema.pre("save", async function (next) {
  const isExistDepartment = await AcademicDepartModel.findOne({
    name: this.name,
  });
  if (isExistDepartment) {
    throw new Error("This Department is Already exist");
  }
  next();
});
//for already existing, but need to update the data

departmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isExistDepartment = await AcademicDepartModel.findOne(query);

  if (!isExistDepartment) {
    throw new Error("This department can't be updated");
  }
  next();
});

export const AcademicDepartModel = model<TAcademicDepartment>(
  "AcademicDepartment",
  departmentSchema
);
