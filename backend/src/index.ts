import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'colors';
import { connectDB } from '../config/db';
import { authRouter } from '../routes/auth';
import { errorHandler } from '../middleware/errorMiddleware';
import { Types } from 'mongoose';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 8000;
connectDB();
const app = express();

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      _id: Types.ObjectId;
      name: string;
      email: string;
    };
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173'],
  })
);

app.use('/api/user', authRouter);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server is running on port: http://localhost:${PORT} `)
);
