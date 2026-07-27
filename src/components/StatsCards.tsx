"use client";

import { formatCurrency } from "@/lib/utils";
import { TrendingUp, TrendingDown, Target, Flame } from "lucide-react";

interface StatsCardsProps {
  totalStaked: number;
  totalPaid: number;
  successCount: number;
  failCount: number;
  activeCount: number;
}

export default function StatsCards({
  totalStaked,
  totalPaid,
  successCount,
  failCount,
  activeCount,
}: StatsCardsProps) {
  const totalResolved = successCount + failCount;
  const successRate = totalResolved > 0 ? Math.round((successCount / totalResolved) * 100) : 0;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-violet-900/40 to-violet-950/40 border border-violet-500/20 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-violet-300 text-sm mb-2">
          <Target className="w-4 h-4" />
          Active Stakes
        </div>
        <div className="text-2xl font-bold text-white">{activeCount}</div>
        <div className="text-violet-400/70 text-xs mt-1">{formatCurrency(totalStaked)} at risk</div>
      </div>

      <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/40 border border-emerald-500/20 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-emerald-300 text-sm mb-2">
          <TrendingUp className="w-4 h-4" />
          Success Rate
        </div>
        <div className="text-2xl font-bold text-white">{successRate}%</div>
        <div className="text-emerald-400/70 text-xs mt-1">{successCount} completed</div>
      </div>

      <div className="bg-gradient-to-br from-rose-900/40 to-rose-950/40 border border-rose-500/20 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-rose-300 text-sm mb-2">
          <TrendingDown className="w-4 h-4" />
          Total Paid
        </div>
        <div className="text-2xl font-bold text-white">{formatCurrency(totalPaid)}</div>
        <div className="text-rose-400/70 text-xs mt-1">{failCount} penalties</div>
      </div>

      <div className="bg-gradient-to-br from-amber-900/40 to-amber-950/40 border border-amber-500/20 rounded-2xl p-5 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-amber-300 text-sm mb-2">
          <Flame className="w-4 h-4" />
          Loss Aversion
        </div>
        <div className="text-2xl font-bold text-white">Active</div>
        <div className="text-amber-400/70 text-xs mt-1">Tomorrow costs money</div>
      </div>
    </div>
  );
}
