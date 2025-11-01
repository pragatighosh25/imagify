import { registerUser, loginUser, userCredits } from "../controllers/userController.js";
import express from "express";
import authMiddleware from "../middlewares/auth.js";

const userrouter= express.Router();

userrouter.post("/register", registerUser);
userrouter.post("/login", loginUser);
userrouter.post("/credits", authMiddleware, userCredits);

export default userrouter;

//localhost:3000/api/user/register