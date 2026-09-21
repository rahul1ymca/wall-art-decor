import React, { useState, useEffect } from 'react';
import { Share2, Volume2, Globe, Printer, Type, Bookmark } from 'lucide-react';
import { Language } from '../types/content';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onShareClick: () => void;
  onToggleAudio: () => void;
  isAudioVisible: boolean;
  fontSize: 'normal' | 'large';
  onFontSizeToggle: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  onShareClick,
  onToggleAudio,
  isAudioVisible,
  fontSize,
  onFontSizeToggle,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#EAE2D7] transition-all">
      {/* Reading Progress Bar */}
      <div className="w-full h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#C86D51] to-[#D4A373] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a href="#intro" className="flex items-center gap-2 group text-decoration-none">
          <div className="w-9 h-9 rounded-xl bg-[#1F2421] text-white flex items-center justify-center font-serif text-lg font-bold shadow-xs group-hover:bg-[#C86D51] transition-colors">
            D
          </div>
          <div>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-[#1F2421] block leading-none">
              DÉCO MURALE
            </span>
            <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C7A6B]">
              MAGAZINE D’INTÉRIEUR
            </span>
          </div>
        </a>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switch Button */}
          <div className="flex items-center bg-[#F0E8DD] rounded-full p-1 border border-[#E3D6C5]">
            <button
              onClick={() => onLanguageChange('fr')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                language === 'fr'
                  ? 'bg-white text-[#1F2421] shadow-xs'
                  : 'text-[#7A6B5F] hover:text-[#1F2421]'
              }`}
              title="Passer en Français"
              aria-label="Passer en Français"
            >
              <span>🇫🇷</span>
              <span className="hidden sm:inline">FR</span>
            </button>
            <button
              onClick={() => onLanguageChange('en')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-[#1F2421] shadow-xs'
                  : 'text-[#7A6B5F] hover:text-[#1F2421]'
              }`}
              title="Switch to English"
              aria-label="Switch to English"
            >
              <span>🇬🇧</span>
              <span className="hidden sm:inline">EN</span>
            </button>
          </div>

          {/* Text Size Toggle */}
          <button
            onClick={onFontSizeToggle}
            className={`p-2 rounded-xl border border-[#E3D6C5] text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
              fontSize === 'large'
                ? 'bg-[#1F2421] text-white border-[#1F2421]'
                : 'bg-white text-[#5E5246] hover:bg-[#F4EFEB]'
            }`}
            title={language === 'fr' ? 'Agrandir le texte' : 'Toggle text size'}
            aria-label="Modifier la taille de police"
          >
            <Type className="w-4 h-4" />
            <span className="text-[10px] hidden sm:inline">{fontSize === 'large' ? 'A+' : 'A'}</span>
          </button>

          {/* Audio toggle button */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              isAudioVisible
                ? 'bg-[#C86D51] text-white border-[#C86D51]'
                : 'bg-white text-[#5E5246] border-[#E3D6C5] hover:bg-[#F4EFEB]'
            }`}
            title={language === 'fr' ? 'Écouter l’article' : 'Listen to article'}
            aria-label="Écouter l’article avec synthèse vocale"
          >
            <Volume2 className="w-4 h-4" />
            <span className="hidden md:inline">
              {language === 'fr' ? 'Écouter' : 'Listen'}
            </span>
          </button>

          {/* Share button */}
          <button
            id="header-share-button"
            onClick={onShareClick}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#1F2421] hover:bg-[#343D37] text-white text-xs font-semibold rounded-full shadow-xs transition-all cursor-pointer"
            aria-label="Partager cet article"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{language === 'fr' ? 'Partager' : 'Share'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
