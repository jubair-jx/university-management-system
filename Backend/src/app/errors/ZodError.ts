import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGResponse => {
  const errorSources: TErrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation failed",
    errorSources,
  };
};

export default handleZodError;
