import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/Button";
import { supabaseClient } from "@/services/supabase";

const schema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid",
    })
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
  username: z
    .string({ required_error: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" }),
});

type FormValues = {
  email: string;
  password: string;
  username: string;
};

export const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleSignUp = async (data: FormValues) => {
    const { email, password, username } = data;
    await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: {
          username,
        },
      },
    });
    router.refresh();
  };

  const errorMessagesClasses = "text-xs text-red-600 mt-1";
  const inputClasses =
    "w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out";

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
          Name
        </label>
        <input {...register("username")} className={inputClasses} />
        {errors.username && (
          <p className={errorMessagesClasses}>{errors.username.message}</p>
        )}
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
          Email
        </label>
        <input {...register("email")} className={inputClasses} />
        {errors.email && (
          <p className={errorMessagesClasses}>{errors.email.message}</p>
        )}
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-600">
          Password
        </label>
        <input {...register("password")} className={inputClasses} />
        {errors.password && (
          <p className={errorMessagesClasses}>{errors.password.message}</p>
        )}
      </div>
      <Button type="submit">Sign up</Button>
    </form>
  );
};
