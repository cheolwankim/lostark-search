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
        alignItems: "center", // 전체 row 수직 정렬
        height: "40px", // 전체 row 높이 고정 (무기/방어구와 동일하게)
        whiteSpace: "nowrap",
      }}
    >
      {/* 왼쪽 이미지 */}
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

      {/* 기본 정보 표시 */}
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

      {category !== "weapon-armor" && (
        <>
          <span style={{ marginRight: small ? 6 : 8 }}>{tier}</span>
          <span style={{ marginRight: small ? 6 : 8 }}>{enhance}</span>
          <span style={{ marginRight: small ? 6 : 8, color: qualityColor }}>
            {quality}
          </span>
        </>
      )}

      {/* PolishEffect → 오른쪽 공간에 세로 정렬 */}
      {polishEffects.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: small ? 6 : 10,
            gap: "0px",
            flex: 1, // 남는 공간에 PolishEffect 차지
            overflow: "hidden",
          }}
        >
          {polishEffects.slice(0, 3).map((effect, idx) => {
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
                  // fontWeight: "bold",
                  fontSize: "7px", // 이미 작음 OK
                  color: effect.grade === "none" ? "#999999" : "#333",
                  lineHeight: "1.2", // ★ 추가 → 줄 간격 타이트하게 (기본 line-height 는 1.5 ~ 1.6 정도라 넓음)
                  padding: "0px", // ★ padding 제거 → 더 촘촘하게
                }}
              >
                {effect.grade !== "none" && (
                  <span
                    style={{
                      display: "inline-block",
                      minWidth: "1.5em",
                      fontWeight: "bold",
                      fontSize: "7px",
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
