// src/utils/parseBraceletTooltip.ts

import { Bracelet } from "@/types/character";
import { TooltipData } from "@/utils/tooltipParser";
import { getOptionTier } from "@/utils/getOptionTier";
import { isMainOption } from "@/utils/isMainOption";

export function parseBraceletTooltip(item: any): Bracelet {
  let tooltip: TooltipData;
  try {
    tooltip = JSON.parse(item.Tooltip);
  } catch (err) {
    console.warn("Bracelet Tooltip 파싱 실패:", err);
    return {
      Name: item.Name,
      Grade: item.Grade,
      Icon: item.Icon,
      MainOptions: [],
      SubOptions: [],
    };
  }

  const partBox = tooltip.Element_004?.value?.Element_001 || "";

  const lines: string[] = partBox
    .split("<BR>")
    .map((line: string) =>
      line.replace(/<[^>]*>/g, "").replace(/^\s+|\s+$/g, "")
    )
    .filter((line: string) => line.length > 0);

  const MainOptions: {
    name: string;
    value: number | string;
  }[] = [];

  const SubOptions: {
    name: string;
    value: number | string;
    tier: "상" | "중" | "하";
  }[] = [];

  lines.forEach((line) => {
    if (isMainOption(line)) {
      const match = line.match(/^(힘|민첩|지능|체력|치명|특화|제압|신속|인내)\s*\+?([0-9,.]+)/);
      if (match) {
        MainOptions.push({
          name: match[1],
          value: match[2],
        });
      }
      return;
    }

    // SubOption → line 전체가 하나의 옵션으로 간주
    // 숫자 (퍼센트 포함 가능)만 따로 추출 → 없으면 기본 "0"
    const valueMatch = line.match(/([+-]?[0-9]+(?:\.[0-9]+)?)\s*%?/);
    const value = valueMatch ? valueMatch[1] : "0";

    SubOptions.push({
      name: line,
      value,
      tier: getOptionTier(line, value, item.Grade),
    });
  });

  return {
    Name: item.Name,
    Grade: item.Grade,
    Icon: item.Icon,
    MainOptions,
    SubOptions,
  };
}
