export type AccessoryPart = "목걸이" | "귀걸이" | "반지";
export const statRange: Record<
  AccessoryPart,
  {
    mainStat: { min: number; max: number };
    VIT: { min: number; max: number };
  }
> = {
  목걸이: {
    mainStat: { min: 15178, max: 17857 },
    VIT: { min: 3754, max: 4103 },
  },
  귀걸이: {
    mainStat: { min: 11806, max: 13889 },
    VIT: { min: 2682, max: 2931 },
  },
  반지: {
    mainStat: { min: 10962, max: 12897 },
    VIT: { min: 2146, max: 2345 },
  },
};
