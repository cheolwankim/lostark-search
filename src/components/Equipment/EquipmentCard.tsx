// src/components/Equipment/EquipmentCard.tsx

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

import { parsePolishEffect } from "@/utils/parsePolishEffect";
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

  const polishEffects =
    category === "accessory"
      ? parsePolishEffect(
          tooltip,
          grade.includes("목걸이")
            ? "목걸이"
            : grade.includes("귀걸이")
            ? "귀걸이"
            : "반지"
        )
      : [];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: small ? "4px" : "8px",
        fontSize: small ? "10px" : "14px",
        whiteSpace: "nowrap",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* 이미지 + 4T / 3T 표시 */}
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginRight: small ? 6 : 10,
            flexShrink: 0,
            width: small ? 24 : 40,
            height: small ? 24 : 40,
          }}
        >
          <img
            src={item.Icon}
            alt={item.Name}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <span
            style={{
              position: "absolute",
              bottom: 2,
              right: 2,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              color: "white",
              fontSize: small ? "8px" : "10px",
              padding: "1px 2px",
              borderRadius: "2px",
            }}
          >
            {tier.replace("티어", "T")}
          </span>
        </div>

        {/* 무기/방어구 */}
        {category === "weapon-armor" && (
          <>
            <span style={{ marginRight: small ? 6 : 8 }}>{tier}</span>
            <span style={{ marginRight: small ? 6 : 8 }}>{enhance}</span>
            <span style={{ marginRight: small ? 6 : 8, color: qualityColor }}>
              {quality}
            </span>
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
                  {transcendenceLevel}단계 ({transcendenceCount})
                </span>
              </div>
            )}
            {advancedReforge && <span>+{advancedReforge}단계</span>}
          </>
        )}

        {/* 악세 / 팔찌 / 스톤 */}
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

      {/* Polish Effect 렌더링 */}
      {polishEffects.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            marginTop: "2px",
          }}
        >
          {polishEffects.map((effect, idx) => {
            let gradeColor = "#999999";
            if (effect.grade === "상") gradeColor = "#FFD700";
            else if (effect.grade === "중") gradeColor = "#A770FF";
            else if (effect.grade === "하") gradeColor = "#4FC3F7";

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  padding: "2px 6px",
                  fontSize: small ? "9px" : "11px",
                  border: `1px solid ${gradeColor}`,
                  color: effect.grade === "none" ? "#999999" : "#333",
                }}
              >
                {effect.grade !== "none" && (
                  <span
                    style={{
                      display: "inline-block",
                      width: "1.5em",
                      fontWeight: "bold",
                      color: gradeColor,
                      marginRight: "4px",
                    }}
                  >
                    {effect.grade}
                  </span>
                )}
                {effect.text}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default EquipmentCard;
