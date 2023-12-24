import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { coursesServices } from "./Course.Services";

const createCourse = catchAsync(async (req, res) => {
  const result = await coursesServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is created succesfully",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await coursesServices.getAllCoursesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Courses are retrieved successfully",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const result = await coursesServices.getSingleCourseFromDB(req.params.id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Course is retrieved successfully",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await coursesServices.upateCourses(id, body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course is updated succesfully",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await coursesServices.deletedCourse(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "course is deleted succesfully",
    data: result,
  });
});

export const coursesController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
