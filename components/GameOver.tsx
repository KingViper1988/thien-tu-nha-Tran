import React from 'react';

interface GameOverProps {
    message: {
        title: string;
        text: string;
    };
    onRestart: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ message, onRestart }) => {
    return (
        <div className="bg-amber-50 border-2 border-red-800/50 rounded-lg p-6 lg:p-8 shadow-lg max-w-3xl mx-auto animate-fade-in text-center">
            <h2 className="text-3xl font-serif-display font-bold text-red-900 mb-4">{message.title}</h2>
            <p className="text-lg text-stone-700 font-serif-display leading-relaxed mb-8">
                {message.text}
            </p>
            <button
                onClick={onRestart}
                className="bg-red-800 hover:bg-red-700 text-yellow-50 font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
            >
                Chơi Lại (Play Again)
            </button>
        </div>
    );
};

export default GameOver;