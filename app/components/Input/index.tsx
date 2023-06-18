import React from "react";

type Props = {
  errorMessage?: string;
  label: string;
  name: string;
  register: any;
} & React.InputHTMLAttributes<HTMLInputElement>;

const errorMessagesClasses = "text-xs text-red-600 mt-1";
const inputClasses =
  "w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out";

export const Input = ({
  errorMessage,
  label,
  name,
  register,
  ...props
}: Props) => {
  return (
    <>
      <label htmlFor={name} className="leading-7 text-sm text-gray-600">
        {label}
      </label>
      <input {...register(name)} className={inputClasses} />
      {errorMessage && <p className={errorMessagesClasses}>{errorMessage}</p>}
    </>
  );
};
