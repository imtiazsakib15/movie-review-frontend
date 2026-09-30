"use client";

import type { FormEvent, KeyboardEvent } from "react";

import { useEffect, useRef, useState } from "react";

import {
  Bot,
  ChevronDown,
  Loader2,
  Send,
  Sparkles,
  Trash2,
  User,
  X,
} from "lucide-react";

import { useAskCinevoo } from "@/features/rag/rag.hooks";
import type { ChatMessage } from "@/features/rag/rag.types";

const SUGGESTED_QUESTIONS = [
  "What are some good sci-fi movies?",
  "Any horror movies?",
  "Recommend a comedy movie.",
  "What do viewers think about Inspection?",
];

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hi! I'm Cinevoo AI. Ask me about movies, series, genres, ratings, or viewer opinions.",
};

export function CinevooChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const askMutation = useAskCinevoo();

  const isThinking = askMutation.isPending;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isThinking]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }
  }, [isOpen]);

  const submitQuestion = async (question: string) => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isThinking) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((current) => [...current, userMessage]);

    setQuery("");

    try {
      const result = await askMutation.mutateAsync({
        query: trimmedQuestion,
      });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: result.answer,
      };

      setMessages((current) => [...current, assistantMessage]);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while generating an answer.";

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: errorMessage,
      };

      setMessages((current) => [...current, assistantMessage]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await submitQuestion(query);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (query.trim() && !isThinking) {
        void submitQuestion(query);
      }
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    if (isThinking) {
      return;
    }

    void submitQuestion(question);
  };

  const handleClear = () => {
    if (isThinking) {
      return;
    }

    setMessages([WELCOME_MESSAGE]);
    setQuery("");

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  return (
    <>
      {/* Floating launcher */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Cinevoo AI"
          className="
            fixed bottom-5 right-5 z-50
            flex items-center gap-2
            rounded-full
            border border-white/10
            bg-neutral-950/95
            px-4 py-3
            text-sm font-medium text-white
            shadow-2xl shadow-black/40
            backdrop-blur-xl
            transition
            hover:scale-[1.02]
            hover:bg-neutral-900
            active:scale-[0.98]
            sm:bottom-6 sm:right-6
          "
        >
          <div className="flex size-8 items-center justify-center rounded-full bg-indigo-500/15 text-indigo-400">
            <Sparkles className="size-4" />
          </div>

          <span className="hidden sm:inline">Ask Cinevoo AI</span>
        </button>
      )}

      {/* Chat panel */}
      {isOpen && (
        <section
          aria-label="Cinevoo AI chatbot"
          className="
            fixed
            inset-x-3 bottom-3
            z-50
            flex
            h-[min(680px,calc(100vh-1.5rem))]
            flex-col
            overflow-hidden
            rounded-2xl
            border border-white/10
            bg-neutral-950/95
            shadow-2xl shadow-black/50
            backdrop-blur-xl
            sm:inset-x-auto
            sm:bottom-6
            sm:right-6
            sm:h-162.5
            sm:w-105
          "
        >
          {/* Header */}
          <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative flex size-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Sparkles className="size-5" />

                <span className="absolute bottom-1 right-1 size-1.5 rounded-full bg-emerald-400 ring-2 ring-neutral-950" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-white">Cinevoo AI</h2>

                <p className="text-xs text-neutral-500">
                  Your movie & series assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClear}
                disabled={isThinking}
                aria-label="Clear conversation"
                title="Clear conversation"
                className="
                  rounded-lg
                  p-2
                  text-neutral-500
                  transition
                  hover:bg-white/5
                  hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                <Trash2 className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close Cinevoo AI"
                title="Close"
                className="
                  rounded-lg
                  p-2
                  text-neutral-500
                  transition
                  hover:bg-white/5
                  hover:text-white
                "
              >
                <X className="size-4" />
              </button>
            </div>
          </header>

          {/* Messages */}
          <div
            className="
              min-h-0
              flex-1
              overflow-y-auto
              overscroll-contain
              px-4
              py-5
            "
          >
            {messages.length === 1 && (
              <div className="mb-6">
                <div className="mb-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-neutral-600">
                    Try asking
                  </p>
                </div>

                <div className="grid gap-2">
                  {SUGGESTED_QUESTIONS.map((question) => (
                    <button
                      key={question}
                      type="button"
                      disabled={isThinking}
                      onClick={() => handleSuggestedQuestion(question)}
                      className="
                          group
                          flex
                          w-full
                          items-center
                          justify-between
                          rounded-xl
                          border border-white/8
                          bg-white/2.5
                          px-3
                          py-3
                          text-left
                          text-sm
                          text-neutral-400
                          transition
                          hover:border-indigo-500/20
                          hover:bg-indigo-500/5
                          hover:text-neutral-200
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                    >
                      <span>{question}</span>

                      <ChevronDown
                        className="
                            size-4
                            -rotate-90
                            shrink-0
                            text-neutral-700
                            transition
                            group-hover:text-indigo-400
                          "
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-5">
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}

              {isThinking && <ThinkingMessage />}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <footer className="shrink-0 border-t border-white/10 p-3">
            <form
              onSubmit={handleSubmit}
              className="
                rounded-2xl
                border border-white/10
                bg-white/2.5
                transition
                focus-within:border-indigo-500/30
                focus-within:ring-2
                focus-within:ring-indigo-500/10
              "
            >
              <textarea
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleInputKeyDown}
                disabled={isThinking}
                rows={1}
                maxLength={500}
                placeholder="Ask Cinevoo anything..."
                aria-label="Ask Cinevoo AI"
                className="
                  max-h-32
                  min-h-11
                  w-full
                  resize-none
                  bg-transparent
                  px-4
                  pb-1
                  pt-3
                  text-sm
                  leading-6
                  text-white
                  outline-none
                  placeholder:text-neutral-600
                  disabled:cursor-not-allowed
                "
              />

              <div className="flex items-center justify-between px-3 pb-3">
                <p className="text-[11px] text-neutral-700">
                  Enter to send · Shift + Enter for a new line
                </p>

                <button
                  type="submit"
                  disabled={!query.trim() || isThinking}
                  aria-label="Send message"
                  className="
                    flex
                    size-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-indigo-500
                    text-white
                    transition
                    hover:bg-indigo-400
                    active:scale-95
                    disabled:cursor-not-allowed
                    disabled:opacity-30
                  "
                >
                  {isThinking ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </button>
              </div>
            </form>
          </footer>
        </section>
      )}
    </>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex items-start gap-2.5 ${isUser ? "justify-end" : ""}`}>
      {!isUser && (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
          <Bot className="size-4" />
        </div>
      )}

      <div
        className={`
          max-w-[86%]
          px-4
          py-3
          text-sm
          leading-6
          ${
            isUser
              ? "rounded-2xl rounded-tr-md bg-indigo-500 text-white"
              : "rounded-2xl rounded-tl-md border border-white/8 bg-white/4 text-neutral-200"
          }
        `}
      >
        <div className="flex items-start gap-2">
          {isUser && <User className="mt-1 size-4 shrink-0" />}

          <p className="whitespace-pre-wrap wrap-break-word">
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
}

function ThinkingMessage() {
  return (
    <div className="flex items-start gap-2.5">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-400">
        <Bot className="size-4" />
      </div>

      <div className="rounded-2xl rounded-tl-md border border-white/8 bg-white/4 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="size-1.5 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.3s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-neutral-500 [animation-delay:-0.15s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-neutral-500" />
          </div>

          <span className="text-xs text-neutral-500">
            Cinevoo AI is thinking...
          </span>
        </div>
      </div>
    </div>
  );
}
