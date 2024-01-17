import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import httpStatus from "http-status";
import { academicServices } from "./academic.services";
const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicServices.createAcademicSemesterIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester Created successfully",
    data: result,
  });
});

const getSemesters = catchAsync(async (req, res) => {
  const result = await academicServices.getAllAcademicSemesters();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semesters retrieved successfully",
    data: result,
  });
});

const getSingleSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await academicServices.getSingleAcademicSemester(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single Academic Semester successfully retrieved",
    data: result,
  });
});

const updateSemester = catchAsync(async (req, res) => {
  const mainData = req.body;
  const id = req.params.id;
  const result = await academicServices.updateSingleAcademicSemester(
    id,
    mainData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Semester updated successfully",
    data: result,
  });
});
export const academicSemsterController = {
  createAcademicSemester,
  getSemesters,
  getSingleSemester,
  updateSemester,
};
