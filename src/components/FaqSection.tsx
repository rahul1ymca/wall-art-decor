import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FaqItem, Language } from '../types/content';

interface FaqSectionProps {
  faqList: FaqItem[];
  language: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqList, language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="my-14" aria-labelledby="faq-title">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-[#FAF4ED] text-[#C86D51] rounded-2xl">
          <HelpCircle className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">
            {language === 'fr' ? 'Questions Fréquentes' : 'Frequently Asked Questions'}
          </span>
          <h2 id="faq-title" className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2421]">
            {language === 'fr'
              ? 'Tout Savoir sur la Déco Murale : La FAQ des Architectes'
              : 'All About Wall Decor: Designer FAQ'}
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {faqList.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white border border-[#E7DED3] rounded-2xl overflow-hidden transition-all shadow-xs"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-serif font-bold text-base sm:text-lg text-[#1F2421] hover:text-[#C86D51] transition-colors cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="pr-4">{item.question}</span>
                <div
                  className={`p-1.5 rounded-full transition-transform duration-300 ${
                    isOpen ? 'bg-[#FAF4ED] text-[#C86D51] rotate-180' : 'text-[#8C7A6B]'
                  }`}
                >
                  <ChevronDown className="w-5 h-5" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm sm:text-base text-[#5E5246] leading-relaxed border-t border-[#F4EFEB] animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
