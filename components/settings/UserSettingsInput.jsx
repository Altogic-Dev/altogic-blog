import React, { useEffect } from 'react';
import Input from '../Input';

export default function UserSettingsInput({
  label,
  id,
  errors,
  register,
  prefix,
  icon,
  placeholder,
  className,
  type,
  defaultValue,
  setValue,
  ...rest
}) {
  useEffect(() => {
    if (defaultValue) {
      setValue(id, defaultValue);
    }
  }, [defaultValue, setValue, id]);

  return (
    <div className="settingsInput grid-cols-1">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 tracking-sm mb-3"
      >
        {label}
      </label>

      <Input
        type={type}
        name={id}
        id={id}
        register={register(id)}
        error={errors[id]}
        placeholder={placeholder}
        className={`${className} flex-1 min-w-0 rounded-r-md tracking-sm"`}
        prefix={prefix}
        icon={icon}
        {...rest}
      />
    </div>
  );
}
