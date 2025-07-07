
export enum NationalStat {
    Prosperity = "Phồn vinh",
    Livelihood = "Dân sinh",
    Education = "Học thức",
    Security = "An ninh",
    Treasury = "Ngân khố",
    Prestige = "Uy tín"
}

export enum Personality {
    Loyal = "Trung thành", // Loyal
    Ambitious = "Tham vọng", // Ambitious
    Scheming = "Mưu mô", // Scheming
    Upright = "Chính trực", // Upright
}

export enum Faction {
    War = "Phe Chủ chiến",
    Peace = "Phe Chủ hòa",
    Conservative = "Phe Bảo thủ",
}

export enum Ministry {
    Binh = "Bộ Binh", // Military
    Ho = "Bộ Hộ",   // Household / Finance
    Le = "Bộ Lễ",   // Rites
    Hinh = "Bộ Hình"  // Justice
}

export enum ConsortRank {
    HoangHau = "Hoàng hậu",
    PhiTan = "Phi tần",
    QuyNhan = "Quý nhân",
    MyNhan = "Mỹ nhân",
    TaiNhan = "Tài nhân"
}

export enum AidType {
    ProsperityAid = "ProsperityAid",
    LivelihoodAid = "LivelihoodAid",
    EducationAid = "EducationAid",
    SecurityAid = "SecurityAid",
    TreasuryAid = "TreasuryAid",
    PrestigeAid = "PrestigeAid",
}

export enum NeighboringState {
    Yuan = "Nhà Nguyên",
    Champa = "Chiêm Thành",
}

export interface Consort {
    id: string;
    name: string;
    title: ConsortRank;
    origin: string; // e.g., "Daughter of a minister", "Commoner"
    relationship: number; // 0-100, represents favor
    fertility: number; // 0-100, for future child-bearing feature
}

export interface Prince {
    id: string;
    name: string;
    age: number;
    mother: string; // Name of the consort mother
}

export type Stats = {
    [key in NationalStat]: number;
};

export interface Official {
    name: string;
    title: string;
    personality: Personality;
    relationship: number; // 0-100
    faction: Faction;
}

export interface Military {
    strength: number; // 0-100
    morale: number; // 0-100
    yuanCampaigns: number;
    champaCampaigns: number;
}

export interface DiplomaticRelation {
    relationship: number;
    defense: number;
}

export type Diplomacy = {
    [key in NeighboringState]: DiplomaticRelation;
};

export interface PetitionOption {
    text: string;
    effects: Partial<Stats>;
    relationshipEffects?: { [officialKey: string]: number };
    addConsort?: Omit<Consort, 'id'>;
    recruitOfficial?: { key: string, official: Official };
    addPrince?: Omit<Prince, 'id' | 'age'>;
    militaryEffects?: Partial<Military>;
    diplomacyEffects?: { [key in NeighboringState]?: number }; // Change only relationship
}

export interface Petition {
    id: number;
    title: string;
    description: string;
    from: Official;
    options: PetitionOption[];
    unique?: boolean; // If true, this petition can only appear once per game.
    trigger?: (stats: Stats, diplomacy: Diplomacy, princes: Prince[], harem: Consort[]) => boolean; // Optional trigger condition
}

export type BudgetAllocations = {
    [key in Ministry]: number;
};

export type GamePhase = 'BUDGETING' | 'COURT_SESSION' | 'YEAR_END' | 'GAME_OVER';

export type ActiveModal = 'relationships' | 'harem' | 'aids' | 'military' | 'succession' | 'diplomacy' | 'tutorial' | 'donate' | 'apiKey' | null;


export interface SaveState {
    year: number;
    stats: Stats;
    officials: { [key: string]: Official };
    harem: Consort[];
    petitions: Petition[];
    currentPetitionIndex: number;
    decisions: { petitionTitle: string, decisionText: string }[];
    gamePhase: GamePhase;
    taxRevenueOfTheYear: number;
    usedAids: AidType[];
    military: Military;
    princes: Prince[];
    diplomacy: Diplomacy;
    completedPetitionIds: number[];
    nextMongolInvasionYear: number | null;
}
