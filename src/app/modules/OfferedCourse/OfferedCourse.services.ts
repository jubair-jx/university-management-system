import { TOfferedCourse } from "./OfferedCourse.interface";
import { OfferedCourse } from "./OfferedCourse.model";

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const result = await OfferedCourse.create(payload);
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {};

const getSingleCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const updateOfferedCourseIntoDB = async (
  id: string,
  payload: Partial<TOfferedCourse>
) => {};

const deleteOfferedCourseFromDB = async (id: string) => {};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  getSingleCourseFromDB,
  updateOfferedCourseIntoDB,
  deleteOfferedCourseFromDB,
};
