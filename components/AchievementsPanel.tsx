
import React from 'react';
import type { Achievement } from '../types';
import { LockClosedIcon } from '../constants';

interface AchievementsPanelProps {
    allAchievements: Achievement[];
    unlockedIds: string[];
}

const AchievementsPanel: React.FC<AchievementsPanelProps> = ({ allAchievements, unlockedIds }) => {
    return (
        <div className="p-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allAchievements.map((achievement) => {
                    const isUnlocked = unlockedIds.includes(achievement.id);
                    const Icon = achievement.icon;

                    return (
                        <div
                            key={achievement.id}
                            className={`p-4 rounded-lg shadow-sm border flex items-center gap-4 transition-all duration-300 ${
                                isUnlocked 
                                    ? 'bg-yellow-50/70 border-yellow-300' 
                                    : 'bg-stone-100 border-stone-200'
                            }`}
                        >
                            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                isUnlocked ? 'bg-yellow-200' : 'bg-stone-200'
                            }`}>
                                {isUnlocked ? (
                                    <Icon className="w-7 h-7 text-yellow-600" />
                                ) : (
                                    <LockClosedIcon className="w-7 h-7 text-stone-400" />
                                )}
                            </div>
                            <div className="flex-grow">
                                <h3 className={`font-bold font-serif-display ${
                                    isUnlocked ? 'text-yellow-900' : 'text-stone-500'
                                }`}>
                                    {isUnlocked ? achievement.name : 'Thành tựu chưa mở khóa'}
                                </h3>
                                <p className={`text-sm ${
                                    isUnlocked ? 'text-stone-600' : 'text-stone-400 italic'
                                }`}>
                                    {isUnlocked ? achievement.description : '???'}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default AchievementsPanel;
