import express from "express";
 import { dbConnection } from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
 import userRouter from "./routes/userRoutes.js";
 import applicationRouter from "./routes/applicationRoutes.js";
import { config } from "dotenv";
 import cors from "cors";
 import { errorMiddleware } from "./middlewares/error.js";
 import cookieParser from "cookie-parser";
 import fileUpload from "express-fileupload";

 
const app = express();
config({ path: "./config/.env" });

const cors = require("cors");

app.use(cors({
  origin: process.env.FRONTEND_URL,
   method: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
}));

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL],
//     method: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

 app.use(cookieParser());
app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.get("/",(req, res,next)=>{return res.status(200).json({
    success: true,
    message : "hello world ka hal cal ba  kaye project nhi chal rha h"

})})
 dbConnection();

  app.use(errorMiddleware);
export default app;