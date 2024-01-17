import httpStatus from "http-status";
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { userModel } from "../User/user.model";
import { studentSearchableFields } from "./student.constant";
import { TStudentData } from "./student.interface";
import { Student } from "./student.model";

const getAllDataFromDB = async (query: Record<string, unknown>) => {
  // console.log("base query", query);
  // const queryObj = { ...query };
  // console.log("queryObj", queryObj);
  // let searchTerm = "";
  // const studentSearchField = ["email", "name.firstName", "presentAddress"];
  // if (query?.searchTerm) {
  //   searchTerm = query?.searchTerm as string;
  // }
  // excludedField.forEach((el) => delete queryObj[el]);
  // const searchQuery = Student.find({
  //   $or: studentSearchField.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: "i" },
  //   })),
  // });
  //filtering
  // const filterQuery = searchQuery
  //   .find(queryObj)
  //   .populate("admissionSemesterId")
  //   .populate({
  //     path: "academicDepartment",
  //     populate: {
  //       path: "academicFaculty",
  //     },
  //   });
  // let sort = "-createdAt";
  // if (query.sort) {
  //   sort = query.sort as string;
  // }
  // const sortQuery = filterQuery.sort(sort);
  // let limit = 1;
  // let page = 1;
  // let skip = 0;
  // if (query.limit) {
  //   limit = Number(query.limit);
  // }
  // if (query.page) {
  //   page = Number(query.page);
  //   skip = (page - 1) * limit;
  // }
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);
  // let fields = "-__v";
  // if (query.fields) {
  //   fields = (query.fields as string).split(",").join(" ");
  // }
  // const fieldQuery = await limitQuery.select(fields);
  // return fieldQuery;
  const studentQuery = new QueryBuilder(
    Student.find().populate('user')
      .populate("admissionSemesterId")
      .populate({
        path: "academicDepartment",
        populate: {
          path: "academicFaculty",
        },
      }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};
const getSingleStudentData = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deletedStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete student");
    }

    const deletedUser = await userModel.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session }
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete user");
    }
    await session.commitTransaction();
    await session.endSession();
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("Failed to delete student");
  }
};

const updatedStudentIntoDB = async (
  id: string,
  payload: Partial<TStudentData>
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifyData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifyData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifyData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifyData[`guardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifyData, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const StudentServices = {
  deletedStudentFromDB,
  getAllDataFromDB,
  getSingleStudentData,
  updatedStudentIntoDB,
};
