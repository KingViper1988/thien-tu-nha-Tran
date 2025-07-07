import React from 'react';
import type { Military, Official } from '../types';
import { Faction } from '../types';
import { ShieldCheckIcon } from '../constants';

interface MilitaryPanelProps {
    military: Military;
    officials: Official[];
}

const StatBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <p className="text-sm font-semibold text-stone-600">{label}</p>
            <p className="text-sm font-bold text-stone-800">{value} / 100</p>
        </div>
        <div className="w-full bg-stone-200 rounded-full h-4">
            <div
                className={`${color} h-4 rounded-full text-center text-white text-xs font-bold leading-4 transition-all duration-500`}
                style={{ width: `${value}%` }}
            >
                {value}
            </div>
        </div>
    </div>
);


const MilitaryPanel: React.FC<MilitaryPanelProps> = ({ military, officials }) => {
    const generals = officials.filter(o => o.faction === Faction.War || o.title.includes("tướng"));

    return (
        <div className="p-1 space-y-6">
            <div className="bg-red-50/70 p-4 rounded-lg shadow-sm border border-black/5">
                <h3 className="text-lg font-bold font-serif-display text-red-900 mb-4">Tổng quan Quân lực</h3>
                <div className="space-y-4">
                    <StatBar label="Sức mạnh quân đội" value={military.strength} color="bg-red-500" />
                    <StatBar label="Tinh thần chiến đấu" value={military.morale} color="bg-orange-500" />
                </div>
            </div>

            <div className="bg-stone-50 p-4 rounded-lg shadow-sm border border-black/5">
                 <h3 className="text-lg font-bold font-serif-display text-stone-800 mb-4">Các Tướng lĩnh</h3>
                 {generals.length > 0 ? (
                    <ul className="space-y-3">
                        {generals.map(general => (
                            <li key={general.name} className="flex items-center gap-4 p-2 bg-white rounded-md">
                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                    <ShieldCheckIcon className="w-6 h-6 text-red-600" />
                                </div>
                                <div>
                                    <p className="font-bold text-stone-800">{general.name}</p>
                                    <p className="text-sm text-stone-500">{general.title}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                 ) : (
                    <p className="text-stone-500 italic">Trong triều không có tướng lĩnh nào nổi bật.</p>
                 )}
            </div>
        </div>
    );
};

export default MilitaryPanel;