import { RequestHandler } from "express";
import { userService } from "./user.services";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    //   const student = req.body.student;
    const { student: studentData, password } = req.body;
    // console.log("From Student Var", req.body);
    // const studentValidatedSchema = StudentDataValidationSchema.parse(student);
    const result = await userService.createStudentIntDB(password, studentData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Created Successfully",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};
export const userController = {
  createStudent,
};
