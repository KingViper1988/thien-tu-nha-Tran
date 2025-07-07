
import React, { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-fade-in" aria-hidden="true" />

            <div
                ref={modalRef}
                className="relative z-10 w-full max-w-2xl bg-amber-50 rounded-xl shadow-2xl border border-red-800/20 transform transition-all animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-red-800/10">
                    <h2 id="modal-title" className="text-xl font-bold font-serif-display text-red-900">{title}</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        className="p-2 rounded-full text-stone-500 hover:bg-stone-200/80 hover:text-stone-800 transition-colors"
                    >
                       <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
