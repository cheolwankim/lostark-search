// src/utils/parseEngravingsFromTooltip.ts

export interface ParsedEngraving {
  name: string;
  level: string;
}

export function parseEngravingsFromTooltip(tooltip: string): ParsedEngraving[] {
  try {
    const parsed = JSON.parse(tooltip);

    const contentMap =
      parsed?.Element_006?.value?.Element_000?.contentStr || {};

    const engravingList: ParsedEngraving[] = Object.values(contentMap)
      .map((item: any) => {
        const raw = item?.contentStr || "";
        const plain = raw
          .replace(/<[^>]+>/g, "") // HTML 태그 제거
          .trim(); // 예: [타격의 대가] Lv.3

        const match = plain.match(/\[(.+?)\]\s*Lv\.?(\d+)/);
        if (match) {
          return { name: match[1], level: `Lv.${match[2]}` };
        }
        return null;
      })
      .filter((x): x is ParsedEngraving => x !== null);

    return engravingList;
  } catch (err) {
    console.warn("parseEngravingsFromTooltip error:", err);
    return [];
  }
}
