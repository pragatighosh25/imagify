import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


const authMiddleware = (req, res, next) => {
  const {token} = req.headers;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Login", success: false });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!req.body) req.body = {};
    if(decoded.id){
      req.body.userId = decoded.id;
    }else{
      return res.status(401).json({ message: "Unauthorized Login", success: false });
    };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message, success: false });
  }
};
export default authMiddleware;