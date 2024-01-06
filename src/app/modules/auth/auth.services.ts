import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { userModel } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
const createLoginIntoDB = async (payload: TLoginUser) => {
  // console.log(payload);
  //check the user is exist on DB

  // const isExistUser = await userModel.findOne({ id: payload?.id });
  const user = await userModel.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This is User not found");
  }
  // // now we will check the user is Deleted;
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user has been deleted");
  }
  const checkStatus = user?.status;
  if (checkStatus === "blocked") {
    throw new AppError(httpStatus.FORBIDDEN, " this user is blocked");
  }

  // //checking if granted is correct
  // const isPasswordCorrect = await bcrypt.compare(
  //   payload?.password,
  //   isExistUser?.password
  // );

  //checking if the password is correct

  if (!(await userModel.isPasswordCorrect(payload?.password, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, "Password do not matched");

  return {};
};

export const authServices = {
  createLoginIntoDB,
};
