import React from 'react';
import { AID_INFO } from '../constants';
import type { AidType, NationalStat } from '../types';

interface AidsPanelProps {
    usedAids: AidType[];
    onUseAid: (aid: AidType, stat: NationalStat) => void;
}

const AidsPanel: React.FC<AidsPanelProps> = ({ usedAids, onUseAid }) => {
    return (
        <div className="space-y-4 p-1">
            {Object.entries(AID_INFO).map(([aidType, info]) => {
                const aid = aidType as AidType;
                const isUsed = usedAids.includes(aid);
                
                return (
                    <div key={aid} className={`p-4 rounded-lg shadow-sm border ${isUsed ? 'bg-stone-200' : 'bg-blue-50/70'} border-black/5 flex items-center gap-4`}>
                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${isUsed ? 'bg-stone-300' : 'bg-blue-100'}`}>
                           <info.icon className={`w-7 h-7 ${isUsed ? 'text-stone-500' : 'text-blue-600'}`} />
                        </div>
                        <div className="flex-grow">
                            <h3 className={`font-bold ${isUsed ? 'text-stone-500' : 'text-blue-900'}`}>{info.name}</h3>
                            <p className="text-sm text-stone-600">{info.description}</p>
                        </div>
                        <button
                            onClick={() => onUseAid(aid, info.stat)}
                            disabled={isUsed}
                            className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 text-sm disabled:bg-stone-400 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {isUsed ? "Đã dùng" : "Sử dụng"}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}

export default AidsPanel;