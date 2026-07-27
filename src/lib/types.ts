export type CommitmentStatus = "active" | "completed" | "failed";

export interface Commitment {
  id: string;
  title: string;
  description: string;
  deadline: string; // ISO date string YYYY-MM-DD
  stake: number;
  status: CommitmentStatus;
  createdAt: string;
  completedAt?: string;
  failedAt?: string;
}

export interface AppStats {
  totalStaked: number;
  totalPaid: number;
  successCount: number;
  failCount: number;
  activeCount: number;
}
