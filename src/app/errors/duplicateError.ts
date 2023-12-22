import { TErrorSource } from "../interface/error";

const handleDuplicateError = (err: any) => {
  // Extract value within double quotes using regex
  const match = err.message.match(/"([^"]*)"/);

  // The extracted value will be in the first capturing group
  const extractedMessage = match && match[1];
  const errorSources: TErrorSource = [
    {
      path: "",
      message: `${extractedMessage} is already exist`,
    },
  ];
  const statusCode = 404;
  return {
    statusCode,
    message: "Already Exists",
    errorSources,
  };
};

export default handleDuplicateError;
