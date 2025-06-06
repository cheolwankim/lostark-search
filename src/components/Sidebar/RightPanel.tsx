// components/Sidebar/RightPanel.tsx
import { EquipmentSection } from "@/components/Equipment";
import { SiblingList } from "@/components/Character";
import { CharacterDetail, CharacterSummary } from "@/types/character";

interface Props {
  tab: string;
  detail: CharacterDetail;
  siblings: CharacterSummary[];
  onSelect: (name: string) => void;
}

export default function RightPanel({ tab, detail, siblings, onSelect }: Props) {
  return (
    <div className="flex-1 p-6">
      {tab === "siblings" ? (
        <SiblingList siblings={siblings} onSelect={onSelect} />
      ) : (
        <EquipmentSection detail={detail} />
      )}
    </div>
  );
}
