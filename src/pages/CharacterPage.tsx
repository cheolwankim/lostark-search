import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getCharacterDetail, getCharacterProfile } from "@/api/lostarkApi";
import {
  CharacterDetail,
  CharacterSummary,
  ArmoryProfile,
} from "@/types/character";
import { CharacterInfo } from "@/components/Character";
import { RightPanel, SidebarTabs } from "@/components/Sidebar";

export default function CharacterPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "equipments";

  const [detail, setDetail] = useState<CharacterDetail | null>(null);
  const [siblings, setSiblings] = useState<CharacterSummary[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      try {
        const [detailData, siblingData] = await Promise.all([
          getCharacterDetail(name),
          getCharacterProfile(name),
        ]);
        setDetail(detailData);
        setSiblings(siblingData);
      } catch (err) {
        setError("캐릭터 정보를 불러올 수 없습니다.");
      }
    };

    fetchData();
  }, [name]);

  if (error) return <p>{error}</p>;
  if (!detail) return <p>로딩 중...</p>;

  return (
    <div className="flex min-h-screen max-w-5xl mx-auto px-4 py-6">
      {/* Sidebar 고정 폭 */}
      <div className="w-64 p-6 border-r flex-shrink-0">
        <SidebarTabs
          name={name!}
          currentTab={tab}
          onTabChange={(newTab) => {
            setSearchParams({ tab: newTab });
          }}
        />
      </div>

      {/* RightPanel 고정 폭 */}
      <div className="w-[700px] p-6 overflow-auto flex-shrink-0">
        <RightPanel
          tab={tab}
          detail={detail}
          siblings={siblings}
          onSelect={(charName) =>
            navigate(`/characters/${encodeURIComponent(charName)}`)
          }
        />
      </div>
    </div>
  );
}
