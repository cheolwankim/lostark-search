import React from "react";
import { Equipment } from "@/types/character";
import {
  parseEnhanceLevel,
  parseTierAndQuality,
  parseTranscendenceLevel,
  parseTranscendenceCount,
  parseGradeText,
  parseAdvancedReforgeLevel,
  TooltipData,
} from "@/utils/tooltipParser";
import { getQualityColor } from "@/utils/qualityColor";

interface Props {
  item: Equipment;
  small?: boolean;
  category: "weapon-armor" | "accessory" | "bracelet" | "stone";
}

const EquipmentCard: React.FC<Props> = ({ item, small = false, category }) => {
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
  const advancedReforge = parseAdvancedReforgeLevel(tooltip);

  const transcendenceLevel = parseTranscendenceLevel(tooltip);
  const transcendenceCount = parseTranscendenceCount(tooltip);

  const qualityColor = getQualityColor(quality);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: small ? "4px" : "8px",
        fontSize: small ? "10px" : "14px",
        whiteSpace: "nowrap",
      }}
    >
      <img
        src={item.Icon}
        alt={item.Name}
        style={{
          width: small ? 24 : 40,
          height: small ? 24 : 40,
          marginRight: small ? 6 : 10,
          flexShrink: 0,
        }}
      />
      {category === "weapon-armor" && (
        <>
          <span style={{ marginRight: small ? 6 : 8 }}>{tier}</span>
          <span style={{ marginRight: small ? 6 : 8 }}>{enhance}</span>
          <span style={{ marginRight: small ? 6 : 8, color: qualityColor }}>
            {quality}
          </span>

          {/* 초월 표시 */}
          {transcendenceLevel !== null && transcendenceCount !== null && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: small ? 6 : 8,
              }}
            >
              <img
                src="/myIcon/transcendence.png"
                alt="초월"
                style={{ width: 16, height: 16, marginRight: 4 }}
              />
              <span>
                초월 {transcendenceLevel}단계 ({transcendenceCount})
              </span>
            </div>
          )}

          {advancedReforge && <span>+{advancedReforge}단계</span>}
        </>
      )}

      {/* 다른 카테고리들은 그대로 표시 */}
      {category !== "weapon-armor" && (
        <>
          <span style={{ marginRight: small ? 6 : 8 }}>{tier}</span>
          <span style={{ marginRight: small ? 6 : 8 }}>{enhance}</span>
          <span style={{ marginRight: small ? 6 : 8, color: qualityColor }}>
            {quality}
          </span>
        </>
      )}
    </div>
  );
};

export default EquipmentCard;
