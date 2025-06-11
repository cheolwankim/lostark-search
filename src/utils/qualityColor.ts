export const getQualityColor = (quality: number): string => {
  if (quality === 0) return "#000000"; // black
  if (quality <= 9) return "#FF6666"; // light red
  if (quality <= 29) return "#FFA500"; // orange
  if (quality <= 69) return "#66CC66"; // light green
  if (quality <= 89) return "#4FC3F7"; // 하 (하늘색 - polishEffect와 동일)
  if (quality <= 99) return "#A770FF"; // 중 (보라색 - polishEffect와 동일)
  return "#FFD700"; // 상 (노랑색 - polishEffect와 동일)
};
