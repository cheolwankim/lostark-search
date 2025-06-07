import { Equipment } from "@/types/character";
import { EquipmentCard } from "@/components/Equipment";
import { parseCategory } from "@/utils/tooltipParser";

interface Props {
  items: Equipment[];
}

export default function EquipmentList({ items }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, idx) => {
        const category = parseCategory(item.Type, item.Name);

        // category가 null 이면 렌더링 안 함 (안전 처리)
        if (!category) return null;

        return (
          <EquipmentCard
            key={idx}
            item={item}
            category={category}
            small
          />
        );
      })}
    </div>
  );
}
