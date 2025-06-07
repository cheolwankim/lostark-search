import { Gem } from "../types/character";



// HTML 태그 제거 유틸 함수
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]+>/g, "").trim();
};

// Tooltip 데이터 타입
export type TooltipData = Record<string, { type: string; value: any }>;

// +25 같은 강화 수치 추출
export const parseEnhanceLevel = (tooltip: TooltipData): string => {
  const nameTag = tooltip["Element_000"]?.value || "";
  const match = nameTag.match(/\+(\d+)/);
  return match ? `+${match[1]}` : "";
};

// 티어 / 품질 추출
export const parseTierAndQuality = (
  tooltip: TooltipData
): { tier: string; quality: number } => {
  const leftStr2 = tooltip["Element_001"]?.value?.leftStr2 || "";
  const qualityValue = tooltip["Element_001"]?.value?.qualityValue || 0;

  const tierMatch = leftStr2.match(/티어\s*\d/);
  const tier = tierMatch ? tierMatch[0].replace("티어", "").trim() : "";

  return {
    tier: tier ? `${tier}티어` : "",
    quality: qualityValue,
  };
};

// [상급 재련] 40단계 같은 재련 수치 추출
export const parseAdvancedReforgeLevel = (
  tooltip: TooltipData
): number | null => {
  const text = Object.values(tooltip)
    .filter((v) => v.type === "SingleTextBox" || v.type === "MultiTextBox")
    .map((v) => stripHtml(v.value))
    .join(" ");

  const match = text.match(/\[상급\s*재련\]\s*(\d+)단계/);
  return match ? parseInt(match[1], 10) : null;
};

// [초월] n단계 n개 같은 초월 정보 추출
// 초월 단계 파싱
export const parseTranscendenceLevel = (
  tooltip: TooltipData
): number | null => {
  const targetElement =
    tooltip["Element_008"]?.type === "IndentStringGroup"
      ? tooltip["Element_008"]
      : tooltip["Element_009"]?.type === "IndentStringGroup"
      ? tooltip["Element_009"]
      : null;

  if (targetElement?.value?.Element_000?.topStr) {
    const text = stripHtml(targetElement.value.Element_000.topStr);
    const match = text.match(/\[초월\]\s*(\d+)단계/);

    return match ? parseInt(match[1], 10) : null;
  }

  return null;
};

export const parseTranscendenceCount = (
  tooltip: TooltipData
): number | null => {
  const targetElement =
    tooltip["Element_008"]?.type === "IndentStringGroup"
      ? tooltip["Element_008"]
      : tooltip["Element_009"]?.type === "IndentStringGroup"
      ? tooltip["Element_009"]
      : null;

  if (targetElement?.value?.Element_000?.topStr) {
    const text = stripHtml(targetElement.value.Element_000.topStr);
    const match = text.match(/\d+단계.*?(\d+)\s*$/);

    return match ? parseInt(match[1], 10) : null;
  }

  return null;
};

// 장비 타입/등급 추출 (HTML 제거 포함)
export const parseGradeText = (tooltip: TooltipData): string => {
  const leftStr0 = tooltip["Element_001"]?.value?.leftStr0 || "";
  return stripHtml(leftStr0);
};

// 보석 파싱 결과 타입
export interface ParsedGem {
  level: number;
  name: string;
  icon: string;
}

// 보석 이름에서 HTML 제거 + 레벨 분리
export const parseGem = (gem: Gem): ParsedGem => {
  const cleanName = stripHtml(gem.Name);
  const match = cleanName.match(/(\d+)레벨\s*(.*)/);

  return {
    level: match ? parseInt(match[1], 10) : 0,
    name: match ? match[2].trim() : cleanName,
    icon: gem.Icon,
  };
};

// Equipment 카테고리 타입 정의
export type EquipmentCategory =
  | "weapon-armor"
  | "accessory"
  | "bracelet"
  | "stone";

// 카테고리 파서 (Type 우선 + 일부 Name 처리)
export const parseCategory = (
  itemType: string,
  itemName: string
): EquipmentCategory | null => {
  const armorTypes = ["투구", "상의", "하의", "장갑", "어깨"];

  if (itemType === "무기") return "weapon-armor";
  if (armorTypes.includes(itemType)) return "weapon-armor";
  if (itemType === "장신구") return "accessory";
  if (itemType === "목걸이" || itemType === "귀걸이" || itemType === "반지")
    return "accessory";
  if (itemType === "어빌리티 스톤") return "stone"; // 여기 추가!!
  if (itemName.includes("팔찌")) return "bracelet";
  return null;
};

// 장신구 기본효과 (스탯 + 체력)
export const parseBasicEffect = (tooltip: TooltipData): string[] => {
  const value = tooltip["Element_004"]?.value?.Element_001;
  if (!value) return [];
  return stripHtml(value)
    .split(/<BR>|[\r\n]+/)
    .map((line) => line.trim())
    .filter(Boolean);
};

// 장신구 연마효과
// 연마 효과 파싱 → 색상 + 텍스트 함께 반환
export interface ParsedPolishEffect {
  color: string; // 색상 (ex. '#FF0000')
  text: string; // 효과 내용
}

export const parsePolishEffect = (
  tooltip: TooltipData
): ParsedPolishEffect[] => {
  const value = tooltip["Element_005"]?.value?.Element_001;
  if (!value) return [];

  // Split by <BR> 또는 줄바꿈
  const rawEffects = value
    .split(/<BR>|[\r\n]+/)
    .map((line: string) => line.trim())
    .filter(Boolean);

  return rawEffects.map((line: string) => {
    // HTML 에서 color 추출
    const colorMatch = line.match(/<font color=['"](#\w{6})['"]>/i);
    const color = colorMatch ? colorMatch[1] : "#999999"; // 없으면 회색

    // 텍스트 추출 → <font ...>텍스트</font> 부분만
    const textMatch = line.match(/<font color=['"]#\w{6}['"]>(.*?)<\/font>/i);
    const text = textMatch ? textMatch[1].trim() : stripHtml(line);

    return { color, text };
  });
};

// 아크패시브 포인트 효과 (깨달음)
export const parsePassiveEffect = (tooltip: TooltipData): string[] => {
  const value = tooltip["Element_007"]?.value?.Element_001;
  if (!value) return [];
  return stripHtml(value)
    .split(/<BR>|[\r\n]+/)
    .map((line) => line.trim())
    .filter(Boolean);
};
