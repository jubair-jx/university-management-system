import { NextFunction, Request, RequestHandler, Response } from "express";
import { StudentServices } from "./student.services";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const getAllStudents: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await StudentServices.getAllDataFromDB(req.query);

    res.status(200).json({
      success: true,
      message: "Students are Fetch done",
      data: result,
    });
  }
);
const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  console.log(studentId);
  const result = await StudentServices.getSingleStudentData(studentId);
  res.status(200).json({
    success: true,
    message: "Student Single Data Fetch done",
    data: result,
  });
});
const deletedStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  console.log(studentId);
  const result = await StudentServices.deletedStudentFromDB(studentId);
  res.status(200).json({
    success: true,
    message: "Data deleted successfully",
    data: result,
  });
});

const updatedStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const { student } = req.body;

  const result = await StudentServices.updatedStudentIntoDB(studentId, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Student updated successfully",
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deletedStudent,
  updatedStudent,
};
