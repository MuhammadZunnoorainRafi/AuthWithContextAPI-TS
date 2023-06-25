import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { logType } from '../types/form';
import { AuthLogMutation } from '../../hooks/AuthQuery';
import { useContext, useEffect } from 'react';
import AuthContext from '../context/auth/AuthContext';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { errorHandler } from '../utils/ErrorMessage';

type Error = {
  response: {
    data: {
      message: string;
    };
  };
  message: string;
};

function Login() {
  const regSchema = z.object({
    email: z.string().nonempty('Enter your email').email('Enter valid email'),
    password: z
      .string()
      .nonempty('Enter your password')
      .min(6, 'Password should be above 6 characters'),
  });
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<logType>({
    resolver: zodResolver(regSchema),
  });

  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (state.user) {
      navigate(redirect);
    }
  }, [navigate, state.user, redirect]);

  const { mutateAsync, isLoading } = AuthLogMutation();

  const formSubmit = async (val: logType) => {
    try {
      const logData = {
        email: val.email,
        password: val.password,
      };
      const data = await mutateAsync(logData);
      localStorage.setItem('userInfo', JSON.stringify(data));
      dispatch({
        type: 'LOGIN',
        payload: data,
      });
      toast.success(`${data?.name} is Logged In`);
    } catch (error) {
      toast.error(errorHandler(error as Error));
    }
  };
  return (
    <div className="p-4 rounded-lg shadow-xl border border-slate-100">
      <h1 className="font-bold text-2xl pb-3 font-mono">Login Form</h1>
      <form
        onSubmit={handleSubmit(formSubmit)}
        className="space-y-4 flex flex-col w-[500px]"
      >
        <TextField
          error={!!errors.email}
          helperText={errors.email?.message}
          {...register('email')}
          label="Email"
          type="email"
        />
        <TextField
          error={!!errors.password}
          helperText={errors.password?.message}
          {...register('password')}
          label="Password"
          type="password"
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

export default Login;
