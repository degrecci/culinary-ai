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
      className={`${className} body-font bg-gray-100 text-gray-600`}
      {...props}
    >
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <Link href="/dashboard">
          <Logo />
        </Link>
        <nav className="flex md:ml-auto">{children}</nav>
      </div>
    </header>
  );
};

interface NavBarItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Item = ({ children, ...props }: NavBarItemProps) => (
  <button
    className="mt-4 inline-flex items-center rounded border-0 bg-gray-100 px-3 py-1 text-base hover:bg-gray-200 focus:outline-none md:mt-0"
    {...props}
  >
    {children}
  </button>
);

Navbar.Item = Item;

export { Navbar };
