
import React from 'react';
import type { Stats } from '../types';
import { NationalStat } from '../types';
import StatDisplay from './StatDisplay';
import { ProsperityIcon, LivelihoodIcon, EducationIcon, SecurityIcon, TreasuryIcon, PrestigeIcon } from '../constants';

interface DashboardProps {
    stats: Stats;
}

const statConfig = {
    [NationalStat.Prosperity]: { icon: ProsperityIcon, color: 'text-green-600', bgColor: 'bg-green-100' },
    [NationalStat.Livelihood]: { icon: LivelihoodIcon, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    [NationalStat.Education]: { icon: EducationIcon, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    [NationalStat.Security]: { icon: SecurityIcon, color: 'text-red-600', bgColor: 'bg-red-100' },
    [NationalStat.Treasury]: { icon: TreasuryIcon, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    [NationalStat.Prestige]: { icon: PrestigeIcon, color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
};

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
    return (
        <div className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-4">
            <h2 className="text-xl font-bold font-serif-display text-stone-700 mb-4 px-2">Quốc Lực (National Stats)</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(stats).map(([key, value]) => {
                    const config = statConfig[key as NationalStat];
                    return (
                        <StatDisplay
                            key={key}
                            label={key as NationalStat}
                            value={value}
                            Icon={config.icon}
                            color={config.color}
                            bgColor={config.bgColor}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;
