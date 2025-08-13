import {
  BraceletCard,
  EquipmentCard,
  EngravingCard,
  CardItemCard,
} from "@/components/Equipment";
import { CharacterDetail } from "@/types/character";
import {
  parseGem,
  parseCategory,
  parseTierAndQuality,
} from "@/utils/tooltipParser";
import { parseBraceletTooltip } from "@/utils/parseBraceletTooltip";
import { parseEngravingsFromTooltip } from "@/utils/parseEngravingsFromTooltip";
import { gradeColorMap } from "@/utils/getGradeColor";

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

          <div className="flex space-x-4 text-xs">
            {/* 무기 + 방어구 */}
            <div className="flex flex-col items-start space-y-1 w-1/2">
              {weaponArmorItems?.map((item, idx) => (
                <EquipmentCard
                  key={idx}
                  item={item}
                  small
                  category="weapon-armor"
                />
              ))}
              {/* 어빌리티 스톤 섹션 */}
              {stoneItems && stoneItems.length > 0 && (
                <div className="flex flex-col items-start mt-4 text-xs">
                  {stoneItems.map((item, idx) => {
                    const engravings = parseEngravingsFromTooltip(item.Tooltip);
                    return (
                      <div key={idx} className="flex gap-1 rounded p-2  w-full">
                        <EquipmentCard item={item} small category="stone" />
                        <div className="flex gap-2 mt-1">
                          {engravings.map((engrave, i) => (
                            <EngravingCard
                              key={i}
                              name={engrave.name}
                              level={engrave.level}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* 장신구 + 팔찌 */}
            <div className="flex flex-col items-start space-y-1 w-1/2">
              {accessoryItems?.map((item, idx) => (
                <EquipmentCard
                  key={idx}
                  item={item}
                  small
                  category="accessory"
                />
              ))}
              {braceletItems?.map((item, idx) => {
                const parsed = parseBraceletTooltip(item);
                const tooltip = JSON.parse(item.Tooltip);
                const { tier } = parseTierAndQuality(tooltip);
                return (
                  <BraceletCard
                    key={idx}
                    item={parsed}
                    tier={
                      tier.startsWith("4")
                        ? "4"
                        : tier.startsWith("3")
                        ? "3"
                        : ""
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 각인 섹션 */}
      {ArmoryEngraving?.ArkPassiveEffects &&
        ArmoryEngraving?.ArkPassiveEffects?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">각인</h3>
            <div className="space-y-1">
              {ArmoryEngraving.ArkPassiveEffects.map((engrave, idx) => {
                return (
                  <div key={idx}>
                    <span
                      className={`${
                        gradeColorMap[engrave.Grade] || "text-gray-500"
                      } mr-1`}
                    >
                      {engrave.Grade}
                    </span>
                    {engrave.Name}
                    <span className="text-orange-500 mx-1">◆</span>
                    {engrave.Level}
                    {(engrave.AbilityStoneLevel ?? 0) > 0 && (
                      <span className="text-blue-600 ml-1">
                        +{engrave.AbilityStoneLevel}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
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
                    {parsed.level}레벨 {parsed.name}
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

          {/* 총 각성 수 표시 */}
          <div className="text-sm text-gray-600 mb-1">
            총 각성 수:{" "}
            <span className="text-yellow-600 font-semibold">
              {ArmoryCard.Cards.reduce((sum, card) => sum + card.AwakeCount, 0)}
            </span>
          </div>

          <ul className="grid grid-cols-3 gap-3">
            {ArmoryCard.Cards.map((card, idx) => (
              <CardItemCard
                key={idx}
                name={card.Name}
                icon={card.Icon}
                awakeCount={card.AwakeCount}
                awakeTotal={card.AwakeTotal}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
