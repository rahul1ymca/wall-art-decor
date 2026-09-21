import React from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  imageAlt: string;
  caption?: string;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageAlt,
  caption,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="rounded-2xl overflow-hidden shadow-2xl bg-neutral-900">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="max-h-[75vh] w-auto object-contain rounded-2xl"
          />
        </div>

        {caption && (
          <p className="text-white/80 text-sm mt-3 text-center max-w-xl font-light">
            {caption}
          </p>
        )}
      </div>
    </div>
  );
};
