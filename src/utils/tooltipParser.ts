import { Gem } from "../types/character";

// HTML 태그 제거 유틸 함수 (보호 포함)
export const stripHtml = (html: any): string => {
  if (typeof html !== "string") return "";
  return html.replace(/<[^>]+>/g, "").trim();
};

// Tooltip 데이터 타입 (API 변경 반영)
export type TooltipData = Record<string, { type: string; value: any } | null>;

// 카테고리 구분
export type EquipmentCategory = "weapon-armor" | "accessory" | "bracelet" | "stone";

export const parseCategory = (itemType: string, itemName: string): EquipmentCategory | null => {
  const armorTypes = ["투구", "상의", "하의", "장갑", "어깨"];
  if (itemType === "무기") return "weapon-armor";
  if (armorTypes.includes(itemType)) return "weapon-armor";
  if (itemType === "장신구" || ["목걸이", "귀걸이", "반지"].includes(itemType)) return "accessory";
  if (itemType === "어빌리티 스톤") return "stone";
  if (itemName.includes("팔찌")) return "bracelet";
  return null;
};

// +25 같은 강화 수치 추출
export const parseEnhanceLevel = (tooltip: TooltipData): string => {
  const nameTag = tooltip["Element_000"]?.value || "";
  const match = nameTag.match(/\+(\d+)/);
  return match ? `+${match[1]}` : "";
};

// 티어 / 품질 추출
export const parseTierAndQuality = (tooltip: TooltipData): { tier: string; quality: number } => {
  const leftStr2 = tooltip["Element_001"]?.value?.leftStr2 || "";
  const qualityValue = tooltip["Element_001"]?.value?.qualityValue || 0;
  const tierMatch = leftStr2.match(/티어\s*(\d)/);
  const tier = tierMatch ? `${tierMatch[1]}티어` : "";
  return { tier, quality: qualityValue };
};

// 상급 재련 수치 추출
export const parseAdvancedReforgeLevel = (tooltip: TooltipData): number | null => {
  const value = tooltip["Element_005"]?.value || "";
  const text = stripHtml(value);
  const match = text.match(/\[상급\s*재련\]\s*(\d+)단계/);
  return match ? parseInt(match[1], 10) : null;
};

// 초월 단계 추출
export const parseTranscendenceLevel = (tooltip: TooltipData): number | null => {
  const elements = Object.values(tooltip).filter(
    (el): el is { type: string; value: any } => el !== null && el.type === "IndentStringGroup"
  );
  for (const element of elements) {
    const topStr = element.value?.Element_000?.topStr ?? "";
    if (topStr.includes("초월")) {
      const text = stripHtml(topStr);
      const match = text.match(/\[초월\]\s*(\d+)단계/);
      if (match) return parseInt(match[1], 10);
    }
  }
  return null;
};

// 초월 카운트 추출
export const parseTranscendenceCount = (tooltip: TooltipData): number | null => {
  const targetElement =
    tooltip["Element_008"]?.type === "IndentStringGroup" ? tooltip["Element_008"] :
    tooltip["Element_009"]?.type === "IndentStringGroup" ? tooltip["Element_009"] :
    tooltip["Element_010"]?.type === "IndentStringGroup" ? tooltip["Element_010"] : null;

  const topStr = targetElement?.value?.Element_000?.topStr || "";
  const text = stripHtml(topStr);
  const match = text.match(/단계.*?(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
};

// 장비 등급 텍스트 추출
export const parseGradeText = (tooltip: TooltipData): string => {
  const leftStr0 = tooltip["Element_001"]?.value?.leftStr0 || "";
  return stripHtml(leftStr0);
};

// 공통 파싱 라인 분리 함수
const parseEffectLines = (raw: any): string[] => {
  return stripHtml(raw)
    .split(/<br>|<BR>|[\r\n]+/i)
    .map((line) => line.trim())
    .filter(Boolean);
};

// 기본 효과 (스탯+체력)
export const parseBasicEffect = (tooltip: TooltipData, category: EquipmentCategory): string[] => {
  let element: any = null;
  if (category === "accessory" || category === "stone") element = tooltip["Element_004"];
  else if (category === "weapon-armor") element = tooltip["Element_006"];
  else if (category === "bracelet") element = tooltip["Element_005"];
  if (!element || !element.value?.Element_001) return [];
  return parseEffectLines(element.value.Element_001);
};

// 추가 효과 (무기만 있음)
export const parseExtraEffect = (tooltip: TooltipData, category: EquipmentCategory): string[] => {
  if (category !== "weapon-armor") return [];
  const value = tooltip["Element_008"]?.value?.Element_001 || "";
  if (!value) return [];
  return parseEffectLines(value);
};

// 보석 파싱 타입
export interface ParsedGem {
  level: number;
  name: string;
  icon: string;
}

// 보석 파서
export const parseGem = (gem: Gem): ParsedGem => {
  const cleanName = stripHtml(gem.Name);
  const match = cleanName.match(/(\d+)레벨\s*(.*)/);
  return {
    level: match ? parseInt(match[1], 10) : 0,
    name: match ? match[2].trim() : cleanName,
    icon: gem.Icon,
  };
};
