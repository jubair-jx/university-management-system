import config from "../../config";
import { TStudentData } from "../Student/student.interface";
import { TAcademicSemester } from "../academicSemester/academicSem.interface";
import { Student } from "../student.model";
import { TUser, newUser } from "./user.interface";
import { userModel } from "./user.model";

const createStudentIntDB = async (
  password: string,
  studentData: TStudentData
) => {
  //now we will call Student Model
  const userData: Partial<TUser> = {};
  if (!password) {
    userData.password = config.defaultPass as string;
  } else {
    userData.password = password;
  }
  const generatedStudentId = (payload: TAcademicSemester) => {};

  //set the role

  userData.role = "student";
  //set the manually id
  // userData.id = generatedStudentId();
  userData.id = "1454550";
  const newUser = await userModel.create(userData);
  if (Object.keys(newUser).length) {
    //set id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
  return newUser;
  //make data push using instance
  //   const student = new Student(studentData);
  //   if (await student.isUserExists(studentData.id)) {
  //     throw new Error(`Student already exists`);
  //   }
  //   const result = await student.save();
  //   return result;
  // };
};
export const userService = {
  createStudentIntDB,
};
