import React from "react";
import { Equipment } from "@/types/character";
import {
  parseEnhanceLevel,
  parseTierAndQuality,
  parseTranscendence,
  parseGradeText,
  parseAdvancedReforgeLevel,
  TooltipData,
} from "@/utils/tooltipParser";
import { getQualityColor } from "@/utils/qualityColor";

interface Props {
  item: Equipment;
}

const EquipmentCard: React.FC<Props> = ({ item }) => {
  if (!item || !item.Tooltip) return null;

  let tooltip: TooltipData;
  try {
    tooltip = JSON.parse(item.Tooltip);
  } catch (err) {
    console.warn("Tooltip 파싱 실패:", err);
    return null;
  }

  const enhance = parseEnhanceLevel(tooltip);
  const { tier, quality } = parseTierAndQuality(tooltip);
  const grade = parseGradeText(tooltip);
  const transcendence = parseTranscendence(tooltip);
  const advancedReforge = parseAdvancedReforgeLevel(tooltip); // ✅ 추가
  const qualityColor = getQualityColor(quality);

  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
      <img
        src={item.Icon}
        alt={item.Name}
        style={{ width: 40, height: 40, marginRight: 10 }}
      />
      <span style={{ marginRight: 8 }}>{grade}</span>
      <span style={{ marginRight: 8 }}>{tier}</span>
      <span style={{ marginRight: 8 }}>{enhance}</span>
      <span style={{ marginRight: 8, color: qualityColor }}>{quality}</span>
      {transcendence && <span style={{ marginRight: 8 }}>{transcendence}</span>}
      {advancedReforge && <span> +{advancedReforge}단계</span>}
    </div>
  );
};

export default EquipmentCard;
