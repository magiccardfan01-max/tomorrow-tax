"use client";

import { useState, useEffect, useCallback } from "react";
import { Commitment } from "@/lib/types";
import StatsCards from "@/components/StatsCards";
import CreateCommitment from "@/components/CreateCommitment";
import CommitmentCard from "@/components/CommitmentCard";
import { Flame, Trash2 } from "lucide-react";

const STORAGE_KEY = "tomorrow-tax-commitments";

export default function Home() {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "failed">("all");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCommitments(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(commitments));
    }
  }, [commitments, loaded]);

  const createCommitment = useCallback(
    (data: { title: string; description: string; deadline: string; stake: number }) => {
      const newOne: Commitment = {
        id: crypto.randomUUID(),
        ...data,
        status: "active",
        createdAt: new Date().toISOString(),
      };
      setCommitments((prev) => [newOne, ...prev]);
    },
    []
  );

  const completeCommitment = useCallback((id: string) => {
    setCommitments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "completed" as const, completedAt: new Date().toISOString() }
          : c
      )
    );
  }, []);

  const failCommitment = useCallback((id: string) => {
    setCommitments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: "failed" as const, failedAt: new Date().toISOString() }
          : c
      )
    );
  }, []);

  const clearHistory = () => {
    if (confirm("Clear all completed and failed commitments? Active ones will stay.")) {
      setCommitments((prev) => prev.filter((c) => c.status === "active"));
    }
  };

  const active = commitments.filter((c) => c.status === "active");
  const completed = commitments.filter((c) => c.status === "completed");
  const failed = commitments.filter((c) => c.status === "failed");

  const totalStaked = active.reduce((sum, c) => sum + c.stake, 0);
  const totalPaid = failed.reduce((sum, c) => sum + c.stake, 0);

  const filtered =
    filter === "all"
      ? commitments
      : filter === "active"
      ? active
      : filter === "completed"
      ? completed
      : failed;

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-zinc-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-zinc-800/50 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight">TomorrowTax</h1>
              <p className="text-xs text-zinc-500">Procrastination has a price</p>
            </div>
          </div>
          <a
            href="https://x.com/gethalfbaked"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-zinc-500 hover:text-violet-400 transition-colors"
          >
            Inspired by a Twitter idea
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Hero */}
        <section className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-balance">
            Say "I'll start tomorrow"
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              and it costs you.
            </span>
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto text-sm sm:text-base">
            Set a goal. Put virtual money on the line. Miss it or admit you procrastinated — and you
            "pay" the stake. Loss aversion is the ultimate productivity hack.
          </p>
        </section>

        {/* Stats */}
        <StatsCards
          totalStaked={totalStaked}
          totalPaid={totalPaid}
          successCount={completed.length}
          failCount={failed.length}
          activeCount={active.length}
        />

        {/* Create */}
        <CreateCommitment onCreate={createCommitment} />

        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {(["all", "active", "completed", "failed"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-violet-600/30 text-violet-300 border border-violet-500/40"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f === "active" && active.length > 0 && (
                  <span className="ml-1.5 text-xs opacity-70">({active.length})</span>
                )}
              </button>
            ))}
          </div>
          {(completed.length > 0 || failed.length > 0) && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear history
            </button>
          )}
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-zinc-600">
              <p className="text-lg mb-1">No commitments yet</p>
              <p className="text-sm">Create one above and put some skin in the game.</p>
            </div>
          ) : (
            filtered.map((c) => (
              <CommitmentCard
                key={c.id}
                commitment={c}
                onComplete={completeCommitment}
                onFail={failCommitment}
              />
            ))
          )}
        </div>

        {/* Footer tip */}
        <footer className="text-center text-xs text-zinc-600 pt-8 pb-4 border-t border-zinc-800/50">
          <p>
            All data stays in your browser (localStorage). No accounts, no real money, just pure
            psychological pressure.
          </p>
          <p className="mt-2">
            Built with Next.js · Deployed on Vercel · Idea from{" "}
            <a
              href="https://x.com/GohilHardy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-500 hover:underline"
            >
              @GohilHardy
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
