import { apiFetch } from "@/lib/api";

import type { ProfileOverview } from "./profile.types";

export async function getProfileOverview(): Promise<ProfileOverview> {
  const response = await apiFetch<ProfileOverview>("/profile/overview");

  return response.data;
}
