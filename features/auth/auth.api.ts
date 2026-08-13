import { apiFetch } from "@/lib/api";
import type { LoginFormValues, RegisterFormValues } from "./auth.schema";
import type { User } from "./auth.types";

export async function registerUser(
  payload: Omit<RegisterFormValues, "confirmPassword">,
): Promise<User> {
  const response = await apiFetch<User>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function loginUser(payload: LoginFormValues): Promise<User> {
  const response = await apiFetch<User>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function getCurrentUser(): Promise<User> {
  const response = await apiFetch<User>("/auth/me");

  return response.data;
}

export async function logoutUser(): Promise<void> {
  await apiFetch<null>("/auth/logout", {
    method: "POST",
  });
}
