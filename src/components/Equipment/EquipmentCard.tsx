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
import { parseStatEffect } from "@/utils/parseStatEffect";
import { getQualityColor } from "@/utils/qualityColor";
import { statRange } from "@/utils/statRange";
import { calculateStatPercentage } from "@/utils/calculateStatPercentage";

interface Props {
  item: Equipment;
  small?: boolean;
  category: "weapon-armor" | "accessory" | "bracelet" | "stone";
}

const ProgressBar = ({
  label,
  value,
  maxValue,
  color,
  customLabel,
}: {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  customLabel?: string;
}) => {
  const percent = Math.min(100, (value / maxValue) * 100);

  return (
    <div style={{ width: 60, marginBottom: 2 }}>
      <div
        style={{
          height: 8,

          background: "#e0e0e0",
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            background: color,
            height: "100%",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "7px",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          {customLabel ?? `${Math.round(percent)}`}
        </span>
      </div>
    </div>
  );
};

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

  const parsedStats = parseStatEffect(tooltip);

  // 부위 판별
  const part = grade.includes("목걸이")
    ? "목걸이"
    : grade.includes("귀걸이")
    ? "귀걸이"
    : "반지";

  // Percent 계산
  const mainStatPercent =
    parsedStats.mainStat !== undefined
      ? calculateStatPercentage(
          parsedStats.mainStat,
          statRange[part].mainStat.min,
          statRange[part].mainStat.max
        )
      : undefined;

  const vitPercent =
    parsedStats.VIT !== undefined
      ? calculateStatPercentage(
          parsedStats.VIT,
          statRange[part].VIT.min,
          statRange[part].VIT.max
        )
      : undefined;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "40px",
        whiteSpace: "nowrap",
      }}
    >
      {/* 이미지 wrapper */}
      <div
        style={{
          position: "relative",
          width: small ? 24 : 40,
          height: small ? 24 : 40,
          marginRight: small ? 6 : 10,
          flexShrink: 0,
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
        {(tier.startsWith("4") || tier.startsWith("3")) && (
          <span
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
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
      </div>

      {/* 기본 정보 표시 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {category === "weapon-armor" && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: small ? 6 : 8 }}>{enhance}</span>
            <ProgressBar
              label="품질"
              value={quality}
              maxValue={100}
              color={qualityColor}
            />
            {transcendenceLevel !== null && transcendenceCount !== null && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: small ? 6 : 8,
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
          </div>
        )}

        {category !== "weapon-armor" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <ProgressBar
              label="품질"
              value={quality}
              maxValue={100}
              color={getQualityColor(quality)}
            />
            {mainStatPercent !== undefined && (
              <ProgressBar
                label="스탯"
                value={mainStatPercent}
                maxValue={100}
                color={getQualityColor(mainStatPercent)}
                customLabel={`힘민지 (${Math.round(mainStatPercent)})`}
              />
            )}
            {vitPercent !== undefined && (
              <ProgressBar
                label="체력"
                value={vitPercent}
                maxValue={100}
                color={getQualityColor(vitPercent)}
                customLabel={`생명력 (${Math.round(vitPercent)})`}
              />
            )}
          </div>
        )}
      </div>

      {/* PolishEffect */}
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
