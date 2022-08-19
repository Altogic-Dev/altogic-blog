import { KeyIcon } from '@heroicons/react/outline';
import Input from '@/components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import AuthSidebar from '@/components/AuthSidebar';
import { authActions } from '@/redux/auth/authSlice';
import BackToLogin from '@/components/BackToLogin';

export default function Login() {
  const registerSchema = new yup.ObjectSchema({
    email: yup.string().email().required('Email is required'),
  });
  const dispatch = useDispatch();

  async function formSubmit(form) {
    dispatch(authActions.forgotPasswordRequest({ ...form }));
  }
  const error = useSelector((state) => state.auth.error);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  useEffect(() => {
    if (error) {
      error.forEach((err) => {
        if (err.message !== 'A user with the provided email already exists.')
          setError('email', { type: 'manuel', message: err.message });
      });
    }
  }, [error, setError]);
  return (
    <div className="relative h-screen">
      <div className="grid xl:grid-cols-2 h-full">
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-lg lg:w-[360px]">
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
                <KeyIcon className="w-7 h-7 text-purple-600" />
              </span>
              <h1 className="text-3xl font-semibold text-slate-800">
                Forgot password?
              </h1>
              <p className="mt-4 text-base tracking-sm text-slate-600">
                No worries, we’ll send you reset instructions.
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
                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Reset password
                    </button>
                  </div>
                </form>
                <BackToLogin />
              </div>
            </div>
          </div>
        </div>
        <AuthSidebar />
      </div>
    </div>
  );
}
