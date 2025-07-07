
import React from 'react';
import { DONATION_QR_CODE_URL } from '../constants';

const DonationPanel: React.FC = () => {
    return (
        <div className="p-4 text-center font-serif-display text-stone-700">
            <p className="mb-6 text-lg leading-relaxed">
                Cảm ơn bạn đã trải nghiệm game, nếu bạn ủng hộ thì mình chân thành cảm ơn.
            </p>
            <div className="flex justify-center">
                <img 
                    src={DONATION_QR_CODE_URL} 
                    alt="Mã QR để ủng hộ" 
                    className="w-68 h-68 max-w-full rounded-lg shadow-lg border-4 border-white object-contain"
                />
            </div>
        </div>
    );
};

export default DonationPanel;
