import Link from "next/link";
import React from "react";
import { Logo } from "../Logo";
import { PATHS } from "@/app/paths";
import { Navbar } from "../Navbar";

type Props = {};

export const HomeHeader = (props: Props) => {
  return (
    <header className="text-gray-600 bg-gray-100 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
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
                className="w-4 h-4 ml-1"
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
