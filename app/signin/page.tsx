"use client";

import { useRouter } from "next/navigation";
import { Logo } from "../components/Logo";
import { PATHS } from "../paths";
import { Button } from "../components/Button";
import Link from "next/link";
import { supabaseClient } from "@/services/supabase";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

const validationSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type FormValues = z.infer<typeof validationSchema>;

export default function SignIn() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (data: FormValues) => {
    const { email, password } = data;
    setIsLoading(true);

    try {
      const data = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });

      if (!data.error) {
        router.push("/dashboard");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const errorMessagesClasses = "text-xs text-red-600 mt-1";

  return (
    <section className="text-gray-600 body-font">
      <div className="container h-screen px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col lg:mr-auto w-full mt-10 md:mt-0 mx-auto">
          <form onSubmit={handleSubmit(handleSignIn)}>
            <div className="flex justify-center items-center mb-6">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              Sign In
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />{" "}
              {errors.email && (
                <p className={errorMessagesClasses}>{errors.email?.message}</p>
              )}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
              {errors.password && (
                <p className={errorMessagesClasses}>
                  {errors.password?.message}
                </p>
              )}
            </div>
            <Button className="w-full" type="submit" isLoading={isLoading}>
              Sign In
            </Button>
            <p className="text-xs text-gray-500 mt-3">
              {"Don't have an account? "}
              <Link href={PATHS.SIGNUP} className="text-red-600">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
