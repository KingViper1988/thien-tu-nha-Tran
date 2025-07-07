
import React, { useState, useMemo } from 'react';
import type { BudgetAllocations } from '../types';
import { Ministry } from '../types';
import { MINISTRY_INFO, TreasuryIcon } from '../constants';

interface BudgetAllocationProps {
    treasury: number;
    onConfirm: (allocations: BudgetAllocations) => void;
    taxRevenue: number;
}

const BudgetAllocation: React.FC<BudgetAllocationProps> = ({ treasury, onConfirm, taxRevenue }) => {
    const [allocations, setAllocations] = useState<BudgetAllocations>({
        [Ministry.Binh]: 0,
        [Ministry.Ho]: 0,
        [Ministry.Le]: 0,
        [Ministry.Hinh]: 0,
    });

    const totalAllocated = useMemo(() => {
        return Object.values(allocations).reduce((sum, val) => sum + val, 0);
    }, [allocations]);

    const canAfford = treasury >= totalAllocated;

    const handleSliderChange = (ministry: Ministry, value: number) => {
        setAllocations(prev => ({ ...prev, [ministry]: value }));
    };

    const handleSubmit = () => {
        if (canAfford) {
            onConfirm(allocations);
        }
    };

    return (
        <div className="bg-amber-50 border-2 border-red-800/50 rounded-lg p-6 lg:p-8 shadow-lg max-w-3xl mx-auto animate-fade-in">
            <div className="mb-6 pb-4 border-b-2 border-red-800/20">
                <h2 className="text-2xl font-serif-display font-bold text-red-900">Phân Bổ Ngân Sách (Budget Allocation)</h2>
                <p className="text-sm text-stone-600 mt-1">
                    Tâu bệ hạ, xin hãy toàn quyền phân bổ ngân sách cho các bộ để định hướng phát triển quốc gia.
                </p>
            </div>
            
            {taxRevenue > 0 && (
                 <div className="bg-green-100 border border-green-300 text-green-800 rounded-lg p-4 mb-6 shadow-sm text-center animate-fade-in">
                    <p className="font-semibold">Tâu bệ hạ, thuế vụ mùa thu đã thu về <span className="font-bold">{taxRevenue} vạn quan</span>, làm đầy ngân khố quốc gia.</p>
                 </div>
            )}

            <div className="bg-white/60 rounded-lg p-4 mb-6 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <TreasuryIcon className="w-8 h-8 text-yellow-600" />
                    <div>
                        <p className="text-sm font-semibold text-stone-600">Ngân khố hiện tại</p>
                        <p className="text-2xl font-bold text-stone-800">{treasury}</p>
                    </div>
                </div>
                <div className="text-right">
                    <p className={`text-sm font-semibold ${canAfford ? 'text-stone-600' : 'text-red-600'}`}>Tổng chi tiêu</p>
                    <p className={`text-2xl font-bold ${canAfford ? 'text-stone-800' : 'text-red-600'}`}>{totalAllocated}</p>
                </div>
            </div>

            <div className="space-y-6">
                {Object.values(Ministry).map((ministry) => {
                    const info = MINISTRY_INFO[ministry];
                    return (
                        <div key={ministry} className={`p-4 rounded-lg shadow-sm border ${info.bgColor} border-black/5`}>
                            <div className="flex items-center gap-3">
                                <info.icon className={`w-8 h-8 ${info.color}`} />
                                <div>
                                    <h3 className={`text-lg font-bold font-serif-display ${info.color}`}>{ministry}</h3>
                                    <p className="text-sm text-stone-600">{info.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mt-3">
                                <input
                                    type="range"
                                    min="0"
                                    max="50"
                                    step="1"
                                    value={allocations[ministry]}
                                    onChange={(e) => handleSliderChange(ministry, parseInt(e.target.value, 10))}
                                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <span className="text-lg font-bold text-stone-800 w-12 text-center">{allocations[ministry]}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 text-center">
                <button
                    onClick={handleSubmit}
                    disabled={!canAfford}
                    className="bg-red-800 text-yellow-50 font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 disabled:bg-stone-400 disabled:cursor-not-allowed disabled:scale-100"
                >
                    {canAfford ? "Phê chuẩn Ngân sách" : "Ngân khố không đủ"}
                </button>
            </div>
        </div>
    );
};

export default BudgetAllocation;
