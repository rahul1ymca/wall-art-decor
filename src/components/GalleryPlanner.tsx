import React, { useState } from 'react';
import { LayoutGrid, Sparkles, Check, HelpCircle } from 'lucide-react';
import { GalleryLayoutOption, Language } from '../types/content';

interface GalleryPlannerProps {
  layouts: GalleryLayoutOption[];
  language: Language;
}

export const GalleryPlanner: React.FC<GalleryPlannerProps> = ({ layouts, language }) => {
  const [selectedId, setSelectedId] = useState<string>(layouts[1]?.id || 'salon');

  const currentLayout = layouts.find((l) => l.id === selectedId) || layouts[0];

  return (
    <div
      id="simulateur-galerie"
      className="bg-white border border-[#E7DED3] rounded-3xl p-6 sm:p-8 shadow-sm my-10"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-[#FAF4ED] text-[#C86D51] rounded-2xl">
          <LayoutGrid className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">
            {language === 'fr' ? 'Simulateur Visuel' : 'Visual Layout Planner'}
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F2421]">
            {language === 'fr'
              ? 'Planificateur de Compositions & Murs Galeries'
              : 'Wall Art Gallery Layout Simulator'}
          </h3>
        </div>
      </div>

      <p className="text-sm text-[#5E5246] mb-6 leading-relaxed">
        {language === 'fr'
          ? 'La peur de percer un trou au mauvais endroit bloque souvent vos projets. Choisissez une composition type ci-dessous pour visualiser l’agencement recommandé et ses secrets de pose :'
          : 'Afraid of drilling holes in the wrong spot? Select a designer layout below to preview the recommended arrangement and spacing secrets:'}
      </p>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {layouts.map((layout) => (
          <button
            key={layout.id}
            onClick={() => setSelectedId(layout.id)}
            className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer ${
              selectedId === layout.id
                ? 'bg-[#1F2421] text-white border-[#1F2421] shadow-xs'
                : 'border-[#E7DED3] text-[#5E5246] hover:bg-[#FAF8F5]'
            }`}
          >
            {layout.name}
          </button>
        ))}
      </div>

      {/* Visual Canvas of the Layout */}
      <div className="bg-[#F8F4EE] border border-[#E8DFC8] rounded-2xl p-6 sm:p-8 mb-6 flex flex-col items-center justify-center min-h-[260px] relative overflow-hidden">
        {/* Wall background with simulated molding */}
        <div className="absolute top-4 left-6 right-6 border-b border-[#E3D6C5] flex justify-between text-[10px] text-[#A69888] font-mono">
          <span>{language === 'fr' ? 'PLAFOND (250 cm)' : 'CEILING (250 cm)'}</span>
          <span>{language === 'fr' ? 'AXE MÉDIAN (145 cm)' : 'CENTER AXIS (145 cm)'}</span>
        </div>

        {/* Dynamic SVG layout preview */}
        <div className="w-full max-w-md py-6 flex items-center justify-center">
          {currentLayout.previewSvg === 'grid' && (
            <div className="grid grid-cols-2 gap-4 w-52 h-52">
              <div className="bg-[#242422] rounded-md border-4 border-white shadow-md flex items-center justify-center text-white/50 text-[10px]">30×40</div>
              <div className="bg-[#242422] rounded-md border-4 border-white shadow-md flex items-center justify-center text-white/50 text-[10px]">30×40</div>
              <div className="bg-[#242422] rounded-md border-4 border-white shadow-md flex items-center justify-center text-white/50 text-[10px]">30×40</div>
              <div className="bg-[#242422] rounded-md border-4 border-white shadow-md flex items-center justify-center text-white/50 text-[10px]">30×40</div>
            </div>
          )}

          {currentLayout.previewSvg === 'salon' && (
            <div className="grid grid-cols-3 gap-3 w-72 h-52 items-center">
              <div className="flex flex-col gap-2">
                <div className="h-24 bg-[#586B5A] rounded border-2 border-white shadow text-white/60 text-[9px] flex items-center justify-center">21×30</div>
                <div className="h-16 bg-[#C86D51] rounded border-2 border-white shadow text-white/60 text-[9px] flex items-center justify-center">15×20</div>
              </div>
              <div className="h-44 bg-[#1F2421] rounded-md border-4 border-white shadow-lg text-white/70 text-xs font-bold flex items-center justify-center text-center p-1">
                Focal 50×70
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-16 bg-[#A68A72] rounded border-2 border-white shadow text-white/60 text-[9px] flex items-center justify-center">20×20</div>
                <div className="h-24 bg-[#3E4A40] rounded border-2 border-white shadow text-white/60 text-[9px] flex items-center justify-center">30×40</div>
              </div>
            </div>
          )}

          {currentLayout.previewSvg === 'triptych' && (
            <div className="flex gap-4 w-72 h-52 items-center justify-center">
              <div className="w-20 h-44 bg-[#2B2B28] rounded border-4 border-[#EADFCB] shadow-md text-white/60 text-[10px] flex items-center justify-center font-serif">I</div>
              <div className="w-20 h-44 bg-[#2B2B28] rounded border-4 border-[#EADFCB] shadow-md text-white/60 text-[10px] flex items-center justify-center font-serif">II</div>
              <div className="w-20 h-44 bg-[#2B2B28] rounded border-4 border-[#EADFCB] shadow-md text-white/60 text-[10px] flex items-center justify-center font-serif">III</div>
            </div>
          )}

          {currentLayout.previewSvg === 'shelf' && (
            <div className="w-72 flex flex-col gap-6">
              <div className="relative">
                <div className="flex gap-3 items-end mb-1 px-4">
                  <div className="w-16 h-24 bg-[#1F2421] border-2 border-white rounded shadow-sm"></div>
                  <div className="w-20 h-28 bg-[#C86D51] border-2 border-white rounded shadow -ml-4 z-10"></div>
                  <div className="w-14 h-20 bg-[#586B5A] border-2 border-white rounded shadow -ml-2"></div>
                </div>
                <div className="h-3 bg-[#A48871] rounded-xs shadow-md w-full border-t border-[#7A6451]"></div>
              </div>
            </div>
          )}
        </div>

        {/* Floor Line */}
        <div className="absolute bottom-2 left-6 right-6 border-t border-[#E3D6C5] flex justify-between text-[10px] text-[#A69888] font-mono">
          <span>{language === 'fr' ? 'SOL / PLINTHE' : 'FLOOR / BASEBOARD'}</span>
          <span>{language === 'fr' ? 'ÉCART RECOMMANDE : 5-8 CM' : 'RECOMMENDED SPACING: 5-8 CM'}</span>
        </div>
      </div>

      {/* Details Box */}
      <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-[#EDE4D9]">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#C86D51]" />
          <h4 className="text-base font-bold text-[#1F2421]">{currentLayout.name}</h4>
          <span className="text-[11px] bg-[#EAE2D7] text-[#5E5246] px-2 py-0.5 rounded-full font-medium ml-auto">
            {currentLayout.framesCount} {language === 'fr' ? 'cadres suggérés' : 'suggested frames'}
          </span>
        </div>
        <p className="text-sm text-[#4E433B] mb-2">{currentLayout.description}</p>
        <p className="text-xs text-[#7A6B5F] font-medium flex items-center gap-1.5">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          {currentLayout.idealFor}
        </p>
      </div>
    </div>
  );
};
