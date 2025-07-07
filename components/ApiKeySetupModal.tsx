
import React, { useState } from 'react';

interface ApiKeySetupModalProps {
    currentKey: string | null;
    onKeyUpdate: (key: string | null) => void;
    onClose: () => void;
}

const ApiKeySetupModal: React.FC<ApiKeySetupModalProps> = ({ currentKey, onKeyUpdate, onClose }) => {
    const [inputKey, setInputKey] = useState(currentKey || '');
    const [statusMessage, setStatusMessage] = useState<string | null>(currentKey ? 'API Key đã được lưu.' : null);

    const handleSave = () => {
        const trimmedKey = inputKey.trim();
        if (trimmedKey) {
            onKeyUpdate(trimmedKey);
            setStatusMessage('API Key đã được lưu thành công.');
            onClose();
        } else {
            handleClear();
        }
    };

    const handleClear = () => {
        onKeyUpdate(null);
        setInputKey('');
        setStatusMessage('API Key đã được xóa.');
    };

    return (
        <div className="p-1 font-serif-display text-stone-700 dark:text-stone-300 space-y-4">
            <div className="bg-yellow-100/60 dark:bg-yellow-900/30 border border-yellow-300 dark:border-yellow-700 text-yellow-900 dark:text-yellow-200 rounded-lg p-3 text-sm">
                <p><strong>Cảnh báo bảo mật:</strong> API key của bạn sẽ được lưu trữ trong bộ nhớ cục bộ của trình duyệt. Không chia sẻ key này và chỉ sử dụng trên máy tính cá nhân của bạn.</p>
            </div>
            
            <div>
                <label htmlFor="apiKeyInput" className="block text-md font-semibold text-stone-800 dark:text-stone-200 mb-2">
                    Nhập Google Gemini API Key
                </label>
                <input
                    id="apiKeyInput"
                    type="password"
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder="Dán API key của bạn tại đây"
                    className="w-full px-4 py-2 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-amber-500"
                />
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Bạn có thể nhận API key từ <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Google AI Studio</a>.
                </p>
            </div>

            {statusMessage && (
                 <p className="text-green-700 dark:text-green-400 font-semibold text-center">{statusMessage}</p>
            )}

            <div className="flex justify-end gap-4 pt-4">
                <button
                    onClick={handleClear}
                    className="bg-stone-500 hover:bg-stone-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                >
                    Xóa Key
                </button>
                <button
                    onClick={handleSave}
                    className="bg-red-800 hover:bg-red-700 dark:bg-amber-600 dark:hover:bg-amber-500 text-yellow-50 dark:text-red-950 font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-300"
                >
                    Lưu Key
                </button>
            </div>
        </div>
    );
};

export default ApiKeySetupModal;
