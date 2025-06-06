import { ArmoryProfile } from "@/types/character";

interface Props {
  profile: ArmoryProfile;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function CharacterInfo({
  profile,
  currentTab,
  onTabChange,
}: Props) {
  return (
    <div className="w-[300px] flex-shrink-0 p-4 border-r border-gray-300">
      <h2 className="text-xl font-bold mb-2">{profile.CharacterName}</h2>
      <p>서버: {profile.ServerName}</p>
      <p>직업: {profile.CharacterClassName}</p>
      <p>아이템 레벨: {profile.ItemAvgLevel}</p>

      <div className="mt-6 space-y-2">
        <button
          className={`block w-full text-left font-semibold ${
            currentTab === "equipments" ? "underline" : ""
          }`}
          onClick={() => onTabChange("equipments")}
        >
          장비
        </button>
        <button
          className={`block w-full text-left font-semibold ${
            currentTab === "siblings" ? "underline" : ""
          }`}
          onClick={() => onTabChange("siblings")}
        >
          원정대 목록
        </button>
      </div>
    </div>
  );
}
