import { registerUser, loginUser, userCredits, paymentRazorpay, verifyPayment } from "../controllers/userController.js";
import express from "express";
import authMiddleware from "../middlewares/auth.js";

const userRouter= express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/credits", authMiddleware, userCredits);
userRouter.post("/pay-razor", authMiddleware, paymentRazorpay);
userRouter.post("/verify-payment", verifyPayment);

export default userRouter;

//localhost:3000/api/user/register