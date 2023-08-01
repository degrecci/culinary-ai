"use client";

import Link from "next/link";
import { Logo } from "../components/Logo";
import { PATHS } from "../paths";
import { SignupForm } from "./Form";

export default function SignUp() {
  return (
    <section className="body-font text-gray-600">
      <div className="container mx-auto flex h-screen flex-wrap items-center px-5 py-24">
        <div className="mx-auto mt-10 flex w-full flex-col rounded-lg bg-gray-100 p-8 md:mt-0 md:w-1/2 lg:mr-auto lg:w-2/6">
          <div className="mb-6 flex items-center justify-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          <h2 className="title-font mb-5 text-lg font-medium text-gray-900">
            Sign Up
          </h2>
          <SignupForm />
          <p className="mt-3 text-xs text-gray-500">
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
