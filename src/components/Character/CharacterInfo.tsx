import { ArmoryProfile } from "@/types/character";

interface Props {
  profile: ArmoryProfile;
  profileImageUrl: string;
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function CharacterInfo({
  profile,
  profileImageUrl,
  currentTab,
  onTabChange,
}: Props) {
  return (
    <div className="w-[300px] flex-shrink-0 p-4 text-center">
      <img
        src={profileImageUrl}
        alt={profile.CharacterName}
        className="w-28 h-28 object-cover rounded-full mx-auto mb-4 shadow-md border"
      />

      <h2 className="text-xl font-bold text-gray-800 mb-1">
        {profile.CharacterName}
      </h2>
      <p className="text-sm  font-bold text-gray-800">{profile.CombatPower}</p>
      <p className="text-sm text-gray-500 mb-1">서버: {profile.ServerName}</p>
      <p className="text-sm text-gray-500 mb-1">
        직업: {profile.CharacterClassName}
      </p>
      <p className="text-sm text-gray-500">레벨: {profile.ItemAvgLevel}</p>

      <div className="mt-6 space-y-2 text-left">
        <button
          className={`block text-sm py-1.5 px-3 mx-auto transition ${
            currentTab === "equipments"
              ? "font-bold underline text-blue-700"
              : "text-gray-700 hover:text-black"
          }`}
          onClick={() => onTabChange("equipments")}
        >
          장비
        </button>

        <button
          className={`block text-sm py-1.5 px-3 mx-auto transition ${
            currentTab === "siblings"
              ? "font-bold underline text-blue-700"
              : "text-gray-700 hover:text-black"
          }`}
          onClick={() => onTabChange("siblings")}
        >
          원정대 목록
        </button>
      </div>
    </div>
  );
}
