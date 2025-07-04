import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  getCharacterDetail,
  getCharacterProfile,
  getCharacterProfileImage,
} from "@/api/lostarkApi";
import { CharacterDetail, CharacterSummary } from "@/types/character";
import CharacterInfo from "@/components/Character/CharacterInfo";
import { RightPanel } from "@/components/Sidebar";

export default function CharacterPage() {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "equipments";

  const [detail, setDetail] = useState<CharacterDetail | null>(null);
  const [siblings, setSiblings] = useState<CharacterSummary[]>([]);
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!name) return;

    const fetchData = async () => {
      try {
        const [detailData, siblingData, profileImageData] = await Promise.all([
          getCharacterDetail(name),
          getCharacterProfile(name),
          getCharacterProfileImage(name),
        ]);

        setDetail(detailData);
        setSiblings(siblingData);
        setProfileImageUrl(profileImageData.CharacterImage);
      } catch (err) {
        console.error(err);
        setError("캐릭터 정보를 불러올 수 없습니다.");
      }
    };

    fetchData();
  }, [name]);

  if (error) return <p>{error}</p>;
  if (!detail) return <p>로딩 중...</p>;

  return (
    <div className="flex min-h-screen max-w-5xl mx-auto px-4 py-6">
      {/* 왼쪽 사이드바 */}
      <div className="w-64 border-r border-gray-300">
        <CharacterInfo
          profile={detail.ArmoryProfile}
          profileImageUrl={profileImageUrl}
          currentTab={tab}
          onTabChange={(newTab) => {
            setSearchParams({ tab: newTab });
          }}
        />
      </div>

      {/* 오른쪽 패널 */}
      <div className="flex-1 p-6 overflow-auto">
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
