import Link from "next/link";
import React from "react";
import { Logo } from "../Logo";
import { PATHS } from "@/app/paths";
import { Navbar } from "../Navbar";

export const HomeHeader = () => {
  return (
    <header className="body-font bg-gray-100 text-gray-600">
      <div className="container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row">
        <Link href="/">
          <Logo />
        </Link>
        <nav className="md:ml-auto">
          <Link href={PATHS.SIGNIN}>
            <Navbar.Item>
              Sign In
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="ml-1 h-4 w-4"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Navbar.Item>
          </Link>
        </nav>
      </div>
    </header>
  );
};
