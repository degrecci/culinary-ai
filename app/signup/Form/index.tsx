import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/app/components/Button";
import { supabaseClient } from "@/services/supabase";
import { Input } from "@/app/components/Input";

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

  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <div className="relative mb-4">
        <Input
          label="Name"
          type="text"
          name="username"
          errorMessage={errors.username?.message}
          register={register}
        />{" "}
      </div>
      <div className="relative mb-4">
        <Input
          label="Email"
          type="email"
          name="email"
          errorMessage={errors.email?.message}
          register={register}
        />
      </div>
      <div className="relative mb-4">
        <Input
          label="Password"
          type="password"
          errorMessage={errors.password?.message}
          name="password"
          register={register}
        />
      </div>
      <Button type="submit">Sign up</Button>
    </form>
  );
};
