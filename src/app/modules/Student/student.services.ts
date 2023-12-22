import mongoose from "mongoose";
import { Student } from "../student.model";
import { TStudentData } from "./student.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { userModel } from "../User/user.model";
import { Request, Response } from "express";

const getAllDataFromDB = async (query: Record<string, unknown>) => {
  let searchItem = "";

  if (query?.searchItem) {
    searchItem = query?.searchItem as string;
  }

  const result = await Student.find({
    $or: ["email", "name.firstName", "presentAddress"].map((field) => ({
      [field]: { $regex: searchItem, $options: "i" },
    })),
  })
    .populate("admissionSemesterId")
    .populate({
      path: "academicDepartment",
      populate: {
        path: "academicFaculty",
      },
    });
  return result;
};
const getSingleStudentData = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deletedStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    const deletedUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete student");
  }
};

const updatedStudentIntoDB = async (
  id: string,
  payload: Partial<TStudentData>
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifyData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifyData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifyData[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifyData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  deletedStudentFromDB,
  getAllDataFromDB,
  getSingleStudentData,
  updatedStudentIntoDB,
};
