
import React from 'react';
import type { InvasionEventData, InvasionEventOption, Official } from '../types';

interface InvasionEventProps {
    eventData: InvasionEventData;
    advisor: Official | undefined;
    onDecision: (option: InvasionEventOption) => void;
}

const InvasionEvent: React.FC<InvasionEventProps> = ({ eventData, advisor, onDecision }) => {
    return (
        <div className="bg-red-100/50 dark:bg-red-900/30 border-2 border-red-800/50 dark:border-red-500/50 rounded-lg p-6 lg:p-8 shadow-lg max-w-3xl mx-auto animate-fade-in">
            <div className="mb-6 pb-4 border-b-2 border-red-800/20">
                <h2 className="text-3xl font-serif-display font-bold text-red-900 dark:text-red-200 animate-pulse">{eventData.title}</h2>
                {advisor && (
                    <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                        Cố vấn: {advisor.name}, {advisor.title}
                    </p>
                )}
            </div>
            <div className="prose prose-stone dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 mb-8 font-serif-display leading-relaxed">
                <p>{eventData.description}</p>
            </div>
            <div>
                <h3 className="text-lg font-serif-display font-semibold text-stone-800 dark:text-stone-200 mb-4">Thánh ý của Bệ hạ? (Your Majesty's strategy?)</h3>
                <div className="flex flex-col space-y-3">
                    {eventData.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onDecision(option)}
                            className="w-full text-left bg-white dark:bg-stone-800 hover:bg-yellow-100 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-lg p-4 transition-all duration-200 shadow-sm hover:shadow-md hover:border-yellow-400 dark:hover:border-amber-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <p className="font-semibold text-stone-800 dark:text-stone-100">{option.text}</p>
                            <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">{option.description}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InvasionEvent;
