import React from 'react';
import { Star, X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClose: () => void;
  actionText?: string;
  onAction?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  description,
  icon,
  onClose,
  actionText = 'বুঝেছি / বন্ধ করুন',
  onAction
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex items-center justify-center p-6 animate-fade-in">
      <div 
        className="bg-white w-full max-w-xs rounded-2xl p-6 card-shadow text-center transform transition-transform scale-100 relative border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 bg-mint rounded-full flex items-center justify-center text-forest text-2xl mx-auto mb-4 border border-forest/10 shadow-xs">
          {icon || <Star className="w-7 h-7 text-forest fill-forest/20" />}
        </div>

        <h3 className="text-base font-bold text-charcoal mb-1.5 leading-snug">
          {title}
        </h3>

        <p className="text-xs text-gray-600 mb-6 whitespace-pre-line leading-relaxed">
          {description}
        </p>

        <div className="space-y-2">
          {onAction && actionText && (
            <button
              onClick={() => {
                onAction();
                onClose();
              }}
              className="w-full bg-forest text-white py-2.5 rounded-xl font-semibold text-xs smooth-press hover:bg-forest-dark cursor-pointer shadow-xs"
            >
              {actionText}
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full bg-mint/50 text-forest py-2.5 rounded-xl font-semibold text-xs smooth-press hover:bg-mint cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
