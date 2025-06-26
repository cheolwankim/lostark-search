// 악세(목걸이 귀걸이 반지) 상중하 무 옵션 등급

import { validOptions, AccessoryCategory } from "./validOptions";

export const getGradeFromText = (
  optionName: string,
  value: number,
  category: AccessoryCategory
): "상" | "중" | "하" | "none" => {
  const optionTable = { ...validOptions.common, ...validOptions[category] };

  const thresholds = optionTable[optionName];
  if (!thresholds) return "none";

  if (value >= thresholds[0]) return "상";
  if (value >= thresholds[1]) return "중";
  if (value >= thresholds[2]) return "하";

  return "none";
};
