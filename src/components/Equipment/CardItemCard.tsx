import React from "react";

interface Props {
  name: string;
  icon: string;
  awakeCount: number;
  awakeTotal: number;
}

export default function CardItemCard({
  name,
  icon,
  awakeCount,
  awakeTotal,
}: Props) {
  return (
    <div className="w-[120px] h-[140px] border rounded p-2 bg-white shadow-sm text-center">
      <img src={icon} alt={name} className="w-16 h-22 mx-auto mb-1" />
      <div className="text-xs font-semibold text-gray-800">{name}</div>

      {/* 내부에 포함된 AwakeningDots */}
      <div className="flex justify-center items-center gap-1 mt-1">
        {Array.from({ length: awakeTotal }, (_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < awakeCount ? "bg-yellow-400" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
