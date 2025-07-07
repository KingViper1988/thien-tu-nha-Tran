
import React from 'react';
import type { Official } from '../types';
import { Personality, Faction } from '../types';

interface RelationshipsDashboardProps {
    officials: { [key: string]: Official };
    treasury: number;
    onBribe: (key: string) => void;
}

const getRelationshipStyle = (value: number) => {
    if (value > 85) return { text: "Cực kỳ trung thành", color: "text-green-700", progress: "bg-green-500" };
    if (value > 65) return { text: "Trung thành", color: "text-green-600", progress: "bg-green-400" };
    if (value > 40) return { text: "Trung lập", color: "text-yellow-700", progress: "bg-yellow-500" };
    if (value > 20) return { text: "Bất mãn", color: "text-orange-700", progress: "bg-orange-500" };
    return { text: "Có ý phản nghịch", color: "text-red-700", progress: "bg-red-600" };
};

const PersonalityBadge: React.FC<{ personality: Personality }> = ({ personality }) => {
    let colorClasses = '';
    switch(personality) {
        case Personality.Loyal: colorClasses = 'bg-blue-100 text-blue-800'; break;
        case Personality.Ambitious: colorClasses = 'bg-purple-100 text-purple-800'; break;
        case Personality.Scheming: colorClasses = 'bg-red-100 text-red-800'; break;
        case Personality.Upright: colorClasses = 'bg-green-100 text-green-800'; break;
        default: colorClasses = 'bg-gray-100 text-gray-800';
    }
    return <span className={`text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full ${colorClasses}`}>{personality}</span>
}

const FactionBadge: React.FC<{ faction: Faction }> = ({ faction }) => {
    let colorClasses = '';
    switch(faction) {
        case Faction.War: colorClasses = 'border-red-500 text-red-700'; break;
        case Faction.Peace: colorClasses = 'border-blue-500 text-blue-700'; break;
        case Faction.Conservative: colorClasses = 'border-gray-500 text-gray-700'; break;
    }
    return <span className={`text-xs font-semibold px-2 py-1 border-b-2 ${colorClasses}`}>{faction}</span>
}

const RelationshipsDashboard: React.FC<RelationshipsDashboardProps> = ({ officials, treasury, onBribe }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
            {Object.entries(officials).map(([key, official]) => {
                const style = getRelationshipStyle(official.relationship);
                const canBribe = treasury >= 5 && official.relationship < 100;
                return (
                    <div key={key} className="bg-stone-50 p-4 rounded-lg shadow-sm border border-black/5 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                 <div>
                                    <h3 className="font-bold text-stone-800">{official.name}</h3>
                                    <p className="text-sm text-stone-500">{official.title}</p>
                                </div>
                                <div className="text-right flex-shrink-0">
                                   <PersonalityBadge personality={official.personality} />
                                   <FactionBadge faction={official.faction} />
                               </div>
                            </div>
                            <div className="mt-3">
                                 <div className="flex justify-between items-baseline mb-1">
                                    <p className={`text-sm font-semibold ${style.color}`}>{style.text}</p>
                                    <p className="text-sm font-bold text-stone-600">{official.relationship}/100</p>
                                 </div>
                                <div className="w-full bg-stone-200 rounded-full h-2.5">
                                    <div
                                        className={`${style.progress} h-2.5 rounded-full transition-all duration-500`}
                                        style={{ width: `${official.relationship}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 text-right">
                           <button 
                                onClick={() => onBribe(key)}
                                disabled={!canBribe}
                                className="bg-yellow-500 hover:bg-yellow-600 text-yellow-900 font-semibold py-1 px-3 text-xs rounded-md shadow-sm transition-all duration-200 disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed"
                                title={!canBribe ? (treasury < 5 ? "Không đủ ngân khố" : "Lòng trung thành đã tối đa") : "Chi 5 vạn quan để tăng 10 trung thành"}
                            >
                                Mua chuộc (-5 Ngân khố)
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RelationshipsDashboard;
