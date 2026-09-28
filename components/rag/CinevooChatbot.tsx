"use client";

import { FormEvent, useRef, useState } from "react";
import { Bot, Loader2, Send, Sparkles, User, X } from "lucide-react";

import { useAskCinevoo } from "@/features/rag/rag.hooks";
import type { ChatMessage } from "@/features/rag/rag.types";

const initialMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Cinevoo AI. Ask me about movies, series, ratings, genres, or viewer opinions.",
};

export function CinevooChatbot() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);

  const inputRef = useRef<HTMLInputElement>(null);

  const askMutation = useAskCinevoo();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery || askMutation.isPending) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedQuery,
    };

    setMessages((current) => [...current, userMessage]);

    setQuery("");

    try {
      const result = await askMutation.mutateAsync({
        query: trimmedQuery,
      });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.answer,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to get an answer.";

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: errorMessage,
      };

      setMessages((current) => [...current, assistantMessage]);
    }
  };

  const handleOpen = () => {
    setOpen(true);

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleClear = () => {
    setMessages([initialMessage]);
    setQuery("");
  };

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={handleOpen}
          aria-label="Open Cinevoo AI"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-zinc-950 text-white shadow-2xl shadow-black/40 transition hover:scale-105 hover:bg-zinc-900"
        >
          <Sparkles className="h-5 w-5" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex w-[calc(100vw-2rem)] max-w-105 flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/95 shadow-2xl shadow-black/50 backdrop-blur-xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
                <Sparkles className="h-4 w-4" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white">Cinevoo AI</h2>

                <p className="text-xs text-zinc-500">Ask about Cinevoo</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClear}
                className="rounded-lg px-2 py-1.5 text-xs text-zinc-500 transition hover:bg-white/5 hover:text-white"
              >
                Clear
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close Cinevoo AI"
                className="rounded-lg p-2 text-zinc-500 transition hover:bg-white/5 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex h-105 flex-col gap-4 overflow-y-auto p-4">
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={`flex items-start gap-2 ${
                    isUser ? "justify-end" : ""
                  }`}
                >
                  {!isUser && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm leading-6 ${
                      isUser
                        ? "rounded-2xl rounded-tr-md bg-indigo-500 text-white"
                        : "rounded-2xl rounded-tl-md border border-white/10 bg-white/5 text-zinc-200"
                    }`}
                  >
                    <div className="flex gap-2">
                      {isUser && <User className="mt-1 h-4 w-4 shrink-0" />}

                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {askMutation.isPending && (
              <div className="flex items-start gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
                  <Bot className="h-4 w-4" />
                </div>

                <div className="rounded-2xl rounded-tl-md border border-white/10 bg-white/5 px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-zinc-400">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Thinking...
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-white/10 p-3"
          >
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/3 p-2">
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                disabled={askMutation.isPending}
                placeholder="Ask Cinevoo anything..."
                className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none placeholder:text-zinc-600"
              />

              <button
                type="submit"
                disabled={!query.trim() || askMutation.isPending}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
