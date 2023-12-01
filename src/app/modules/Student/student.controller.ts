import { Request, Response } from "express";
import { StudentServices } from "./student.services";
import { z } from "zod";
import StudentDataValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    // console.log("From Student Var", req.body);
    const studentValidatedSchema = StudentDataValidationSchema.parse(student);
    const result = await StudentServices.createStudentIntDB(
      studentValidatedSchema
    );
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || "Something has wrong",
      error: err,
    });
  }
};
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllDataFromDB();

    res.status(200).json({
      success: true,
      message: "Students are Fetch done",
      data: result,
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || "Something has wrong",
      error: err,
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    console.log(studentId);
    const result = await StudentServices.getSingleStudentData(studentId);
    res.status(200).json({
      success: true,
      message: "Student Single Data Fetch done",
      data: result,
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || "Something has wrong",
      error: err,
    });
  }
};
const deletedStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    console.log(studentId);
    const result = await StudentServices.deletedStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(401).json({
      success: false,
      message: err.message || "Something has wrong",
      error: err,
    });
  }
};
export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deletedStudent,
};
