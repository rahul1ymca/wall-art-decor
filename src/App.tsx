import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  Calendar,
  User,
  Share2,
  Volume2,
  ZoomIn,
  Printer,
  ArrowUp,
  Bookmark,
  CheckCircle2,
  Sparkles,
  Layers,
  Compass,
  Sliders,
  ShieldCheck,
  Check,
  ExternalLink,
} from 'lucide-react';
import { contentData } from './data/blogContent';
import { Language } from './types/content';
import { Navbar } from './components/Navbar';
import { AudioPlayer } from './components/AudioPlayer';
import { TableOfContents } from './components/TableOfContents';
import { AdSlot } from './components/AdSlot';
import { HangingCalculator } from './components/HangingCalculator';
import { GalleryPlanner } from './components/GalleryPlanner';
import { ShareModal } from './components/ShareModal';
import { ImageLightbox } from './components/ImageLightbox';
import { FaqSection } from './components/FaqSection';

export default function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isAudioVisible, setIsAudioVisible] = useState(true);
  const [activeSpeechIdx, setActiveSpeechIdx] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Lightbox state
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    imageUrl: string;
    imageAlt: string;
    caption?: string;
  }>({
    isOpen: false,
    imageUrl: '',
    imageAlt: '',
  });

  const content = contentData[language];

  // Sync HTML lang attribute when language changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  // Scroll listener for "Back to top" button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openLightbox = (url: string, alt: string, caption?: string) => {
    setLightboxState({
      isOpen: true,
      imageUrl: url,
      imageAlt: alt,
      caption,
    });
  };

  const handleNativeShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: content.header.h1,
          text: content.header.subtitle,
          url: window.location.href,
        })
        .catch(() => setIsShareOpen(true));
    } else {
      setIsShareOpen(true);
    }
  };

  // Compile full readable text stream for the Web Speech API
  const speakableParagraphs = useMemo(() => {
    const paragraphs: string[] = [
      content.header.h1,
      content.header.subtitle,
      content.intro.lead.replace(/<[^>]*>/g, ''),
      content.steps.step1.title,
      ...content.steps.step1.content.map((p) => p.replace(/<[^>]*>/g, '')),
      content.steps.step2.title,
      content.steps.step2.introText,
      content.steps.step3.title,
      ...content.steps.step3.items.map((i) => `${i.title}. ${i.desc}`),
      content.steps.step4.title,
      ...content.steps.step4.content.map((p) => p.replace(/<[^>]*>/g, '')),
      content.steps.step5.title,
      ...content.steps.step5.content.map((p) => p.replace(/<[^>]*>/g, '')),
      content.steps.step6.title,
      ...content.steps.step6.diyProjects.map((p) => `${p.title}. ${p.steps}`),
    ];
    return paragraphs;
  }, [content]);

  return (
    <div className={`min-h-screen bg-[#FAF8F5] text-[#242422] ${fontSize === 'large' ? 'text-lg' : 'text-base'}`}>
      {/* Sticky Header with Navigation, Language Switcher, Audio Trigger & Share */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        onShareClick={handleNativeShare}
        onToggleAudio={() => setIsAudioVisible(!isAudioVisible)}
        isAudioVisible={isAudioVisible}
        fontSize={fontSize}
        onFontSizeToggle={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
      />

      {/* TOP LEADERBOARD ADVERTISEMENT (IAB 728x90) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* 
          AD PLACEMENT #1: Header Leaderboard 
          Target dimensions: 728x90 (Desktop), 320x50 (Mobile)
        */}
        <AdSlot
          id="ad-slot-header"
          type="leaderboard"
          label={content.adSlotLabels.headerAd}
          badgeText={content.adSlotLabels.adBadge}
          developerNotice={content.adSlotLabels.codeCommentNotice}
        />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* MAIN ARTICLE COLUMN (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            
            {/* Article Header & SEO Meta Info */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                <span className="bg-[#FAF4ED] text-[#C86D51] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-[#EEDCC9]">
                  {content.header.badge}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#7A6B5F] font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {content.meta.readTime}
                </span>
                <span className="hidden sm:inline text-[#C4B7AA]">•</span>
                <span className="flex items-center gap-1 text-xs text-[#7A6B5F] font-medium">
                  <Calendar className="w-3.5 h-3.5" />
                  {content.meta.publishDate}
                </span>
              </div>

              {/* H1 Primary SEO Keyword Tag */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1F2421] leading-[1.18] tracking-tight mb-5">
                {content.header.h1}
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-[#5E5246] font-light leading-relaxed mb-6">
                {content.header.subtitle}
              </p>

              {/* Author Card & Quick Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#EAE2D7]">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop"
                    alt={content.meta.authorName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <div className="font-semibold text-sm text-[#1F2421]">
                      {content.meta.authorName}
                    </div>
                    <div className="text-xs text-[#7A6B5F]">
                      {content.meta.authorRole}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleNativeShare}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D5C9BD] hover:bg-[#F2ECE4] text-xs font-semibold text-[#483F37] transition-all cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>{content.header.shareText}</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D5C9BD] hover:bg-[#F2ECE4] text-xs font-semibold text-[#483F37] transition-all cursor-pointer no-print"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>{content.header.printArticle}</span>
                  </button>
                </div>
              </div>
            </header>

            {/* Web Speech API Audio Player */}
            {isAudioVisible && (
              <AudioPlayer
                language={language}
                articleText={speakableParagraphs}
                onParagraphChange={setActiveSpeechIdx}
              />
            )}

            {/* Hero Featured Image */}
            <figure className="my-6 rounded-3xl overflow-hidden shadow-md border border-[#E7DED3] bg-neutral-100 group relative">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop"
                alt="Déco murale moderne dans un salon contemporain avec cadres et miroirs"
                className="w-full h-[360px] sm:h-[480px] object-cover transition-transform duration-700 group-hover:scale-103 cursor-zoom-in"
                onClick={() =>
                  openLightbox(
                    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1600&auto=format&fit=crop",
                    "Déco murale moderne dans un salon contemporain avec cadres et miroirs",
                    "Une composition murale équilibrée rehausse la luminosité et structure visuellement l'espace du salon."
                  )
                }
              />
              <button
                onClick={() =>
                  openLightbox(
                    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1600&auto=format&fit=crop",
                    "Déco murale salon",
                    "Une composition murale équilibrée"
                  )
                }
                className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-xs transition-colors cursor-pointer"
                title="Agrandir la photo"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <figcaption className="p-3 text-xs text-[#7A6B5F] bg-[#FAF8F5] border-t border-[#EAE2D7] italic text-center">
                {language === 'fr'
                  ? 'Exemple d’une déco murale contemporaine combinant cadres graphiques et matières naturelles.'
                  : 'Contemporary wall decor example balancing architectural framed prints and natural materials.'}
              </figcaption>
            </figure>

            {/* Introduction Section */}
            <section id="intro" className="my-6 leading-relaxed">
              <p
                className="text-lg sm:text-xl text-[#3A322C] font-normal leading-relaxed mb-6"
                dangerouslySetInnerHTML={{ __html: content.intro.lead }}
              />

              {/* Expert Quote Block */}
              <blockquote className="my-8 p-6 sm:p-8 bg-[#FAF4ED] border-l-4 border-[#C86D51] rounded-2xl">
                <p className="font-serif italic text-lg sm:text-xl text-[#242422] leading-snug mb-3">
                  {content.intro.quote}
                </p>
                <cite className="text-xs uppercase tracking-wider text-[#7A6B5F] font-bold block">
                  — {content.intro.quoteAuthor}
                </cite>
              </blockquote>
            </section>

            {/* Mobile Table of Contents (Shown on screens < lg) */}
            <div className="lg:hidden my-6">
              <TableOfContents items={content.tableOfContents} language={language} />
            </div>

            {/* STEP 1 */}
            <section id="etape-1" className="my-10 scroll-mt-24 border-t border-[#EAE2D7] pt-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#1F2421] text-white rounded-lg">
                  {content.steps.step1.stepNumber}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#C86D51] font-bold">
                  {language === 'fr' ? 'Diagnostic Fondateur' : 'Spatial Diagnosis'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2421] mb-2">
                {content.steps.step1.title}
              </h2>
              <p className="text-sm sm:text-base text-[#7A6B5F] italic mb-6">
                {content.steps.step1.subtitle}
              </p>

              <div className="space-y-4 text-[#443B33] leading-relaxed">
                {content.steps.step1.content.map((p, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>

              {/* Pro Tip Box */}
              <div className="mt-6 p-5 bg-[#FAF4ED] border border-[#E7D7C3] rounded-2xl flex items-start gap-3.5">
                <Compass className="w-5 h-5 text-[#C86D51] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#1F2421] mb-1">
                    {content.steps.step1.tipTitle}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5E5246]">
                    {content.steps.step1.tipText}
                  </p>
                </div>
              </div>
            </section>

            {/* STEP 2: STYLES */}
            <section id="etape-2" className="my-10 scroll-mt-24 border-t border-[#EAE2D7] pt-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#1F2421] text-white rounded-lg">
                  {content.steps.step2.stepNumber}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#C86D51] font-bold">
                  {language === 'fr' ? 'Inspirations Déco 2026' : 'Design Tendances 2026'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2421] mb-2">
                {content.steps.step2.title}
              </h2>
              <p className="text-sm sm:text-base text-[#7A6B5F] mb-6">
                {content.steps.step2.introText}
              </p>

              {/* Style Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
                {content.styles.map((style) => (
                  <div
                    key={style.id}
                    className="bg-white border border-[#E7DED3] rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden group cursor-pointer"
                      onClick={() => openLightbox(style.imageUrl, style.imageAlt, style.name)}
                    >
                      <img
                        src={style.imageUrl}
                        alt={style.imageAlt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] font-bold text-[#1F2421]">
                        {style.name}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/60 p-1.5 rounded-full text-white">
                        <ZoomIn className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#C86D51] uppercase tracking-wider mb-1">
                          {style.tagline}
                        </div>
                        <p className="text-xs sm:text-sm text-[#5E5246] leading-relaxed mb-4">
                          {style.description}
                        </p>
                      </div>

                      <div>
                        {/* Key elements */}
                        <div className="space-y-1 mb-4 border-t border-[#F2ECE4] pt-3">
                          {style.keyElements.map((el, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#483F37]">
                              <Check className="w-3.5 h-3.5 text-[#C86D51]" />
                              <span>{el}</span>
                            </div>
                          ))}
                        </div>

                        {/* Palette preview */}
                        <div className="flex items-center gap-1.5 pt-2 border-t border-[#F2ECE4]">
                          <span className="text-[10px] uppercase font-bold text-[#8C7A6B] mr-1">
                            Palette :
                          </span>
                          {style.colorPalette.map((color, i) => (
                            <span
                              key={i}
                              style={{ backgroundColor: color }}
                              className="w-4 h-4 rounded-full border border-black/10 shadow-2xs"
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 
              AD PLACEMENT #2: In-Article Native Display
              Target format: 728x90 responsive
            */}
            <div id="ad-slot-1">
              <AdSlot
                id="ad-slot-in-feed-1"
                type="in-article"
                label={content.adSlotLabels.inArticleAd1}
                badgeText={content.adSlotLabels.adBadge}
                developerNotice={content.adSlotLabels.codeCommentNotice}
              />
            </div>

            {/* STEP 3: THE 5 ELEMENTS */}
            <section id="etape-3" className="my-10 scroll-mt-24 border-t border-[#EAE2D7] pt-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#1F2421] text-white rounded-lg">
                  {content.steps.step3.stepNumber}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#C86D51] font-bold">
                  {language === 'fr' ? 'Matériaux & Éléments' : 'Core Components'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2421] mb-2">
                {content.steps.step3.title}
              </h2>
              <p className="text-sm sm:text-base text-[#7A6B5F] mb-6">
                {content.steps.step3.subtitle}
              </p>

              {/* Items List with badges */}
              <div className="space-y-4">
                {content.steps.step3.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-[#E7DED3] rounded-2xl shadow-xs hover:border-[#C86D51] transition-all"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h3 className="font-serif font-bold text-lg text-[#1F2421]">
                        {item.title}
                      </h3>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF4ED] text-[#C86D51] border border-[#EEDCC9]">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-sm text-[#5E5246] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Image grid featuring the materials */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
                <figure
                  className="rounded-2xl overflow-hidden cursor-pointer group relative"
                  onClick={() =>
                    openLightbox(
                      "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=800&auto=format&fit=crop",
                      "Miroir mural décoratif et console salon",
                      "Le miroir démultiplie la lumière du salon"
                    )
                  }
                >
                  <img
                    src="https://images.unsplash.com/photo-1544457070-4cd773b4d71e?q=80&w=600&auto=format&fit=crop"
                    alt="Miroir mural design pour déco murale lumineuse"
                    className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </figure>

                <figure
                  className="rounded-2xl overflow-hidden cursor-pointer group relative"
                  onClick={() =>
                    openLightbox(
                      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
                      "Déco murale tasseaux de bois salon scandinave",
                      "Panneaux acoustiques en chêne clair"
                    )
                  }
                >
                  <img
                    src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop"
                    alt="Panneaux muraux en tasseaux de bois et étagères"
                    className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </figure>

                <figure
                  className="rounded-2xl overflow-hidden cursor-pointer group relative col-span-2 sm:col-span-1"
                  onClick={() =>
                    openLightbox(
                      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=800&auto=format&fit=crop",
                      "Toile abstraite grand format pour déco murale",
                      "Tableau d'art abstrait"
                    )
                  }
                >
                  <img
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=600&auto=format&fit=crop"
                    alt="Toile d'art abstrait pour sublimer un pan de mur"
                    className="w-full h-36 sm:h-44 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </figure>
              </div>
            </section>

            {/* INTERACTIVE TOOL: Gallery Wall Layout Planner */}
            <GalleryPlanner layouts={content.galleryLayouts} language={language} />

            {/* STEP 4: HANGING RULES & 145 CM */}
            <section id="etape-4" className="my-10 scroll-mt-24 border-t border-[#EAE2D7] pt-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#1F2421] text-white rounded-lg">
                  {content.steps.step4.stepNumber}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#C86D51] font-bold">
                  {language === 'fr' ? 'La Règle d’Or du Musée' : 'Museum Golden Formula'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2421] mb-2">
                {content.steps.step4.title}
              </h2>
              <p className="text-sm sm:text-base text-[#7A6B5F] italic mb-6">
                {content.steps.step4.subtitle}
              </p>

              <div className="space-y-4 text-[#443B33] leading-relaxed">
                {content.steps.step4.content.map((p, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </section>

            {/* INTERACTIVE TOOL: Hanging Height Calculator */}
            <HangingCalculator language={language} />

            {/* 
              AD PLACEMENT #3: Mid-Article Partner Slot
              Target format: 728x90 responsive
            */}
            <div id="ad-slot-2">
              <AdSlot
                id="ad-slot-in-feed-2"
                type="in-article"
                label={content.adSlotLabels.inArticleAd2}
                badgeText={content.adSlotLabels.adBadge}
                developerNotice={content.adSlotLabels.codeCommentNotice}
              />
            </div>

            {/* STEP 5: LIGHTING */}
            <section id="etape-5" className="my-10 scroll-mt-24 border-t border-[#EAE2D7] pt-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#1F2421] text-white rounded-lg">
                  {content.steps.step5.stepNumber}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#C86D51] font-bold">
                  {language === 'fr' ? 'Éclairage Architectural' : 'Lighting Science'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2421] mb-2">
                {content.steps.step5.title}
              </h2>
              <p className="text-sm sm:text-base text-[#7A6B5F] italic mb-6">
                {content.steps.step5.subtitle}
              </p>

              <div className="space-y-4 text-[#443B33] leading-relaxed">
                {content.steps.step5.content.map((p, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: p }} />
                ))}
              </div>
            </section>

            {/* STEP 6: DIY PROJECTS & DAMAGE-FREE FIXTURES */}
            <section id="etape-6" className="my-10 scroll-mt-24 border-t border-[#EAE2D7] pt-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 bg-[#1F2421] text-white rounded-lg">
                  {content.steps.step6.stepNumber}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#C86D51] font-bold">
                  {language === 'fr' ? 'Bricolage & Petit Budget' : 'DIY & Rental Hacks'}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1F2421] mb-2">
                {content.steps.step6.title}
              </h2>
              <p className="text-sm sm:text-base text-[#7A6B5F] mb-6">
                {content.steps.step6.subtitle}
              </p>

              <div className="grid grid-cols-1 gap-4 my-6">
                {content.steps.step6.diyProjects.map((project, idx) => (
                  <div
                    key={idx}
                    className="p-5 bg-white border border-[#E7DED3] rounded-2xl shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <h4 className="font-serif font-bold text-base sm:text-lg text-[#1F2421]">
                        {project.title}
                      </h4>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF4ED] text-[#C86D51] shrink-0">
                        {project.time}
                      </span>
                    </div>
                    <p className="text-sm text-[#5E5246] leading-relaxed">
                      {project.steps}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ SECTION (SCHEMA.ORG BACKED) */}
            <FaqSection faqList={content.faqList} language={language} />

            {/* PRINTABLE SUMMARY CHECKLIST */}
            <section
              id="checklist"
              className="my-12 p-6 sm:p-8 bg-[#FAF4ED] border border-[#E4D4C0] rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-[#C86D51] text-white rounded-xl">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F2421]">
                  {content.checklistData.title}
                </h3>
              </div>

              <div className="space-y-3 my-6">
                {content.checklistData.items.map((item, idx) => (
                  <label
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-white/80 rounded-xl border border-[#EEDCC9] text-sm text-[#3E352E] cursor-pointer hover:bg-white transition-all"
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-[#C86D51] w-4 h-4 rounded cursor-pointer"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1F2421] hover:bg-[#38413B] text-white text-xs font-bold rounded-full shadow transition-all cursor-pointer no-print"
              >
                <Printer className="w-4 h-4" />
                <span>{content.checklistData.printButton}</span>
              </button>
            </section>

          </div>

          {/* SIDEBAR COLUMN (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            
            {/* Table of Contents (Desktop Sticky) */}
            <div className="hidden lg:block">
              <TableOfContents items={content.tableOfContents} language={language} />
            </div>

            {/* 
              AD PLACEMENT #4: Sidebar Sticky Skyscraper
              Target format: 300x250 or 300x600 Half-Page Display
            */}
            <AdSlot
              id="ad-slot-sidebar"
              type="sidebar"
              label={content.adSlotLabels.sidebarAd}
              badgeText={content.adSlotLabels.adBadge}
              developerNotice={content.adSlotLabels.codeCommentNotice}
            />

            {/* Author Profile Card in Sidebar */}
            <div className="bg-white border border-[#E7DED3] rounded-2xl p-5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C86D51] block mb-2">
                {language === 'fr' ? 'À PROPOS DE L’AUTEURE' : 'ABOUT THE AUTHOR'}
              </span>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=160&auto=format&fit=crop"
                  alt={content.meta.authorName}
                  className="w-12 h-12 rounded-full object-cover border border-[#E7DED3]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#1F2421]">
                    {content.meta.authorName}
                  </h4>
                  <p className="text-xs text-[#7A6B5F]">
                    {content.meta.authorRole}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#5E5246] leading-relaxed">
                {content.meta.authorBio}
              </p>
            </div>

            {/* Quick Share Widget in Sidebar */}
            <div className="bg-[#FAF4ED] border border-[#EADCCB] rounded-2xl p-5 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7A6B5F] block mb-1">
                {language === 'fr' ? 'VOUS AIMEZ CE GUIDE ?' : 'ENJOYED THIS GUIDE?'}
              </span>
              <h4 className="text-sm font-bold font-serif text-[#1F2421] mb-3">
                {language === 'fr' ? 'Partagez-le avec vos proches' : 'Share with fellow home lovers'}
              </h4>
              <button
                onClick={handleNativeShare}
                className="w-full py-2.5 px-4 bg-[#C86D51] hover:bg-[#B35F45] text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>{language === 'fr' ? 'Partager l’article' : 'Share Article'}</span>
              </button>
            </div>

          </aside>

        </article>

        {/* 
          AD PLACEMENT #5: Pre-Footer Billboard Banner
          Target format: 970x250 (Desktop) / Responsive
        */}
        <div className="my-12">
          <AdSlot
            id="ad-slot-billboard"
            type="billboard"
            label={content.adSlotLabels.bottomAd}
            badgeText={content.adSlotLabels.adBadge}
            developerNotice={content.adSlotLabels.codeCommentNotice}
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1F2421] text-[#D9CFC4] py-12 border-t border-[#343D37] mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#343D37]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C86D51] text-white flex items-center justify-center font-serif text-xl font-bold">
                D
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-wide block">
                  DÉCO MURALE MAG
                </span>
                <span className="text-xs text-[#A69888]">
                  {content.meta.tagline}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-medium text-[#B5A89B]">
              {content.footer.links.map((link, idx) => (
                <a
                  key={idx}
                  href="#intro"
                  className="hover:text-white transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-6 text-center md:text-left text-xs text-[#8C7D70] flex flex-col md:flex-row items-center justify-between gap-4">
            <p>{content.footer.copyright}</p>
            <p className="max-w-xl text-[11px] leading-relaxed">
              {content.footer.disclaimer}
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-[#1F2421] hover:bg-[#C86D51] text-white rounded-full shadow-xl transition-all z-30 cursor-pointer no-print animate-fadeIn"
          title={language === 'fr' ? 'Retour en haut' : 'Back to top'}
          aria-label="Retour en haut de page"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Image Lightbox Modal */}
      <ImageLightbox
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState({ ...lightboxState, isOpen: false })}
        imageUrl={lightboxState.imageUrl}
        imageAlt={lightboxState.imageAlt}
        caption={lightboxState.caption}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        language={language}
      />
    </div>
  );
}
