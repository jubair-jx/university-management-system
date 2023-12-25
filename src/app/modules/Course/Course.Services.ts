import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./Course.constant";
import { TCourse, TCourseFaculty } from "./Course.interface";
import { Course, CourseFaculty } from "./Course.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateCourses = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingCoursesData } = payload;

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const updateCourseInfo = await Course.findByIdAndUpdate(
      id,
      remainingCoursesData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );
    //update condition
    if (!updateCourseInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
    }

    //check if there is any pre requisite courses
    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPrequists = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      console.log(deletedPrequists);

      const deletePrequistsCourses = await Course.findByIdAndUpdate(
        id,
        {
          $pull: { preRequisiteCourses: { course: { $in: deletedPrequists } } },
        },
        {
          session,
          new: true,
          runValidators: true,
        }
      );
      //delete condtions
      if (!deletePrequistsCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }
      const newPrerequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPrerequisiteCourses = Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourses: { $each: newPrerequisites } },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );
      //newPrerequisitesCourse Conditon
      if (!newPrerequisiteCourses) {
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to update course");
      }
    }

    await session.commitTransaction();
    await session.endSession();

    const result = await Course.findById(id).populate(
      "preRequisiteCourses.course"
    );
    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, "Failed Update Course");
  }
};
const deletedCourse = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

const assignFaculties = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    }
  );
  return result;
};

const removeFacultiesFromCourseFromDB = async (
  id: string,
  payload: Partial<TCourseFaculty>
) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
    }
  );
  return result;
};

export const coursesServices = {
  createCourseIntoDB,
  updateCourses,
  deletedCourse,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  assignFaculties,
  removeFacultiesFromCourseFromDB,
};
