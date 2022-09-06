import { useEffect } from 'react';
import Link from 'next/link';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Input from '@/components/Input';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import SocialProviders from '@/components/login/SocialProviders';

export default function CreateAnAccount() {
  const registerSchema = new yup.ObjectSchema({
    email: yup.string().email().required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must be at most 50 characters')
      .required('Password is required'),
    username: yup
      .string()
      .required('Username is required ')
      .matches(/^[a-zA-Z0-9_]+$/, 'Only alphabets are allowed for this field ')
      .max(15, 'Username must be at most 15 characters'),
    name: yup.string().required('Name is required'),
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.registerError);
  const usernameError = useSelector((state) => state.auth.updateProfileError);
  const isUsernameAvailable = useSelector(
    (state) => state.auth.isUsernameAvailable
  );
  useEffect(() => {
    if (Symbol.iterator in Object(usernameError)) {
      usernameError.forEach((err) => {
        setError('username', {
          type: 'manuel',
          message: err.message,
        });
      });
    }
  }, [usernameError, setError]);
  useEffect(() => {
    if (isUsernameAvailable) {
      clearErrors('username');
    }
  }, [isUsernameAvailable]);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(authActions.registerRequest(data));
  };

  useEffect(() => {
    if (error && !loading) {
      error.forEach((err) => {
        if (err.message.includes('username')) {
          setError('username', {
            type: 'manuel',
            message: 'This username already exists',
          });
        } else if (err.message?.includes('6')) {
          setError('password', {
            type: 'manuel',
            message: 'Password must be at least 8 characters',
          });
        } else if (err.message?.includes('50')) {
          setError('password', {
            type: 'manuel',
            message: 'Password must be at most 50 characters',
          });
        } else if (err.message?.includes('email')) {
          setError('email', {
            type: 'manuel',
            message: err.message,
          });
        } else setError('email', { type: 'manuel', message: err?.message });
      });
    }
  }, [error, setError, usernameError]);
  useEffect(
    () => () => {
      dispatch(authActions.resetErrorsRequest());
    },
    []
  );
  const checkUsername = (e) => {
    dispatch(authActions.checkUsernameRequest(e.target.value));
  };
  return (
    <div className="relative h-screen">
      <div className="grid xl:grid-cols-2 h-full">
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <img
            className="absolute top-8 left-8 w-[123px] h-[42px] mb-20 md:mb-44"
            src="./logo.svg"
            alt="Altogic"
          />
          <div className="mx-auto w-full max-w-lg lg:w-[360px]">
            <div>
              <h1 className="mb-3 text-3xl font-semibold text-slate-800 tracking-md">
                Sign Up
              </h1>
              <p className="text-md text-slate-600 tracking-sm">
                Start your blog.
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <Input
                    label="Name-Surname"
                    id="name"
                    name="name"
                    register={register('name')}
                    placeholder="johndoe"
                    error={errors.name}
                  />

                  <Input
                    label="Username"
                    id="username"
                    name="username"
                    register={register('username')}
                    placeholder="johndoe"
                    error={errors.username}
                    onBlur={checkUsername}
                  />

                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    register={register('email')}
                    error={errors.email}
                    placeholder="johndoe@example.com"
                  />

                  <div className="space-y-1">
                    <div className="mt-1">
                      <div className="space-y-1">
                        <Input
                          label="Password"
                          id="password"
                          name="password"
                          register={register('password')}
                          placeholder="************ "
                          type="password"
                          error={errors.password}
                        />
                      </div>

                      <span className="inline-block text-slate-500 mt-2 text-sm tracking-sm">
                        Must be at least 8 characters.
                      </span>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Get started
                    </button>
                  </div>
                  <div className="mt-6 relative">
                    <div
                      className="absolute inset-0 flex items-center"
                      aria-hidden="true"
                    >
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-slate-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="mb-8">
                      <p className="inline-block text-slate-700 mb-3 text-sm font-medium tracking-sm">
                        Sign in with
                      </p>

                     <SocialProviders/>
                    </div>
                  </div>
                </form>
                <p className="text-center text-sm text-slate-500">
                  Don’t have an account?{' '}
                  <Link href="/login">
                    <a
                      href="#"
                      className="font-medium text-purple-700 tracking-sm hover:text-purple-500"
                    >
                      Login
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden xl:block relative">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="./login.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
