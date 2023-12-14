import { Request, Response } from "express";
import {
  TAcademicSemester,
  TAcademicSemesterCodeMapper,
} from "./academicSem.interface";
import { AcademicModel } from "./academicSemModel";
import mongoose from "mongoose";

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
    Autumn: "01",
    Summer: "02",
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

const updateSingleAcademicSemester = async (id: string, data: object) => {
  const result = await AcademicModel.updateOne(
    {
      _id: new mongoose.Types.ObjectId(id),
    },
    {
      $set: data,
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
