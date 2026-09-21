import React from 'react';

interface AdSlotProps {
  id: string;
  type: 'leaderboard' | 'in-article' | 'sidebar' | 'billboard';
  label: string;
  badgeText: string;
  developerNotice: string;
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  id,
  type,
  label,
  badgeText,
  developerNotice,
  className = '',
}) => {
  // Dimension styles corresponding to standard IAB ad formats
  const formatClasses = {
    leaderboard: 'w-full max-w-[728px] min-h-[90px] mx-auto',
    'in-article': 'w-full max-w-[728px] min-h-[120px] mx-auto',
    sidebar: 'w-full max-w-[300px] min-h-[250px] lg:min-h-[600px] mx-auto',
    billboard: 'w-full max-w-[970px] min-h-[160px] mx-auto',
  }[type];

  return (
    <div
      id={id}
      aria-label={`Espace publicitaire: ${label}`}
      className={`my-8 px-4 py-3 bg-[#F4EFEB] border border-dashed border-[#D5C9BD] rounded-xl transition-all ${formatClasses} ${className}`}
    >
      {/* 
        ========================================================================
        ADSENSE / AD NETWORK INTEGRATION POINT
        ========================================================================
        To connect your Google AdSense or Mediavine tags, replace this placeholder block:
        
        Example Google AdSense code:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="1234567890"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
        ========================================================================
      */}
      <div className="flex flex-col items-center justify-center text-center p-4 h-full min-h-[80px]">
        <span className="text-[10px] tracking-widest uppercase font-semibold text-[#8C7A6B] bg-[#EAE2D7] px-2.5 py-0.5 rounded-full mb-2">
          {badgeText}
        </span>
        <p className="text-xs font-medium text-[#5E5246] max-w-md">
          {label}
        </p>
        <p className="text-[11px] text-[#9E8E80] mt-1 italic hidden sm:block">
          {developerNotice}
        </p>
      </div>
    </div>
  );
};
