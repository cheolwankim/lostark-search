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

  // BR 기준 split
  const rawLines: string[] = partBox.split("<BR>");

  // img 태그 제거 + 텍스트만 추출 + 공백 제거
  const lines: string[] = rawLines
    .map((line: string) =>
      line
        .replace(/<img[^>]*>/g, "") // img 태그 제거
        .replace(/<[^>]*>/g, "") // 나머지 HTML 태그 제거
        .replace(/^\s+|\s+$/g, "") // 양쪽 공백 제거
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

  let currentSubOption: {
    name: string;
    value: number | string;
    tier: "상" | "중" | "하";
  } | null = null;

  rawLines.forEach((rawLine, index) => {
    const cleanLine = rawLine
      .replace(/<img[^>]*>/g, "")
      .replace(/<[^>]*>/g, "")
      .replace(/^\s+|\s+$/g, "");

    if (cleanLine.length === 0) return;

    if (isMainOption(cleanLine)) {
      const match = cleanLine.match(
        /^(힘|민첩|지능|체력|치명|특화|제압|신속|인내)\s*\+?([0-9,.]+)/
      );
      if (match) {
        MainOptions.push({
          name: match[1],
          value: match[2],
        });
      }
      currentSubOption = null; // MainOption 처리 시 currentSubOption 초기화
      return;
    }

    // img 태그가 포함된 원본 줄인지 여부 → 새로운 SubOption 시작 여부 판단
    const isNewSubOption = rawLine.includes("emoticon_tooltip_bracelet");

    const valueMatch = cleanLine.match(/([+-]?[0-9]+(?:\.[0-9]+)?)\s*%?/);
    const value = valueMatch ? valueMatch[1] : "0";

    if (isNewSubOption) {
      // 새로운 SubOption 시작
      currentSubOption = {
        name: cleanLine,
        value,
        tier: getOptionTier(cleanLine, value, item.Grade),
      };
      SubOptions.push(currentSubOption);
    } else if (currentSubOption) {
      // 이어지는 줄 → 기존 SubOption.name 에 이어붙이기
      currentSubOption.name += " " + cleanLine;
    }
  });

  return {
    Name: item.Name,
    Grade: item.Grade,
    Icon: item.Icon,
    MainOptions,
    SubOptions,
  };
}
