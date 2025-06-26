// 기본 프로필
export interface ArmoryProfile {
  CharacterName: string;
  CharacterClassName: string;
  ServerName: string;
  ItemAvgLevel: string;
  Stats: {
    Type: string;
    Value: string;
  }[];
}

// 장비 아이템
export interface Equipment {
  Type: string;
  Name: string;
  Icon: string;
  Grade: string;
  Tooltip: string;
  AdvancedReforgeLevel?: number;
}

// 원정대 요약 캐릭터
export interface CharacterSummary {
  CharacterName: string;
  CharacterClassName: string;
  ServerName: string;
  ItemAvgLevel: string;
}

// 어빌리티 스톤 포함 각인 효과
export interface EngravingEffect {
  Name: string;
  Description: string; // 예: "Lv.3"
}

export interface ArmoryEngraving {
  Effects: EngravingEffect[];
}

// 보석
export interface Gem {
  Slot: number;
  Name: string;
  Icon: string;
  Tooltip: string;
}

// 카드
export interface Card {
  Name: string;
  Icon: string;
  AwakeCount: number;
  AwakeTotal: number;
  Grade: string;
}

// 팔찌
export interface Bracelet {
  Name: string;
  Grade: string;
  Icon: string;
  MainOptions: {
    name: string;
    value: number | string;
  }[];
  SubOptions: {
    name: string;
    value: number | string;
    tier: "상" | "중" | "하";
    color: string; 
    colorClass: string; 
  }[];
}

// 캐릭터 상세 정보 (전체 통합 응답)
export interface CharacterDetail {
  ArmoryProfile: ArmoryProfile;
  ArmoryEquipment?: Equipment[];
  ArmoryEngraving?: ArmoryEngraving;
  ArmoryGem?: {
    Gems: Gem[];
  };
  ArmoryCard?: {
    Cards: Card[];
  };
}

// 프로필 이미지/기타 정보
export interface CharacterProfileImage {
  CharacterImage: string;
  ExpeditionLevel: number;
  PvpGradeName: string;
  TownLevel: number;
  TownName: string;
}
