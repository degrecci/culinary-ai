"use client";

import Link from "next/link";
import { Logo } from "../components/Logo";
import { PATHS } from "../paths";
import { SignupForm } from "./Form";

export default function SignUp() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container h-screen px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col lg:mr-auto w-full mt-10 md:mt-0 mx-auto">
          <div className="flex justify-center items-center mb-6">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
            Sign Up
          </h2>
          <SignupForm />
          <p className="text-xs text-gray-500 mt-3">
            Already have an account?{" "}
            <Link href={PATHS.SIGNIN} className="text-red-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
