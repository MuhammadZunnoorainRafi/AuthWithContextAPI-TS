import express from 'express';
import {
  getController,
  loginController,
  registerController,
  updateController,
} from '../controller/authController';
import { protect } from '../middleware/authMiddleware';
export const authRouter = express.Router();

authRouter.post('/reg', registerController);
authRouter.post('/log', loginController);
authRouter.post('/update', updateController);
authRouter.get('/get', protect, getController);
