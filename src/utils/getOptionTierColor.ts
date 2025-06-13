// src/utils/getOptionTierColor.ts

export function getOptionTierColor(tier?: "상" | "중" | "하") {
  if (tier === "상") return "text-yellow-500 font-bold";
  if (tier === "중") return "text-purple-400 font-bold";
  if (tier === "하") return "text-blue-400 font-bold";
  return "text-gray-400";
}
