
import React from 'react';
import type { Stats, Official, Petition, Consort, Military, Diplomacy, Prince, BudgetAllocations } from './types';
import { NationalStat, Personality, Faction, ConsortRank, AidType, NeighboringState, Ministry } from './types';

// Icons - New clean, duotone style
const DuotoneIcon: React.FC<{ children: React.ReactNode } & React.SVGProps<SVGSVGElement>> = ({ children, ...props }) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        {children}
    </svg>
);

export const ProsperityIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="m4.5 12.75 6 6 9-13.5" className="text-green-300 dark:text-green-500 opacity-70" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" className="text-green-500 dark:text-green-400" />
    </DuotoneIcon>
);
export const LivelihoodIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-4.663l.001.223a.75.75 0 0 0 .75.75h.008a.75.75 0 0 0 .75-.75v-.003" className="text-blue-300 dark:text-blue-500 opacity-70"/>
        <path d="M9 12.75a5.23 5.23 0 0 0-3 2.5 5.23 5.23 0 0 0 3 2.5m6-7.5a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z" className="text-blue-500 dark:text-blue-400"/>
    </DuotoneIcon>
);
export const EducationIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-16.54V18.25" className="text-purple-300 dark:text-purple-500 opacity-70" />
        <path d="M12 6.042A8.967 8.967 0 0 1 18 3.75c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18c-2.305 0-4.408.867-6 2.292" className="text-purple-500 dark:text-purple-400" />
    </DuotoneIcon>
);
export const SecurityIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75" className="text-red-300 dark:text-red-500 opacity-70" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.25c-3.196 0-6.1 1.248-8.25 3.286A11.959 11.959 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622a11.959 11.959 0 0 0-1.25-4.464C18.1 3.498 15.196 2.25 12 2.25Z" className="text-red-500 dark:text-red-400" />
    </DuotoneIcon>
);
export const TreasuryIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="m21 7.5-9-5.25L3 7.5" className="text-yellow-500 dark:text-yellow-400" />
        <path d="m21 7.5-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" className="text-yellow-300 dark:text-yellow-500 opacity-70" />
    </DuotoneIcon>
);
export const PrestigeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="M16.5 7.5v1.5m-3-1.5v4.5m-3-4.5v3m-3-3v1.5m-3-1.5v4.5m15-4.5v3.375c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125V7.5m-3 4.5v-1.875c0-.621.504-1.125 1.125-1.125h1.5c.621 0 1.125.504 1.125 1.125V12m-3 0v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125V7.5" className="text-indigo-300 dark:text-indigo-500 opacity-70" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" className="text-indigo-500 dark:text-indigo-400" />
    </DuotoneIcon>
);
export const SwordIcon = (props: React.SVGProps<SVGSVGElement>) => (
     <DuotoneIcon {...props}>
        <path d="M14.25 2.25c-1.32.95-2.583 2.25-3.535 3.535-1.95 2.583-3.036 5.86-3.036 9.465 0 2.25 1.05 4.252 2.5 5.25" className="text-gray-400 dark:text-gray-500 opacity-70" />
        <path d="M21.75 3.75a.75.75 0 0 0-1.06-.002L18.44 5.998a.75.75 0 0 0 .002 1.06l1.25 1.25a.75.75 0 0 0 1.06-.002l2.25-2.25a.75.75 0 0 0-.002-1.06l-1.25-1.25Z M9 15.75l-3.33-3.33a.75.75 0 0 0-1.06 1.06l3.33 3.33-1.06 1.06a.75.75 0 0 0 0 1.06l.5.5a.75.75 0 0 0 1.06 0l1.06-1.06 3.33 3.33a.75.75 0 0 0 1.06-1.06L10.06 16.81l1.06-1.06a.75.75 0 0 0 0-1.06l-.5-.5a.75.75 0 0 0-1.06 0l-1.06 1.06Z" className="text-gray-600 dark:text-gray-300" />
    </DuotoneIcon>
);

// Menu Icons
export const FlourishIcon = (props: React.SVGProps<SVGSVGElement>) => (
     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} {...props}>
        <path d="M5 12h14" />
        <path d="M9 8c-2.5 4-2.5 8 0 12" />
        <path d="M15 8c2.5 4 2.5 8 0 12" />
    </svg>
);
export const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493m0 2.493v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-4.663l.001.223a.75.75 0 0 0 .75.75h.008a.75.75 0 0 0 .75-.75v-.003" className="text-gray-400 dark:text-gray-500 opacity-70"/>
        <path d="M9 12.75a5.23 5.23 0 0 0-3 2.5 5.23 5.23 0 0 0 3 2.5m6-7.5a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Z" className="text-gray-600 dark:text-gray-300"/>
    </DuotoneIcon>
);
export const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-1.27-1.21-15.86 15.86 0 0 1-2.074-2.618 15.86 15.86 0 0 1-2.19-3.26C4.045 12.733 4 10.885 4 9.5c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5c0 1.385-.045 3.233-1.07 4.78-.396.58-.847 1.141-1.353 1.677-.505.536-1.06 1.028-1.658 1.487-.598.46-1.23.87-1.895 1.21-.022.012-.042.023-.062.034a15.247 15.247 0 0 1-1.27 1.21Z" className="text-rose-500 dark:text-rose-400" />
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-1.27-1.21-15.86 15.86 0 0 1-2.074-2.618 15.86 15.86 0 0 1-2.19-3.26C4.045 12.733 4 10.885 4 9.5c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5c0 1.385-.045 3.233-1.07 4.78-.396.58-.847 1.141-1.353 1.677-.505.536-1.06 1.028-1.658 1.487-.598.46-1.23.87-1.895 1.21-.022.012-.042.023-.062.034a15.247 15.247 0 0 1-1.27 1.21Z" className="text-rose-300 dark:text-rose-500 opacity-50" fill="currentColor" />
    </DuotoneIcon>
);
export const ShieldCheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
      <path d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" className="text-red-300 dark:text-red-500 opacity-70"/>
      <path d="M9 1.5H7.5A2.25 2.25 0 0 0 5.25 3.75v16.5A2.25 2.25 0 0 0 7.5 22.5h9A2.25 2.25 0 0 0 18.75 20.25V3.75A2.25 2.25 0 0 0 16.5 1.5h-1.5" className="text-red-500 dark:text-red-400" />
    </DuotoneIcon>
);
export const UserGroupIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962a3.75 3.75 0 0 1 5.962 0L12 15.75l-2.48-2.48a3.75 3.75 0 0 0-5.962 0c-.39.39-.684.82-.924 1.287a9.09 9.09 0 0 0-3.742.479" className="text-yellow-300 dark:text-yellow-500 opacity-70"/>
        <path d="M12 12.75a5.25 5.25 0 0 0-5.25 5.25c0 1.21.36 2.339.98 3.313a5.23 5.23 0 0 0 8.54 0c.62-.974.98-2.103.98-3.313A5.25 5.25 0 0 0 12 12.75ZM12 6a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" className="text-yellow-500 dark:text-yellow-400"/>
    </DuotoneIcon>
);
export const GlobeAltIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="M12.75 3.03v.568c0 .34.148.65.405.864l1.068.89c.442.369.535 1.024.217 1.488l-.55.733a1.875 1.875 0 0 1-2.95.275l-1.353-.902a1.875 1.875 0 0 0-2.22.018l-.113.08a1.875 1.875 0 0 0-1.072 1.64V12m6 0a9 9 0 1 0-12 0" className="text-green-300 dark:text-green-500 opacity-70" />
        <path d="M21.75 12c0-5.228-4.272-9.5-9.5-9.5s-9.5 4.272-9.5 9.5c0 5.228 4.272 9.5 9.5 9.5s9.5-4.272 9.5-9.5Z" className="text-green-500 dark:text-green-400" />
    </DuotoneIcon>
);
export const SparklesIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m9.813 5.484 2.365 2.365m-2.365-2.365 2.365-2.365M9.813 5.484 7.448 3.119m2.365 2.365-2.365 2.365m6.364-2.365 2.365-2.365-2.365-2.365m2.365 2.365-2.365 2.365m-3.119 8.242-2.365-2.365m2.365 2.365-2.365 2.365m-2.365-2.365 2.365-2.365m2.365 2.365 2.365 2.365M16.177 16.177l-2.365-2.365m2.365 2.365 2.365 2.365" className="text-blue-300 dark:text-blue-500 opacity-70"/>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.815 11.231c.39.39 1.023.39 1.414 0l2.365-2.365a1.006 1.006 0 0 0 0-1.414l-2.365-2.365a1.006 1.006 0 0 0-1.414 0L14.45 7.451a1.006 1.006 0 0 0 0 1.414l2.365 2.365Zm-6.364 0c.39.39 1.023.39 1.414 0l2.365-2.365a1.006 1.006 0 0 0 0-1.414L11.864 5.086a1.006 1.006 0 0 0-1.414 0L8.085 7.451a1.006 1.006 0 0 0 0 1.414l2.365 2.365Zm-6.364 0c.39.39 1.023.39 1.414 0l2.365-2.365a1.006 1.006 0 0 0 0-1.414L5.5 5.086a1.006 1.006 0 0 0-1.414 0L1.72 7.451a1.006 1.006 0 0 0 0 1.414l2.365 2.365Z" className="text-blue-500 dark:text-blue-400"/>
    </DuotoneIcon>
);
export const QuestionMarkCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" className="text-sky-300 dark:text-sky-500 opacity-70" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" className="text-sky-500 dark:text-sky-400" />
    </DuotoneIcon>
);
export const GiftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.613m6-4.971c1.327-.11 2.669-.166 4.024-.166C17.155 8.25 18 9.213 18 10.338v2.89m-6-4.971V5.625m0 2.625v1.513M12 18.75V15.56" className="text-amber-300 dark:text-amber-500 opacity-70"/>
        <path d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m12 7.5v-1.5a6 6 0 0 0-6-6m-6 7.5v-1.5a6 6 0 0 1 6-6" className="text-amber-500 dark:text-amber-400"/>
    </DuotoneIcon>
);
export const SunIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" className="text-yellow-500 dark:text-yellow-400" />
    </DuotoneIcon>
);
export const MoonIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" className="text-indigo-500 dark:text-indigo-400" />
    </DuotoneIcon>
);
export const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);
export const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <DuotoneIcon {...props}>
        <path d="M15.75 5.25a3 3 0 0 1 3 3m3 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" className="text-gray-400 dark:text-gray-500 opacity-70" />
        <path d="M15.75 5.25a3 3 0 0 0-3-3M15.75 5.25v3.75m-3.75-3.75h3.75m-3.75 0a3 3 0 0 0-5.69 1.458L6.208 9.75a.75.75 0 0 0 .658 1.042l.39.065a3 3 0 0 1 2.33 2.33l.065.39a.75.75 0 0 0 1.042.658l2.542-.424a3 3 0 0 0 1.458-5.69Z" className="text-gray-600 dark:text-gray-300" />
    </DuotoneIcon>
);


// INITIAL GAME STATE
export const INITIAL_STATS: Stats = {
    [NationalStat.Prosperity]: 50,
    [NationalStat.Livelihood]: 30,
    [NationalStat.Education]: 25,
    [NationalStat.Security]: 35,
    [NationalStat.Treasury]: 70,
    [NationalStat.Prestige]: 40,
};

export const INITIAL_OFFICIALS: { [key: string]: Official } = {
    'TRAN_THU_DO': { name: "Trần Thủ Độ", title: "Thái sư", personality: Personality.Scheming, relationship: 85, faction: Faction.Conservative },
    'TRAN_HUNG_DAO': { name: "Trần Hưng Đạo", title: "Quốc công tiết chế", personality: Personality.Loyal, relationship: 80, faction: Faction.War },
    'MAC_DINH_CHI': { name: "Mạc Đĩnh Chi", title: "Trạng nguyên", personality: Personality.Upright, relationship: 65, faction: Faction.Conservative },
    'PHAM_NGU_LAO': { name: "Phạm Ngũ Lão", title: "Điện suý Thượng tướng quân", personality: Personality.Loyal, relationship: 75, faction: Faction.War },
    'CHU_VAN_AN': { name: "Chu Văn An", title: "Quốc Tử Giám Tư nghiệp", personality: Personality.Upright, relationship: 70, faction: Faction.Conservative },
    'TRAN_KHANH_DU': { name: "Trần Khánh Dư", title: "Phiêu kỵ Đại tướng quân", personality: Personality.Ambitious, relationship: 50, faction: Faction.War },
    'LE_PHU_TRAN': { name: "Lê Phụ Trần", title: "Ngự sử đại phu", personality: Personality.Loyal, relationship: 75, faction: Faction.Conservative }
};

export const INITIAL_HAREM: Consort[] = [
    { id: 'consort_initial_1', name: 'Thiên Cực Công chúa', title: ConsortRank.PhiTan, origin: 'Hoàng thất', relationship: 70, fertility: 50 },
    { id: 'consort_initial_2', name: 'Công chúa Thiên Cảm', title: ConsortRank.PhiTan, origin: 'Hoàng thất', relationship: 80, fertility: 60 }
];

export const INITIAL_MILITARY: Military = {
    strength: 50,
    morale: 50,
    yuanCampaigns: 0,
    champaCampaigns: 0,
};

export const INITIAL_PRINCES: Prince[] = [];

export const INITIAL_DIPLOMACY: Diplomacy = {
    [NeighboringState.Yuan]: { relationship: 30, defense: 80 },
    [NeighboringState.Champa]: { relationship: 40, defense: 60 },
};

export const MONGOL_INVASIONS = [1258, 1285, 1288];

export const MINISTRY_INFO = {
    [Ministry.Binh]: { icon: SecurityIcon, description: "Quản lý quân đội, quốc phòng, an ninh.", color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/50' },
    [Ministry.Ho]: { icon: ProsperityIcon, description: "Quản lý kinh tế, tài chính, dân số.", color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/50' },
    [Ministry.Le]: { icon: EducationIcon, description: "Quản lý giáo dục, thi cử, lễ nghi.", color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-100 dark:bg-purple-900/50' },
    [Ministry.Hinh]: { icon: LivelihoodIcon, description: "Quản lý luật pháp, tư pháp, hình phạt.", color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/50' }
};

export const AID_INFO = {
    [AidType.ProsperityAid]: { name: "Khai khẩn đất hoang", description: "Tăng Phồn vinh (+10)", stat: NationalStat.Prosperity, icon: ProsperityIcon },
    [AidType.LivelihoodAid]: { name: "Chẩn tế bách tính", description: "Tăng Dân sinh (+10)", stat: NationalStat.Livelihood, icon: LivelihoodIcon },
    [AidType.EducationAid]: { name: "Mở kho sách", description: "Tăng Học thức (+10)", stat: NationalStat.Education, icon: EducationIcon },
    [AidType.SecurityAid]: { name: "Duyệt binh", description: "Tăng An ninh (+10)", stat: NationalStat.Security, icon: SecurityIcon },
    [AidType.TreasuryAid]: { name: "Phát mãi công sản", description: "Tăng Ngân khố (+10)", stat: NationalStat.Treasury, icon: TreasuryIcon },
    [AidType.PrestigeAid]: { name: "Tổ chức Lễ tế trời", description: "Tăng Uy tín (+10)", stat: NationalStat.Prestige, icon: PrestigeIcon }
};

export const DONATION_QR_CODE_URL = "https://i.postimg.cc/XqG3ks80/514931043-709128918566321-4959936952977707907-n.jpg";


// PETITIONS
export const INITIAL_PETITIONS: Petition[] = [
    // Existing 40 petitions...
    {
        id: 1,
        title: "Đề xuất mở khoa thi",
        description: "Tâu bệ hạ, đã lâu rồi triều đình chưa mở khoa thi để tuyển chọn nhân tài. Nhân tài là nguyên khí quốc gia, xin bệ hạ cho phép Bộ Lễ mở khoa thi mới để tìm kiếm người tài đức phục vụ đất nước.",
        from: INITIAL_OFFICIALS['MAC_DINH_CHI'],
        unique: true,
        trigger: (stats) => stats[NationalStat.Education] > 40,
        options: [
            { text: "Chuẩn tấu. Quốc gia cần người tài.", effects: { [NationalStat.Education]: 10, [NationalStat.Treasury]: -10, [NationalStat.Prestige]: 5 }, recruitOfficial: { key: 'NEW_SCHOLAR', official: { name: "Lê Quát", title: "Tiến sĩ", personality: Personality.Upright, relationship: 60, faction: Faction.Conservative } } },
            { text: "Tạm hoãn. Ngân khố đang eo hẹp.", effects: { [NationalStat.Education]: -5, [NationalStat.Treasury]: 5 }, relationshipEffects: { 'MAC_DINH_CHI': -5 } },
        ],
    },
    {
        id: 2,
        title: "Tranh chấp đất đai",
        description: "Tâu bệ hạ, có hai gia tộc lớn ở phủ Thiên Trường đang tranh chấp một mảnh đất màu mỡ, gây mất an ninh trật tự. Xin bệ hạ phân xử.",
        from: INITIAL_OFFICIALS['TRAN_THU_DO'],
        options: [
            { text: "Cử quan về điều tra, phân xử công minh.", effects: { [NationalStat.Livelihood]: 5, [NationalStat.Security]: 5, [NationalStat.Treasury]: -5 } },
            { text: "Giao cho gia tộc có công với triều đình.", effects: { [NationalStat.Livelihood]: -5, [NationalStat.Security]: -5, [NationalStat.Prestige]: 5 }, relationshipEffects: { 'TRAN_THU_DO': 5 } },
            { text: "Tịch thu làm của công.", effects: { [NationalStat.Treasury]: 10, [NationalStat.Livelihood]: -10 } },
        ],
    },
    {
        id: 3,
        title: "Tấu trình của gian thần",
        description: "Tâu bệ hạ, thần nghe nói tướng quân Phạm Ngũ Lão gần đây hay tụ tập binh lính, có ý đồ bất chính. Xin bệ hạ đề phòng.",
        from: { name: "Một viên quan ẩn danh", title: "Quan thị", personality: Personality.Scheming, relationship: 50, faction: Faction.Conservative },
        trigger: (stats) => !!INITIAL_OFFICIALS['PHAM_NGU_LAO'],
        options: [
            { text: "Tin lời. Giảm bớt binh quyền của Phạm Ngũ Lão.", effects: { [NationalStat.Security]: -10 }, relationshipEffects: { 'PHAM_NGU_LAO': -20 } },
            { text: "Không tin. Phạm Ngũ Lão là trung thần.", effects: { [NationalStat.Prestige]: 5 }, relationshipEffects: { 'PHAM_NGU_LAO': 10 } },
            { text: "Điều tra kẻ tung tin đồn.", effects: { [NationalStat.Security]: 5, [NationalStat.Treasury]: -3 }, relationshipEffects: { 'TRAN_THU_DO': 5 } },
        ],
    },
    {
        id: 4,
        title: "Yêu cầu quân lương",
        description: "Tâu bệ hạ, quân đội ở biên giới phía Bắc đang thiếu quân lương và quân trang. Xin bệ hạ cấp ngân khố để ổn định lòng quân.",
        from: INITIAL_OFFICIALS['TRAN_HUNG_DAO'],
        options: [
            { text: "Cấp phát đầy đủ.", effects: { [NationalStat.Security]: 10, [NationalStat.Treasury]: -15, [NationalStat.Livelihood]: -5 }, relationshipEffects: { 'TRAN_HUNG_DAO': 10 } },
            { text: "Cấp một nửa, yêu cầu tiết kiệm.", effects: { [NationalStat.Security]: 5, [NationalStat.Treasury]: -8 }, relationshipEffects: { 'TRAN_HUNG_DAO': -5 } },
            { text: "Bác bỏ. Yêu cầu quân đội tự túc.", effects: { [NationalStat.Security]: -10, [NationalStat.Prestige]: -5 }, relationshipEffects: { 'TRAN_HUNG_DAO': -15 } },
        ],
    },
    {
        id: 5,
        title: "Tiến cử mỹ nhân",
        description: "Tâu bệ hạ, thần có một người con gái tên Lê Thị, nhan sắc diễm lệ, đức hạnh vẹn toàn. Xin được tiến cử vào cung hầu hạ bệ hạ.",
        from: { name: "Lê Thượng thư", title: "Thượng thư bộ Lễ", personality: Personality.Ambitious, relationship: 50, faction: Faction.Conservative },
        unique: true,
        options: [
            { text: "Đồng ý. Đưa vào cung.", effects: { [NationalStat.Prestige]: 5 }, addConsort: { name: 'Lê Thị', title: ConsortRank.MyNhan, origin: 'Con gái Thượng thư', relationship: 60, fertility: 70 } },
            { text: "Từ chối. Ta không màng nữ sắc.", effects: { [NationalStat.Prestige]: -5 } },
        ],
    },
    {
        id: 6,
        title: "Xây dựng lại Quốc Tử Giám",
        description: "Quốc Tử Giám đã có nhiều hạng mục xuống cấp, ảnh hưởng đến việc dạy và học của các giám sinh. Xin bệ hạ cấp ngân khố để tu sửa.",
        from: INITIAL_OFFICIALS['MAC_DINH_CHI'],
        options: [
            { text: "Cấp 20 vạn quan để đại tu.", effects: { [NationalStat.Education]: 15, [NationalStat.Treasury]: -20, [NationalStat.Prestige]: 5 }, relationshipEffects: { 'MAC_DINH_CHI': 10 } },
            { text: "Cấp 5 vạn quan để sửa chữa tạm thời.", effects: { [NationalStat.Education]: 5, [NationalStat.Treasury]: -5 }, relationshipEffects: { 'MAC_DINH_CHI': -5 } },
            { text: "Việc học cốt ở người thầy, không cần câu nệ cơ sở vật chất.", effects: { [NationalStat.Education]: -10 }, relationshipEffects: { 'MAC_DINH_CHI': -15 } },
        ]
    },
    {
        id: 7,
        title: "Vấn đề đê điều",
        description: "Hệ thống đê điều dọc sông Hồng đã nhiều năm chưa được gia cố. Nếu có lũ lớn, hậu quả sẽ khôn lường. Bộ Hộ xin kinh phí để tu bổ.",
        from: INITIAL_OFFICIALS['TRAN_THU_DO'],
        options: [
            { text: "An toàn của dân là trên hết. Chi 15 vạn quan.", effects: { [NationalStat.Livelihood]: 10, [NationalStat.Security]: 5, [NationalStat.Treasury]: -15 } },
            { text: "Chỉ gia cố những đoạn đê xung yếu.", effects: { [NationalStat.Livelihood]: 5, [NationalStat.Treasury]: -8 } },
            { text: "Trời chưa mưa, không cần lo.", effects: { [NationalStat.Livelihood]: -10, [NationalStat.Prestige]: -5 } },
        ]
    },
    {
        id: 8,
        title: "Yêu cầu của sứ thần nhà Nguyên",
        description: "Sứ thần nhà Nguyên yêu cầu Đại Việt cống nạp thêm vàng bạc và sản vật quý hiếm, và tỏ thái độ vô cùng ngạo mạn.",
        from: INITIAL_OFFICIALS['TRAN_HUNG_DAO'],
        options: [
            { text: "Tuyệt đối không. Đại Việt là nước có chủ quyền.", effects: { [NationalStat.Prestige]: 10, [NationalStat.Security]: -5 }, diplomacyEffects: { [NeighboringState.Yuan]: -15 }, relationshipEffects: { 'TRAN_HUNG_DAO': 10 } },
            { text: "Chấp nhận một phần yêu cầu để giữ hòa khí.", effects: { [NationalStat.Prestige]: -5, [NationalStat.Treasury]: -10 }, diplomacyEffects: { [NeighboringState.Yuan]: 5 }, relationshipEffects: { 'TRAN_THU_DO': 5 } },
            { text: "Đáp ứng tất cả, tránh chiến tranh bằng mọi giá.", effects: { [NationalStat.Prestige]: -15, [NationalStat.Treasury]: -20 }, diplomacyEffects: { [NeighboringState.Yuan]: 10 }, relationshipEffects: { 'TRAN_HUNG_DAO': -15 } },
        ]
    },
    {
        id: 9,
        title: "Hôn nhân chính trị",
        description: "Vua Chiêm Thành ngỏ ý muốn kết thông gia, gả công chúa của họ cho một hoàng tử của ta để thắt chặt bang giao.",
        from: { name: "Sứ giả", title: "Sứ giả Chiêm Thành", personality: Personality.Upright, relationship: 50, faction: Faction.Peace },
        unique: true,
        trigger: (stats, diplomacy, princes) => princes.length > 0,
        options: [
            { text: "Đồng ý. Đây là cách tốt để giữ hòa bình.", effects: { [NationalStat.Prestige]: 5 }, diplomacyEffects: { [NeighboringState.Champa]: 20 }, addConsort: { name: 'Công chúa Parameśvarī', title: ConsortRank.PhiTan, origin: 'Công chúa Chiêm Thành', relationship: 50, fertility: 60 } },
            { text: "Từ chối. Không thể để huyết thống hoàng gia pha tạp.", effects: { [NationalStat.Prestige]: -5 }, diplomacyEffects: { [NeighboringState.Champa]: -10 }, relationshipEffects: { 'TRAN_THU_DO': 5 } },
        ]
    },
    {
        id: 10,
        title: "Tổ chức Hội nghị Diên Hồng",
        description: "Quân Nguyên Mông đang tập kết ở biên giới, ý đồ xâm lược đã rõ. Xin bệ hạ cho triệu tập các bô lão trong cả nước về kinh thành để hỏi ý nên hòa hay nên đánh.",
        from: INITIAL_OFFICIALS['TRAN_HUNG_DAO'],
        unique: true,
        trigger: (stats, diplomacy) => diplomacy[NeighboringState.Yuan].relationship < 20,
        options: [
            { text: "Triệu tập ngay! Lắng nghe ý chí của toàn dân.", effects: { [NationalStat.Prestige]: 15, [NationalStat.Livelihood]: 10, [NationalStat.Security]: 10, [NationalStat.Treasury]: -5 }, relationshipEffects: { 'TRAN_HUNG_DAO': 15 } },
            { text: "Không cần thiết, việc quốc gia đại sự do triều đình quyết.", effects: { [NationalStat.Prestige]: -10 }, relationshipEffects: { 'TRAN_HUNG_DAO': -10, 'TRAN_THU_DO': 5 } },
        ]
    },
    {
        id: 11,
        title: "Dịch bệnh bùng phát",
        description: "Tâu bệ hạ, dịch bệnh đang hoành hành ở phủ Nghệ An, người dân chết vô số. Xin bệ hạ cứu giúp.",
        from: { name: "Quan phủ Nghệ An", title: "Tri phủ", personality: Personality.Upright, relationship: 50, faction: Faction.Peace },
        options: [
            { text: "Cử thái y, cấp thuốc men và lương thực.", effects: { [NationalStat.Livelihood]: 10, [NationalStat.Treasury]: -15, [NationalStat.Security]: -5 } },
            { text: "Phong tỏa phủ Nghệ An, không cho ai ra vào.", effects: { [NationalStat.Livelihood]: -15, [NationalStat.Security]: 10 } },
            { text: "Đây là ý trời, chỉ có thể cầu nguyện.", effects: { [NationalStat.Livelihood]: -20, [NationalStat.Prestige]: -10 } },
        ]
    },
    {
        id: 12,
        title: "Cáo buộc tham nhũng",
        description: "Ngự sử đài tấu trình Thái sư Trần Thủ Độ lạm dụng quyền lực, vơ vét của cải của dân. Xin bệ hạ minh xét.",
        from: INITIAL_OFFICIALS['MAC_DINH_CHI'],
        trigger: (stats) => !!INITIAL_OFFICIALS['TRAN_THU_DO'],
        options: [
            { text: "Trần Thủ Độ là công thần, không thể có chuyện đó. Bỏ qua.", effects: { [NationalStat.Prestige]: -5 }, relationshipEffects: { 'TRAN_THU_DO': 10, 'MAC_DINH_CHI': -10 } },
            { text: "Bí mật điều tra.", effects: { [NationalStat.Security]: 5, [NationalStat.Treasury]: -3 }, relationshipEffects: { 'MAC_DINH_CHI': 5 } },
            { text: "Cách chức Thái sư để điều tra công khai.", effects: { [NationalStat.Prestige]: 10, [NationalStat.Security]: -10 }, relationshipEffects: { 'TRAN_THU_DO': -30, 'MAC_DINH_CHI': 10 } },
        ]
    },
    {
        id: 13,
        title: "Mở thương cảng Vân Đồn",
        description: "Các thương nhân nước ngoài đề nghị được mở rộng giao thương tại cảng Vân Đồn, hứa hẹn sẽ mang lại nguồn thu lớn cho quốc gia.",
        from: { name: "Thương nhân", title: "Đại diện thương đoàn", personality: Personality.Ambitious, relationship: 50, faction: Faction.Peace },
        options: [
            { text: "Đồng ý và giảm thuế để thu hút họ.", effects: { [NationalStat.Prosperity]: 15, [NationalStat.Treasury]: 5, [NationalStat.Security]: -5 } },
            { text: "Đồng ý, nhưng đánh thuế cao.", effects: { [NationalStat.Prosperity]: 5, [NationalStat.Treasury]: 15 } },
            { text: "Từ chối. Sợ gián điệp ngoại quốc trà trộn.", effects: { [NationalStat.Prosperity]: -5, [NationalStat.Security]: 5 }, relationshipEffects: { 'TRAN_THU_DO': 5 } },
        ]
    },
    {
        id: 14,
        title: "Phạm Ngũ Lão đan sọt",
        description: "Tâu bệ hạ, người ta thấy tướng quân Phạm Ngũ Lão ngồi đan sọt giữa đường, khi quân của Đức Thánh Trần đi qua mà không hề hay biết. Khi bị đâm giáo vào đùi vẫn không nhúc nhích. Thật là một người có chí lớn.",
        from: INITIAL_OFFICIALS['TRAN_HUNG_DAO'],
        unique: true,
        trigger: (stats) => !!INITIAL_OFFICIALS['PHAM_NGU_LAO'],
        options: [
            { text: "Quả là một nhân tài hiếm có. Trọng thưởng!", effects: { [NationalStat.Prestige]: 5, [NationalStat.Treasury]: -5 }, relationshipEffects: { 'PHAM_NGU_LAO': 15, 'TRAN_HUNG_DAO': 5 } },
            { text: "Kẻ tướng mà lơ đễnh, cần phải khiển trách.", effects: { [NationalStat.Prestige]: -5 }, relationshipEffects: { 'PHAM_NGU_LAO': -10 } },
        ]
    },
    {
        id: 15,
        title: "Sinh con",
        description: "Tâu bệ hạ, một phi tần trong cung đã hạ sinh một hoàng tử kháu khỉnh, thiên tư rạng ngời. Xin bệ hạ đặt tên cho hoàng tử.",
        from: { name: "Thái giám", title: "Nội quan", personality: Personality.Loyal, relationship: 50, faction: Faction.Peace },
        trigger: (stats, diplomacy, princes, harem) => harem.length > 0,
        unique: true,
        options: [
            { text: "Đặt tên là Trần Anh.", effects: { [NationalStat.Livelihood]: 5, [NationalStat.Prestige]: 5 }, addPrince: { name: "Trần Anh", mother: INITIAL_HAREM[0].name } },
            { text: "Đặt tên là Trần Uy.", effects: { [NationalStat.Security]: 5, [NationalStat.Prestige]: 5 }, addPrince: { name: "Trần Uy", mother: INITIAL_HAREM[0].name } },
        ]
    },
    {
        id: 16,
        title: "Nông dân nổi dậy",
        description: "Tâu bệ hạ, một nhóm nông dân ở Ái Châu đã nổi dậy chống lại triều đình do sưu cao thuế nặng.",
        from: INITIAL_OFFICIALS['TRAN_THU_DO'],
        trigger: (stats) => stats[NationalStat.Livelihood] < 30,
        options: [
            { text: "Dùng quân đội đàn áp.", effects: { [NationalStat.Livelihood]: -10, [NationalStat.Security]: 5, [NationalStat.Treasury]: -5 } },
            { text: "Cử quan về đối thoại và giảm thuế.", effects: { [NationalStat.Livelihood]: 10, [NationalStat.Treasury]: -10, [NationalStat.Prestige]: 5 } },
            { text: "Bắt giữ kẻ cầm đầu, tha cho những người còn lại.", effects: { [NationalStat.Livelihood]: -5, [NationalStat.Security]: 3 } },
        ]
    },
    {
        id: 17,
        title: "Tượng Phật trong chùa bị đổ",
        description: "Tượng Phật trong một ngôi chùa lớn ở kinh thành bỗng nhiên đổ sập. Dân chúng cho rằng đây là điềm gở.",
        from: { name: "Sư trụ trì", title: "Hòa thượng", personality: Personality.Upright, relationship: 50, faction: Faction.Peace },
        options: [
            { text: "Cấp tiền xây lại tượng Phật to đẹp hơn.", effects: { [NationalStat.Livelihood]: 5, [NationalStat.Prestige]: 5, [NationalStat.Treasury]: -10 } },
            { text: "Cho rằng đây là lời cảnh tỉnh, ra lệnh cho quan lại phải thanh liêm.", effects: { [NationalStat.Prestige]: 10, [NationalStat.Security]: 5 } },
            { text: "Bắt bớ những kẻ tung tin đồn nhảm.", effects: { [NationalStat.Livelihood]: -5, [NationalStat.Security]: 3 } },
        ]
    },
    {
        id: 18,
        title: "Thượng hoàng muốn đi tu",
        description: "Thượng hoàng Trần Thái Tông (cha của bệ hạ) tỏ ý muốn lên núi Yên Tử tu hành, truyền lại toàn bộ quyền hành cho bệ hạ.",
        from: INITIAL_OFFICIALS['TRAN_THU_DO'],
        unique: true,
        options: [
            { text: "Kính cẩn đồng thuận, thể hiện lòng hiếu thảo.", effects: { [NationalStat.Prestige]: 15, [NationalStat.Education]: 5 }, relationshipEffects: { 'TRAN_THU_DO': 10 } },
            { text: "Hết lời can ngăn, mong Thượng hoàng ở lại chỉ bảo.", effects: { [NationalStat.Prestige]: 10 }, relationshipEffects: { 'TRAN_THU_DO': 5 } },
        ]
    },
    {
        id: 19,
        title: "Đề xuất cải cách chữ viết",
        description: "Mạc Đĩnh Chi cho rằng chữ Hán quá phức tạp, đề xuất tạo ra một loại chữ viết riêng cho người Việt (Chữ Nôm) để dễ học và phổ biến.",
        from: INITIAL_OFFICIALS['MAC_DINH_CHI'],
        unique: true,
        options: [
            { text: "Ý tưởng tuyệt vời! Bắt đầu nghiên cứu ngay.", effects: { [NationalStat.Education]: 20, [NationalStat.Prestige]: 10, [NationalStat.Treasury]: -10 }, relationshipEffects: { 'MAC_DINH_CHI': 15 } },
            { text: "Nguy hiểm! Sẽ làm mất đi gốc gác văn hóa.", effects: { [NationalStat.Education]: -10 }, relationshipEffects: { 'MAC_DINH_CHI': -10, 'TRAN_THU_DO': 5 } },
            { text: "Chỉ cho phép sử dụng trong dân gian, không dùng trong giấy tờ triều đình.", effects: { [NationalStat.Education]: 5, [NationalStat.Prestige]: -5 } },
        ]
    },
    {
        id: 20,
        title: "Hải tặc hoành hành",
        description: "Hải tặc từ phía Nam đang quấy nhiễu vùng biển Diễn Châu, cướp bóc tàu thuyền buôn bán.",
        from: { name: "Quan trấn thủ Diễn Châu", title: "Quan trấn thủ", personality: Personality.Loyal, relationship: 50, faction: Faction.War },
        options: [
            { text: "Cử thủy quân đi dẹp loạn.", effects: { [NationalStat.Security]: 10, [NationalStat.Treasury]: -10, [NationalStat.Prosperity]: 5 }, militaryEffects: { morale: 5 } },
            { text: "Tăng cường tuần tra, phòng thủ.", effects: { [NationalStat.Security]: 5, [NationalStat.Treasury]: -5 } },
            { text: "Thương lượng với hải tặc.", effects: { [NationalStat.Security]: -10, [NationalStat.Prestige]: -10, [NationalStat.Prosperity]: -5 } },
        ]
    },
    {
        id: 21,
        title: "Cải cách ruộng đất",
        description: "Thái sư Trần Thủ Độ đề xuất một cuộc cải cách ruộng đất lớn, chia lại đất công cho nông dân để khuyến khích sản xuất.",
        from: INITIAL_OFFICIALS['TRAN_THU_DO'],
        unique: true,
        options: [
            { text: "Thực hiện ngay. Dân có ruộng cày là gốc của sự ổn định.", effects: { [NationalStat.Livelihood]: 20, [NationalStat.Prosperity]: 10, [NationalStat.Treasury]: -5, [NationalStat.Prestige]: -5 }, relationshipEffects: { 'TRAN_THU_DO': 10 } },
            { text: "Sẽ đắc tội với các gia tộc lớn. Từ chối.", effects: { [NationalStat.Livelihood]: -10, [NationalStat.Prestige]: 5 }, relationshipEffects: { 'TRAN_THU_DO': -10 } },
            { text: "Làm thí điểm ở một vài phủ.", effects: { [NationalStat.Livelihood]: 5, [NationalStat.Prosperity]: 2 } },
        ]
    },
    {
        id: 22,
        title: "Hoàng tử tranh giành sự sủng ái",
        description: "Tâu bệ hạ, các hoàng tử trong cung đang ngấm ngầm tranh giành sự chú ý của ngài, gây ra những bất hòa trong hậu cung.",
        from: INITIAL_OFFICIALS['LE_PHU_TRAN'],
        trigger: (stats, diplomacy, princes) => princes.length > 1,
        options: [
            { text: "Gọi tất cả đến răn dạy về tình huynh đệ.", effects: { [NationalStat.Prestige]: 5 }, militaryEffects: { morale: -5 } },
            { text: "Mặc kệ. Sự cạnh tranh sẽ giúp chọn ra người tài nhất.", effects: { [NationalStat.Prestige]: -5, [NationalStat.Security]: -5 }, militaryEffects: { morale: 5 } },
            { text: "Ban thưởng đồng đều cho tất cả để xoa dịu.", effects: { [NationalStat.Treasury]: -10, [NationalStat.Livelihood]: 5 } },
        ]
    },
    {
        id: 23,
        title: "Trần Khánh Dư bán than",
        description: "Tướng quân Trần Khánh Dư bị bãi chức, nay phải đi bán than để kiếm sống. Ngài ấy có tài, nhưng tính tình ngông cuồng. Xin bệ hạ xem xét lại.",
        from: INITIAL_OFFICIALS['TRAN_HUNG_DAO'],
        unique: true,
        trigger: () => !!INITIAL_OFFICIALS['TRAN_KHANH_DU'],
        options: [
            { text: "Người tài không thể để mai một. Phục chức cho ông ta.", effects: { [NationalStat.Security]: 10, [NationalStat.Prestige]: 5 }, relationshipEffects: { 'TRAN_KHANH_DU': 25, 'TRAN_HUNG_DAO': 5 } },
            { text: "Luật pháp là luật pháp. Cứ để ông ta nếm mùi khổ ải.", effects: { [NationalStat.Prestige]: -5 }, relationshipEffects: { 'TRAN_KHANH_DU': -10, 'TRAN_THU_DO': 5 } },
        ]
    },
    {
        id: 24,
        title: "Phát hiện gián điệp",
        description: "Tâu bệ hạ, chúng ta đã bắt được một gián điệp của Nhà Nguyên đang do thám trong kinh thành.",
        from: INITIAL_OFFICIALS['LE_PHU_TRAN'],
        options: [
            { text: "Khai thác thông tin rồi bí mật thủ tiêu.", effects: { [NationalStat.Security]: 10 }, diplomacyEffects: { [NeighboringState.Yuan]: -5 } },
            { text: "Xử trảm công khai để răn đe.", effects: { [NationalStat.Security]: 5, [NationalStat.Prestige]: 5 }, diplomacyEffects: { [NeighboringState.Yuan]: -10 } },
            { text: "Trục xuất để tránh làm lớn chuyện.", effects: { [NationalStat.Security]: -5, [NationalStat.Prestige]: -5 }, diplomacyEffects: { [NeighboringState.Yuan]: 5 } },
        ]
    },
    {
        id: 25,
        title: "Xung đột giữa các phe phái",
        description: "Phe Chủ chiến và phe Chủ hòa đang tranh cãi gay gắt trong triều về chính sách đối với Nhà Nguyên, làm tê liệt việc triều chính.",
        from: INITIAL_OFFICIALS['MAC_DINH_CHI'],
        options: [
            { text: "Ủng hộ phe Chủ chiến, chuẩn bị chiến tranh.", effects: { [NationalStat.Security]: 10, [NationalStat.Prosperity]: -10 }, relationshipEffects: { 'TRAN_HUNG_DAO': 10, 'TRAN_THU_DO': -10 } },
            { text: "Ủng hộ phe Chủ hòa, tìm kiếm hòa bình.", effects: { [NationalStat.Security]: -10, [NationalStat.Prosperity]: 5 }, relationshipEffects: { 'TRAN_HUNG_DAO': -10, 'TRAN_THU_DO': 10 } },
            { text: "Khiển trách cả hai phe, yêu cầu đoàn kết.", effects: { [NationalStat.Prestige]: 5 } },
        ]
    },
    {
        id: 26,
        title: "Binh lính đào ngũ",
        description: "Một số binh lính ở trại phía Bắc đã đào ngũ do huấn luyện quá khắc nghiệt và thiếu thốn.",
        from: INITIAL_OFFICIALS['TRAN_HUNG_DAO'],
        trigger: (stats) => stats[NationalStat.Security] < 40,
        options: [
            { text: "Truy bắt và xử phạt nặng để làm gương.", effects: { [NationalStat.Security]: 5, [NationalStat.Livelihood]: -5 }, militaryEffects: { morale: -10 } },
            { text: "Cải thiện đời sống cho binh lính.", effects: { [NationalStat.Security]: -5, [NationalStat.Treasury]: -10 }, militaryEffects: { morale: 15 } },
            { text: "Bỏ qua, tuyển mộ lính mới thay thế.", effects: { [NationalStat.Security]: -10, [NationalStat.Treasury]: -5 }, militaryEffects: { morale: -5 } },
        ]
    },
    {
        id: 27,
        title: "Thiên tai: Động đất",
        description: "Một trận động đất nhẹ đã xảy ra ở kinh thành, nhà cửa rung chuyển, người dân hoảng loạn.",
        from: { name: "Thái giám", title: "Nội quan", personality: Personality.Loyal, relationship: 50, faction: Faction.Peace },
        options: [
            { text: "Tổ chức lễ tế trời đất để an lòng dân.", effects: { [NationalStat.Livelihood]: 5, [NationalStat.Prestige]: 5, [NationalStat.Treasury]: -5 } },
            { text: "Đây là điềm báo, ta cần phải tu thân dưỡng tính.", effects: { [NationalStat.Prestige]: 10, [NationalStat.Education]: 5 } },
            { text: "Chỉ là hiện tượng tự nhiên, không có gì đáng lo.", effects: { [NationalStat.Livelihood]: -5, [NationalStat.Education]: -5 } },
        ]
    },
    {
        id: 28,
        title: "Chu Văn An dâng 'Thất trảm sớ'",
        description: "Thầy Chu Văn An dâng sớ xin chém 7 tên gian thần, cho rằng chúng đang làm lũng đoạn triều cương.",
        from: INITIAL_OFFICIALS['CHU_VAN_AN'],
        unique: true,
        trigger: () => !!INITIAL_OFFICIALS['CHU_VAN_AN'],
        options: [
            { text: "Chuẩn tấu! Trừng trị gian thần, làm trong sạch triều đình.", effects: { [NationalStat.Security]: 15, [NationalStat.Prestige]: 15 }, relationshipEffects: { 'CHU_VAN_AN': 20, 'TRAN_THU_DO': -15 } },
            { text: "Họ đều là trọng thần, không thể tùy tiện chém. Bác bỏ.", effects: { [NationalStat.Prestige]: -10, [NationalStat.Security]: -10 }, relationshipEffects: { 'CHU_VAN_AN': -20, 'TRAN_THU_DO': 10 } },
            { text: "Tạm cách chức để điều tra.", effects: { [NationalStat.Security]: 5, [NationalStat.Prestige]: 5 }, relationshipEffects: { 'CHU_VAN_AN': -5 } },
        ]
    },
    {
        id: 29,
        title: "Vua và Hổ",
        description: "Tâu bệ hạ, khi đang đi săn, một con hổ lớn đã lao ra tấn công ngài. Tướng Lê Phụ Trần đã một mình chiến đấu với mãnh hổ để bảo vệ ngài.",
        from: INITIAL_OFFICIALS['LE_PHU_TRAN'],
        unique: true,
        trigger: () => !!INITIAL_OFFICIALS['LE_PHU_TRAN'],
        options: [
            { text: "Ban cho Lê Phụ Trần chức 'Đô Thống'.", effects: { [NationalStat.Prestige]: 10, [NationalStat.Security]: 5 }, relationshipEffects: { 'LE_PHU_TRAN': 30 } },
            { text: "Thưởng vàng bạc, châu báu.", effects: { [NationalStat.Treasury]: -10 }, relationshipEffects: { 'LE_PHU_TRAN': 15 } },
            { text: "Đây là bổn phận của một bề tôi. Không cần thưởng.", effects: { [NationalStat.Prestige]: -5 }, relationshipEffects: { 'LE_PHU_TRAN': -10 } },
        ]
    },
    {
        id: 30,
        title: "Lời đồn trong hậu cung",
        description: "Trong hậu cung có lời đồn một phi tần đang dùng bùa ngải để tranh giành sự sủng ái của bệ hạ.",
        from: { name: "Thái giám", title: "Nội quan", personality: Personality.Loyal, relationship: 50, faction: Faction.Peace },
        trigger: (stats, diplomacy, princes, harem) => harem.length > 1,
        options: [
            { text: "Điều tra kỹ lưỡng, xử lý nghiêm nếu có thật.", effects: { [NationalStat.Security]: 5 } },
            { text: "Cấm túc tất cả phi tần để răn đe.", effects: { [NationalStat.Livelihood]: -5 } },
            { text: "Bỏ qua. Đây chỉ là những lời đố kỵ của đàn bà.", effects: { [NationalStat.Security]: -5 } },
        ]
    },
    {
        id: 31,
        title: "Tướng quân xin về quê",
        description: "Tướng quân Phạm Ngũ Lão tấu trình rằng ông đã lớn tuổi, xin được từ quan về quê chăm sóc mẹ già.",
        from: INITIAL_OFFICIALS['PHAM_NGU_LAO'],
        unique: true,
        trigger: () => !!INITIAL_OFFICIALS['PHAM_NGU_LAO'],
        options: [
            { text: "Đồng ý và ban thưởng hậu hĩnh cho lòng hiếu thảo.", effects: { [NationalStat.Prestige]: 5, [NationalStat.Security]: -5, [NationalStat.Treasury]: -10 }, relationshipEffects: { 'PHAM_NGU_LAO': 20 } },
            { text: "Giữ lại. Đất nước vẫn cần ông.", effects: { [NationalStat.Security]: 5 }, relationshipEffects: { 'PHAM_NGU_LAO': 10 } },
        ]
    },
    {
        id: 32,
        title: "Tranh giành quyền lực",
        description: "Thái sư Trần Thủ Độ và Quốc công Trần Hưng Đạo có mâu thuẫn sâu sắc về việc điều hành quân đội, ảnh hưởng đến an ninh quốc gia.",
        from: INITIAL_OFFICIALS['MAC_DINH_CHI'],
        options: [
            { text: "Hòa giải cho cả hai, yêu cầu họ đặt lợi ích quốc gia lên trên hết.", effects: { [NationalStat.Prestige]: 10, [NationalStat.Security]: 5 } },
            { text: "Ủng hộ Trần Hưng Đạo, giao toàn quyền quân sự cho ngài.", effects: { [NationalStat.Security]: 10 }, relationshipEffects: { 'TRAN_HUNG_DAO': 15, 'TRAN_THU_DO': -15 } },
            { text: "Ủng hộ Trần Thủ Độ, duy trì sự kiểm soát của hoàng tộc.", effects: { [NationalStat.Security]: -5, [NationalStat.Prestige]: 5 }, relationshipEffects: { 'TRAN_HUNG_DAO': -15, 'TRAN_THU_DO': 15 } },
        ]
    },
    {
        id: 33,
        title: "Xây dựng lăng mộ",
        description: "Tâu bệ hạ, đã đến lúc nên xem xét việc xây dựng lăng mộ cho ngài để thể hiện uy quyền và cho con cháu đời sau chiêm bái.",
        from: INITIAL_OFFICIALS['TRAN_THU_DO'],
        options: [
            { text: "Cho xây dựng một lăng mộ thật hoành tráng.", effects: { [NationalStat.Prestige]: 15, [NationalStat.Treasury]: -25, [NationalStat.Livelihood]: -10 } },
            { text: "Xây một lăng mộ đơn giản, tiết kiệm.", effects: { [NationalStat.Prestige]: 5, [NationalStat.Treasury]: -10 } },
            { text: "Ta còn sống, chưa cần lo chuyện hậu sự.", effects: { [NationalStat.Prestige]: -5 }, relationshipEffects: { 'TRAN_THU_DO': -5 } },
        ]
    },
    {
        id: 34,
        title: "Nạn đói",
        description: "Tâu bệ hạ, một tỉnh phía nam bị mất mùa nghiêm trọng, nạn đói đang lan rộng.",
        from: { name: "Quan huyện", title: "Tri huyện", personality: Personality.Upright, relationship: 50, faction: Faction.Peace },
        trigger: (stats) => stats[NationalStat.Prosperity] < 30,
        options: [
            { text: "Mở kho thóc chẩn tế, miễn thuế cho dân.", effects: { [NationalStat.Livelihood]: 15, [NationalStat.Treasury]: -15 } },
            { text: "Kêu gọi các nhà giàu quyên góp.", effects: { [NationalStat.Livelihood]: 5, [NationalStat.Prestige]: 5 } },
            { text: "Đây là mệnh trời, triều đình không thể can thiệp.", effects: { [NationalStat.Livelihood]: -20, [NationalStat.Security]: -10 } },
        ]
    },
    {
        id: 35,
        title: "Đề xuất thám hiểm phương Nam",
        description: "Trần Khánh Dư, với bản tính ưa mạo hiểm, đề xuất tổ chức một đội thuyền đi về phương Nam để tìm kiếm những vùng đất và tài nguyên mới.",
        from: INITIAL_OFFICIALS['TRAN_KHANH_DU'],
        trigger: () => !!INITIAL_OFFICIALS['TRAN_KHANH_DU'],
        options: [
            { text: "Một ý tưởng táo bạo. Chuẩn bị thuyền bè!", effects: { [NationalStat.Prosperity]: 10, [NationalStat.Prestige]: 5, [NationalStat.Treasury]: -15 }, relationshipEffects: { 'TRAN_KHANH_DU': 15 } },
            { text: "Quá mạo hiểm và tốn kém. Bác bỏ.", effects: { [NationalStat.Prosperity]: -5 }, relationshipEffects: { 'TRAN_KHANH_DU': -10 } },
        ]
    },
    {
        id: 36,
        title: "Bạch Đằng Giang",
        description: "Trần Hưng Đạo đề xuất cho cắm cọc gỗ trên sông Bạch Đằng để chuẩn bị cho một trận thủy chiến lớn chống quân Nguyên trong tương lai.",
        from: INITIAL_OFFICIALS['TRAN_HUNG_DAO'],
        unique: true,
        options: [
            { text: "Kế hoạch tuyệt vời! Bí mật thực hiện ngay.", effects: { [NationalStat.Security]: 25, [NationalStat.Treasury]: -15, [NationalStat.Livelihood]: -5 }, relationshipEffects: { 'TRAN_HUNG_DAO': 20 }, militaryEffects: { strength: 10, morale: 10 } },
            { text: "Tốn kém và chưa chắc đã hiệu quả.", effects: { [NationalStat.Security]: -10 }, relationshipEffects: { 'TRAN_HUNG_DAO': -10 } },
        ]
    },
    {
        id: 37,
        title: "Tuyển thái giám",
        description: "Tâu bệ hạ, số lượng thái giám và cung nữ trong cung không đủ để phục vụ. Xin cho phép được tuyển thêm.",
        from: { name: "Thái giám", title: "Nội quan", personality: Personality.Loyal, relationship: 50, faction: Faction.Peace },
        options: [
            { text: "Đồng ý.", effects: { [NationalStat.Treasury]: -5 } },
            { text: "Cắt giảm những người không cần thiết.", effects: { [NationalStat.Treasury]: 5, [NationalStat.Prestige]: -5 } },
        ]
    },
    {
        id: 38,
        title: "Sự trỗi dậy của Phật giáo",
        description: "Phật giáo ngày càng thịnh hành, nhiều người bỏ cả sản xuất để vào chùa tu hành, các chùa chiền chiếm quá nhiều ruộng đất.",
        from: INITIAL_OFFICIALS['TRAN_THU_DO'],
        options: [
            { text: "Hạn chế việc xây chùa và độ tăng.", effects: { [NationalStat.Education]: -5, [NationalStat.Prosperity]: 10, [NationalStat.Livelihood]: 5 } },
            { text: "Ủng hộ Phật giáo, đây là quốc giáo.", effects: { [NationalStat.Education]: 10, [NationalStat.Prosperity]: -5, [NationalStat.Livelihood]: -5 } },
        ]
    },
    {
        id: 39,
        title: "Chiêm Thành quấy nhiễu",
        description: "Quân Chiêm Thành liên tục cho quân quấy nhiễu biên giới phía Nam.",
        from: INITIAL_OFFICIALS['TRAN_HUNG_DAO'],
        trigger: (stats, diplomacy) => diplomacy[NeighboringState.Champa].relationship < 40,
        options: [
            { text: "Cử một đạo quân đi dẹp loạn.", effects: { [NationalStat.Security]: 10, [NationalStat.Treasury]: -10, [NationalStat.Prestige]: 5 }, diplomacyEffects: { [NeighboringState.Champa]: -10 }, militaryEffects: { morale: 5 } },
            { text: "Tăng cường phòng thủ, không chủ động tấn công.", effects: { [NationalStat.Security]: 5, [NationalStat.Treasury]: -5 } },
            { text: "Cử sứ giả đi đàm phán.", effects: { [NationalStat.Prestige]: -5 }, diplomacyEffects: { [NeighboringState.Champa]: 10 } },
        ]
    },
    {
        id: 40,
        title: "Đề xuất dời đô",
        description: "Một số đại thần cho rằng kinh thành Thăng Long không còn phù hợp, đề xuất dời đô đến một vùng đất mới có địa thế tốt hơn.",
        from: INITIAL_OFFICIALS['TRAN_THU_DO'],
        unique: true,
        options: [
            { text: "Thăng Long là trái tim của đất nước, không thể dời.", effects: { [NationalStat.Prestige]: 5 }, relationshipEffects: { 'TRAN_HUNG_DAO': 5 } },
            { text: "Một ý tưởng đáng cân nhắc. Cho người đi tìm đất mới.", effects: { [NationalStat.Treasury]: -5, [NationalStat.Prestige]: -5, [NationalStat.Prosperity]: 5 } },
        ]
    },
    // New 20 petitions
    {
        id: 41,
        title: "Trần Khánh Dư tố cáo",
        description: "Tướng quân Trần Khánh Dư tố cáo một tướng khác đang bí mật tích trữ lương thảo và vũ khí, có thể là để mưu lợi riêng hoặc có ý đồ khác.",
        from: INITIAL_OFFICIALS['TRAN_KHANH_DU'],
        trigger: () => !!INITIAL_OFFICIALS['TRAN_KHANH_DU'],
        options: [
            { text: "Tin lời Trần Khánh Dư, điều tra vị tướng kia.", effects: { [NationalStat.Security]: 5, [NationalStat.Treasury]: -2 }, relationshipEffects: { 'TRAN_KHANH_DU': 5 } },
            { text: "Đây có thể là chiêu trò tranh giành quyền lực của ông ta. Bỏ qua.", effects: { [NationalStat.Security]: -5 }, relationshipEffects: { 'TRAN_KHANH_DU': -10 } },
        ]
    },
    {
        id: 42,
        title: "Mở thêm trường học",
        description: "Thầy Chu Văn An tâu rằng việc học chỉ tập trung ở kinh thành là chưa đủ, xin bệ hạ cho mở thêm trường học ở các phủ, huyện để nâng cao dân trí.",
        from: INITIAL_OFFICIALS['CHU_VAN_AN'],
        unique: true,
        trigger: () => !!INITIAL_OFFICIALS['CHU_VAN_AN'],
        options: [
            { text: "Một kế sách vì trăm năm. Chuẩn y.", effects: { [NationalStat.Education]: 15, [NationalStat.Livelihood]: 5, [NationalStat.Treasury]: -15 }, relationshipEffects: { 'CHU_VAN_AN': 15 } },
            { text: "Ngân khố eo hẹp, tạm thời chưa thể thực hiện.", effects: { [NationalStat.Education]: -5 }, relationshipEffects: { 'CHU_VAN_AN': -5 } },
        ]
    },
    {
        id: 43,
        title: "Báo cáo về vũ khí mới của giặc",
        description: "Các do thám báo về, quân Nguyên đã chế tạo một loại máy bắn đá mới, có sức công phá rất lớn. Chúng ta cần có phương án đối phó.",
        from: INITIAL_OFFICIALS['TRAN_HUNG_DAO'],
        options: [
            { text: "Cử người nghiên cứu, chế tạo vũ khí tương tự.", effects: { [NationalStat.Security]: 10, [NationalStat.Treasury]: -15, [NationalStat.Education]: 5 } },
            { text: "Tăng cường gia cố thành trì.", effects: { [NationalStat.Security]: 5, [NationalStat.Treasury]: -10 } },
            { text: "Chỉ là tin đồn nhảm.", effects: { [NationalStat.Security]: -10 } },
        ]
    },
    {
        id: 44,
        title: "Nguồn nước kinh thành ô nhiễm",
        description: "Một số giếng nước trong kinh thành bị ô nhiễm, nhiều người dân mắc bệnh lạ. Thần dân đang rất hoang mang.",
        from: INITIAL_OFFICIALS['LE_PHU_TRAN'],
        options: [
            { text: "Cử người tìm nguồn nước sạch mới, phát thuốc cho dân.", effects: { [NationalStat.Livelihood]: 10, [NationalStat.Treasury]: -10 } },
            { text: "Niêm phong các giếng nước, để người dân tự tìm cách.", effects: { [NationalStat.Livelihood]: -10, [NationalStat.Security]: -5 } },
        ]
    },
    {
        id: 45,
        title: "Thương nhân bị o ép",
        description: "Các thương nhân tấu trình rằng quan thuế vụ ở các cửa khẩu đang cố tình gây khó dễ, đòi hỏi những khoản phí vô lý.",
        from: INITIAL_OFFICIALS['MAC_DINH_CHI'],
        options: [
            { text: "Cử ngự sử đi thanh tra, xử lý nghiêm minh.", effects: { [NationalStat.Prosperity]: 10, [NationalStat.Security]: 5, [NationalStat.Prestige]: 5 }, relationshipEffects: { 'LE_PHU_TRAN': 5 } },
            { text: "Bỏ qua. Một chút nhũng nhiễu là khó tránh.", effects: { [NationalStat.Prosperity]: -10, [NationalStat.Prestige]: -5 } },
        ]
    },
    {
        id: 46,
        title: "Chiêm Thành đòi lại đất cũ",
        description: "Sứ giả Chiêm Thành đến, đưa ra các văn tự cũ và yêu cầu Đại Việt trả lại vùng đất mà họ cho là của tổ tiên họ.",
        from: { name: "Sứ giả", title: "Sứ giả Chiêm Thành", personality: Personality.Scheming, relationship: 50, faction: Faction.Peace },
        options: [
            { text: "Bác bỏ. Đất của Đại Việt là không thể xâm phạm.", effects: { [NationalStat.Prestige]: 10 }, diplomacyEffects: { [NeighboringState.Champa]: -15 } },
            { text: "Xoa dịu bằng vàng bạc thay vì đất đai.", effects: { [NationalStat.Treasury]: -10 }, diplomacyEffects: { [NeighboringState.Champa]: 5 } },
        ]
    },
    {
        id: 47,
        title: "Nạo vét sông Tô Lịch",
        description: "Sông Tô Lịch trong kinh thành bị bồi lắng, gây ngập úng và ô nhiễm. Xin bệ hạ cho phép nạo vét.",
        from: { name: "Quan Đô úy", title: "Đô úy Thăng Long", personality: Personality.Upright, relationship: 60, faction: Faction.Peace },
        options: [
            { text: "Phê duyệt. Cần một kinh thành sạch đẹp.", effects: { [NationalStat.Livelihood]: 5, [NationalStat.Prosperity]: 5, [NationalStat.Treasury]: -8 } },
            { text: "Huy động người dân tự làm.", effects: { [NationalStat.Livelihood]: -5, [NationalStat.Treasury]: 2 } },
        ]
    },
    {
        id: 48,
        title: "Hậu duệ nhà Lý",
        description: "Tâu bệ hạ, người ta tìm thấy một hậu duệ của nhà Lý đang sống ẩn dật trong dân gian, được nhiều người kính trọng.",
        from: INITIAL_OFFICIALS['TRAN_THU_DO'],
        unique: true,
        options: [
            { text: "Phong cho một chức tước nhỏ để an抚 lòng người.", effects: { [NationalStat.Prestige]: 5, [NationalStat.Livelihood]: 5 }, relationshipEffects: { 'TRAN_THU_DO': -5 } },
            { text: "Đưa về kinh thành giám sát chặt chẽ.", effects: { [NationalStat.Security]: 5 }, relationshipEffects: { 'TRAN_THU_DO': 5 } },
            { text: "Mối nguy tiềm tàng. Cần phải loại bỏ.", effects: { [NationalStat.Security]: 10, [NationalStat.Prestige]: -10 }, relationshipEffects: { 'TRAN_THU_DO': 10 } },
        ]
    },
    {
        id: 49,
        title: "Cải tổ Cấm quân",
        description: "Lê Phụ Trần cho rằng Cấm quân bảo vệ hoàng cung đã trở nên lười biếng, cần một cuộc cải tổ và huấn luyện lại từ đầu.",
        from: INITIAL_OFFICIALS['LE_PHU_TRAN'],
        trigger: () => !!INITIAL_OFFICIALS['LE_PHU_TRAN'],
        options: [
            { text: "Giao toàn quyền cho Lê Phụ Trần.", effects: { [NationalStat.Security]: 10, [NationalStat.Prestige]: 5 }, relationshipEffects: { 'LE_PHU_TRAN': 10 }, militaryEffects: { morale: 10 } },
            { text: "Chỉ cần tăng cường kỷ luật là đủ.", effects: { [NationalStat.Security]: 5 }, militaryEffects: { morale: 5 } },
        ]
    },
    {
        id: 50,
        title: "Tin đồn về pháp thuật",
        description: "Có tin đồn một vị quan trong triều đang luyện tập các loại pháp thuật kỳ dị, có thể gây nguy hại cho long thể của bệ hạ.",
        from: { name: "Thái giám", title: "Nội quan", personality: Personality.Loyal, relationship: 50, faction: Faction.Peace },
        options: [
            { text: "Bắt ngay kẻ đó để tra khảo.", effects: { [NationalStat.Security]: 5, [NationalStat.Education]: -5 } },
            { text: "Tin đồn nhảm nhí, không đáng quan tâm.", effects: { [NationalStat.Security]: -5 } },
        ]
    },
    {
        id: 51,
        title: "Chuẩn hóa đo lường",
        description: "Việc đo lường (cân, đong, đo, đếm) không thống nhất trên cả nước gây khó khăn cho giao thương. Xin bệ hạ cho ban hành một bộ tiêu chuẩn chung.",
        from: INITIAL_OFFICIALS['MAC_DINH_CHI'],
        options: [
            { text: "Rất cần thiết. Giao cho Bộ Hộ thực hiện.", effects: { [NationalStat.Prosperity]: 10, [NationalStat.Education]: 5, [NationalStat.Treasury]: -5 } },
            { text: "Việc này không cấp bách.", effects: { [NationalStat.Prosperity]: -5 } },
        ]
    },
    {
        id: 52,
        title: "Hạn hán kéo dài",
        description: "Miền Bắc đang chịu một trận hạn hán nghiêm trọng, đồng ruộng nứt nẻ, có nguy cơ mất trắng cả mùa màng.",
        from: { name: "Quan Nông nghiệp", title: "Tư nông", personality: Personality.Upright, relationship: 60, faction: Faction.Peace },
        options: [
            { text: "Tổ chức Lễ Cầu mưa quy mô lớn.", effects: { [NationalStat.Livelihood]: 5, [NationalStat.Prestige]: 5, [NationalStat.Treasury]: -8 } },
            { text: "Huy động quân lính đào kênh, mương dẫn nước.", effects: { [NationalStat.Livelihood]: 10, [NationalStat.Treasury]: -12, [NationalStat.Security]: -3 } },
            { text: "Ra lệnh cho dân phải tiết kiệm nước.", effects: { [NationalStat.Livelihood]: -10 } },
        ]
    },
    {
        id: 53,
        title: "Sứ giả bị bắt",
        description: "Một sứ giả của ta trên đường sang Nhà Nguyên đã bị bắt giữ vô cớ. Đây là một sự sỉ nhục lớn.",
        from: INITIAL_OFFICIALS['TRAN_HUNG_DAO'],
        options: [
            { text: "Gửi quân đội đến biên giới để gây sức ép.", effects: { [NationalStat.Security]: 10, [NationalStat.Prestige]: 5 }, diplomacyEffects: { [NeighboringState.Yuan]: -15 }, militaryEffects: { morale: 10 } },
            { text: "Gửi công hàm phản đối mạnh mẽ.", effects: { [NationalStat.Prestige]: 5 }, diplomacyEffects: { [NeighboringState.Yuan]: -5 } },
        ]
    },
    {
        id: 54,
        title: "Tranh cãi về thơ ca",
        description: "Một lối thơ mới du nhập từ phương Bắc, lời lẽ ủy mị, bị các bậc lão thành trong triều cho là làm suy đồi phong hóa.",
        from: INITIAL_OFFICIALS['CHU_VAN_AN'],
        options: [
            { text: "Cấm lưu hành loại thơ này.", effects: { [NationalStat.Education]: 5, [NationalStat.Livelihood]: -5 }, relationshipEffects: { 'CHU_VAN_AN': 5 } },
            { text: "Văn chương nghệ thuật nên để tự do phát triển.", effects: { [NationalStat.Education]: -5, [NationalStat.Livelihood]: 5 }, relationshipEffects: { 'CHU_VAN_AN': -5 } },
        ]
    },
    {
        id: 55,
        title: "Phát hiện khu mộ cổ",
        description: "Trong lúc đào đất, người dân phát hiện một khu mộ cổ nghi là của vua Hùng. Xin bệ hạ cho chỉ thị.",
        from: INITIAL_OFFICIALS['MAC_DINH_CHI'],
        unique: true,
        options: [
            { text: "Cho xây đền thờ, ghi nhận công lao tổ tiên.", effects: { [NationalStat.Prestige]: 10, [NationalStat.Education]: 5, [NationalStat.Treasury]: -8 } },
            { text: "Khai quật để tìm kiếm cổ vật.", effects: { [NationalStat.Treasury]: 15, [NationalStat.Prestige]: -10, [NationalStat.Education]: 5 } },
        ]
    },
    {
        id: 56,
        title: "Vụ án oan",
        description: "Lê Phụ Trần trình lên một vụ án có nhiều uẩn khúc, nghi ngờ một vị quan thanh liêm bị hàm oan. Xin bệ hạ cho xử lại.",
        from: INITIAL_OFFICIALS['LE_PHU_TRAN'],
        options: [
            { text: "Lật lại vụ án, điều tra từ đầu.", effects: { [NationalStat.Security]: 5, [NationalStat.Livelihood]: 5, [NationalStat.Prestige]: 5, [NationalStat.Treasury]: -4 }, relationshipEffects: { 'LE_PHU_TRAN': 10 } },
            { text: "Án đã xử, không nên thay đổi để giữ uy nghiêm cho pháp luật.", effects: { [NationalStat.Prestige]: -5, [NationalStat.Livelihood]: -5 }, relationshipEffects: { 'LE_PHU_TRAN': -5 } },
        ]
    },
    {
        id: 57,
        title: "Thợ thủ công ngoại quốc",
        description: "Một người thợ gốm nổi tiếng của nhà Tống muốn đến Đại Việt sinh sống và truyền nghề. Ông ta xin được triều đình bảo hộ.",
        from: { name: "Thương nhân", title: "Đại diện thương đoàn", personality: Personality.Ambitious, relationship: 50, faction: Faction.Peace },
        unique: true,
        options: [
            { text: "Chào đón. Cấp đất và xưởng cho ông ta.", effects: { [NationalStat.Prosperity]: 15, [NationalStat.Education]: 5, [NationalStat.Treasury]: -5 } },
            { text: "Có thể là gián điệp. Từ chối.", effects: { [NationalStat.Security]: 5 } },
        ]
    },
    {
        id: 58,
        title: "Ngựa quý đổ bệnh",
        description: "Tâu bệ hạ, con chiến mã quý nhất của ngài bỗng nhiên đổ bệnh, các thái y đều bó tay.",
        from: { name: "Quan chăn ngựa", title: "Thái bộc", personality: Personality.Loyal, relationship: 60, faction: Faction.Peace },
        options: [
            { text: "Ra cáo thị tìm người có thể chữa trị, thưởng lớn.", effects: { [NationalStat.Treasury]: -8, [NationalStat.Prestige]: 5 } },
            { text: "Chỉ là một con vật, không đáng bận tâm.", effects: { [NationalStat.Prestige]: -5, [NationalStat.Security]: -3 }, militaryEffects: { morale: -5 } },
        ]
    },
    {
        id: 59,
        title: "Dân số kinh thành quá tải",
        description: "Dân số Thăng Long ngày một đông đúc, gây áp lực lên an ninh và dân sinh. Cần có giải pháp lâu dài.",
        from: INITIAL_OFFICIALS['LE_PHU_TRAN'],
        options: [
            { text: "Cho xây thêm các khu dân cư ở ngoại thành.", effects: { [NationalStat.Livelihood]: 10, [NationalStat.Prosperity]: 5, [NationalStat.Treasury]: -15 } },
            { text: "Ban hành chính sách hạn chế người nhập cư vào kinh thành.", effects: { [NationalStat.Livelihood]: -10, [NationalStat.Security]: 5 } },
        ]
    },
    {
        id: 60,
        title: "Đồng minh cầu cứu",
        description: "Một tiểu quốc phía Tây, vốn là đồng minh của ta, đang bị một thế lực lớn hơn uy hiếp và cầu xin Đại Việt trợ giúp quân sự.",
        from: { name: "Sứ giả", title: "Sứ giả nước đồng minh", personality: Personality.Upright, relationship: 50, faction: Faction.Peace },
        options: [
            { text: "Nghĩa bất dung từ. Gửi một đạo quân đi giúp đỡ.", effects: { [NationalStat.Prestige]: 15, [NationalStat.Security]: -5, [NationalStat.Treasury]: -15 }, militaryEffects: { morale: 10 } },
            { text: "Chỉ viện trợ vũ khí và lương thảo.", effects: { [NationalStat.Prestige]: 5, [NationalStat.Treasury]: -10 } },
            { text: "Việc của họ, họ tự lo. Ta không can thiệp.", effects: { [NationalStat.Prestige]: -15 } },
        ]
    }
];
