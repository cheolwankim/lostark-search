// src/utils/calculateStatPercentage.ts
// 스탯 퍼센트 계산기

export const calculateStatPercentage = (
  value: number,
  min: number,
  max: number
): number => {
  if (value <= min) return 0;
  if (value >= max) return 100;
  return ((value - min) / (max - min)) * 100;
};
