import { registerUser, loginUser, userCredits } from "../controllers/userController.js";
import express from "express";
import authMiddleware from "../middlewares/auth.js";

const userRouter= express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/credits", authMiddleware, userCredits);

export default userRouter;

//localhost:3000/api/user/register