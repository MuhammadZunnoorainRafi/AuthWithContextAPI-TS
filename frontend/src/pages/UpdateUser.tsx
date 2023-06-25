import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { regType } from '../types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { AuthUpdateMutation } from '../../hooks/AuthQuery';
import { toast } from 'react-toastify';
import { errorHandler } from '../utils/ErrorMessage';

type Error = {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
};

function UpdateUser() {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const regSchema = z
    .object({
      name: z.string().nonempty('Enter your name'),
      email: z.string().nonempty('Enter your email').email('Enter valid email'),
      password: z
        .string()
        .nonempty('Enter your password')
        .min(6, 'Password should be above 6 characters'),
      password2: z.string().nonempty('Enter confirm password'),
    })
    .refine((data) => data.password === data.password2, {
      message: "Passwords don't match",
      path: ['password2'],
    });

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<regType>({
    defaultValues: {
      name: state.user?.name,
      email: state.user?.email,
    },
    resolver: zodResolver(regSchema),
  });

  const { mutateAsync, isLoading } = AuthUpdateMutation();

  const formSubmit = async (val: regType) => {
    try {
      const authUpdateData = {
        _id: state.user!._id,
        name: val.name,
        email: val.email,
        password: val.password,
      };
      const data = await mutateAsync(authUpdateData);
      dispatch({ type: 'UPDATE', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success(`User updated to ${val.name}`);
      navigate('/');
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-xl border border-slate-100 ">
      <h1 className="font-bold text-2xl pb-3 font-mono">Update User</h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="space-y-4 flex flex-col w-[500px]"
      >
        <TextField
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          label="Name"
          type="text"
        />
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
          label="Email"
          // type="email"
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password')}
          label="Password"
          type="password"
        />
        <TextField
          {...register('password2')}
          label="Confirm Password"
          type="password"
          error={!!errors.password2}
          helperText={errors.password2?.message}
        />
        <Button
          variant="contained"
          sx={{ width: '200px', alignSelf: 'center' }}
          type="submit"
          color="primary"
        >
          {isLoading ? 'Loading...' : 'Update'}
        </Button>
      </form>
    </div>
  );
}

export default UpdateUser;
