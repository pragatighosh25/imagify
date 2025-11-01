import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  try{
    const { name, email, password } = req.body;

    if(!name || !email || !password){
      return res.status(400).json({message: "All fields are required", success: false});
    }

    const salt= await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword
    };

    const newUser = new userModel(userData);
    const user= await newUser.save();

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );
    res.status(201).json({ token, success: true , user: { name: user.name} });
  }catch(err){
    console.error(err);
    res.status(500).json({message: err.message, success: false});
  }
};

const loginUser= async (req, res)=>{
  try{
    const {email, password}= req.body;
    const user= await userModel.findOne({email})

    if(!user){
      return res.status(400).json({message: "User not found", success: false});
    }

    const isMatch= await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({message: "Invalid password", success: false});
    }else{
      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token, success: true , user: { name: user.name} });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token, success: true , user: { name: user.name} });
  }catch(err){
    console.error(err);
    res.status(500).json({message: err.message, success: false});
  }
}




export { registerUser };