import userModel from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";

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
    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    await razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: err.message, success: false });
      }
      res.status(200).json({ order, success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === 'paid') {
      const transactionData= await transactionModel.findById(orderInfo.receipt);
      if(!transactionData.payment){
        return res.status(400).json({ message: "Payment already verified", success: false });
      }
      const userData= await userModel.findById(transactionData.userId);
      const creditBalance= userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { creditBalance });
      await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
      res.status(200).json({ message: "Payment verified successfully", success: true });
    }else{
      return res.status(400).json({ message: "Payment not completed", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};

export { registerUser, loginUser, userCredits, paymentRazorpay, verifyPayment };