import { Equipment } from "@/types/character";
import { EquipmentCard } from "@/components/Equipment";

interface Props {
  items: Equipment[];
}

export default function EquipmentList({ items }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item, idx) => (
        <EquipmentCard key={idx} item={item} />
      ))}
    </div>
  );
}
