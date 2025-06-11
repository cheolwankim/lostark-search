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
        alignItems: "center",
        height: "40px",
        whiteSpace: "nowrap",
      }}
    >
      {/* 이미지 wrapper (relative 필수) */}
      <div
        style={{
          position: "relative",
          width: small ? 24 : 40,
          height: small ? 24 : 40,
          marginRight: small ? 6 : 10,
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
        {/* 티어 오버레이 */}
        {(tier.startsWith("4") || tier.startsWith("3")) && (
          <span
            style={{
              position: "absolute",
              bottom: "2px",
              right: "2px",
              backgroundColor: "rgba(0,0,0,0.6)",
              color: "#fff",
              fontSize: small ? "8px" : "10px",
              padding: "0 1px 0 1px",
              borderRadius: "2px",
            }}
          >
            {tier.startsWith("4") ? "4T" : tier.startsWith("3") ? "3T" : ""}
          </span>
        )}
        
        {/* 품질 ProgressBar (이미지 아래) */}
        <div
          style={{
            position: "absolute",
            bottom: "-5px", // 이미지 바로 아래 약간 여백
            left: 0,
            width: "100%",
            height: "3px",
            backgroundColor: "#ddd", // 배경 (연한 회색)
          }}
        >
          <div
            style={{
              width: `${quality}%`,
              height: "100%",
              backgroundColor: qualityColor,
            }}
          />
        </div>
      </div>

      {/* 기본 정보 표시 */}
      {category === "weapon-armor" && (
        <>
          {/* 강화 수치 */}
          <span style={{ marginRight: small ? 6 : 8 }}>{enhance}</span>

          {/* 품질 수치*/}
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
                {/* 초월 단계 */}
                {transcendenceLevel}단계 ({transcendenceCount})
              </span>
            </div>
          )}
          {/* 상급재련 단계 */}
          {advancedReforge && <span>+{advancedReforge}단계</span>}
        </>
      )}

      {/* 장신구 */}
      {category !== "weapon-armor" && (
        <>
          {/* 품질 */}
          <span style={{ marginRight: small ? 6 : 8, color: qualityColor }}>
            {quality}
          </span>
        </>
      )}

      {/* PolishEffect(연마효과) → 오른쪽 공간에 세로 정렬 */}
      {polishEffects.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            marginLeft: small ? 6 : 10,
            gap: "0px",
            flex: 1,
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
                  fontSize: "7px",
                  // fontWeight:"bold",
                  color: effect.grade === "none" ? "#999999" : "#333",
                  lineHeight: "1.2",
                  padding: "0px",
                }}
              >
                {effect.grade !== "none" ? (
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
                ) : (
                  <span
                    style={{
                      display: "inline-block",
                      minWidth: "1.5em",
                      fontWeight: "bold",
                      fontSize: "7px",
                      color: "#999999",
                      marginRight: "4px",
                    }}
                  >
                    무
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
