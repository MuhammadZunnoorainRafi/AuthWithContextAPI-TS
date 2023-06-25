import { Error } from '../types/error';

export const errorHandler = (error: Error) => {
  return error.response?.data?.message || error.message;
};
