import express, { Application, NextFunction, Request, Response } from "express";
import studentRoute from "./app/modules/Student/student.route";
const app: Application = express();
import cors from "cors";
import { userRouter } from "./app/modules/User/user.route";
import globalErrorhandler from "./app/middleware/globalError";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
app.use(cors());
app.use(express.json());
app.use("/api/v1", router);

//global error handler
app.use(globalErrorhandler);
//not found route
app.use(notFound);
export default app;
