export interface ParsedEngraving {
  name: string;
  level: string;
}

export function parseEngravingsFromTooltip(tooltip: string): ParsedEngraving[] {
  try {
    const parsed = JSON.parse(tooltip);

    // Element 전체에서 type === "IndentStringGroup" 만 필터
    const elements = Object.values(parsed).filter(
      (el: any) => el?.type === "IndentStringGroup"
    );

    let engravingList: ParsedEngraving[] = [];

    elements.forEach((element: any) => {
      const contentMap = element?.value?.Element_000?.contentStr || {};
      Object.values(contentMap).forEach((item: any) => {
        const raw = item?.contentStr || "";
        const plain = raw.replace(/<[^>]+>/g, "").trim();
        const match = plain.match(/\[(.+?)\]\s*Lv\.?(\d+)/);
        if (match) {
          engravingList.push({
            name: match[1],
            level: `Lv.${match[2]}`,
          });
        }
      });
    });

    return engravingList;
  } catch (err) {
    console.warn("parseEngravingsFromTooltip error:", err);
    return [];
  }
}
