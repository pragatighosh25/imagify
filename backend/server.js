import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import userRouter from './routes/userRouter.js';
import imageRouter from './routes/imageRouter.js';

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

const allowedOrigins = [
  "https://imagifyfrontend-lovat.vercel.app", 
  "http://localhost:5173" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));
app.use(express.json());


app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.get('/', (req, res) => {
  res.send('Imagify backend is running');   
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;