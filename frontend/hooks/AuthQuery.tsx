import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type regMutateType = {
  name?: string;
  email: string;
  password: string;
};
type updateMutateType = {
  _id: string;
  name: string;
  email: string;
  password: string;
};

const postRegData = async (data: regMutateType) => {
  const res = await axios.post('/api/user/reg', data);
  return res.data;
};

export const AuthRegMutation = () => {
  return useMutation({
    mutationFn: postRegData,
  });
};

export const AuthLogMutation = () => {
  return useMutation({
    mutationFn: async (data: regMutateType) => {
      const res = await axios.post('/api/user/log', data);
      return res.data;
    },
  });
};

export const AuthUpdateMutation = () => {
  return useMutation({
    mutationFn: async (data: updateMutateType) => {
      const res = await axios.post('/api/user/update', data);
      return res.data;
    },
  });
};
