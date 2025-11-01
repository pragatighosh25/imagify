import userModel from "../models/userModels.js";

const generateImage = async (req, res) => {
  try {
    const { prompt, userId } = req.body;
    const user = await userModel.findById(userId);
    if (!user || !prompt) {
      return res.status(404).json({ message: "User not found or prompt missing", success: false });
    }
    if(user.creditBalance === 0 || userModel.creditBalance < 1){
      return  res.status(403).json({ message: "No credits balance", credits: user.creditBalance, success: false });
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
} 
export { generateImage };
