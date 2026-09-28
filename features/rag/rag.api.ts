import { apiFetch } from "@/lib/api";

import type { AskCinevooRequest, AskCinevooResponse } from "./rag.types";

export async function askCinevoo(
  payload: AskCinevooRequest,
): Promise<AskCinevooResponse> {
  const response = await apiFetch<string>("/rag/query", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return {
    answer: response.data,
  };
}
