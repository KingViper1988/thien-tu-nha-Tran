
import React from 'react';
import type { Petition, PetitionOption } from '../types';

interface CourtSessionProps {
    petition: Petition | null;
    onDecision: (option: PetitionOption, petitionTitle: string) => void;
    onEndYear: () => void;
    isEndingYear: boolean;
}

const CourtSession: React.FC<CourtSessionProps> = ({ petition, onDecision, onEndYear, isEndingYear }) => {
    if (isEndingYear) {
        return (
            <div className="text-center p-8 bg-amber-50 border-2 border-red-800/50 rounded-lg shadow-lg">
                <h3 className="text-xl font-serif-display font-bold text-red-900">Các Sử Quan đang ghi chép...</h3>
                <p className="text-stone-600 mt-2">The court scribes are compiling the annals for the year. Please wait.</p>
                <div className="mt-4 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-800"></div>
                </div>
            </div>
        );
    }
    
    if (!petition) {
        return (
            <div className="text-center p-8 bg-amber-50 border-2 border-red-800/50 rounded-lg shadow-lg animate-fade-in">
                <h3 className="text-xl font-serif-display font-bold text-red-900">Buổi chầu đã kết thúc</h3>
                <p className="text-stone-600 mt-2">The court session has ended for today. All petitions have been addressed.</p>
                <button
                    onClick={onEndYear}
                    className="mt-6 bg-red-800 hover:bg-red-700 text-yellow-50 font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                >
                    Kết thúc năm & Viết Biên Niên Sử (End Year & Write Annals)
                </button>
            </div>
        );
    }

    return (
        <div className="bg-amber-50 border-2 border-red-800/50 rounded-lg p-6 lg:p-8 shadow-lg max-w-3xl mx-auto animate-fade-in">
            <div className="mb-6 pb-4 border-b-2 border-red-800/20">
                <h2 className="text-2xl font-serif-display font-bold text-red-900">{petition.title}</h2>
                <p className="text-sm text-stone-600 mt-1">
                    Trình bởi: {petition.from.name}, {petition.from.title}
                </p>
            </div>
            <div className="prose prose-stone max-w-none text-stone-700 mb-8 font-serif-display leading-relaxed">
                <p>{petition.description}</p>
            </div>
            <div>
                <h3 className="text-lg font-serif-display font-semibold text-stone-800 mb-4">Thánh ý của Bệ hạ? (Your Majesty's decision?)</h3>
                <div className="flex flex-col space-y-3">
                    {petition.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => onDecision(option, petition.title)}
                            className="w-full text-left bg-white hover:bg-yellow-100 border border-stone-300 rounded-lg p-4 transition-all duration-200 shadow-sm hover:shadow-md hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        >
                            <p className="font-semibold text-stone-800">{option.text}</p>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CourtSession;
