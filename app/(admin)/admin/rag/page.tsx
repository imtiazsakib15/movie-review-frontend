"use client";

import { useState } from "react";
import { Database, RefreshCw, Sparkles } from "lucide-react";

import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { useIngestAllMedia, useRagStats } from "@/features/rag/rag.hooks";

export default function AdminRagPage() {
  const [showIngestDialog, setShowIngestDialog] = useState(false);

  const { data: stats, isLoading, isError } = useRagStats();

  const ingestMutation = useIngestAllMedia();

  const mediaCount =
    stats?.sourceTypeCounts.find((item) => item.sourceType === "media")
      ?.count ?? 0;

  const reviewCount =
    stats?.sourceTypeCounts.find((item) => item.sourceType === "review")
      ?.count ?? 0;

  const handleConfirmIngest = () => {
    ingestMutation.mutate(undefined, {
      onSuccess: () => {
        setShowIngestDialog(false);
      },
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-400">
            <Sparkles className="h-5 w-5" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-white">AI / RAG</h1>

            <p className="mt-1 text-sm text-zinc-500">
              Manage Cinevoo&apos;s AI knowledge base.
            </p>
          </div>
        </div>
      </div>

      {isError ? (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          Failed to load RAG statistics.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard
            label="Total Documents"
            value={isLoading ? "—" : (stats?.totalDocuments ?? 0)}
          />

          <StatCard
            label="Media Documents"
            value={isLoading ? "—" : mediaCount}
          />

          <StatCard
            label="Review Documents"
            value={isLoading ? "—" : reviewCount}
          />
        </div>
      )}

      <section className="rounded-2xl border border-white/10 bg-white/3 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-zinc-400">
            <Database className="h-5 w-5" />
          </div>

          <div className="flex-1">
            <h2 className="font-medium text-white">Knowledge Base</h2>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-500">
              Re-index published media so Cinevoo AI has the latest movie and
              review information.
            </p>

            <button
              type="button"
              onClick={() => setShowIngestDialog(true)}
              disabled={ingestMutation.isPending}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  ingestMutation.isPending ? "animate-spin" : ""
                }`}
              />
              Re-index All Media
            </button>

            {ingestMutation.isSuccess && (
              <p className="mt-3 text-sm text-emerald-400">
                Successfully indexed {ingestMutation.data.indexedCount} media
                items.
              </p>
            )}
          </div>
        </div>
      </section>

      <ConfirmDialog
        open={showIngestDialog}
        title="Re-index all media?"
        description="This will regenerate embeddings for all published media."
        confirmLabel="Re-index"
        isLoading={ingestMutation.isPending}
        onOpenChange={setShowIngestDialog}
        onConfirm={handleConfirmIngest}
      />
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/3 p-5">
      <p className="text-sm text-zinc-500">{label}</p>

      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}
