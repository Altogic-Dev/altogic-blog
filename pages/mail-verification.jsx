import { MailOpenIcon } from '@heroicons/react/outline';
import AuthSidebar from '@/components/AuthSidebar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '@/components/basic/button';
import { useDispatch } from 'react-redux';
import { authActions } from '@/redux/auth/authSlice';
import BackToLogin from '@/components/BackToLogin';
import { toast } from 'react-toastify';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  useEffect(() => {
    if (router.isReady) {
      setEmail(router.query.email);
    }
  }, [router.isReady]);

  const resendVerificationEmail = () => {
    dispatch(authActions.resendVerificationEmailRequest(email));
    toast.success('Email Sent Successfully',{hideProgressBar: true});

  };

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
                Check your email
              </h1>
              <p className="mb-6 text-base tracking-sm text-slate-500">
                We sent a verification link to <br />{' '}
                <span className="text-slate-700">{email}</span>
              </p>
              {router.query.operation !== 'change' && (
                <p className="mb-8 text-center text-sm text-slate-500 tracking-sm">
                  Didn’t receive the email?{' '}
                  <Button
                    className="border-0"
                    onClick={resendVerificationEmail}
                  >
                    <a className="font-medium text-purple-700 tracking-sm hover:text-purple-500">
                      Click to resend
                    </a>
                  </Button>
                </p>
              )}
              <BackToLogin />
            </div>
          </div>
        </div>
        <AuthSidebar />
      </div>
    </div>
  );
}
