"use client";

import { Commitment } from "@/lib/types";
import { formatCurrency, formatDate, isOverdue } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock, AlertTriangle } from "lucide-react";

interface CommitmentCardProps {
  commitment: Commitment;
  onComplete: (id: string) => void;
  onFail: (id: string) => void;
}

export default function CommitmentCard({ commitment, onComplete, onFail }: CommitmentCardProps) {
  const overdue = commitment.status === "active" && isOverdue(commitment.deadline);

  return (
    <div
      className={`rounded-2xl border p-5 transition-all ${
        commitment.status === "completed"
          ? "bg-emerald-950/30 border-emerald-500/20"
          : commitment.status === "failed"
          ? "bg-rose-950/30 border-rose-500/20"
          : overdue
          ? "bg-amber-950/30 border-amber-500/30 animate-pulse"
          : "bg-zinc-900/60 border-zinc-700/50"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {commitment.status === "completed" && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {commitment.status === "failed" && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
            {commitment.status === "active" && !overdue && <Clock className="w-5 h-5 text-violet-400 shrink-0" />}
            {overdue && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />}
            <h3 className="font-semibold text-white truncate">{commitment.title}</h3>
          </div>
          {commitment.description && (
            <p className="text-sm text-zinc-400 mb-2 line-clamp-2">{commitment.description}</p>
          )}
          <div className="flex flex-wrap gap-3 text-xs text-zinc-500">
            <span>Due: {formatDate(commitment.deadline)}</span>
            <span className="text-violet-400 font-medium">Stake: {formatCurrency(commitment.stake)}</span>
            {commitment.status === "completed" && commitment.completedAt && (
              <span className="text-emerald-400">Done {formatDate(commitment.completedAt)}</span>
            )}
            {commitment.status === "failed" && commitment.failedAt && (
              <span className="text-rose-400">Paid {formatDate(commitment.failedAt)}</span>
            )}
          </div>
        </div>
      </div>

      {commitment.status === "active" && (
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onComplete(commitment.id)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-xl py-2.5 text-sm font-medium transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            I Did It!
          </button>
          <button
            onClick={() => onFail(commitment.id)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 rounded-xl py-2.5 text-sm font-medium transition-colors"
          >
            <XCircle className="w-4 h-4" />
            Pay Penalty
          </button>
        </div>
      )}
    </div>
  );
}
