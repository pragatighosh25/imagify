import express from 'express';
import cors from 'cors';
import 'dotenv/config';

import connectDB from './config/mongodb.js';

const app = express();
const PORT = process.env.PORT || 3000;

await connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Imagify backend is running');   
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;