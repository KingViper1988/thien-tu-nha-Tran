
import React from 'react';
import type { Consort } from '../types';

interface HaremDashboardProps {
    harem: Consort[];
    onFavorConsort: (consortId: string) => void;
    favorUsedThisYear: boolean;
}

const getFavorStyle = (value: number) => {
    if (value > 85) return { text: "Vô cùng sủng ái", color: "text-pink-600", progress: "bg-pink-500" };
    if (value > 65) return { text: "Sủng ái", color: "text-rose-600", progress: "bg-rose-400" };
    if (value > 40) return { text: "Bình thường", color: "text-slate-600", progress: "bg-slate-400" };
    if (value > 20) return { text: "Lạnh nhạt", color: "text-gray-500", progress: "bg-gray-400" };
    return { text: "Thất sủng", color: "text-stone-500", progress: "bg-stone-400" };
};

const HaremDashboard: React.FC<HaremDashboardProps> = ({ harem, onFavorConsort, favorUsedThisYear }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
            {harem.length === 0 ? (
                <p className="text-stone-500 italic col-span-full text-center py-4">Hậu cung chưa có phi tần nào.</p>
            ) : (
                harem.map((consort) => {
                    const style = getFavorStyle(consort.relationship);
                    return (
                        <div key={consort.id} className="bg-rose-50/70 p-4 rounded-lg shadow-sm border border-black/5 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-rose-900">{consort.name}</h3>
                                        <p className="text-sm text-rose-800/80 font-semibold">{consort.title}</p>
                                    </div>
                                    <p className="text-xs text-stone-500 bg-stone-100 px-2 py-1 rounded-full">{consort.origin}</p>
                                </div>
                                <div className="mt-3">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <p className={`text-sm font-semibold ${style.color}`}>{style.text}</p>
                                        <p className="text-sm font-bold text-rose-800">{consort.relationship}/100</p>
                                    </div>
                                    <div className="w-full bg-rose-200/80 rounded-full h-2.5">
                                        <div
                                            className={`${style.progress} h-2.5 rounded-full transition-all duration-500`}
                                            style={{ width: `${consort.relationship}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4 text-right">
                                <button
                                    onClick={() => onFavorConsort(consort.id)}
                                    disabled={favorUsedThisYear}
                                    className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-1 px-3 text-xs rounded-md shadow-sm transition-all duration-200 disabled:bg-stone-300 disabled:text-stone-500 disabled:cursor-not-allowed"
                                    title={favorUsedThisYear ? "Bệ hạ đã sủng ái người khác trong năm nay." : "Sủng ái vị phi tần này (+15 hảo cảm, 10% có hoàng tử năm sau)"}
                                >
                                    Sủng ái
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default HaremDashboard;
