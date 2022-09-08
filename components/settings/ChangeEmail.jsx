import React, { useEffect } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { authActions } from '@/redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';
import Button from '../basic/button';

export default function ChangeEmail() {
  const changeEmailSchema = new yup.ObjectSchema({
    newEmail: yup
      .string()
      .required('Password is required')
      .email('Please enter a valid email')
      .min(8, 'Old Password must be at least 8 characters'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Old Password must be at least 8 characters'),
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.changeEmailError);
  const loading = useSelector((state) => state.auth.loading);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changeEmailSchema),
  });

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message?.includes('current password')) {
          setError('password', {
            type: 'manuel',
            message: err.message,
          });
        }
      });
    }
    if (!error) {
      reset();
    }
  }, [error, setError]);
  const formSubmit = async (form) => {
    dispatch(
      authActions.changeEmailRequest({
        password: form.password,
        email: form.newEmail,
      })
    );
  };
  useEffect(
    () => () => {
      dispatch(authActions.resetErrorsRequest());
    },
    []
  );
  return (
    <div id="change-email" className="mb-16">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-3xl font-medium text-slate-800 tracking-[-0.8px]">
                Change Email
              </h3>
              <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
                Please enter your current password and new email to change your
                email.
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              <div>
                <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                  <label
                    htmlFor="newEmail"
                    className="block text-sm font-medium text-gray-700 tracking-sm"
                  >
                    New Email
                  </label>
                  <Input
                    type="email"
                    name="newEmail"
                    id="newEmail"
                    register={register('newEmail')}
                    error={errors.newEmail}
                    className="flex-1 min-w-0"
                  />
                </div>
              </div>
              <div>
                <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 tracking-sm"
                  >
                    Password
                  </label>
                  <div>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      register={register('password')}
                      className="flex-1 min-w-0"
                      error={errors.password}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 py-6 border-t border-gray-200">
              <Button
                loading={loading}
                type="submit"
                className="inline-flex justify-center py-2.5 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Update Password
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
