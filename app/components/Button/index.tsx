import React, { ButtonHTMLAttributes } from "react";
import { Loader } from "../Loader";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
}

export const Button = ({
  secondary = false,
  isLoading = false,
  children,
  className,
  ...props
}: ButtonProps) => {
  const primaryColors = `text-white bg-red-500 hover:bg-red-600 border-0`;
  const secondaryColors = `text-red-500 bg-white hover:bg-red-100 border-2 border-red-500`;

  return (
    <button
      type="button"
      className={`py-2 px-8 focus:outline-none rounded text-lg ${className} ${
        secondary ? secondaryColors : primaryColors
      }`}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
};
