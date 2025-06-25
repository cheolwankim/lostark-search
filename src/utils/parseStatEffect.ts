import { TooltipData } from "./tooltipParser";
import { stripHtml } from "./tooltipParser";

export interface ParsedStatEffect {
  mainStat?: number;
  VIT?: number;
}

// category만 추가됨
export const parseStatEffect = (
  tooltip: TooltipData,
  category: "weapon-armor" | "accessory"
): ParsedStatEffect => {
  // 위치 분기만 간단히
  const element =
    category === "weapon-armor"
      ? tooltip["Element_006"]
      : tooltip["Element_004"];

  if (
    element?.type === "ItemPartBox" &&
    element.value?.Element_000?.includes("기본 효과")
  ) {
    const text = element.value.Element_001 as string;
    const lines = text.split("<BR>");

    let mainStatValue: number | undefined = undefined;
    let vitValue: number | undefined = undefined;

    lines.forEach((line) => {
      const cleanLine = stripHtml(line);
      if (cleanLine.includes("힘")) {
        const match = cleanLine.match(/힘\s*\+?([\d,]+)/);
        if (match) mainStatValue = parseInt(match[1].replace(/,/g, ""), 10);
      } else if (cleanLine.includes("민첩")) {
        const match = cleanLine.match(/민첩\s*\+?([\d,]+)/);
        if (match) mainStatValue = parseInt(match[1].replace(/,/g, ""), 10);
      } else if (cleanLine.includes("지능")) {
        const match = cleanLine.match(/지능\s*\+?([\d,]+)/);
        if (match) mainStatValue = parseInt(match[1].replace(/,/g, ""), 10);
      } else if (cleanLine.includes("체력")) {
        const match = cleanLine.match(/체력\s*\+?([\d,]+)/);
        if (match) vitValue = parseInt(match[1].replace(/,/g, ""), 10);
      }
    });

    return { mainStat: mainStatValue, VIT: vitValue };
  }

  return {};
};
