import React, { ButtonHTMLAttributes } from "react";
import { Logo } from "../Logo";
import Link from "next/link";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}

const Navbar = ({ children, className, ...props }: NavbarProps) => {
  return (
    <header
      className={`${className} text-gray-600 bg-gray-100 body-font`}
      {...props}
    >
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/dashboard">
          <Logo />
        </Link>
        <nav className="md:ml-auto flex">{children}</nav>
      </div>
    </header>
  );
};

interface NavBarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Item = ({ children, ...props }: NavBarItemProps) => (
  <button
    className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
    {...props}
  >
    {children}
  </button>
);

Navbar.Item = Item;

export { Navbar };
