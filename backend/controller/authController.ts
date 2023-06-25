/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { User } from '../model/userModel';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const genToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: '30d',
  });
};

// @desc Register
// @path /api/user/reg
// @access Public
export const registerController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please enter all fields');
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(401);
      throw new Error('User already exists');
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: genToken(user._id.toString()),
      });
    } else {
      res.status(401);
      throw new Error('Invalid User Data');
    }
  }
);

// @desc login
// @path /api/user/log
// @access Public
export const loginController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(401);
      throw new Error('Please Fill all fields');
    }

    const user = await User.findOne({ email });

    if (user && (await bcryptjs.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        token: genToken(user._id.toString()),
      });
    } else {
      res.status(401);
      throw new Error('Invalid Credentials');
    }
  }
);

// @desc Update
// @path /api/user/update
// @access Public
export const updateController = async (req: Request, res: Response) => {
  const { _id, name, email, password } = req.body;

  const salt = await bcryptjs.genSalt(10);

  const updUser = await User.findByIdAndUpdate(
    _id,
    {
      name,
      email,
      password: await bcryptjs.hash(password, salt),
    },
    { new: true }
  );
  if (updUser) {
    res.json({
      _id: updUser._id,
      name: updUser.name,
      email: updUser.email,
      password: updUser.password,
      token: genToken(updUser._id.toString()),
    });
  } else {
    res.status(401);
    throw new Error('User not found');
  }
};

// @desc GET
// @route /api/user/get
// @access Private

export const getController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };
    res.status(200);
    res.json(user);
  }
);
export const ticketController = expressAsyncHandler(
  async (req: Request, res: Response) => {
    const user = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    };
    res.status(200);
    res.json(user);
  }
);
