
import React from 'react';
import type { Prince } from '../types';
import { UserGroupIcon, StarIcon } from '../constants';

interface SuccessionPanelProps {
    princes: Prince[];
    onNurturePrince: (princeId: string) => void;
    nurtureUsedThisYear: boolean;
}

const SuccessionPanel: React.FC<SuccessionPanelProps> = ({ princes, onNurturePrince, nurtureUsedThisYear }) => {
    return (
        <div className="p-1">
            <div className="bg-yellow-50/70 p-4 rounded-lg shadow-sm border border-black/5">
                 <h3 className="text-lg font-bold font-serif-display text-yellow-900 mb-4">Hoàng Tử & Kế Vị</h3>
                {princes.length > 0 ? (
                    <ul className="space-y-3">
                        {princes.map(prince => (
                             <li key={prince.id} className={`flex items-center gap-4 p-3 bg-white rounded-md shadow-sm ${prince.isCrownPrince ? 'border-2 border-yellow-500' : ''}`}>
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                    <UserGroupIcon className="w-7 h-7 text-yellow-700" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-stone-800 flex items-center gap-1.5">
                                        {prince.name}
                                        {prince.isCrownPrince && <StarIcon className="w-5 h-5 text-yellow-500" title="Thái tử" />}
                                    </p>
                                    <p className="text-sm text-stone-500">Mẹ: {prince.mother}</p>
                                     <div className="mt-1">
                                        <p className="text-xs text-stone-600">Tiến độ kế vị: {prince.successionPoints}/20</p>
                                        <div className="w-full bg-stone-200 rounded-full h-1.5 mt-0.5">
                                            <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: `${(prince.successionPoints / 20) * 100}%`}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right flex-shrink-0 flex flex-col items-end gap-2">
                                     <div className="text-center">
                                      <p className="text-lg font-bold text-stone-800">{prince.age}</p>
                                      <p className="text-xs text-stone-500">tuổi</p>
                                     </div>
                                      <button
                                        onClick={() => onNurturePrince(prince.id)}
                                        disabled={nurtureUsedThisYear || !!prince.isCrownPrince}
                                        className="bg-green-600 hover:bg-green-700 text-white font-semibold py-1 px-3 text-xs rounded-md shadow-sm transition-all duration-200 disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed"
                                        title={nurtureUsedThisYear ? "Đã nuôi dưỡng hoàng tử khác trong năm nay" : (prince.isCrownPrince ? "Đã là Thái tử" : "Nuôi dưỡng (+1 tiến độ kế vị)")}
                                    >
                                        Nuôi dưỡng
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                     <p className="text-stone-500 italic text-center py-4">Bệ hạ chưa có hoàng tử nào để nối dõi.</p>
                )}
            </div>
        </div>
    );
};

export default SuccessionPanel;
