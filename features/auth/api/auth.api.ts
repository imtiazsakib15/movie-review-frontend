import { apiFetch } from "@/lib/api";
import { RegisterResponse } from "../types/auth.types";
import { RegisterFormValues } from "../schemas/register.schema";

export async function registerUser(
  payload: Omit<RegisterFormValues, "confirmPassword">,
): Promise<RegisterResponse> {
  const response = await apiFetch<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}
