import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, RotateCcw, FastForward, CheckCircle2 } from 'lucide-react';
import { Language } from '../types/content';

interface AudioPlayerProps {
  language: Language;
  articleText: string[];
  onParagraphChange?: (index: number | null) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  language,
  articleText,
  onParagraphChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isSupported, setIsSupported] = useState(true);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        setVoices(available);
      };
      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;
    } else {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // When language changes, stop speech
  useEffect(() => {
    handleStop();
  }, [language]);

  const speakParagraph = (index: number) => {
    if (!('speechSynthesis' in window) || index >= articleText.length) {
      handleStop();
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = articleText[index];
    if (!textToSpeak) return;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utteranceRef.current = utterance;
    utterance.rate = rate;

    // Pick best voice for the active language
    const langCode = language === 'fr' ? 'fr' : 'en';
    const matchedVoice = voices.find((v) => v.lang.toLowerCase().startsWith(langCode));
    if (matchedVoice) {
      utterance.voice = matchedVoice;
    }
    utterance.lang = language === 'fr' ? 'fr-FR' : 'en-US';

    utterance.onstart = () => {
      setCurrentIdx(index);
      setIsPlaying(true);
      setIsPaused(false);
      onParagraphChange?.(index);
    };

    utterance.onend = () => {
      if (index + 1 < articleText.length) {
        speakParagraph(index + 1);
      } else {
        handleStop();
      }
    };

    utterance.onerror = () => {
      handleStop();
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      speakParagraph(currentIdx);
    }
  };

  const handlePause = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    }
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentIdx(0);
    onParagraphChange?.(null);
  };

  const handleSpeedChange = (newRate: number) => {
    setRate(newRate);
    if (isPlaying && !isPaused) {
      window.speechSynthesis.cancel();
      setTimeout(() => speakParagraph(currentIdx), 100);
    }
  };

  if (!isSupported) {
    return null;
  }

  const progressPercent = articleText.length > 0
    ? Math.round(((currentIdx + 1) / articleText.length) * 100)
    : 0;

  return (
    <div
      id="audio-player-widget"
      className="bg-white/90 backdrop-blur-md border border-[#E7DED3] rounded-2xl p-4 shadow-sm my-6 transition-all hover:shadow-md"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Icon and info */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className={`p-2.5 rounded-xl ${isPlaying ? 'bg-[#C86D51] text-white animate-pulse' : 'bg-[#F2ECE4] text-[#8C7A6B]'}`}>
            {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#C86D51]">
                {language === 'fr' ? 'Lecteur Audio (Web Speech API)' : 'Audio Reader (Web Speech API)'}
              </span>
              {isPlaying && (
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C86D51] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C86D51]"></span>
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-[#242422]">
              {isPlaying
                ? (language === 'fr' ? `Lecture en cours : Section ${currentIdx + 1} / ${articleText.length}` : `Playing section ${currentIdx + 1} of ${articleText.length}`)
                : isPaused
                ? (language === 'fr' ? 'Lecture en pause' : 'Audio paused')
                : (language === 'fr' ? 'Écouter l’article complet lu à voix haute' : 'Listen to the full article read aloud')}
            </p>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex items-center gap-2">
          {!isPlaying ? (
            <button
              id="audio-play-btn"
              onClick={handlePlay}
              className="flex items-center gap-2 px-4 py-2 bg-[#C86D51] hover:bg-[#B35F45] text-white text-xs font-semibold rounded-full shadow transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{isPaused ? (language === 'fr' ? 'Reprendre' : 'Resume') : (language === 'fr' ? 'Écouter' : 'Listen')}</span>
            </button>
          ) : (
            <button
              id="audio-pause-btn"
              onClick={handlePause}
              className="flex items-center gap-2 px-4 py-2 bg-[#1F2421] hover:bg-[#333C37] text-white text-xs font-semibold rounded-full shadow transition-all cursor-pointer"
            >
              <Pause className="w-4 h-4" />
              <span>{language === 'fr' ? 'Pause' : 'Pause'}</span>
            </button>
          )}

          <button
            id="audio-stop-btn"
            onClick={handleStop}
            title={language === 'fr' ? 'Arrêter et recommencer' : 'Stop and reset'}
            className="p-2 text-[#736356] hover:text-[#242422] hover:bg-[#F2ECE4] rounded-full transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Speed Controls */}
          <div className="flex items-center bg-[#F4EFEB] rounded-full p-0.5 text-[11px] font-semibold text-[#66564B]">
            {[1, 1.25, 1.5].map((speed) => (
              <button
                key={speed}
                onClick={() => handleSpeedChange(speed)}
                className={`px-2 py-1 rounded-full transition-all cursor-pointer ${
                  rate === speed
                    ? 'bg-white text-[#C86D51] shadow-xs'
                    : 'hover:text-[#242422]'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar when active */}
      {(isPlaying || isPaused) && (
        <div className="mt-3 pt-2 border-t border-[#F0E8DD]">
          <div className="flex items-center justify-between text-[11px] text-[#8C7A6B] mb-1">
            <span>{language === 'fr' ? 'Progression vocale' : 'Speech Progress'}</span>
            <span className="font-semibold text-[#C86D51]">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#EAE2D7] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#C86D51] transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
