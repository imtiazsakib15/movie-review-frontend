"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./auth.api";

export const currentUserQueryKey = ["current-user"] as const;

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      queryClient.setQueryData(currentUserQueryKey, data);

      toast.success("Account created successfully!");
    },
  });
}

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      queryClient.setQueryData(currentUserQueryKey, data);

      toast.success("Welcome back!", {
        description: `You're signed in as ${data.name || data.email}.`,
      });
    },

    onError: (error) => {
      toast.error("Login failed", {
        description:
          error instanceof Error ? error.message : "Invalid email or password.",
      });
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: currentUserQueryKey,
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,

    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: currentUserQueryKey,
      });

      toast.success("Logged out successfully");

      window.location.href = "/";
    },

    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "Failed to log out");
    },
  });
}
