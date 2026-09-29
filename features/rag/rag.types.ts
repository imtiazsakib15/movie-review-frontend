export interface AskCinevooRequest {
  query: string;
}

export interface AskCinevooResponse {
  answer: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface RagStats {
  totalDocuments: number;
  sourceTypeCounts: {
    sourceType: string;
    count: number;
  }[];
}

export interface IngestResult {
  message: string;
  indexedCount: number;
}
