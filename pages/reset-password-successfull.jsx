import AuthSidebar from '@/components/AuthSidebar';
import Link from 'next/link';
import { CheckIcon } from '@heroicons/react/outline';

export default function ResetPasswordSuccessFull() {
  return (
    <div className="relative h-screen">
      <div className="grid xl:grid-cols-2 h-full">
        <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-lg lg:w-[360px]">
            <div className="text-center">
              <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-purple-100 mb-6 ring-8 ring-purple-50">
                <CheckIcon className="w-7 h-7 text-purple-600" />
              </span>
              <h1 className="text-3xl font-semibold text-slate-800">
                Password Reset
              </h1>
              <p className="mt-4 mb-11 text-base tracking-sm text-slate-600">
                Your password has been reset successfully.
              </p>
              <Link href="/login">
                <a className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                  Continue to login
                </a>
              </Link>
            </div>
          </div>
        </div>
        <AuthSidebar />
      </div>
    </div>
  );
}
