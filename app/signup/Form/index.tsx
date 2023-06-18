import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/Button";
import { supabaseClient } from "@/services/supabase";

const validationSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  username: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" }),
});

type FormValues = z.infer<typeof validationSchema>;

export const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(validationSchema),
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignUp = async (data: FormValues) => {
    const { email, password, username } = data;

    try {
      setIsLoading(true);
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
    } catch (e) {
      console.error(e);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  const errorMessagesClasses = "text-xs text-red-600 mt-1";
  const inputClasses =
    "w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out";

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="relative mb-4">
        <label htmlFor="username" className="leading-7 text-sm text-gray-600">
          Name
        </label>
        <input {...register("username")} type="text" className={inputClasses} />
        {errors.username && (
          <p className={errorMessagesClasses}>{errors.username?.message}</p>
        )}
      </div>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-600">
          Email
        </label>
        <input {...register("email")} type="email" className={inputClasses} />
        {errors.email && (
          <p className={errorMessagesClasses}>{errors.email?.message}</p>
        )}
      </div>
      <div className="relative mb-4">
        <label htmlFor="username" className="leading-7 text-sm text-gray-600">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          className={inputClasses}
        />
        {errors.password && (
          <p className={errorMessagesClasses}>{errors.password?.message}</p>
        )}
      </div>
      <Button
        type="submit"
        className="w-full"
        isLoading={isLoading}
        disabled={isLoading}
      >
        Sign up
      </Button>
    </form>
  );
};
