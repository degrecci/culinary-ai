import React from "react";
import { Logo } from "../Logo";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

export const Navbar = ({ children, className, ...props }: NavbarProps) => {
  return (
    <header className={`${className} text-gray-600 bg-gray-100 body-font`}>
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Logo />
        <nav className="md:ml-auto">{children}</nav>
      </div>
    </header>
  );
};
