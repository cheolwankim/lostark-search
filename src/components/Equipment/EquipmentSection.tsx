import { EquipmentCard } from "@/components/Equipment";
import { CharacterDetail } from "@/types/character";
import { parseGem } from "@/utils/tooltipParser";

interface Props {
  detail: CharacterDetail;
}

export default function EquipmentSection({ detail }: Props) {
  const { ArmoryEquipment, ArmoryGem, ArmoryEngraving, ArmoryCard } = detail;
  const filteredEquipment = ArmoryEquipment?.filter(
    (item) => !item.Name.includes("나침반") && !item.Name.includes("부적")
  );

  return (
    <div className="space-y-6">
      {/* 장비 섹션 */}
      {filteredEquipment && filteredEquipment.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">장비</h3>
          <div className="flex flex-wrap gap-3">
            {filteredEquipment.map((item, idx) => (
              <EquipmentCard key={idx} item={item} />
            ))}
          </div>
        </div>
      )}

      {/* 각인 섹션 */}
      {ArmoryEngraving?.Effects && ArmoryEngraving.Effects.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">각인</h3>
          <ul className="list-disc list-inside">
            {ArmoryEngraving.Effects.map((engrave, idx) => (
              <li key={idx}>{engrave.Name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 보석 섹션 */}
      {ArmoryGem?.Gems && ArmoryGem.Gems.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">보석</h3>
          <ul className="flex flex-wrap gap-3">
            {ArmoryGem.Gems.map((gem, idx) => {
              const parsed = parseGem(gem);
              return (
                <li
                  key={idx}
                  className="flex items-center gap-2 border px-2 py-1 rounded"
                >
                  <img
                    src={parsed.icon}
                    alt={parsed.name}
                    className="w-6 h-6"
                  />
                  <span>
                    {parsed.level} {parsed.name}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* 카드 섹션 */}
      {ArmoryCard?.Cards && ArmoryCard.Cards.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">카드</h3>
          <ul className="flex flex-wrap gap-3">
            {ArmoryCard.Cards.map((card, idx) => (
              <li key={idx} className="border px-2 py-1 rounded">
                {card.Name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
