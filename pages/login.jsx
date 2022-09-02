import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '@/components/Input';
import Link from 'next/link';
import { authActions } from '@/redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import SocialProviders from '@/components/login/SocialProviders';

export default function Login() {
  const loginSchema = new yup.ObjectSchema({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.loginError);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  async function formSubmit(data) {
    dispatch(
      authActions.loginRequest({
        ...data,
      })
    );
  }
  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error.forEach((err) => {
        setError('password', { type: 'manuel', message: err.message });
        setError('email', { type: 'manuel', message: null });
      });
    }
  }, [error, setError]);
  useEffect(
    () => () => {
      dispatch(authActions.resetErrorsRequest());
    },
    []
  );
  return (
    <div className="relative h-screen">
      <div className="grid xl:grid-cols-2 h-full">
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-lg lg:w-[360px]">
            <div className="flex flex-col items-center">
              <img
                className="w-[192px] h-[66px] mb-6"
                src="./logo.svg"
                alt="Altogic"
              />
              <h2 className="text-4xl font-bold text-slate-800">
                Welcome Back!
              </h2>
              <p className="mt-3 text-base text-slate-600 tracking-sm">
                Welcome back! Please enter your details.
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
                  <Input
                    label="Email"
                    id="email"
                    name="email"
                    register={register('email')}
                    error={errors.email}
                    placeholder="johndoe@example.com"
                  />

                  <div className="space-y-1">
                    <Input
                      label="Password"
                      id="password"
                      name="password"
                      register={register('password')}
                      type="password"
                      error={errors.password}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-slate-700 tracking-sm"
                      >
                        Remember for 30 days
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link href="/forgot-password">
                        <a className="font-medium text-purple-700 tracking-sm hover:text-purple-500">
                          Forgot your password?
                        </a>
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Sign in
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
                    <div>
                      <p className="inline-block text-slate-700 mb-3 text-sm font-medium tracking-sm">
                        Sign in with
                      </p>

                      <SocialProviders />
                    </div>
                  </div>
                </form>
                <p className="text-center mt-8 text-sm text-slate-500">
                  Don&apos;t have an account yet?{' '}
                  <Link href="/create-an-account">
                    <a className="font-medium text-purple-700 tracking-sm hover:text-purple-500">
                      Create an account.
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
