import React, { useState } from 'react';
import { X, Copy, Check, Share2 } from 'lucide-react';
import { Language } from '../types/content';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, language }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://decomurale-guide.app';
  const title = language === 'fr'
    ? 'Déco Murale : Le Guide Ultime Pas à Pas pour Vos Murs'
    : 'Wall Decor: The Ultimate Step-by-Step Guide';

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareLinks = [
    {
      name: 'Pinterest',
      icon: '📌',
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&description=${encodeURIComponent(title)}`,
      color: 'hover:bg-red-50 hover:text-red-600',
    },
    {
      name: 'WhatsApp',
      icon: '💬',
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} - ${currentUrl}`)}`,
      color: 'hover:bg-emerald-50 hover:text-emerald-600',
    },
    {
      name: 'Twitter / X',
      icon: '𝕏',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-slate-50 hover:text-slate-900',
    },
    {
      name: 'Facebook',
      icon: 'f',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      color: 'hover:bg-blue-50 hover:text-blue-600',
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E7DED3] relative animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#736356] hover:bg-[#F2ECE4] rounded-full transition-colors cursor-pointer"
          aria-label="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#FAF4ED] text-[#C86D51] rounded-2xl">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-serif text-[#1F2421]">
              {language === 'fr' ? 'Partager ce guide' : 'Share this guide'}
            </h3>
            <p className="text-xs text-[#7A6B5F]">
              {language === 'fr'
                ? 'Inspirez vos proches et amis pour leur déco murale'
                : 'Inspire your friends with fresh wall decor ideas'}
            </p>
          </div>
        </div>

        {/* Copy Link Row */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-[#483F37] mb-1.5 block">
            {language === 'fr' ? 'Lien de l’article :' : 'Article Link:'}
          </label>
          <div className="flex items-center gap-2 bg-[#F4EFEB] p-2 rounded-xl border border-[#DDD3C7]">
            <input
              type="text"
              readOnly
              value={currentUrl}
              className="bg-transparent text-xs text-[#5E5246] w-full focus:outline-none select-all font-mono"
            />
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#1F2421] text-white hover:bg-[#383F3A]'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{language === 'fr' ? 'Copié !' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{language === 'fr' ? 'Copier' : 'Copy'}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {shareLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2.5 p-3 rounded-xl border border-[#E7DED3] text-xs font-semibold text-[#483F37] transition-all ${item.color}`}
            >
              <span className="text-base font-bold">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
