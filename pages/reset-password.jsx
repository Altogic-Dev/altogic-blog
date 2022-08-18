import { useEffect } from 'react';
import BackToLogin from '@/components/BackToLogin';
import { KeyIcon } from '@heroicons/react/outline';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Input from '@/components/Input';
import { authActions } from '@/redux/auth/authSlice';

export default function ResetPassword() {
  const router = useRouter();
  const { query } = router;

  const key = query.access_token;

  const registerSchema = new yup.ObjectSchema({
    password: yup.string().required('Password is required'),
    passwordConfirmation: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(50, 'Password must be at most 50 characters')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  async function formSubmit(form) {
    const pswChangeForm = {
      newPassword: form.password,
      accessToken: key,
    };
    dispatch(authActions.resetPasswordRequested({ ...pswChangeForm }));
  }

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
      setError('email', { type: 'manuel', message: 'An error occured' });
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
                Reset password
              </h1>
              <p className="mt-4 text-base tracking-sm text-slate-600">
                Must be at least 8 characters.
              </p>
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form onSubmit={handleSubmit(formSubmit)} className="space-y-6">
                  <Input
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    register={register('password')}
                    error={errors.password}
                    placeholder="Password"
                  />
                  <Input
                    label="Password Confirm"
                    id="passwordConfirmation"
                    type="password"
                    name="passwordConfirmation"
                    register={register('passwordConfirmation')}
                    error={errors.passwordConfirmation}
                    placeholder="Password Confirm"
                  />

                  <div>
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                      Continue
                    </button>
                  </div>
                </form>
                <BackToLogin />
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
