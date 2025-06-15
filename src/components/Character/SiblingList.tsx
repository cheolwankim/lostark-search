import { CharacterSummary } from "@/types/character";

interface Props {
  siblings: CharacterSummary[];
  onSelect: (name: string) => void;
}

export default function SiblingList({ siblings, onSelect }: Props) {
  // 서버별 그룹핑
  const groupedByServer = siblings.reduce<Record<string, CharacterSummary[]>>((acc, char) => {
    if (!acc[char.ServerName]) {
      acc[char.ServerName] = [];
    }
    acc[char.ServerName].push(char);
    return acc;
  }, {});

  // 서버를 캐릭터 수 기준으로 정렬
  const sortedServers = Object.entries(groupedByServer)
    .sort((a, b) => b[1].length - a[1].length) // 캐릭터 수 내림차순
    .map(([server]) => server); // 서버 이름만 추출

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">원정대 캐릭터 목록</h3>

      {sortedServers.map((server) => (
        <div key={server} className="mb-6">
          <h4 className="text-md font-bold mb-2 text-blue-600">
            {server} ({groupedByServer[server].length}캐릭)
          </h4>
           <div className="grid grid-cols-3 gap-3">
            {groupedByServer[server]
              .sort(
                (a, b) =>
                  parseFloat(b.ItemAvgLevel.replace(",", "")) -
                  parseFloat(a.ItemAvgLevel.replace(",", ""))
              )
              .map((char) => (
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
      ))}
    </div>
  );
}
