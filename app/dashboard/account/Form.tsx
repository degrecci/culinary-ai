"use client";
import { useUser } from "@/store/user";

export const Form = () => {
  const { user } = useUser();
  const inputClasses =
    "w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out";

  return (
    <form>
      <label htmlFor="username" className="leading-7 text-sm text-gray-600">
        E-mail
      </label>
      <input value={user?.email} readOnly className={inputClasses} />
    </form>
  );
};
