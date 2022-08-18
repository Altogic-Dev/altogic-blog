import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

function Input({ label, id, error, register, className, ...rest }) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`block text-base font-medium text-slate-700 ${
          error && 'text-red-600'
        }`}
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          className={`appearance-none block w-full px-3 py-3 text-slate-500 border border-gray-300 rounded-md shadow-sm placeholder-slate-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
            error &&
            'border-red-600 text-red-900 placeholder-red-300 focus:ring-red-600'
          } ${className}`}
          {...register}
          {...rest}
        />
        {error && (
          <ExclamationCircleIcon className="w-8 h-8 absolute inset-y-1 right-0 pr-3 flex items-center pointer-events-none text-red-600" />
        )}
        {error?.message && (
          <span className="inline-block text-sm text-red-600">
            {error.message}
          </span>
        )}
      </div>
    </div>
  );
}
export default Input;
