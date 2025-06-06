// 프로필 정보만 따로 분리
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

//장비 1개 정보
export interface Equipment {
  Type: string;
  Name: string;
  Icon: string;
  Grade: string;
  Tooltip: string;

  // 🔽 새 필드
  AdvancedReforgeLevel?: number;
}

// 원정대 캐릭터 요약 정보
export interface CharacterSummary {
  CharacterName: string;
  CharacterClassName: string;
  ServerName: string;
  ItemAvgLevel: string;
}

// 장비 정보 포함된 캐릭터 상세 응답
export interface CharacterDetail {
  ArmoryProfile: ArmoryProfile;
  ArmoryEquipment?: Equipment[];

  // 추가: 각인, 보석, 카드
  ArmoryEngraving?: {
    Effects: {
      Name: string;
      Description: string;
    }[];
  };

  ArmoryGem?: {
    Gems: {
      Slot: number;
      Name: string;
      Icon: string;
      Tooltip: string;
    }[];
  };

  ArmoryCard?: {
    Cards: {
      Name: string;
      Icon: string;
      AwakeCount: number;
      AwakeTotal: number;
      Grade: string;
    }[];
  };
}
export interface Gem {
  Slot: number;
  Name: string;
  Icon: string;
  Tooltip: string;
}
