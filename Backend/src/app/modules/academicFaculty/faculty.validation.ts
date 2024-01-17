import { z } from "zod";

const academicSemValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Faculty Name has must be a string",
    }),
  }),
});

const updateAcademicSemValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Faculty Name has must be a string",
    }),
  }),
});
export const facultyValidation = {
  academicSemValidationSchema,
  updateAcademicSemValidationSchema,
};
