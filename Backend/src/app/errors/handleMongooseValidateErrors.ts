import mongoose from "mongoose";
import { TErrorSource, TGResponse } from "../interface/error";

const handleMongooseErrors = (
  err: mongoose.Error.ValidationError
): TGResponse => {
  const errorSources: TErrorSource = Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: val?.path,
        message: val?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: "Validation failed",
    errorSources,
  };
};

export default handleMongooseErrors;
