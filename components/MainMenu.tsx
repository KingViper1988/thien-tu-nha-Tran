
import React from 'react';
import { FlourishIcon, QuestionMarkCircleIcon, GiftIcon, SunIcon, MoonIcon } from '../constants';

interface MainMenuProps {
    onNewGame: () => void;
    onLoadGame: () => void;
    onShowTutorial: () => void;
    onShowDonate: () => void;
    toggleDarkMode: () => void;
    isDarkMode: boolean;
}

const MainMenu: React.FC<MainMenuProps> = ({ onNewGame, onLoadGame, onShowTutorial, onShowDonate, toggleDarkMode, isDarkMode }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center animate-fade-in">
            <div className="absolute top-4 right-4 md:top-8 md:right-8">
                 <button onClick={toggleDarkMode} className="bg-stone-200/50 dark:bg-stone-700/50 backdrop-blur-sm hover:bg-stone-300 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 text-sm flex items-center gap-2">
                   {isDarkMode ? <SunIcon className="w-5 h-5 text-yellow-400"/> : <MoonIcon className="w-5 h-5 text-indigo-500"/>}
                   <span className="hidden sm:inline">{isDarkMode ? 'Sáng' : 'Tối'}</span>
                </button>
            </div>
            
            <div className="flex justify-center items-center gap-4 mb-4">
               <FlourishIcon className="w-16 h-16 text-red-900 dark:text-amber-300"/>
               <h1 className="text-5xl md:text-7xl font-extrabold font-serif-display text-red-900/90 dark:text-amber-200/90 tracking-wider">
                   Thiên Tử Nhà Trần
               </h1>
               <FlourishIcon className="w-16 h-16 text-red-900 dark:text-amber-300 scale-x-[-1]"/>
            </div>
            <p className="text-stone-600 dark:text-stone-400 font-semibold text-lg mb-12">
                A Tran Dynasty Strategy Game
            </p>

            <div className="space-y-4 w-full max-w-sm">
                <button
                    onClick={onNewGame}
                    className="w-full bg-red-800 hover:bg-red-700 dark:bg-amber-600 dark:hover:bg-amber-500 text-yellow-50 dark:text-red-950 font-bold py-4 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 text-xl font-serif-display tracking-wide"
                >
                    Bắt đầu (New Game)
                </button>
                <button
                    onClick={onLoadGame}
                    className="w-full bg-stone-700 hover:bg-stone-600 dark:bg-stone-800 dark:hover:bg-stone-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 text-lg font-serif-display"
                >
                    Tải Game (Load Game)
                </button>
                <div className="flex gap-4 pt-4">
                    <button
                        onClick={onShowTutorial}
                        className="flex-1 bg-sky-600 hover:bg-sky-700 dark:bg-sky-700 dark:hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <QuestionMarkCircleIcon className="w-5 h-5"/>
                        Hướng Dẫn
                    </button>
                    <button
                        onClick={onShowDonate}
                        className="flex-1 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <GiftIcon className="w-5 h-5"/>
                        Ủng hộ
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainMenu;
