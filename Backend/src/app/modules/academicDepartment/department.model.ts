import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./department.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

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
// departmentSchema.pre("save", async function (next) {
//   const isExistDepartment = await AcademicDepartModel.findOne({
//     name: this.name,
//   });
//   if (isExistDepartment) {
//     throw new AppError(
//       httpStatus.NOT_FOUND,
//       "This department is Already exist"
//     );
//   }
//   next();
// });
//for already existing, but need to update the data

departmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();
  const isExistDepartment = await AcademicDepartModel.findOne(query);

  if (!isExistDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, "This department does'nt exist");
  }
  next();
});

export const AcademicDepartModel = model<TAcademicDepartment>(
  "AcademicDepartment",
  departmentSchema
);
