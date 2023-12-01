import { Student } from "../student.model";
import { TStudentData } from "./student.interface";

const createStudentIntDB = async (studentData: TStudentData) => {
  //now we will call Student Model
  // const result = await StudentModel.create(student);
  // return result;
  //make data push using instance
  const student = new Student(studentData);
  if (await student.isUserExists(studentData.id)) {
    throw new Error(`Student already exists`);
  }
  const result = await student.save();
  return result;
};
const getAllDataFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentData = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deletedStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  createStudentIntDB,
  deletedStudentFromDB,
  getAllDataFromDB,
  getSingleStudentData,
};
