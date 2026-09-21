import React, { useState, useEffect } from 'react';
import { ListFilter, ChevronDown, ChevronUp, Bookmark } from 'lucide-react';
import { TableOfContentItem, Language } from '../types/content';

interface TableOfContentsProps {
  items: TableOfContentItem[];
  language: Language;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items, language }) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpenMobile, setIsOpenMobile] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const topOffset = target.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth',
      });
      setActiveId(id);
      setIsOpenMobile(false);
    }
  };

  return (
    <nav
      id="sommaire-navigation"
      aria-label="Sommaire de l'article"
      className="bg-white/80 backdrop-blur-md border border-[#E7DED3] rounded-2xl p-5 shadow-sm transition-all"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-[#FAF4ED] text-[#C86D51] rounded-lg">
            <Bookmark className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A6B]">
              {language === 'fr' ? 'Navigation Rapide' : 'Quick Navigation'}
            </span>
            <h2 className="text-base font-bold text-[#1F2421]">
              {language === 'fr' ? 'Sommaire de l’Article' : 'Table of Contents'}
            </h2>
          </div>
        </div>

        {/* Mobile toggle button */}
        <button
          onClick={() => setIsOpenMobile(!isOpenMobile)}
          className="lg:hidden p-2 text-[#736356] hover:bg-[#F2ECE4] rounded-lg transition-colors"
          aria-expanded={isOpenMobile}
        >
          {isOpenMobile ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Item List */}
      <ul
        className={`mt-4 space-y-1.5 text-sm transition-all duration-300 ${
          isOpenMobile ? 'block' : 'hidden lg:block'
        }`}
      >
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className={`group flex items-start gap-2.5 py-1.5 px-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#FAF4ED] text-[#C86D51] font-semibold translate-x-1'
                    : 'text-[#5A4F45] hover:text-[#1F2421] hover:bg-[#F9F6F2]'
                }`}
              >
                {item.stepNumber ? (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded font-mono font-bold mt-0.5 ${
                      isActive
                        ? 'bg-[#C86D51] text-white'
                        : 'bg-[#EDE4D9] text-[#7A6B5F] group-hover:bg-[#E2D6C7]'
                    }`}
                  >
                    0{item.stepNumber}
                  </span>
                ) : (
                  <span className="text-[#C86D51] font-bold text-xs mt-1">•</span>
                )}
                <span className="line-clamp-1 leading-snug">{item.title}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
