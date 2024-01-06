import { Model } from "mongoose";

export interface TUser {
  id: string;
  password: string;
  needPasswordChange: boolean;
  role: "admin" | "student" | "faculty";
  isDeleted: boolean;
  status: "in-progress" | "blocked";
}
export type newUser = {
  password: string;
  role: string;
  id: string;
};

export interface UserModel extends Model<TUser> {
  // myStaticModel(): number;
  isUserExistsByCustomId(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordCorrect(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}
