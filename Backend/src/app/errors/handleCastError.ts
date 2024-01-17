import mongoose from "mongoose";
import { TErrorSource, TGResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TGResponse => {
  const errorSources: TErrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];
  const statusCode = 404;
  return {
    statusCode,
    message: "Invalid ID(Cast)",
    errorSources,
  };
};
export default handleCastError;
