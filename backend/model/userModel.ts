import mongoose from 'mongoose';

type userType = {
  name: string;
  email: string;
  password: string;
  isAdmin: false;
};

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name field is empty'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email field is empty'],
    },
    password: {
      type: String,
      required: [true, 'Password filed is empty'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<userType>('Users', userSchema);
