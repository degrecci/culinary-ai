"use client";

import { useRouter } from "next/navigation";
import { Logo } from "../components/Logo";
import { PATHS } from "../paths";
import { Button } from "../components/Button";
import Link from "next/link";
import { supabaseClient } from "@/services/client";
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
    <section className="body-font text-gray-600">
      <div className="container mx-auto flex h-screen flex-wrap items-center px-5 py-24">
        <div className="mx-auto mt-10 flex w-full flex-col rounded-lg bg-gray-100 p-8 md:mt-0 md:w-1/2 lg:mr-auto lg:w-2/6">
          <form onSubmit={handleSubmit(handleSignIn)}>
            <div className="mb-6 flex items-center justify-center">
              <Link href="/">
                <Logo />
              </Link>
            </div>
            <h2 className="title-font mb-5 text-lg font-medium text-gray-900">
              Sign In
            </h2>
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="text-sm leading-7 text-gray-600"
              >
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-red-500 focus:ring-2 focus:ring-red-200"
              />{" "}
              {errors.email && (
                <p className={errorMessagesClasses}>{errors.email?.message}</p>
              )}
            </div>
            <div className="relative mb-4">
              <label
                htmlFor="password"
                className="text-sm leading-7 text-gray-600"
              >
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                className="w-full rounded border border-gray-300 bg-white px-3 py-1 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-red-500 focus:ring-2 focus:ring-red-200"
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
            <p className="mt-3 text-xs text-gray-500">
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
