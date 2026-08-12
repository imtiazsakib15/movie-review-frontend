import { apiFetch, ApiResponse } from "@/lib/api";
import { User } from "./auth.types";
import { LoginFormValues, RegisterFormValues } from "./auth.schema";

export async function registerUser(
  payload: Omit<RegisterFormValues, "confirmPassword">,
): Promise<User> {
  const response = await apiFetch<User>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function loginUser(
  data: LoginFormValues,
): Promise<ApiResponse<User>> {
  const response = await apiFetch<User>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  return response;
}
