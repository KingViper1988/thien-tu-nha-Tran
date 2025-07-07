import React from 'react';
import type { Prince } from '../types';
import { UserGroupIcon } from '../constants';

interface SuccessionPanelProps {
    princes: Prince[];
}

const SuccessionPanel: React.FC<SuccessionPanelProps> = ({ princes }) => {
    return (
        <div className="p-1">
            <div className="bg-yellow-50/70 p-4 rounded-lg shadow-sm border border-black/5">
                 <h3 className="text-lg font-bold font-serif-display text-yellow-900 mb-4">Hoàng Tử & Kế Vị</h3>
                {princes.length > 0 ? (
                    <ul className="space-y-3">
                        {princes.map(prince => (
                             <li key={prince.id} className="flex items-center gap-4 p-3 bg-white rounded-md shadow-sm">
                                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                    <UserGroupIcon className="w-7 h-7 text-yellow-700" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-bold text-stone-800">{prince.name}</p>
                                    <p className="text-sm text-stone-500">Mẹ: {prince.mother}</p>
                                </div>
                                 <div className="text-right">
                                      <p className="text-lg font-bold text-stone-800">{prince.age}</p>
                                      <p className="text-xs text-stone-500">tuổi</p>
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