import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
import imageRouter from './routes/imageRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connectDB();
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
  }
})();

const allowedOrigins = [
  "https://imagifyfrontend-lovat.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/image", imageRouter);

app.get("/", (req, res) => {
  res.send("Imagify backend is running");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
