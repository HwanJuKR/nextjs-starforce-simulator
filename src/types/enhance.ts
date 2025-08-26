type Range<
  N extends number,
  Result extends number[] = []
> = Result["length"] extends N
  ? Result[number]
  : Range<N, [...Result, Result["length"]]>;

export type StarLevel = Range<31>;
export type EquipLevel = Exclude<Range<301>, 0>;

export interface IEnhanceResult {
  starLevel: StarLevel;
  result: string;
  isSuccess: boolean;
  isDestroy: boolean;
  randomValue: number;
}

export interface IEnhanceChance {
  success: number;
  fail: number;
  destroy: number;
  isPerfectSuccess: boolean;
  destroyReduction: boolean;
}

export function toStarLevel(value: number): StarLevel {
  return Math.max(0, Math.min(30, value)) as StarLevel;
}

export function toEquipLevel(value: number): EquipLevel {
  return Math.max(1, Math.min(300, value)) as EquipLevel;
}
