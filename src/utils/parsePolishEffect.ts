import { TooltipData, stripHtml } from "@/utils/tooltipParser";
import { getGradeFromText } from "@/utils/getGradeFromText";
import { AccessoryCategory } from "@/utils/validOptions";

/**
 * PolishEffect 파싱 결과 타입
 */
export interface ParsedPolishEffect {
  color: string; // 원래 HTML color 코드
  text: string;  // 표시할 텍스트 (옵션명 + 수치)
  grade: "상" | "중" | "하" | "none"; // 등급 표시
}

/**
 * PolishEffect 파싱 함수
 * @param tooltip TooltipData 전체
 * @param category "목걸이" | "귀걸이" | "반지" 중 하나 (유효 옵션 판단용)
 */
export const parsePolishEffect = (
  tooltip: TooltipData,
  category: AccessoryCategory
): ParsedPolishEffect[] => {
  const value = tooltip["Element_005"]?.value?.Element_001;
  if (!value) return [];

  const rawEffects: string[] = value
    .split(/<BR>|[\r\n]+/)
    .map((line: string) => line.trim())
    .filter(Boolean);

  return rawEffects.map((line: string): ParsedPolishEffect => {
    const colorMatch = line.match(/<font color=['"](#\w{6})['"]>/i);
    const color = colorMatch ? colorMatch[1] : "#999999";

    const textMatch = line.match(/<font color=['"]#\w{6}['"]>(.*?)<\/font>/i);
    const text = textMatch ? textMatch[1].trim() : stripHtml(line);

    const valueMatch = text.match(/([+-]?\d+(\.\d+)?)%?/);
    const valueNumber = valueMatch ? parseFloat(valueMatch[1]) : 0;

    const optionName = text.replace(/([+-]?\d+(\.\d+)?)%?/, "").trim();

    const grade = getGradeFromText(optionName, valueNumber, category);

    return {
      color,
      text,
      grade,
    };
  });
};
