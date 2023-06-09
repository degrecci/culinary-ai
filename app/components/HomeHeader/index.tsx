import Link from "next/link";
import React from "react";
import { Logo } from "../Logo";
import { PATHS } from "@/app/paths";

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
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
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
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};
