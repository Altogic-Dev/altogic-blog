import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { authActions } from '@/redux/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';
import Button from '../basic/button';

export default function ChangePassword() {
  const changePasswordSchema = new yup.ObjectSchema({
    currentPassword: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    newPassword: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
  });
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.changePasswordError);
  const loading = useSelector((state) => state.auth.isLoading);

  const [upLoading, setUpLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  useEffect(() => {
    if (Symbol.iterator in Object(error)) {
      error?.forEach((err) => {
        if (err.message?.includes('current password')) {
          setError('currentPassword', {
            type: 'manuel',
            message: 'Current password is wrong!',
          });
        } else if (err.message?.includes('at least')) {
          setError('newPassword', {
            type: 'manuel',
            message: err.message,
          });
        }
      });
    }
  }, [error, setError]);
  const formSubmit = async (form) => {
    setUpLoading(true);
    dispatch(
      authActions.changePasswordRequest({
        newPassword: form.newPassword,
        currentPassword: form.currentPassword,
      })
    );
    reset();
  };
  useEffect(
    () => () => {
      dispatch(authActions.resetErrorsRequest());
    },
    []
  );
  useEffect(() => {
    if (!loading) {
      setUpLoading(false);
    }
  }, [loading]);
  return (
    <div id="password" className="mb-16">
      <form onSubmit={handleSubmit(formSubmit)}>
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-3xl font-medium text-slate-800 tracking-[-0.8px]">
                Password
              </h3>
              <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
                Please enter your current password to change your password.
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              <div>
                <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 tracking-sm"
                  >
                    Current Password
                  </label>
                  <Input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    register={register('currentPassword')}
                    error={errors.currentPassword}
                    className="flex-1 min-w-0"
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 tracking-sm"
                  >
                    New Password
                  </label>
                  <div>
                    <Input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      register={register('newPassword')}
                      className="flex-1 min-w-0"
                      error={errors.newPassword}
                      autoComplete="off"
                    />
                    <p className="mt-1.5 text-sm text-slate-500">
                      Your new password must be more than 8 characters.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid md:grid-cols-[280px,1fr] gap-1 md:gap-8 max-w-[824px] w-full py-6 md:pb-6">
                  <label
                    htmlFor="confirmNewPassword"
                    className="block text-sm font-medium text-gray-700 tracking-sm"
                  >
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    register={register('confirmNewPassword')}
                    className="flex-1 min-w-0"
                    error={errors.confirmNewPassword}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 py-6 border-t border-gray-200">
              <Button
                loading={upLoading}
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
