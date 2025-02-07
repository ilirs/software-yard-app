'use client';
import Image from 'next/image';
import { InputHTMLAttributes } from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

const InputField = ({
  label,
  name,
  register,
  error,
  ...rest
}: InputFieldProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>
      <input
        {...register(name)}
        {...rest}
        className={`border-2 p-3 rounded-full focus:outline-none focus:border-blue-500 ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && (
        <div className="flex gap-1">
          <Image alt="info" src="/info.svg" width={16} height={16} />{' '}
          <p className="text-red-500 text-xs">{error}</p>{' '}
        </div>
      )}
    </div>
  );
};

export default InputField;
