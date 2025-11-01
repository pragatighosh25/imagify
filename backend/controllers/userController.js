import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";

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

const userCredits = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }
    res.status(200).json({ credits: user.creditBalance, user: { name: user.name }, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    const userData= await userModel.findById(userId);
    if(!userData || !planId){
      return res.status(404).json({ message: "User not found or plan ID missing", success: false });
    }
    let credits, plan, amount, date
    switch (planId) {
      case 'Basic':
        credits = 100;
        plan = "Basic";
        amount = 10;
        date = new Date();
        break;
      case 'Advanced':
        credits = 500;
        plan = "Advanced";
        amount = 50;
        date = new Date();
        break;
      case 'Business':
        credits = 5000;
        plan = "Business";
        amount = 250;
        date = new Date();
        break;
      default:
        return res.status(400).json({ message: "Invalid plan ID", success: false });
    }
    const transactionData = {
      userId,
      plan,
      credits,
      amount,
      date,
    };
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export { registerUser, loginUser, userCredits, paymentRazorpay };