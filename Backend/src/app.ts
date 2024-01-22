import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import globalErrorhandler from "./app/middleware/globalError";
import notFound from "./app/middleware/notFound";
import router from "./app/routes";
const app: Application = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api/v1", router);

//global error handler
app.use(globalErrorhandler);
//not found route
app.use(notFound);
export default app;
