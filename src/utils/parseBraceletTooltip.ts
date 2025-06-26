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

  const partBox =
    Object.values(tooltip).find(
      (el: any) =>
        el?.type === "ItemPartBox" &&
        el.value?.Element_000?.includes("팔찌 효과")
    )?.value?.Element_001 || "";

  if (!partBox) {
    console.warn("팔찌 효과를 찾지 못했습니다.");
    return {
      Name: item.Name,
      Grade: item.Grade,
      Icon: item.Icon,
      MainOptions: [],
      SubOptions: [],
    };
  }

  const colorMap: Record<string, string> = {
    "#FE9600": "text-orange-500",
    "#00B5FF": "text-blue-400",
    "#CE43FC": "text-purple-400",
    "#91FE02": "text-lime-400",
    "#99FF99": "text-green-300",
    "#999999": "text-gray-400", // fallback
  };

  const rawLines: string[] = partBox.split("<BR>");
  const MainOptions: { name: string; value: number | string }[] = [];
  const SubOptions: {
    name: string;
    value: number | string;
    tier: "상" | "중" | "하";
    color: string;
    colorClass: string;
  }[] = [];

  let currentSubOption: (typeof SubOptions)[0] | null = null;

  rawLines.forEach((rawLine) => {
    const colorMatch = rawLine.match(
      /<FONT[^>]*COLOR=['"]?(#?[A-Fa-f0-9]{6})['"]?>/i
    );
    const color = colorMatch ? colorMatch[1].toUpperCase() : "#999999";
    const colorClass = colorMap[color] || "text-gray-400";

    const cleanLine = rawLine
      .replace(/<img[^>]*>/g, "")
      .replace(/<[^>]*>/g, "")
      .trim();

    if (cleanLine.length === 0) return;

    if (isMainOption(cleanLine)) {
      const match = cleanLine.match(
        /^(힘|민첩|지능|체력|치명|특화|제압|신속|인내)\s*\+?([\d,]+)/
      );
      if (match) {
        MainOptions.push({
          name: `${match[1]}`,
          value: match[2],
        });
      }
      currentSubOption = null;
      return;
    }

    const isNewSubOption = rawLine.includes("emoticon_tooltip_bracelet");
    const valueMatch = cleanLine.match(/([+-]?[0-9]+(?:\.[0-9]+)?)\s*%?/);
    const value = valueMatch ? valueMatch[1] : "0";

    if (isNewSubOption) {
      const tier = getOptionTier(cleanLine, value, item.Grade);
      currentSubOption = {
        name: cleanLine,
        value,
        tier,
        color,
        colorClass,
      };
      SubOptions.push(currentSubOption);
    } else if (currentSubOption) {
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
