export const getQualityColor = (quality: number): string => {
  if (quality === 0) return "black";
  if (quality <= 9) return "red";
  if (quality <= 29) return "orange";
  if (quality <= 69) return "green";
  if (quality <= 89) return "blue";
  if (quality <= 99) return "purple";
  return "gold";
};
