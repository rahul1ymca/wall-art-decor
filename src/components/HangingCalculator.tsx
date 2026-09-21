import React, { useState } from 'react';
import { Calculator, ArrowDown, Info, CheckCircle2 } from 'lucide-react';
import { Language } from '../types/content';

interface HangingCalculatorProps {
  language: Language;
}

export const HangingCalculator: React.FC<HangingCalculatorProps> = ({ language }) => {
  const [placementType, setPlacementType] = useState<'wall' | 'furniture'>('furniture');
  const [frameHeight, setFrameHeight] = useState<number>(60); // 60 cm frame
  const [furnitureHeight, setFurnitureHeight] = useState<number>(85); // 85 cm console/sofa back
  const [gapAboveFurniture, setGapAboveFurniture] = useState<number>(20); // 20 cm gap

  // Wire/hanger drop standard from top of frame
  const hangerDrop = 5;

  // Calculation logic
  let centerFromFloor = 0;
  let nailFromFloor = 0;

  if (placementType === 'wall') {
    // Standard museum eye level: 145 cm
    centerFromFloor = 145;
    // Top of frame is center + (frameHeight / 2)
    // Nail is top of frame - hangerDrop
    nailFromFloor = 145 + (frameHeight / 2) - hangerDrop;
  } else {
    // Over furniture: bottom is furnitureHeight + gapAboveFurniture
    const bottomOfFrame = furnitureHeight + gapAboveFurniture;
    centerFromFloor = bottomOfFrame + (frameHeight / 2);
    nailFromFloor = bottomOfFrame + frameHeight - hangerDrop;
  }

  return (
    <div
      id="calculateur-hauteur"
      className="bg-white border border-[#E7DED3] rounded-3xl p-6 sm:p-8 shadow-sm my-10"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-[#FAF4ED] text-[#C86D51] rounded-2xl">
          <Calculator className="w-6 h-6" />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">
            {language === 'fr' ? 'Outil Interactif Exclusif' : 'Exclusive Interactive Tool'}
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#1F2421]">
            {language === 'fr'
              ? 'Calculateur de Hauteur d’Accrochage Idéale'
              : 'Golden Hanging Height Calculator'}
          </h3>
        </div>
      </div>

      <p className="text-sm text-[#5E5246] mb-6 leading-relaxed">
        {language === 'fr'
          ? 'Ne plantez plus vos clous au hasard ! Cet outil calcule la hauteur exacte au millimètre près en appliquant le standard muséal international des 145 cm et le ratio d’or de suspension.'
          : 'Stop guessing nail placements! This calculator applies the international 145 cm (57-inch) gallery museum standard and proportional spacing.'}
      </p>

      {/* Mode selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <button
          type="button"
          onClick={() => setPlacementType('furniture')}
          className={`p-3.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
            placementType === 'furniture'
              ? 'bg-[#FAF4ED] border-[#C86D51] text-[#C86D51] shadow-xs'
              : 'border-[#E7DED3] text-[#5E5246] hover:bg-[#F9F6F2]'
          }`}
        >
          <div className="font-semibold text-sm">
            {language === 'fr' ? '🛋️ Au-dessus d’un meuble' : '🛋️ Above Furniture'}
          </div>
          <div className="text-xs text-[#7A6B5F] mt-0.5">
            {language === 'fr' ? 'Canapé, buffet, console, tête de lit' : 'Sofa, sideboard, console, bed headboard'}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setPlacementType('wall')}
          className={`p-3.5 rounded-xl border text-left font-medium transition-all cursor-pointer ${
            placementType === 'wall'
              ? 'bg-[#FAF4ED] border-[#C86D51] text-[#C86D51] shadow-xs'
              : 'border-[#E7DED3] text-[#5E5246] hover:bg-[#F9F6F2]'
          }`}
        >
          <div className="font-semibold text-sm">
            {language === 'fr' ? '🧱 Sur un mur libre' : '🧱 On a Bare Open Wall'}
          </div>
          <div className="text-xs text-[#7A6B5F] mt-0.5">
            {language === 'fr' ? 'Couloir, montée d’escalier, entrée' : 'Hallway, staircase, entryway open wall'}
          </div>
        </button>
      </div>

      {/* Sliders and inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#FAF8F5] p-5 rounded-2xl border border-[#EDE4D9] mb-6">
        {/* Frame Height */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-semibold text-[#483F37]">
              {language === 'fr' ? 'Hauteur du cadre / tableau :' : 'Frame / Mirror Height:'}
            </label>
            <span className="text-sm font-bold font-mono text-[#C86D51]">{frameHeight} cm</span>
          </div>
          <input
            type="range"
            min="20"
            max="180"
            value={frameHeight}
            onChange={(e) => setFrameHeight(Number(e.target.value))}
            className="w-full accent-[#C86D51] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[#9E8E80] mt-1">
            <span>20 cm (Petit)</span>
            <span>70 cm (Moyen)</span>
            <span>180 cm (XXL)</span>
          </div>
        </div>

        {placementType === 'furniture' && (
          <>
            {/* Furniture Height */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-[#483F37]">
                  {language === 'fr' ? 'Hauteur du meuble depuis le sol :' : 'Furniture Height from Floor:'}
                </label>
                <span className="text-sm font-bold font-mono text-[#C86D51]">{furnitureHeight} cm</span>
              </div>
              <input
                type="range"
                min="40"
                max="120"
                value={furnitureHeight}
                onChange={(e) => setFurnitureHeight(Number(e.target.value))}
                className="w-full accent-[#C86D51] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9E8E80] mt-1">
                <span>45 cm (Banc)</span>
                <span>85 cm (Dossier canapé)</span>
                <span>110 cm (Console haute)</span>
              </div>
            </div>

            {/* Gap above furniture */}
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-[#483F37]">
                  {language === 'fr' ? 'Espace au-dessus du meuble (recommandé : 15-25 cm) :' : 'Gap Above Furniture (recommended: 15-25 cm):'}
                </label>
                <span className="text-sm font-bold font-mono text-[#C86D51]">{gapAboveFurniture} cm</span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={gapAboveFurniture}
                onChange={(e) => setGapAboveFurniture(Number(e.target.value))}
                className="w-full accent-[#C86D51] cursor-pointer"
              />
            </div>
          </>
        )}
      </div>

      {/* Result cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#1F2421] text-white p-5 rounded-2xl shadow">
          <span className="text-xs uppercase tracking-wider text-[#C86D51] font-bold">
            {language === 'fr' ? 'POINT D’ACCROCHAGE RECOMMANDÉ' : 'EXACT NAIL PLACEMENT'}
          </span>
          <div className="text-3xl sm:text-4xl font-mono font-bold mt-1 text-[#F4EFEB]">
            {Math.round(nailFromFloor)} <span className="text-lg font-normal text-[#B5A89B]">cm</span>
          </div>
          <p className="text-xs text-[#D9CFC4] mt-2">
            {language === 'fr'
              ? 'Plantez votre clou / cheville à cette hauteur exacte depuis le sol fini.'
              : 'Drive your nail or drywall hook at this exact measurement from the floor.'}
          </p>
        </div>

        <div className="bg-[#FAF4ED] border border-[#E8D9C7] p-5 rounded-2xl">
          <span className="text-xs uppercase tracking-wider text-[#7A6B5F] font-bold">
            {language === 'fr' ? 'HAUTEUR DU CENTRE DE L’ŒUVRE' : 'ARTWORK CENTER LINE'}
          </span>
          <div className="text-3xl sm:text-4xl font-mono font-bold mt-1 text-[#242422]">
            {Math.round(centerFromFloor)} <span className="text-lg font-normal text-[#7A6B5F]">cm</span>
          </div>
          <p className="text-xs text-[#5E5246] mt-2 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#C86D51] shrink-0" />
            {placementType === 'wall'
              ? (language === 'fr' ? 'Aligné sur le regard moyen des yeux (145 cm).' : 'Aligned directly at international eye-level (145 cm).')
              : (language === 'fr' ? `Ancré à ${gapAboveFurniture} cm au-dessus du mobilier pour l’unité visuelle.` : `Firmly anchored ${gapAboveFurniture} cm above furniture for visual balance.`)}
          </p>
        </div>
      </div>
    </div>
  );
};
