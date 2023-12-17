import { TAcademicSemester } from "../academicSemester/academicSem.interface";
import { userModel } from "./user.model";

const findTheLastId = async () => {
  const lastStudent = await userModel
    .findOne(
      {
        role: "student",
      },
      {
        id: 1,
        _id: 0,
      }
    )
    .sort({ createdAt: -1 })
    .lean();

  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generatedStudentId = async (payload: TAcademicSemester) => {
  let currentId = (0).toString();
  const lastStudentId = await findTheLastId();
  const lastSemesterCode = lastStudentId?.substring(4, 6); //1
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
