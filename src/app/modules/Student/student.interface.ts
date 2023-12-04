import { Model, Types } from "mongoose";

//single data of Student Details
export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGurdinan = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

//Main Student Interface Data
export type TStudentData = {
  id: string;
  password: string;
  user: Types.ObjectId;
  name: TUserName;
  gender: "male" | "female" | "others";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloogGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddres: string;
  guardian: TGuardian;
  localGuardian: TLocalGurdinan;
  profileImg?: string;
  isActive: "active" | "blocked";
  isDeleted: boolean;
};

export type StudentMethods = {
  isUserExists(id: string): Promise<TStudentData | null>;
};
export type StudentModel = Model<
  TStudentData,
  Record<string, never>,
  StudentMethods
>;
