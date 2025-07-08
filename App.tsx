
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { INITIAL_STATS, INITIAL_PETITIONS, INITIAL_OFFICIALS, INITIAL_HAREM, INITIAL_MILITARY, INITIAL_PRINCES, INITIAL_DIPLOMACY, MONGOL_INVASIONS, INVASION_EVENTS, ACHIEVEMENTS, FlourishIcon, UsersIcon, HeartIcon, SparklesIcon, ShieldCheckIcon, UserGroupIcon, GlobeAltIcon, QuestionMarkCircleIcon, GiftIcon, SunIcon, MoonIcon, KeyIcon, TrophyIcon } from './constants';
import type { NationalStat, Stats, Petition, PetitionOption, Official, SaveState, GamePhase, BudgetAllocations, Consort, AidType, Military, Prince, Diplomacy, ActiveModal, NeighboringState as TNeighboringState, InvasionEventOption } from './types';
import { NationalStat as ENationalStat, Ministry, NeighboringState } from './types';
import Dashboard from './components/Dashboard';
import RelationshipsDashboard from './components/RelationshipsDashboard';
import HaremDashboard from './components/HaremDashboard';
import AidsPanel from './components/AidsPanel';
import Modal from './components/Modal';
import CourtSession from './components/CourtSession';
import BudgetAllocation from './components/BudgetAllocation';
import GameOver from './components/GameOver';
import MilitaryPanel from './components/MilitaryPanel';
import SuccessionPanel from './components/SuccessionPanel';
import DiplomacyPanel from './components/DiplomacyPanel';
import TutorialPanel from './components/TutorialPanel';
import DonationPanel from './components/DonationPanel';
import InvasionCountdown from './components/InvasionCountdown';
import MainMenu from './components/MainMenu';
import ApiKeySetupModal from './components/ApiKeySetupModal';
import { generateYearlySummary } from './services/geminiService';
import InvasionEvent from './components/InvasionEvent';
import AchievementsPanel from './components/AchievementsPanel';

const YearlyAnnals = ({ summary, onNewYear }: { summary: string; onNewYear: () => void; }) => (
    <div className="bg-amber-50 dark:bg-stone-800/70 border-2 border-red-800/50 dark:border-amber-400/20 rounded-lg p-6 lg:p-8 shadow-lg max-w-3xl mx-auto animate-fade-in">
        <h2 className="text-2xl font-serif-display font-bold text-red-900 dark:text-amber-200 mb-4">Biên Niên Sử Hoàng Triều (Royal Annals)</h2>
        <div className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 font-serif-display leading-relaxed whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: summary }} />
        <div className="text-center mt-8">
            <button
                onClick={onNewYear}
                className="bg-red-800 hover:bg-red-700 dark:bg-amber-600 dark:hover:bg-amber-500 text-yellow-50 dark:text-red-950 font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
                Bắt đầu năm mới (Begin New Year)
            </button>
        </div>
    </div>
);

const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

const App: React.FC = () => {
    const [year, setYear] = useState(1225);
    const [stats, setStats] = useState<Stats>(INITIAL_STATS);
    const [officials, setOfficials] = useState<{ [key: string]: Official }>(INITIAL_OFFICIALS);
    const [harem, setHarem] = useState<Consort[]>(INITIAL_HAREM);
    const [military, setMilitary] = useState<Military>(INITIAL_MILITARY);
    const [princes, setPrinces] = useState<Prince[]>(INITIAL_PRINCES);
    const [diplomacy, setDiplomacy] = useState<Diplomacy>(INITIAL_DIPLOMACY);
    const [petitions, setPetitions] = useState<Petition[]>(() => shuffleArray(INITIAL_PETITIONS));
    const [completedPetitionIds, setCompletedPetitionIds] = useState<number[]>([]);
    const [currentPetitionIndex, setCurrentPetitionIndex] = useState(0);
    const [decisions, setDecisions] = useState<{ petitionTitle: string, decisionText: string }[]>([]);
    const [yearlySummary, setYearlySummary] = useState<string | null>(null);
    const [isEndingYear, setIsEndingYear] = useState(false);
    const [activeModal, setActiveModal] = useState<ActiveModal>(null);
    const [gamePhase, setGamePhase] = useState<GamePhase>('BUDGETING');
    const [gameOverMessage, setGameOverMessage] = useState<{title: string, text: string} | null>(null);
    const [budgetDecisionText, setBudgetDecisionText] = useState<string | null>(null);
    const [taxRevenueOfTheYear, setTaxRevenueOfTheYear] = useState(0);
    const [usedAids, setUsedAids] = useState<AidType[]>([]);
    const [nextMongolInvasionYear, setNextMongolInvasionYear] = useState<number | null>(MONGOL_INVASIONS[0]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined' && window.localStorage) {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme) return storedTheme === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });
    const [gameStarted, setGameStarted] = useState(false);
    const [apiKey, setApiKey] = useState<string | null>(() => {
        if (typeof window !== 'undefined') {
            return window.localStorage.getItem('gemini_api_key');
        }
        return null;
    });
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);

    // New states for yearly actions
    const [favorUsedThisYear, setFavorUsedThisYear] = useState(false);
    const [nurtureUsedThisYear, setNurtureUsedThisYear] = useState(false);
    const [favoredConsortId, setFavoredConsortId] = useState<string | null>(null);

    const unlockAchievement = useCallback((achievementId: string) => {
        setUnlockedAchievements(prev => {
            if (prev.includes(achievementId)) {
                return prev; // Already unlocked
            }
            const achievement = ACHIEVEMENTS.find(a => a.id === achievementId);
            if (achievement) {
                // Simple alert for now. Could be a more fancy toast notification later.
                alert(`🏆 Thành tựu Mở khóa: ${achievement.name}`);
            }
            return [...prev, achievementId];
        });
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

    const handleApiKeyUpdate = (newKey: string | null) => {
        if (newKey) {
            localStorage.setItem('gemini_api_key', newKey);
        } else {
            localStorage.removeItem('gemini_api_key');
        }
        setApiKey(newKey);
    };

    const getAvailablePetitions = useCallback(() => {
        return shuffleArray(
            INITIAL_PETITIONS.filter(p => 
                !completedPetitionIds.includes(p.id) &&
                (!p.trigger || p.trigger(stats, diplomacy, princes, harem))
            )
        );
    }, [stats, diplomacy, princes, harem, completedPetitionIds]);
    
    useEffect(() => {
        setPetitions(getAvailablePetitions());
    }, [year, getAvailablePetitions]);


    const currentPetition = petitions[currentPetitionIndex] || null;

    useEffect(() => {
        if (gamePhase === 'GAME_OVER') return;

        if (year >= 1225 + 70) {
            setGamePhase('GAME_OVER');
            const hasCrownPrince = princes.some(p => p.isCrownPrince);
            if (hasCrownPrince) {
                 unlockAchievement('good_ending');
                 setGameOverMessage({
                    title: "Thiên Thu Thịnh Thế (A Glorious Era)",
                    text: `Bệ hạ đã trị vì trong 70 năm, chọn được người kế vị anh minh, đưa Đại Việt đến một thời kỳ hoàng kim. Tên của ngài sẽ được ghi vào sử sách như một trong những vị vua vĩ đại nhất. (You have ruled for 70 glorious years, chosen a wise heir, and led Đại Việt into a golden age. Your name will be remembered as one of the greatest emperors.)`
                });
            } else {
                unlockAchievement('normal_ending');
                setGameOverMessage({
                    title: "Triều Đại An Bình (A Peaceful Reign)",
                    text: `Bệ hạ đã trị vì trong 70 năm, giữ cho xã tắc được thái bình. Tuy nhiên, do chưa chọn được người kế vị xứng đáng, tương lai của Đại Việt vẫn còn là một dấu hỏi. (You have ruled for 70 years and kept the kingdom at peace. However, without a worthy heir, the future of Đại Việt remains uncertain.)`
                });
            }
            return;
        }

        const rebelliousOfficialsCount = Object.values(officials).filter(o => o.relationship <= 20).length;
        const rebelliousConsortsCount = harem.filter(c => c.relationship === 0).length * 2; // Each 0-relationship consort counts as 2 rebels
        const totalRebelliousCount = rebelliousOfficialsCount + rebelliousConsortsCount;

        if (totalRebelliousCount >= 3) {
            setGamePhase('GAME_OVER');
            unlockAchievement('dynasty_falls');
            let reasonText = "Lòng dân oán thán, các đại thần mưu phản.";
            if (rebelliousConsortsCount > 0) {
                reasonText = "Lòng dân oán thán, các đại thần mưu phản và hậu cung bất ổn.";
            }
            setGameOverMessage({
                title: "Triều Đại Sụp Đổ (Dynasty Falls)",
                text: `${reasonText} Bệ hạ đã bị phế truất do không thể kiểm soát được triều đình. (The court is in turmoil, and the ministers have rebelelled. You have been deposed for failing to control your court.)`
            });
            return;
        }

        for (const [statKey, value] of Object.entries(stats)) {
            if (value <= 0) {
                let reason = "";
                switch(statKey as ENationalStat) {
                    case ENationalStat.Prosperity: reason = "Quốc gia kiệt quệ, dân chúng lầm than. Các cuộc nổi dậy nổ ra khắp nơi. (The nation is bankrupt, the people suffer. Uprisings erupt everywhere.)"; break;
                    case ENationalStat.Livelihood: reason = "Dân chúng chết đói, không còn tin vào thiên tử. Triều đại đã mất đi thiên mệnh. (The people are starving and have lost faith in the emperor. The dynasty has lost the Mandate of Heaven.)"; break;
                    case ENationalStat.Education: reason = "Ngu dốt lan tràn, nhân tài không có. Đất nước chìm trong hỗn loạn và lạc hậu. (Ignorance prevails, and talent is scarce. The nation descends into chaos and stagnation.)"; break;
                    case ENationalStat.Security: reason = "Biên cương không được bảo vệ, giặc ngoại xâm tràn vào. Kinh thành thất thủ. (The borders are undefended, and foreign invaders have overrun the capital.)"; break;
                    case ENationalStat.Treasury: reason = "Ngân khố trống rỗng, không thể trả lương cho quan lại và quân đội. Triều đình tan rã. (The treasury is empty, unable to pay officials and soldiers. The court dissolves.)"; break;
                    case ENationalStat.Prestige: reason = "Uy tín của thiên tử không còn, các nước chư hầu nổi dậy, ngoại bang khinh thường. (The emperor's prestige is gone. Vassal states rebel, and foreign powers show contempt.)"; break;
                }
                setGamePhase('GAME_OVER');
                unlockAchievement('dynasty_falls');
                setGameOverMessage({
                    title: "Triều Đại Sụp Đổ (Dynasty Falls)",
                    text: reason
                });
                return;
            }
        }
    }, [stats, officials, year, gamePhase, princes, harem, unlockAchievement]);

    const resetGameState = useCallback(() => {
        setYear(1225);
        setStats(INITIAL_STATS);
        setOfficials(INITIAL_OFFICIALS);
        setHarem(INITIAL_HAREM);
        setMilitary(INITIAL_MILITARY);
        setPrinces(INITIAL_PRINCES);
        setDiplomacy(INITIAL_DIPLOMACY);
        setCompletedPetitionIds([]);
        setPetitions(shuffleArray(INITIAL_PETITIONS));
        setCurrentPetitionIndex(0);
        setDecisions([]);
        setYearlySummary(null);
        setIsEndingYear(false);
        setGamePhase('BUDGETING');
        setBudgetDecisionText(null);
        setTaxRevenueOfTheYear(0);
        setNextMongolInvasionYear(MONGOL_INVASIONS[0]);
        setGameOverMessage(null);
        setActiveModal(null);
        setUsedAids([]);
        setUnlockedAchievements([]);
        setFavorUsedThisYear(false);
        setNurtureUsedThisYear(false);
        setFavoredConsortId(null);
    }, []);

    const handleNewGame = useCallback(() => {
        resetGameState();
        setGameStarted(true);
    }, [resetGameState]);

    const handleRestart = useCallback(() => {
        resetGameState();
        setGameStarted(false);
    }, [resetGameState]);

    const handleDecision = useCallback((option: PetitionOption, petitionTitle: string) => {
        // Update national stats
        setStats(prevStats => {
            const newStats = { ...prevStats };
            for (const [statKey, change] of Object.entries(option.effects)) {
                const key = statKey as NationalStat;
                newStats[key] = Math.max(0, Math.min(100, newStats[key] + change));
            }
            return newStats;
        });

        // Update official relationships
        if (option.relationshipEffects) {
            setOfficials(prevOfficials => {
                const newOfficials = { ...prevOfficials };
                for (const [officialKey, change] of Object.entries(option.relationshipEffects)) {
                    if (newOfficials[officialKey]) {
                        newOfficials[officialKey] = {
                            ...newOfficials[officialKey],
                            relationship: Math.max(0, Math.min(100, newOfficials[officialKey].relationship + change))
                        };
                    }
                }
                return newOfficials;
            });
        }
        
        // Update military stats
        if (option.militaryEffects) {
            setMilitary(prev => {
                const newMilitary = { ...prev };
                if (option.militaryEffects?.strength) newMilitary.strength = Math.max(0, Math.min(100, newMilitary.strength + option.militaryEffects.strength));
                if (option.militaryEffects?.morale) newMilitary.morale = Math.max(0, Math.min(100, newMilitary.morale + option.militaryEffects.morale));
                return newMilitary;
            });
        }

        // Update diplomacy stats
        if (option.diplomacyEffects) {
            setDiplomacy(prev => {
                const newDiplomacy = { ...prev };
                for (const [key, change] of Object.entries(option.diplomacyEffects)) {
                     const stateKey = key as TNeighboringState;
                     newDiplomacy[stateKey] = { ...newDiplomacy[stateKey], relationship: Math.max(0, Math.min(100, newDiplomacy[stateKey].relationship + change)) };
                }
                return newDiplomacy;
            });
        }

        // Add new consort
        if (option.addConsort) {
            const newConsort: Consort = { ...option.addConsort, id: `consort_${Date.now()}` };
            setHarem(prevHarem => [...prevHarem, newConsort]);
        }
        
        // Add new prince
        if (option.addPrince) {
            const motherConsort = harem.length > 0 ? harem[Math.floor(Math.random() * harem.length)] : { name: "Một cung nữ vô danh" };
            setPrinces(prev => {
                const newPrince: Prince = { 
                    ...option.addPrince!, 
                    mother: motherConsort.name,
                    id: `prince_${Date.now()}`, 
                    age: 0,
                    successionPoints: 0,
                    isCrownPrince: false,
                };
                const newPrinces = [...prev, newPrince];
                if (newPrinces.length >= 5) {
                    unlockAchievement('many_children');
                }
                return newPrinces;
            });
        }
        
        // Recruit new official - BUG FIX: Use static key directly.
        if (option.recruitOfficial) {
            setOfficials(prev => ({...prev, [option.recruitOfficial!.key]: option.recruitOfficial!.official}));
        }

        if (currentPetition?.unique) {
            setCompletedPetitionIds(prev => [...prev, currentPetition.id]);
        }
        
        setDecisions(prev => [...prev, { petitionTitle, decisionText: option.text }]);
        setCurrentPetitionIndex(prev => prev + 1);

    }, [currentPetition, harem, unlockAchievement]);
    
    const handleUseAid = useCallback((aid: AidType, statToBuff: NationalStat) => {
        if(usedAids.includes(aid)) return;
        setStats(prev => ({ ...prev, [statToBuff]: Math.min(100, prev[statToBuff] + 10) }));
        setUsedAids(prev => [...prev, aid]);
    }, [usedAids]);

    const getRelationshipText = (value: number) => {
        if (value > 85) return "Cực kỳ trung thành (Extremely Loyal)";
        if (value > 65) return "Trung thành (Loyal)";
        if (value > 40) return "Trung lập (Neutral)";
        if (value > 20) return "Bất mãn (Displeased)";
        return "Có ý phản nghịch (Rebellious)";
    };

    const handleConfirmBudget = useCallback((allocations: BudgetAllocations) => {
        const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0);
        if (totalAllocated > stats[ENationalStat.Treasury]) return;

        setStats(prev => {
            const newStats = { ...prev };
            newStats[ENationalStat.Treasury] = Math.max(0, prev[ENationalStat.Treasury] - totalAllocated);
            newStats[ENationalStat.Security] += Math.floor(allocations[Ministry.Binh] * 0.8 + allocations[Ministry.Hinh] * 0.3);
            newStats[ENationalStat.Prosperity] += Math.floor(allocations[Ministry.Ho] * 0.6);
            newStats[ENationalStat.Livelihood] += Math.floor(allocations[Ministry.Ho] * 0.4 + allocations[Ministry.Hinh] * 0.5);
            newStats[ENationalStat.Education] += Math.floor(allocations[Ministry.Le] * 0.7);
            newStats[ENationalStat.Prestige] += Math.floor(allocations[Ministry.Le] * 0.5);
            for (const key in newStats) {
                newStats[key as NationalStat] = Math.max(0, Math.min(100, newStats[key as NationalStat]));
            }
            return newStats;
        });
        const decisionSummary = `Hoàng đế đã phê duyệt ngân sách cho các bộ: ${Ministry.Binh} (${allocations[Ministry.Binh]} vạn), ${Ministry.Ho} (${allocations[Ministry.Ho]} vạn), ${Ministry.Le} (${allocations[Ministry.Le]} vạn), ${Ministry.Hinh} (${allocations[Ministry.Hinh]} vạn).`;
        setBudgetDecisionText(decisionSummary);
        setGamePhase('COURT_SESSION');
    }, [stats]);

     const handleBribeOfficial = useCallback((key: string) => {
        if (stats[ENationalStat.Treasury] < 5) {
            alert("Ngân khố không đủ để mua chuộc!");
            return;
        }
        if (officials[key] && officials[key].relationship < 100) {
            setStats(prev => ({...prev, [ENationalStat.Treasury]: prev[ENationalStat.Treasury] - 5}));
            setOfficials(prev => {
                const newOfficials = {...prev};
                newOfficials[key] = {
                    ...newOfficials[key],
                    relationship: Math.min(100, newOfficials[key].relationship + 10)
                };
                return newOfficials;
            });
        }
    }, [stats, officials]);

    const handleFavorConsort = useCallback((consortId: string) => {
        if (favorUsedThisYear) return;
        setFavorUsedThisYear(true);
        setFavoredConsortId(consortId);
        setHarem(prevHarem => 
            prevHarem.map(c => 
                c.id === consortId 
                    ? { ...c, relationship: Math.min(100, c.relationship + 15) }
                    : c
            )
        );
    }, [favorUsedThisYear]);

    const handleNurturePrince = useCallback((princeId: string) => {
        if (nurtureUsedThisYear) return;
        setNurtureUsedThisYear(true);
        setPrinces(prevPrinces => {
            let isCrowning = false;
            let crownedPrinceId: string | null = null;
    
            const updatedPrinces = prevPrinces.map(p => {
                if (p.id === princeId && !p.isCrownPrince) {
                    const newPoints = p.successionPoints + 1;
                    if (newPoints >= 20) {
                        isCrowning = true;
                        crownedPrinceId = p.id;
                        return { ...p, successionPoints: newPoints, isCrownPrince: true };
                    }
                    return { ...p, successionPoints: newPoints };
                }
                return p;
            });
    
            if (isCrowning) {
                return updatedPrinces.map(p => {
                    if (p.id !== crownedPrinceId) {
                        return { ...p, isCrownPrince: false };
                    }
                    return p;
                });
            }
            return updatedPrinces;
        });
    }, [nurtureUsedThisYear]);

    const handleAttack = useCallback((target: TNeighboringState) => {
        const cost = Math.floor(diplomacy[target].defense * 0.5);
        if (military.strength < cost) {
            alert(`Không đủ Sức mạnh quân đội để tấn công! Cần ít nhất ${cost}.`);
            return;
        }

        const successChance = Math.max(0.1, Math.min(0.9, military.strength / (diplomacy[target].defense * 1.2)));
        const isSuccess = Math.random() < successChance;

        if (isSuccess) {
            alert(`Tấn công ${target} THÀNH CÔNG! Ta chiếm được nhiều chiến lợi phẩm.`);
            setStats(prev => ({
                ...prev,
                [ENationalStat.Treasury]: Math.min(100, prev[ENationalStat.Treasury] + 15),
                [ENationalStat.Prosperity]: Math.min(100, prev[ENationalStat.Prosperity] + 5),
            }));
            
            const newYuanCampaigns = target === NeighboringState.Yuan ? military.yuanCampaigns + 1 : military.yuanCampaigns;
            const newChampaCampaigns = target === NeighboringState.Champa ? military.champaCampaigns + 1 : military.champaCampaigns;

            setMilitary(prev => ({
                ...prev,
                strength: Math.max(0, prev.strength - Math.floor(cost * 0.8)),
                morale: Math.max(0, prev.morale - 10),
                yuanCampaigns: newYuanCampaigns,
                champaCampaigns: newChampaCampaigns,
            }));
            setDiplomacy(prev => ({
                ...prev,
                [target]: {
                    relationship: Math.max(0, prev[target].relationship - 15),
                    defense: Math.max(10, prev[target].defense - 5),
                }
            }));

            if (target === NeighboringState.Yuan && newYuanCampaigns >= 5) {
                if (nextMongolInvasionYear !== null) {
                    alert("Ý chí xâm lược của Nhà Nguyên đã bị dập tắt! Các cuộc xâm lược lịch sử sẽ không xảy ra.");
                    unlockAchievement('preemptive_strike');
                    setNextMongolInvasionYear(null);
                }
            }
            if (target === NeighboringState.Champa && newChampaCampaigns >= 5) {
                unlockAchievement('pacify_champa');
            }

        } else {
            alert(`Tấn công ${target} THẤT BẠI! Quân ta tổn thất nặng nề.`);
            setMilitary(prev => ({
                ...prev,
                strength: Math.max(0, prev.strength - cost),
                morale: Math.max(0, prev.morale - 20),
            }));
        }
    }, [military, diplomacy, unlockAchievement, nextMongolInvasionYear]);

    const handleEndYear = useCallback(async () => {
        setIsEndingYear(true);
        const decisionsText = decisions.map(d => `- Về việc "${d.petitionTitle}": Hoàng đế đã quyết định "${d.decisionText}".`).join('\n');
        const statsText = Object.entries(stats).map(([key, value]) => `- ${key}: ${value}/100`).join('\n');
        const relationsText = Object.values(officials).map(o => `- ${o.name} (${o.title}, ${o.faction}): ${getRelationshipText(o.relationship)} (${o.relationship}/100)`).join('\n');
        const haremText = harem.map(c => `- ${c.title} ${c.name} (Xuất thân: ${c.origin})`).join('\n') || "- Hậu cung yên bình, không có gì đặc biệt.";
        const militaryText = `Sức mạnh: ${military.strength}/100, Tinh thần: ${military.morale}/100. Đã thắng ${military.yuanCampaigns} chiến dịch chống Nguyên, ${military.champaCampaigns} chiến dịch chống Chiêm Thành.`;
        const successionText = princes.map(p => `- Hoàng tử ${p.name} (${p.age} tuổi, mẹ là ${p.mother})`).join('\n') || "- Chưa có hoàng tử nối dõi.";
        const diplomacyText = Object.entries(diplomacy).map(([state, value]) => `- Quan hệ với ${state}: ${value.relationship}/100 (Phòng ngự: ${value.defense})`).join('\n');
        
        const prompt = `
Bối cảnh: Năm thứ ${year} triều đại của Hoàng đế Đại Việt.
Sự kiện đầu năm:
- Thuế vụ mùa thu đã được thu về, ngân khố quốc gia tăng thêm ${taxRevenueOfTheYear} vạn quan.
${budgetDecisionText ? `- ${budgetDecisionText}` : ''}

Tóm tắt các Thánh chỉ đã ban trong năm:
${decisionsText || "- Năm nay, bệ hạ không có quyết sách lớn nào tại buổi chầu."}

Tình hình quốc gia cuối năm:
${statsText}

Tình hình Triều chính & Quan hệ Đại thần:
${relationsText}

Tình hình Quân sự:
${militaryText}

Tình hình Ngoại giao:
${diplomacyText}

Tình hình Hậu cung & Kế vị:
${haremText}
${successionText}

Dựa vào những thông tin trên, hãy viết một đoạn ghi chép trong Biên Niên Sử Hoàng Triều, tổng kết lại một năm trị vì của Hoàng đế. Hãy dùng văn phong trang trọng, uyên bác của một sử quan Đại Việt thời nhà Trần, tập trung vào những sự kiện nổi bật và ảnh hưởng của chúng đến vận mệnh quốc gia, sự ổn định của triều đình, và các mối quan hệ trong và ngoài nước.
        `;
        const summary = await generateYearlySummary(prompt);
        setYearlySummary(summary);
        setIsEndingYear(false);
        setGamePhase('YEAR_END');
    }, [year, decisions, stats, officials, harem, budgetDecisionText, taxRevenueOfTheYear, military, princes, diplomacy]);

     const handleInvasionDecision = useCallback((option: InvasionEventOption) => {
        const currentMilitary = military;

        // Calculate battle outcome
        const playerPower = (currentMilitary.strength + option.strengthModifier) * 0.7 + (currentMilitary.morale + option.moraleModifier) * 0.3;
        const successChance = Math.max(0.1, Math.min(0.9, playerPower / 85));
        const isSuccess = Math.random() < successChance;

        const outcome = isSuccess 
            ? { text: option.winText, effects: option.winEffects }
            : { text: option.lossText, effects: option.lossEffects };
            
        alert(`Kết quả cuộc chiến năm ${year}:\n\n${outcome.text}`);

        if (isSuccess) {
            if (year === 1258) unlockAchievement('invasion_1_win');
            if (year === 1285) unlockAchievement('invasion_2_win');
            if (year === 1288) unlockAchievement('invasion_3_win');
        }

        // Combine all effects
        const allStatEffects: Partial<Stats> = { ...option.baseEffects.stats };
        for (const key in outcome.effects.stats) {
            const statKey = key as NationalStat;
            allStatEffects[statKey] = (allStatEffects[statKey] || 0) + (outcome.effects.stats[statKey] || 0);
        }

        const allMilitaryEffects: Partial<Military> = { ...option.baseEffects.military };
        if (outcome.effects.military.strength) {
             allMilitaryEffects.strength = (allMilitaryEffects.strength || 0) + outcome.effects.military.strength;
        }
        if (outcome.effects.military.morale) {
             allMilitaryEffects.morale = (allMilitaryEffects.morale || 0) + outcome.effects.military.morale;
        }

        // Apply all effects
        setStats(prev => {
            const newStats = { ...prev };
            for (const [key, change] of Object.entries(allStatEffects)) {
                newStats[key as NationalStat] = Math.max(0, Math.min(100, newStats[key as NationalStat] + (change || 0)));
            }
            return newStats;
        });

        setMilitary(prev => {
            const newMilitary = { ...prev };
            if (allMilitaryEffects.strength) newMilitary.strength += allMilitaryEffects.strength;
            if (allMilitaryEffects.morale) newMilitary.morale += allMilitaryEffects.morale;
            newMilitary.strength = Math.max(0, Math.min(100, newMilitary.strength));
            newMilitary.morale = Math.max(0, Math.min(100, newMilitary.morale));
            return newMilitary;
        });
        
        // Log the decision for the annals
        const eventData = INVASION_EVENTS.find(e => e.year === year);
        setDecisions(prev => [...prev, {
            petitionTitle: eventData?.title || `Cuộc chiến năm ${year}`,
            decisionText: `Bệ hạ đã chọn chiến lược: "${option.text}". Kết quả: ${outcome.text}`
        }]);

        // Advance to the next invasion
        const currentInvasionIndex = MONGOL_INVASIONS.indexOf(year);
        if(isSuccess && eventData?.year === 1288) { // Decisive victory at Bach Dang
             setNextMongolInvasionYear(null);
        } else {
             const nextIndex = currentInvasionIndex + 1;
             setNextMongolInvasionYear(MONGOL_INVASIONS[nextIndex] || null);
        }

        setGamePhase('POST_INVASION');
    }, [year, military, unlockAchievement]);

    const handleNewYear = useCallback(() => {
        // Yearly resource and military recovery based on national stats.
        
        // Treasury increases based on Prosperity. +1 Treasury for every 5 Prosperity, max +20.
        const taxRevenue = Math.min(20, Math.floor(stats[ENationalStat.Prosperity] / 5));
        setStats(prevStats => ({ ...prevStats, [ENationalStat.Treasury]: Math.min(100, prevStats[ENationalStat.Treasury] + taxRevenue) }));
        setTaxRevenueOfTheYear(taxRevenue);

        // Military strength increases based on Security. +1 Strength for every 10 Security, max +10.
        const militaryRecovery = Math.min(10, Math.floor(stats[ENationalStat.Security] / 10));
        setMilitary(prev => ({
            ...prev,
            strength: Math.min(100, prev.strength + militaryRecovery),
        }));

        // Harem relationship decay
        setHarem(prevHarem => prevHarem.map(c => ({...c, relationship: Math.max(0, c.relationship - 10) })));

        // Check for new prince birth from favored consort
        if (favoredConsortId) {
            const favoredConsort = harem.find(c => c.id === favoredConsortId);
            if (favoredConsort && Math.random() < 0.10) { // 10% chance
                const princeNames = ["Trần Nhật", "Trần Quang", "Trần Đức", "Trần Vĩnh", "Trần Khải", "Trần Quốc", "Trần Hiển", "Trần Minh"];
                const newPrinceName = princeNames[Math.floor(Math.random() * princeNames.length)];
                
                setPrinces(prev => {
                    const newPrince: Prince = {
                        id: `prince_${Date.now()}`,
                        name: newPrinceName,
                        mother: favoredConsort.name,
                        age: 0,
                        successionPoints: 0,
                        isCrownPrince: false,
                    };
                    const newPrinces = [...prev, newPrince];
                     if (newPrinces.length >= 5) {
                        unlockAchievement('many_children');
                    }
                    alert(`🎉 Chúc mừng Bệ hạ! ${favoredConsort.title} ${favoredConsort.name} đã hạ sinh Hoàng tử ${newPrinceName}!`);
                    return newPrinces;
                });
            }
        }
        
        // Achievement Check: Loyal Court
        if(Object.values(officials).every(o => o.relationship > 85)) {
            unlockAchievement('loyal_court');
        }

        // Reset yearly action trackers
        setFavorUsedThisYear(false);
        setNurtureUsedThisYear(false);
        setFavoredConsortId(null);

        // Advance to the new year
        setYear(prev => prev + 1);
        setYearlySummary(null);
        setCurrentPetitionIndex(0);
        setDecisions([]);
        setPetitions(getAvailablePetitions());
        setGamePhase('BUDGETING');
        setBudgetDecisionText(null);
        setPrinces(prevPrinces => prevPrinces.map(p => ({...p, age: p.age + 1})));
    }, [stats, getAvailablePetitions, favoredConsortId, harem, officials, unlockAchievement]);

    const saveGame = useCallback(() => {
        const gameState: SaveState = { year, stats, officials, harem, petitions, currentPetitionIndex, decisions, gamePhase, taxRevenueOfTheYear, usedAids, military, princes, diplomacy, completedPetitionIds, nextMongolInvasionYear, favorUsedThisYear, nurtureUsedThisYear, favoredConsortId, unlockedAchievements };
        const dataStr = JSON.stringify(gameState, null, 2);
        const dataBlob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `thien-tu-nha-tran-nam-${year}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, [year, stats, officials, harem, petitions, currentPetitionIndex, decisions, gamePhase, taxRevenueOfTheYear, usedAids, military, princes, diplomacy, completedPetitionIds, nextMongolInvasionYear, favorUsedThisYear, nurtureUsedThisYear, favoredConsortId, unlockedAchievements]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text !== 'string') throw new Error("Invalid file content");
                const savedState: SaveState = JSON.parse(text);
                if (savedState.year && savedState.stats && savedState.officials && savedState.petitions && savedState.gamePhase) {
                    setYear(savedState.year);
                    setStats(savedState.stats);
                    setOfficials(savedState.officials || INITIAL_OFFICIALS);
                    setHarem(savedState.harem || INITIAL_HAREM);
                    setMilitary(savedState.military || INITIAL_MILITARY);
                    setPrinces((savedState.princes || INITIAL_PRINCES).map(p => ({
                        ...p,
                        successionPoints: p.successionPoints || 0,
                        isCrownPrince: p.isCrownPrince || false,
                    })));
                    setDiplomacy(savedState.diplomacy || INITIAL_DIPLOMACY);
                    setPetitions(savedState.petitions);
                    setCurrentPetitionIndex(savedState.currentPetitionIndex || 0);
                    setDecisions(savedState.decisions || []);
                    setGamePhase(savedState.gamePhase || 'BUDGETING');
                    setTaxRevenueOfTheYear(savedState.taxRevenueOfTheYear || 0);
                    setUsedAids(savedState.usedAids || []);
                    setCompletedPetitionIds(savedState.completedPetitionIds || []);
                    setNextMongolInvasionYear(savedState.nextMongolInvasionYear !== undefined ? savedState.nextMongolInvasionYear : MONGOL_INVASIONS[0]);
                    setFavorUsedThisYear(savedState.favorUsedThisYear || false);
                    setNurtureUsedThisYear(savedState.nurtureUsedThisYear || false);
                    setFavoredConsortId(savedState.favoredConsortId || null);
                    setUnlockedAchievements(savedState.unlockedAchievements || []);

                    setYearlySummary(null);
                    setIsEndingYear(false);
                    setGameStarted(true);
                    alert(`Đã tải thành công ván chơi từ năm ${savedState.year}.`);
                } else {
                    alert("Tệp lưu không hợp lệ. (Invalid save file.)");
                }
            } catch (error) {
                console.error("Failed to load game:", error);
                alert("Không thể đọc tệp lưu. Tệp có thể bị hỏng. (Failed to read save file. It may be corrupted.)");
            }
        };
        reader.readAsText(file);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const triggerLoadGame = () => fileInputRef.current?.click();
    
    const renderModalContent = () => {
        switch(activeModal) {
            case 'relationships': return <RelationshipsDashboard officials={officials} treasury={stats[ENationalStat.Treasury]} onBribe={handleBribeOfficial} />;
            case 'harem': return <HaremDashboard harem={harem} onFavorConsort={handleFavorConsort} favorUsedThisYear={favorUsedThisYear} />;
            case 'military': return <MilitaryPanel military={military} officials={Object.values(officials)} />;
            case 'succession': return <SuccessionPanel princes={princes} onNurturePrince={handleNurturePrince} nurtureUsedThisYear={nurtureUsedThisYear} />;
            case 'diplomacy': return <DiplomacyPanel diplomacy={diplomacy} military={military} onAttack={handleAttack} />;
            case 'aids': return <AidsPanel usedAids={usedAids} onUseAid={handleUseAid} />;
            case 'tutorial': return <TutorialPanel />;
            case 'donate': return <DonationPanel />;
            case 'apiKey': return <ApiKeySetupModal currentKey={apiKey} onKeyUpdate={handleApiKeyUpdate} onClose={() => setActiveModal(null)} />;
            case 'achievements': return <AchievementsPanel allAchievements={ACHIEVEMENTS} unlockedIds={unlockedAchievements} />;
            default: return null;
        }
    };
    
    const getModalTitle = () => {
        switch(activeModal) {
            case 'relationships': return "Quan Hệ Triều Thần";
            case 'harem': return "Hậu Cung";
            case 'military': return "Quân Sự";
            case 'succession': return "Kế Vị";
            case 'diplomacy': return "Ngoại Giao & Chiến Tranh";
            case 'aids': return "Quyền Trợ Giúp (Emergency Aid)";
            case 'tutorial': return "Hướng Dẫn Chơi";
            case 'donate': return "Ủng Hộ Tác Giả";
            case 'apiKey': return "Thiết lập API Key";
            case 'achievements': return "Thành Tựu";
            default: return "";
        }
    };

    const renderGameContent = () => {
        if (gamePhase === 'BUDGETING') {
            return <BudgetAllocation treasury={stats[ENationalStat.Treasury]} onConfirm={handleConfirmBudget} taxRevenue={taxRevenueOfTheYear}/>;
        }

        if (gamePhase === 'POST_INVASION') {
             return <CourtSession petition={null} onDecision={() => {}} onEndYear={handleEndYear} isEndingYear={isEndingYear} />;
        }
        
        if (gamePhase === 'COURT_SESSION' || gamePhase === 'YEAR_END') {
             if (yearlySummary) {
                return <YearlyAnnals summary={yearlySummary} onNewYear={handleNewYear} />;
            }

            const invasionEventData = INVASION_EVENTS.find(e => e.year === year);
            if (gamePhase === 'COURT_SESSION' && invasionEventData) {
                return (
                    <InvasionEvent
                        eventData={invasionEventData}
                        advisor={officials[invasionEventData.advisor]}
                        onDecision={handleInvasionDecision}
                    />
                );
            }

            const showCourtSession = currentPetitionIndex < 4 && currentPetition;
            return <CourtSession petition={showCourtSession ? currentPetition : null} onDecision={handleDecision} onEndYear={handleEndYear} isEndingYear={isEndingYear} />;
        }
        return null;
    }

    return (
        <div className="min-h-screen bg-fixed" style={{ backgroundImage: `url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M11 18.273l8.445 8.445L11 35.164V18.273zm35.164 16.891L37.719 26.72l8.445-8.446v16.892zM19.445 26.719L27.89 18.27l-8.445-8.445v16.89zM11 51.547l8.445 8.445L11 68.438V51.547zm35.164 16.891L37.719 60l8.445-8.446v16.892zM19.445 60l8.445-8.445-8.445-8.445v16.89zM11 84.81l8.445 8.445L11 101.7V84.81zm35.164 16.891L37.719 93.25l8.445-8.446v16.892zM19.445 93.25l8.445-8.445-8.445-8.445v16.89zM53.72 11l8.445 8.445L53.72 27.89V11zm35.164 16.891L80.44 19.445l8.445-8.446v16.892zM62.164 19.445L70.61 11l-8.445-8.445v16.89zM53.72 44.27l8.445 8.445-8.445 8.446V44.27zm35.164 16.891L80.44 52.715l8.445-8.446v16.892zM62.164 52.715l8.445-8.445-8.445-8.445v16.89zM53.72 77.54l8.445 8.445-8.445 8.446V77.54zm35.164 16.891L80.44 86l8.445-8.446v16.892zM62.164 86l8.445-8.445-8.445-8.445v16.89z" fill="${isDarkMode ? '%23fde68a' : '%239a3412'}" fill-opacity="${isDarkMode ? '0.03' : '0.05'}" fill-rule="evenodd"/></svg>')`}}>
            <main className="container mx-auto p-4 md:p-8">
                {!gameStarted ? (
                    <MainMenu 
                        onNewGame={handleNewGame}
                        onLoadGame={triggerLoadGame}
                        onShowTutorial={() => setActiveModal('tutorial')}
                        onShowDonate={() => setActiveModal('donate')}
                        onShowApiKeySetup={() => setActiveModal('apiKey')}
                        toggleDarkMode={toggleDarkMode}
                        isDarkMode={isDarkMode}
                        apiKey={apiKey}
                    />
                ) : (
                    <>
                        <header className="text-center mb-8">
                            <div className="flex justify-center items-center gap-4">
                               <FlourishIcon className="w-12 h-12 text-red-900 dark:text-amber-300"/>
                               <h1 className="text-4xl md:text-5xl font-extrabold font-serif-display text-red-900/90 dark:text-amber-200/90 tracking-wider">Thiên Tử Nhà Trần</h1>
                               <FlourishIcon className="w-12 h-12 text-red-900 dark:text-amber-300 scale-x-[-1]"/>
                            </div>
                            <div className="flex items-center justify-center gap-4">
                                <p className="text-stone-600 dark:text-stone-400 font-semibold text-lg mt-2">Năm {year}</p>
                                <InvasionCountdown currentYear={year} nextInvasionYear={nextMongolInvasionYear} />
                            </div>
                            <div className="flex justify-center items-center gap-2 md:gap-4 mt-4 flex-wrap">
                                <button onClick={saveGame} disabled={gamePhase === 'GAME_OVER'} className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 text-sm disabled:bg-stone-400 dark:disabled:bg-stone-600 dark:disabled:text-stone-400 disabled:cursor-not-allowed dark:bg-amber-700 dark:hover:bg-amber-800">Lưu Game</button>
                                <button onClick={triggerLoadGame} disabled={gamePhase === 'GAME_OVER'} className="bg-stone-600 hover:bg-stone-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 text-sm disabled:bg-stone-400 dark:disabled:bg-stone-600 dark:disabled:text-stone-400 disabled:cursor-not-allowed dark:bg-stone-700 dark:hover:bg-stone-800">Tải Game</button>
                                <button onClick={() => setActiveModal('tutorial')} className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 text-sm flex items-center gap-2 dark:bg-sky-700 dark:hover:bg-sky-600">
                                  <QuestionMarkCircleIcon className="w-5 h-5"/>
                                  <span className="hidden sm:inline">Hướng Dẫn</span>
                                </button>
                                <button onClick={() => setActiveModal('achievements')} className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 text-sm flex items-center gap-2 dark:bg-yellow-600 dark:hover:bg-yellow-500">
                                    <TrophyIcon className="w-5 h-5"/>
                                    <span className="hidden sm:inline">Thành Tựu</span>
                                </button>
                                <button onClick={() => setActiveModal('donate')} className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 text-sm flex items-center gap-2 dark:bg-amber-600 dark:hover:bg-amber-500">
                                   <GiftIcon className="w-5 h-5"/>
                                   <span className="hidden sm:inline">Ủng hộ</span>
                                </button>
                                 <button onClick={toggleDarkMode} className="bg-stone-200 dark:bg-stone-700 hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 text-sm flex items-center gap-2">
                                   {isDarkMode ? <SunIcon className="w-5 h-5 text-yellow-400"/> : <MoonIcon className="w-5 h-5 text-indigo-500"/>}
                                   <span className="hidden sm:inline">{isDarkMode ? 'Sáng' : 'Tối'}</span>
                                </button>
                            </div>
                        </header>
                        
                         <div className="space-y-6">
                            {gamePhase === 'GAME_OVER' && gameOverMessage ? (
                                 <div className="mt-8">
                                    <GameOver message={gameOverMessage} onRestart={handleRestart} />
                                 </div>
                            ) : (
                                <>
                                    <Dashboard stats={stats} />
                                    
                                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 p-4 bg-white/50 dark:bg-stone-800/50 backdrop-blur-sm rounded-xl shadow-lg">
                                        <button onClick={() => setActiveModal('relationships')} className="flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-2 px-3 rounded-lg shadow-sm transition-all duration-200 dark:bg-stone-700 dark:hover:bg-stone-600 dark:text-stone-200">
                                            <UsersIcon className="w-5 h-5" />
                                            <span className="hidden sm:inline">Triều Thần</span>
                                        </button>
                                        <button onClick={() => setActiveModal('harem')} className="flex items-center justify-center gap-2 bg-rose-100 hover:bg-rose-200 text-rose-700 font-semibold py-2 px-3 rounded-lg shadow-sm transition-all duration-200 dark:bg-rose-900/50 dark:hover:bg-rose-800/50 dark:text-rose-200">
                                            <HeartIcon className="w-5 h-5" />
                                            <span className="hidden sm:inline">Hậu Cung</span>
                                        </button>
                                         <button onClick={() => setActiveModal('military')} className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 px-3 rounded-lg shadow-sm transition-all duration-200 dark:bg-red-900/50 dark:hover:bg-red-800/50 dark:text-red-200">
                                            <ShieldCheckIcon className="w-5 h-5" />
                                            <span className="hidden sm:inline">Quân Sự</span>
                                        </button>
                                        <button onClick={() => setActiveModal('succession')} className="flex items-center justify-center gap-2 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-semibold py-2 px-3 rounded-lg shadow-sm transition-all duration-200 dark:bg-yellow-900/50 dark:hover:bg-yellow-800/50 dark:text-yellow-200">
                                            <UserGroupIcon className="w-5 h-5" />
                                            <span className="hidden sm:inline">Kế Vị</span>
                                        </button>
                                        <button onClick={() => setActiveModal('diplomacy')} className="flex items-center justify-center gap-2 bg-green-100 hover:bg-green-200 text-green-700 font-semibold py-2 px-3 rounded-lg shadow-sm transition-all duration-200 dark:bg-green-900/50 dark:hover:bg-green-800/50 dark:text-green-200">
                                            <GlobeAltIcon className="w-5 h-5" />
                                            <span className="hidden sm:inline">Ngoại Giao</span>
                                        </button>
                                        <button onClick={() => setActiveModal('aids')} className="flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 font-semibold py-2 px-3 rounded-lg shadow-sm transition-all duration-200 dark:bg-blue-900/50 dark:hover:bg-blue-800/50 dark:text-blue-200">
                                            <SparklesIcon className="w-5 h-5" />
                                            <span className="hidden sm:inline">Trợ Giúp</span>
                                        </button>
                                    </div>

                                    <div className="mt-8">
                                        {renderGameContent()}
                                    </div>
                                </>
                            )}
                        </div>
                    </>
                )}
                
                {/* Modal and file input are rendered outside the conditional to be available everywhere */}
                <Modal title={getModalTitle()} isOpen={!!activeModal} onClose={() => setActiveModal(null)}>
                    {renderModalContent()}
                </Modal>
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" style={{ display: 'none' }} />

            </main>
        </div>
    );
};

export default App;
