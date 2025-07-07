
import React from 'react';

interface InvasionCountdownProps {
    currentYear: number;
    nextInvasionYear: number | null;
}

const InvasionCountdown: React.FC<InvasionCountdownProps> = ({ currentYear, nextInvasionYear }) => {
    if (nextInvasionYear === null) {
        return (
            <div className="mt-2 text-sm font-semibold text-green-600 dark:text-green-400">
                (Mối họa từ phương Bắc đã được dẹp yên)
            </div>
        );
    }

    const yearsLeft = nextInvasionYear - currentYear;

    if (yearsLeft <= 0) {
        return (
            <div className="mt-2 text-sm font-bold text-red-500 animate-pulse">
                (Quân Nguyên đang xâm lược!)
            </div>
        );
    }
    
    const textColor = yearsLeft <= 5 ? "text-red-600 dark:text-red-400 font-bold" : "text-orange-600 dark:text-orange-400";

    return (
        <div className={`mt-2 text-sm font-semibold ${textColor}`}>
            (Quân Nguyên sẽ xâm lược trong {yearsLeft} năm nữa)
        </div>
    );
};

export default InvasionCountdown;
