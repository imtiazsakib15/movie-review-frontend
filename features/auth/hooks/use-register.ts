"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerUser } from "../api/auth.api";

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: registerUser,

    onSuccess: (data) => {
      queryClient.setQueryData(["current-user"], data);
    },
  });
}
