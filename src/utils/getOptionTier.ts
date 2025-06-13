// src/utils/getOptionTier.ts

export const optionThresholds: Record<
  string,
  {
    ancient: { high: number; mid: number };
    relic: { high: number; mid: number };
  }
> = {
  "물리 방어력": {
    ancient: { high: 7000, mid: 6000 },
    relic: { high: 6000, mid: 5000 },
  },
  "마법 방어력": {
    ancient: { high: 7000, mid: 6000 },
    relic: { high: 6000, mid: 5000 },
  },
  "최대 생명력": {
    ancient: { high: 16800, mid: 14000 },
    relic: { high: 14000, mid: 11200 },
  },
  "치명타 적중률": {
    ancient: { high: 5.0, mid: 4.2 },
    relic: { high: 4.2, mid: 3.4 },
  },
  "치명타 피해가": {
    ancient: { high: 10.0, mid: 8.4 },
    relic: { high: 8.4, mid: 6.8 },
  },
  "적에게 주는 피해가": {
    ancient: { high: 3.0, mid: 2.5 },
    relic: { high: 2.5, mid: 2.0 },
  },
  "무기 공격력이": {
    ancient: { high: 9000, mid: 8100 },
    relic: { high: 8100, mid: 7200 },
  },
  // ... 나머지 동일
};

export function getOptionTier(
  name: string,
  rawValue: string,
  grade: string
): "상" | "중" | "하" {
  const key = Object.keys(optionThresholds).find((key) => name.includes(key));

  if (!key) return "하";

  const thresholds =
    optionThresholds[key][grade === "고대" ? "ancient" : "relic"];

  const valueNum = parseFloat(rawValue.replace(/[,%]/g, "").replace(",", ""));

  if (isNaN(valueNum)) return "하";

  if (valueNum >= thresholds.high) return "상";
  if (valueNum >= thresholds.mid) return "중";
  return "하";
}
