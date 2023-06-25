import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../model/userModel';
import { Types } from 'mongoose';
import expressAsyncHandler from 'express-async-handler';

type dataStoredInToken = {
  id: string;
};

type user = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};

// export type requestWithUser = Request & {
//   user: {
//     _id: Types.ObjectId;
//     name: string;
//     email: string;
//   };
// };

export const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      try {
        // Get token from header
        // eslint-disable-next-line prefer-const
        token = req.headers.authorization.split(' ')[1];

        // Verify token
        const decoded = jwt.verify(
          token,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          process.env.JWT_SECRET!
        ) as dataStoredInToken;

        // Get user from token
        req.user = (await User.findById(decoded.id).select(
          '-password'
        )) as user;

        if (!req.user) {
          res.status(401);
          throw new Error('User is Not Authorized ');
        }
        next();
      } catch (error) {
        res.status(401);
        throw new Error('Not Authorized bhai');
      }
    }
    if (!token) {
      res.status(400);
      throw new Error('Token not found');
    }
  }
);
