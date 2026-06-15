import express from "express";

import type { Request, Response } from "express";
import userRoutes from './modules/user/user.route';
import profileRoute from './modules/profile/profile.route';
import authRoute from './modules/auth/auth.route';
import cookieParser from "cookie-parser";
import cors from "cors";
import GlobalerrorHandler from "./middleware/globalErrorMiddelware";
const app = express();


app.use(express.json());
app.use(express.text());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));



app.get("/", (req: Request, res: Response) => {
  
  res.status(200).json({
    message: "Express Server is running successfully!",
    author: "Fahad moaj",
  });
});


app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRoute);

app.use(GlobalerrorHandler);

export default app;