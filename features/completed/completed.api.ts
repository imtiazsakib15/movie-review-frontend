import { apiFetch } from "@/lib/api";

import type { AddCompletedInput, CompletedItem } from "./completed.types";

export async function markAsCompleted(
  payload: AddCompletedInput,
): Promise<CompletedItem> {
  const response = await apiFetch<CompletedItem>("/completed", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function removeFromCompleted(mediaId: string): Promise<void> {
  await apiFetch<null>(`/completed/${encodeURIComponent(mediaId)}`, {
    method: "DELETE",
  });
}

export async function getCompleted(): Promise<CompletedItem[]> {
  const response = await apiFetch<CompletedItem[]>("/completed");

  return response.data;
}
