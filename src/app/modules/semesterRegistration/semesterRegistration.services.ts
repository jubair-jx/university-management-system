import { Request, Response } from "express";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { AcademicDepartModel } from "../academicDepartment/department.model";
import { AcademicModel } from "../academicSemester/academicSemModel";
import AppError from "../../errors/AppError";
import { SemesterRegistrationModel } from "./semesterRegistration.model";
import QueryBuilder from "../../builder/QueryBuilder";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  //check if the semester is exist
  const isAcademicSemesterExists = await AcademicModel.findById(
    academicSemester
  );
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "The Academic semester does not found"
    );
  }

  //check the semester is already registered
  const isExistSemesterRegistrationExist =
    await SemesterRegistrationModel.findOne({ academicSemester });

  if (isExistSemesterRegistrationExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "This semester is already registered"
    );
  }
  const result = await SemesterRegistrationModel.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const getAllSemRegQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await getAllSemRegQuery.modelQuery;
  return result;
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id).populate(
    "academicSemester"
  );
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: TSemesterRegistration
) => {};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
