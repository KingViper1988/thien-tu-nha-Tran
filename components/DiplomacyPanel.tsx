
import React from 'react';
import type { Diplomacy, Military } from '../types';
import { NeighboringState } from '../types';
import { ShieldCheckIcon, SwordIcon } from '../constants';

interface DiplomacyPanelProps {
    diplomacy: Diplomacy;
    military: Military;
    onAttack: (target: NeighboringState) => void;
}

const getRelationshipStyle = (value: number) => {
    if (value > 70) return { text: "Đồng minh", color: "text-green-700", progress: "bg-green-500" };
    if (value > 40) return { text: "Trung lập", color: "text-yellow-700", progress: "bg-yellow-500" };
    if (value > 20) return { text: "Căng thẳng", color: "text-orange-700", progress: "bg-orange-500" };
    return { text: "Thù địch", color: "text-red-700", progress: "bg-red-600" };
};

const DiplomacyPanel: React.FC<DiplomacyPanelProps> = ({ diplomacy, military, onAttack }) => {
    return (
        <div className="p-1 space-y-4">
             {Object.entries(diplomacy).map(([state, value]) => {
                const style = getRelationshipStyle(value.relationship);
                const attackCost = Math.floor(value.defense * 0.5);
                const canAttack = military.strength >= attackCost;

                return (
                     <div key={state} className="bg-green-50/70 dark:bg-green-900/30 p-4 rounded-lg shadow-sm border border-black/5">
                        <div className="flex justify-between items-start">
                             <h3 className="text-lg font-bold font-serif-display text-green-900 dark:text-green-200">{state}</h3>
                             <button 
                                onClick={() => onAttack(state as NeighboringState)}
                                disabled={!canAttack}
                                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 text-sm disabled:bg-stone-400 dark:disabled:bg-stone-600 disabled:cursor-not-allowed"
                                title={!canAttack ? `Cần ít nhất ${attackCost} sức mạnh để tấn công` : `Tấn công ${state}`}
                             >
                                <SwordIcon className="w-5 h-5"/>
                                Tấn công
                             </button>
                        </div>
                         <div className="mt-3 space-y-3">
                             <div>
                                 <div className="flex justify-between items-baseline mb-1">
                                    <p className={`text-sm font-semibold ${style.color}`}>Quan hệ: {style.text}</p>
                                    <p className="text-sm font-bold text-stone-600 dark:text-stone-300">{value.relationship}/100</p>
                                 </div>
                                <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2.5">
                                    <div
                                        className={`${style.progress} h-2.5 rounded-full transition-all duration-500`}
                                        style={{ width: `${value.relationship}%` }}
                                    ></div>
                                </div>
                             </div>
                             <div>
                                 <div className="flex justify-between items-baseline mb-1">
                                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Phòng ngự của địch</p>
                                    <p className="text-sm font-bold text-stone-600 dark:text-stone-300">{value.defense}/100</p>
                                 </div>
                                <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2.5">
                                    <div
                                        className="bg-gray-500 h-2.5 rounded-full transition-all duration-500"
                                        style={{ width: `${value.defense}%` }}
                                    ></div>
                                </div>
                             </div>
                        </div>
                    </div>
                )
             })}
        </div>
    );
};

export default DiplomacyPanel;
