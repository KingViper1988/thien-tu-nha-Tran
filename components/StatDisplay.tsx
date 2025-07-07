
import React from 'react';
import type { NationalStat } from '../types';

interface StatDisplayProps {
    label: NationalStat;
    value: number;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    color: string;
    bgColor: string;
}

const StatDisplay: React.FC<StatDisplayProps> = ({ label, value, Icon, color, bgColor }) => {
    const progressColor = value < 30 ? 'bg-red-500' : value < 70 ? 'bg-yellow-500' : 'bg-green-500';

    return (
        <div className={`p-4 rounded-lg shadow-md transition-all duration-300 ${bgColor} border border-black/5`}>
            <div className="flex items-center justify-between">
                <p className={`text-sm font-bold ${color}`}>{label}</p>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-stone-800 mt-2">{value}</p>
            <div className="w-full bg-stone-200 rounded-full h-2 mt-2">
                <div
                    className={`${progressColor} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );
};

export default StatDisplay;
