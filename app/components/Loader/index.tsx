import React from "react";

type LoaderProps = {
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export const Loader = ({ className = "" }: LoaderProps) => {
  return <span className={`loader ${className}`}></span>;
};
