import { registerUser, loginUser } from "../controllers/userController.js";
import express from "express";

const Userrouter= express.Router();

Userrouter.post("/register", registerUser);
Userrouter.post("/login", loginUser);

export default Userrouter;

//localhost:3000/api/user/register