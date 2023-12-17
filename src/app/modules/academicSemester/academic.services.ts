import { Request, Response } from "express";
import {
  TAcademicSemester,
  TAcademicSemesterCodeMapper,
} from "./academicSem.interface";
import { AcademicModel } from "./academicSemModel";
import mongoose from "mongoose";
import { AcademicSemesterCodeMapper } from "./academic.constant";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
    Autumn: "01",
    Summar: "02",
    Fall: "03",
  };
  if (academicSemesterCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semeter Code");
  }
  const result = await AcademicModel.create(payload);
  return result;
};

const getAllAcademicSemesters = async () => {
  const result = await AcademicModel.find();
  return result;
};

const getSingleAcademicSemester = async (id: string) => {
  const result = await AcademicModel.findOne({
    _id: new mongoose.Types.ObjectId(id),
  });
  return result;
};

const updateSingleAcademicSemester = async (
  id: string,
  payload: Partial<TAcademicSemester>
) => {
  if (
    payload.name &&
    payload.code &&
    AcademicSemesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicModel.updateOne(
    {
      _id: new mongoose.Types.ObjectId(id),
    },
    {
      $set: payload,
    },
    {
      new: true,
    }
  );

  return result;
};

export const academicServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesters,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
