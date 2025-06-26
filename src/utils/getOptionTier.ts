// src/utils/getOptionTier.ts
// 팔찌 옵션 상중하 , 없는건 다 '하' 처리

export const optionThresholds: Record<
  string,
  {
    ancient: { high: number; mid: number };
    relic: { high: number; mid: number };
  }
> = {
  "물리 방어력": {
    ancient: { high: 7000, mid: 6000 },
    relic: { high: 6000, mid: 5000 },
  },
  "마법 방어력": {
    ancient: { high: 7000, mid: 6000 },
    relic: { high: 6000, mid: 5000 },
  },
  "최대 생명력": {
    ancient: { high: 16800, mid: 14000 },
    relic: { high: 14000, mid: 11200 },
  },
  "치명타 적중률": {
    ancient: { high: 5.0, mid: 4.2 },
    relic: { high: 4.2, mid: 3.4 },
  },
  "치명타 피해가": {
    ancient: { high: 10.0, mid: 8.4 },
    relic: { high: 8.4, mid: 6.8 },
  },
  "적에게 주는 피해가": {
    ancient: { high: 5.5, mid: 5.0 },
    relic: { high: 5.0, mid: 4.5 },
  },
  "무기 공격력이": {
    ancient: { high: 9000, mid: 8100 },
    relic: { high: 8100, mid: 7200 },
  },
  "공격 및 이동 속도": {
    ancient: { high: 6, mid: 5 },
    relic: { high: 5, mid: 4 },
  },
  "시드 등급 이하 몬스터 피해": {
    ancient: { high: 6, mid: 5 },
    relic: { high: 5, mid: 4 },
  },
  "시드 등급 이하 몬스터 피해 감소": {
    ancient: { high: 10, mid: 8 },
    relic: { high: 8, mid: 6 },
  },
  "전투 중 생명력 회복량": {
    ancient: { high: 160, mid: 130 },
    relic: { high: 130, mid: 100 },
  },
  "전투자원 자연 회복량": {
    ancient: { high: 12, mid: 10 },
    relic: { high: 10, mid: 8 },
  },
  "이동기 및 기상기 재사용 대기 시간 감소": {
    ancient: { high: 12, mid: 10 },
    relic: { high: 10, mid: 8 },
  },
  "경직 및 피격 이상 면역 시간": {
    ancient: { high: 60, mid: 70 }, // 초 기준
    relic: { high: 70, mid: 80 },
  },
  "백어택 스킬 피해": {
    ancient: { high: 3.5, mid: 3.0 },
    relic: { high: 3.0, mid: 2.5 },
  },
  "헤드어택 스킬 피해": {
    ancient: { high: 3.5, mid: 3.0 },
    relic: { high: 3.0, mid: 2.5 },
  },
  "방향성 스킬 피해": {
    ancient: { high: 3.5, mid: 3.0 },
    relic: { high: 3.0, mid: 2.5 },
  },
  "파티원 보호 및 회복 효과": {
    ancient: { high: 3.5, mid: 3.0 },
    relic: { high: 3.0, mid: 2.5 },
  },
  "아군 공격력 강화 효과": {
    ancient: { high: 6.0, mid: 5.0 },
    relic: { high: 5.0, mid: 4.0 },
  },
  "아군 피해량 강화 효과": {
    ancient: { high: 9.0, mid: 7.5 },
    relic: { high: 7.5, mid: 6.0 },
  },
  "추가 피해": {
    ancient: { high: 4.0, mid: 3.5 },
    relic: { high: 3.5, mid: 3.0 },
  },
  "방어력 감소": {
    ancient: { high: 2.5, mid: 2.1 },
    relic: { high: 2.1, mid: 1.8 },
  },
  "치명타 저항 감소": {
    ancient: { high: 2.5, mid: 2.1 },
    relic: { high: 2.1, mid: 1.8 },
  },
  "치명타 피해 저항 감소": {
    ancient: { high: 4.8, mid: 4.2 },
    relic: { high: 4.2, mid: 3.6 },
  },
  "스킬 재사용 대기 시간 증가 + 적에게 주는 피해 증가": {
    ancient: { high: 5.5, mid: 5.0 },
    relic: { high: 5.0, mid: 4.5 },
  },
  "공격 적중 시 무기 공격력 증가": {
    ancient: { high: 2400, mid: 2200 },
    relic: { high: 2200, mid: 2000 },
  },
  "무기 공격력 + 지속 증가 (중첩 효과)": {
    ancient: { high: 150, mid: 140 },
    relic: { high: 140, mid: 130 },
  },
};

export function getOptionTier(
  name: string,
  rawValue: string,
  grade: string
): "상" | "중" | "하" {
  const key = Object.keys(optionThresholds).find((key) => name.includes(key));

  if (!key) return "하";

  const thresholds =
    optionThresholds[key][grade === "고대" ? "ancient" : "relic"];

  const valueNum = parseFloat(rawValue.replace(/[,%]/g, "").replace(",", ""));

  if (isNaN(valueNum)) return "하";

  if (valueNum >= thresholds.high) return "상";
  if (valueNum >= thresholds.mid) return "중";
  return "하";
}
