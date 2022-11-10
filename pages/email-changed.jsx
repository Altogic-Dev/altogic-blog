import { useEffect } from 'react';
import { authActions } from '@/redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import AuthSidebar from '@/components/AuthSidebar';
import { MailOpenIcon, ArrowLeftIcon } from '@heroicons/react/outline';
import Link from 'next/link';

export default function ChangedEmail() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.updateUserSuccess());
  }, []);
  return (
    <div className="relative h-screen">
      <div className="grid xl:grid-cols-2 h-full">
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-lg lg:w-[360px]">
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
                <MailOpenIcon className="w-7 h-7 text-purple-600" />
              </span>
              <h1 className="mb-4 text-3xl font-bold text-slate-800">
                Welcome Back!
              </h1>
              <p className="mb-6 text-base tracking-sm text-slate-500">
                Your email has been changed successfully <br />{' '}
              </p>
              <div className="text-center mt-8">
                <Link href="/">
                  <a className="inline-flex items-center gap-2 text-sm font-medium tracking-sm text-slate-500">
                    <ArrowLeftIcon className="w-5 h-5 text-slate-500" />
                    Back to Homepage
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <AuthSidebar />
      </div>
    </div>
  );
}
