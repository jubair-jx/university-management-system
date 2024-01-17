import { Schema, model } from "mongoose";
import { TAcademicSemester, TMonth } from "./academicSem.interface";
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from "./academic.constant";

const AcademicModelSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      enum: AcademicSemesterName,
      required: true,
    },
    code: {
      type: String,
      enum: AcademicSemesterCode,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: Months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: Months,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

AcademicModelSchema.pre("save", async function (next) {
  const isExistSemester = await AcademicModel.findOne({
    year: this.year,
    name: this.name,
  });
  if (isExistSemester) {
    throw new Error("Semester already exists");
  }
  next();
});

export const AcademicModel = model<TAcademicSemester>(
  "AcademicSemester",
  AcademicModelSchema
);
