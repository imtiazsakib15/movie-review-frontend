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
