import userModel from "../models/userModels.js";
import FormData from "form-data";
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
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post("https://clipdrop-api.co/cleanup/v1", formData, {
      headers: {
        'x-api-key': process.env.CLIPDROP_API,
      },
      responseType: 'arraybuffer'
    });

    const base64Image = Buffer.from(data, 'binary').toString('base64');

    const resultImage = `data:image/png;base64,${base64Image}`;

    if(resultImage){
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1
    });

    res.status(200).json({ image: resultImage, credits: user.creditBalance - 1, success: true,message: "Image generated successfully"});
    }else{
      res.status(500).json({ message: "Image generation failed", success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
} 
export { generateImage };
