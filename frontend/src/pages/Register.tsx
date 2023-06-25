import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { regType } from '../types/form';
import { useContext } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { AuthRegMutation } from '../../hooks/AuthQuery';
import { toast } from 'react-toastify';
import { errorHandler } from '../utils/ErrorMessage';
import { useNavigate } from 'react-router-dom';

type Error = {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
};

function Register() {
  const { dispatch } = useContext(AuthContext);
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
    resolver: zodResolver(regSchema),
  });

  const { mutateAsync, isLoading } = AuthRegMutation();
  const formSubmit = async (val: regType) => {
    try {
      const userRegData = {
        name: val.name,
        email: val.email,
        password: val.password,
      };

      const data = await mutateAsync(userRegData);

      dispatch({ type: 'REG_USER', payload: data });
      toast.success(`Welcome ${data.name}`);
      localStorage.setItem('userInfo', JSON.stringify(data));

      navigate('/');
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-xl border border-slate-100 ">
      <h1 className="font-bold text-2xl pb-3 font-mono">Register Form</h1>
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
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}

export default Register;
