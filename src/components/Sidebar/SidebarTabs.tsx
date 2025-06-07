interface Props {
  name: string;
  currentTab: string;
  onTabChange: (newTab: string) => void;
}

export default function SidebarTabs({ name, currentTab, onTabChange }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => onTabChange("equipments")}
        className={`text-left px-3 py-1 hover:bg-gray-100 rounded ${
          currentTab === "equipments" ? "bg-gray-200 font-semibold" : ""
        }`}
      >
        장비
      </button>
      <button
        onClick={() => onTabChange("siblings")}
        className={`text-left px-3 py-1 hover:bg-gray-100 rounded ${
          currentTab === "siblings" ? "bg-gray-200 font-semibold" : ""
        }`}
      >
        원정대 목록
      </button>
    </div>
  );
}
