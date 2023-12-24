import { TCourse } from "./Course.interface";
import { Course } from "./Course.model";

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCoursesFromDB = async () => {
  const result = await Course.find();
  return result;
};

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id);
  return result;
};

const upateCourses = async (id: string, payload: Partial<TCourse>) => {
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deletedCourse = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const coursesServices = {
  createCourseIntoDB,
  upateCourses,
  deletedCourse,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
};
