import { EquipmentCard } from "@/components/Equipment";
import { CharacterDetail } from "@/types/character";
import { parseGem, parseCategory } from "@/utils/tooltipParser";

interface Props {
  detail: CharacterDetail;
}

export default function EquipmentSection({ detail }: Props) {
  const { ArmoryEquipment, ArmoryGem, ArmoryEngraving, ArmoryCard } = detail;
  const filteredEquipment = ArmoryEquipment?.filter(
    (item) => !item.Name.includes("나침반") && !item.Name.includes("부적")
  )?.map((item) => ({
    ...item,
    category: parseCategory(item.Type, item.Name),
  }));

  const weaponArmorItems = filteredEquipment?.filter(
    (item) => item.category === "weapon-armor"
  );
  const accessoryItems = filteredEquipment?.filter(
    (item) => item.category === "accessory"
  );
  const braceletItems = filteredEquipment?.filter(
    (item) => item.category === "bracelet"
  );
  const stoneItems = filteredEquipment?.filter(
    (item) => item.category === "stone"
  );

  return (
    <div className="space-y-6">
      {/* 장비 섹션 */}
      {filteredEquipment && filteredEquipment.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">장비</h3>

          {/* 상단 2단 구성 */}
          <div className="flex space-x-4 text-xs">
            {/* 무기+방어구 */}
            <div className="flex flex-col items-center space-y-1 w-1/2">
              {weaponArmorItems?.map((item, idx) => (
                <EquipmentCard
                  key={idx}
                  item={item}
                  category="weapon-armor"
                  small
                />
              ))}
            </div>

            {/* 장신구+팔찌 */}
            <div className="flex flex-col items-center space-y-1 w-1/2">
              {accessoryItems?.map((item, idx) => (
                <EquipmentCard
                  key={idx}
                  item={item}
                  category="accessory"
                  small
                />
              ))}
              {braceletItems?.map((item, idx) => (
                <EquipmentCard
                  key={idx}
                  item={item}
                  category="bracelet"
                  small
                />
              ))}
            </div>
          </div>

          {/* 하단 어빌리티 스톤 별도 한 줄 */}
          {stoneItems && stoneItems.length > 0 && (
            <div className="flex flex-col items-center mt-4 text-xs">
              <div className="font-bold mb-1">어빌리티 스톤</div>
              {stoneItems.map((item, idx) => (
                <EquipmentCard
                  key={idx}
                  item={item}
                  category="stone"
                  small
                />
              ))}
            </div>
          )}
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
