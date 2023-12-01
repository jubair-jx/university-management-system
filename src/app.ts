import express, { Application, Request, Response } from "express";
import studentRoute from "./app/modules/Student/student.route";
const app: Application = express();
import cors from "cors";
app.use(cors());
app.use(express.json());
app.use("/api/v1/students", studentRoute);

export default app;
