import { Student } from "../student.model";
import { TStudentData } from "./student.interface";

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
  deletedStudentFromDB,
  getAllDataFromDB,
  getSingleStudentData,
};
