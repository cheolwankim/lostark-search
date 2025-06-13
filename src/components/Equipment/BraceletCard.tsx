// src/components/Equipment/BraceletCard.tsx

import React from "react";
import { Bracelet } from "@/types/character";

interface Props {
  item: Bracelet;
}

export default function BraceletCard({ item }: Props) {
  return (
    <div className="flex flex-col space-y-1 text-xs">
      {/* 카드 헤더 */}
      <div className="flex items-center space-x-2">
        <img src={item.Icon} alt={item.Name} className="w-8 h-8" />
        <span className="font-semibold">{item.Name}</span>
        <span className="text-sm text-gray-500">({item.Grade})</span>
      </div>

      {/* MainOptions */}
      {item.MainOptions.length > 0 && (
        <div className="flex flex-col mt-2 space-y-0.5">
          {item.MainOptions.map((opt, idx) => (
            <div key={idx} className="flex items-center">
              <span className="font-bold min-w-[1.5em]">주</span>
              <span className="ml-1">
                {opt.name}
                {opt.value ? ` +${opt.value}` : ""}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* SubOptions */}
      {item.SubOptions.length > 0 && (
        <div className="flex flex-col mt-2 space-y-0.5">
          {item.SubOptions.map((opt, idx) => (
            <div key={idx} className="flex items-center">
              <span className="font-bold min-w-[1.5em]">[{opt.tier}]</span>
              <span className="ml-1">{opt.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
