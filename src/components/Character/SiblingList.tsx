import { CharacterSummary } from "@/types/character";

interface Props {
  siblings: CharacterSummary[];
  onSelect: (name: string) => void;
}

export default function SiblingList({ siblings, onSelect }: Props) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-2">원정대 캐릭터 목록</h3>
      <div className="flex flex-wrap gap-3">
        {siblings.map((char) => (
          <div
            key={char.CharacterName}
            onClick={() => onSelect(char.CharacterName)}
            className="border p-2 rounded cursor-pointer hover:bg-gray-100"
          >
            <strong>{char.CharacterName}</strong>
            <div>{char.CharacterClassName}</div>
            <div>Lv {char.ItemAvgLevel}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
