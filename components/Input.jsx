import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Input({
  label,
  id,
  error,
  register,
  className,
  prefix,
  icon,
  iconSvg,
  ...rest
}) {
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`block text-base font-medium text-slate-700 mb-1 ${
          error && 'text-red-600'
        }`}
      >
        {label}
      </label>
      <div className="relative">
        <div
          className={
            iconSvg || icon || prefix ? 'flex rounded-md shadow-sm' : ''
          }
        >
          {prefix && (
            <span
              className={`inline-flex items-center px-3 rounded-l-md border border-r-0 tracking-sm ${
                error
                  ? 'border-red-600 text-red-900'
                  : 'border-gray-300 text-slate-500'
              }`}
            >
              {prefix}
            </span>
          )}
          {icon && (
            <div className="absolute top-[11px] left-0 pl-3 pointer-events-none">
              <FontAwesomeIcon icon={icon} className="w-5 h-5 text-gray-500" />
            </div>
          )}
          {iconSvg && (
            <div className="absolute top-[11px] left-0 pl-3 pointer-events-none">
              <div className="w-5 h-5 text-gray-500">{iconSvg}</div>
            </div>
          )}
          <input
            id={id}
            className={`appearance-none block w-full h-full px-3 py-3 text-slate-500 border border-gray-300 shadow-sm placeholder-slate-500 focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
              error &&
              'border-red-600 text-red-900 placeholder-red-300 focus:ring-red-600'
            } ${!prefix ? 'rounded-md' : ''} ${className}`}
            {...register}
            {...rest}
          />
        </div>
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
