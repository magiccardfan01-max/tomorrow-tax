"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface CreateCommitmentProps {
  onCreate: (data: { title: string; description: string; deadline: string; stake: number }) => void;
}

export default function CreateCommitment({ onCreate }: CreateCommitmentProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [stake, setStake] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deadline || stake < 1) return;
    onCreate({ title: title.trim(), description: description.trim(), deadline, stake });
    setTitle("");
    setDescription("");
    setDeadline("");
    setStake(5);
    setOpen(false);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40"
      >
        <Plus className="w-5 h-5" />
        New Commitment
      </button>
    );
  }

  return (
    <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Create Commitment</h3>
        <button onClick={() => setOpen(false)} className="text-zinc-400 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">What will you commit to?</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Finish the landing page design"
            className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Details (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Any notes or specifics..."
            rows={2}
            className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 resize-none"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={minDate}
              className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Stake ($)</label>
            <input
              type="number"
              value={stake}
              onChange={(e) => setStake(Number(e.target.value))}
              min={1}
              max={10000}
              className="w-full bg-zinc-800/80 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50"
              required
            />
          </div>
        </div>
        <p className="text-xs text-zinc-500">
          If you miss the deadline or admit procrastination, you "pay" the stake. Loss aversion works.
        </p>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold py-3 rounded-xl transition-all"
        >
          Lock It In — Stake {stake > 0 ? `$${stake}` : ""}
        </button>
      </form>
    </div>
  );
}
