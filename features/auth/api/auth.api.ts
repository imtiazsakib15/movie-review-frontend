import { apiFetch } from "@/lib/api";
import { RegisterInput, RegisterResponse } from "../types/auth.types";

export async function registerUser(
  payload: RegisterInput,
): Promise<RegisterResponse> {
  const response = await apiFetch<RegisterResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}
