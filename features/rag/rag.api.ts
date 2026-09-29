import { apiFetch } from "@/lib/api";

import type {
  AskCinevooRequest,
  AskCinevooResponse,
  IngestResult,
  RagStats,
} from "./rag.types";

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

export async function getRagStats(): Promise<RagStats> {
  const response = await apiFetch<RagStats>("/rag/stats");

  return response.data;
}

export async function ingestAllMedia(): Promise<IngestResult> {
  const response = await apiFetch<IngestResult>("/rag/ingest-all-media", {
    method: "POST",
  });

  return response.data;
}
