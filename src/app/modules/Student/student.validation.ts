import { z } from "zod";

const NameValidationSchema = z.object({
  firstName: z.string().min(3).max(10),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(3)
    .max(10)
    .regex(/^[A-Za-z]+$/),
});

const GuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const LocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

export const StudentDataValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: NameValidationSchema,
  gender: z.enum(["male", "female", "others"]),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNo: z.string(),
  emergencyContactNo: z.string(),
  bloogGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string(),
  permanentAddres: z.string(),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean(),
});
export default StudentDataValidationSchema;
