import { z } from "zod";

const userValidationSchema = z.object({
  passwords: z
    .string({
      invalid_type_error: "Password must be a string",
    })
    .max(20, { message: "Password can not be more than 20 Char" })
    .optional(),
});
export default userValidationSchema;
