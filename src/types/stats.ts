export interface IStats {
  attempt: number;
  success: number;
  destroy: number;
  maxStarLevel: number;
  totalCost: number;
}

export type StarLevelStats = Pick<IStats, "attempt" | "success" | "destroy">;
