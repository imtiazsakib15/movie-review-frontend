"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Loader2, LogIn, Film } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginSchema, type LoginFormValues } from "@/features/auth/auth.schema";
import { useLogin } from "@/features/auth/auth.hooks";

export default function LoginPage() {
  const router = useRouter();
  const loginMutation = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.push("/");
        router.refresh();
      },
    });
  };

  return (
    <main className="relative flex min-h-[calc(100vh-0px)] items-center justify-center overflow-hidden bg-neutral-950 px-4 py-12">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 -top-50 h-125 w-125 -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[120px]" />

        <div className="absolute -bottom-37.5 -left-25 h-100 w-100 rounded-full bg-purple-600/10 blur-[120px]" />

        <div className="absolute -right-25 top-1/3 h-87.5 w-87.5rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo / Brand */}
        <div className="mb-8 flex flex-col items-center text-center">
          <Link
            href="/"
            className="mb-5 flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-white text-black shadow-lg shadow-white/5">
              <Film className="size-5" />
            </div>

            <span className="text-2xl font-bold tracking-tight text-white">
              Cinevoo
            </span>
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-neutral-400">
            Sign in to continue your movie journey.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-white/10 bg-white/4 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            noValidate
          >
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-200">
                Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loginMutation.isPending}
                aria-invalid={!!errors.email}
                className="h-11 border-white/10 bg-white/4 text-white placeholder:text-neutral-600 focus-visible:border-white/20 focus-visible:ring-white/10"
                {...register("email")}
              />

              {errors.email && (
                <p className="text-sm text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-neutral-200">
                  Password
                </Label>

                <Link
                  href="/forgot-password"
                  className="text-xs text-neutral-400 transition-colors hover:text-white"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  disabled={loginMutation.isPending}
                  aria-invalid={!!errors.password}
                  className="h-11 border-white/10 bg-white/4 pr-11 text-white placeholder:text-neutral-600 focus-visible:border-white/20 focus-visible:ring-white/10"
                  {...register("password")}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  disabled={loginMutation.isPending}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 transition-colors hover:text-neutral-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="h-11 w-full bg-white font-semibold text-black hover:bg-neutral-200"
            >
              {loginMutation.isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="size-4" />
                  Sign in
                </>
              )}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/10" />

            <span className="text-xs text-neutral-600">OR</span>

            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Register */}
          <p className="text-center text-sm text-neutral-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-white underline-offset-4 transition-colors hover:text-neutral-300 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-neutral-600">
          By continuing, you agree to Cinevoo's Terms of Service and Privacy
          Policy.
        </p>
      </div>
    </main>
  );
}
