import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Maximize2, 
  Sparkles,
  Layers,
  RotateCcw
} from 'lucide-react';

interface MagazineFlipbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMagazineTitle?: string;
}

export const MagazineFlipbookModal: React.FC<MagazineFlipbookModalProps> = ({
  isOpen,
  onClose,
  initialMagazineTitle = "The Architecture of Silence"
}) => {
  // Current active spread index (0 to 5)
  // Spread 0: Book closed (Cover)
  // Spread 1: Pages 02 - 03 (Manifesto & Contents)
  // Spread 2: Pages 04 - 05 (Feature Spread: The Void Gallery)
  // Spread 3: Pages 06 - 07 (Feature Spread: Concrete Renaissance)
  // Spread 4: Pages 08 - 09 (Grid Essay & Typographic Quote)
  // Spread 5: Pages 10 - 11 (Stockists & Back Cover)
  const [spreadIndex, setSpreadIndex] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev'>('next');
  const [flipProgress, setFlipProgress] = useState<number>(0); // 0 to 1
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isHoveringRightCorner, setIsHoveringRightCorner] = useState<boolean>(false);
  const [isHoveringLeftCorner, setIsHoveringLeftCorner] = useState<boolean>(false);
  
  const totalSpreads = 6;
  const autoPlayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Realistic paper audio synthesis via Web Audio API
  const playRealisticPaperFlipSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      
      const now = audioCtx.currentTime;
      const duration = 0.35; // 350ms whoosh & page slap
      const bufferSize = Math.floor(audioCtx.sampleRate * duration);
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);

      // Create pink noise with slight low-frequency friction
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        const pink = b0 + b1 + b2 + white * 0.5362;
        
        // Envelope: lift attack -> friction whoosh -> soft landing snap
        const t = i / bufferSize;
        const env = Math.sin(t * Math.PI) * (1 - 0.4 * t);
        data[i] = pink * env * 0.2;
      }

      const noiseSource = audioCtx.createBufferSource();
      noiseSource.buffer = buffer;

      // Bandpass filter to sculpt tactile paper texture
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100, now);
      filter.frequency.exponentialRampToValueAtTime(700, now + duration * 0.6);
      filter.frequency.exponentialRampToValueAtTime(1600, now + duration);
      filter.Q.setValueAtTime(1.8, now);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      noiseSource.start(now);
      noiseSource.stop(now + duration);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  const handleNextPage = () => {
    if (isFlipping || spreadIndex >= totalSpreads - 1) return;
    setIsFlipping(true);
    setFlipDirection('next');
    playRealisticPaperFlipSound();

    // Trigger smooth 800ms physics flip
    const startTime = performance.now();
    const duration = 750;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Realistic ease-in-out cubic-bezier easing
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setFlipProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpreadIndex((prev) => prev + 1);
        setIsFlipping(false);
        setFlipProgress(0);
      }
    };
    requestAnimationFrame(animate);
  };

  const handlePrevPage = () => {
    if (isFlipping || spreadIndex <= 0) return;
    setIsFlipping(true);
    setFlipDirection('prev');
    playRealisticPaperFlipSound();

    const startTime = performance.now();
    const duration = 750;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      setFlipProgress(eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpreadIndex((prev) => prev - 1);
        setIsFlipping(false);
        setFlipProgress(0);
      }
    };
    requestAnimationFrame(animate);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextPage();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevPage();
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, spreadIndex, isFlipping]);

  // Autoplay handler
  useEffect(() => {
    if (isPlaying && isOpen) {
      autoPlayTimer.current = setInterval(() => {
        setSpreadIndex((prev) => {
          if (prev >= totalSpreads - 1) {
            setIsPlaying(false);
            return prev;
          }
          playRealisticPaperFlipSound();
          return prev + 1;
        });
      }, 4000);
    } else if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }
    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isPlaying, isOpen, soundEnabled]);

  if (!isOpen) return null;

  // Helper to render a specific page side based on page number
  const renderPage = (pageNo: number, isRightPage: boolean) => {
    switch (pageNo) {
      case 0: // Front Cover
        return (
          <div className="w-full h-full bg-[#0a0a0e] text-white p-8 sm:p-12 flex flex-col justify-between border-l border-zinc-800 relative overflow-hidden select-none">
            {/* Spine shadow on left edge */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none z-10"></div>
            
            {/* Luxury Cover Header */}
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-[#e50914] text-white font-bold tracking-widest text-[11px]">
                  ISSUE 14 // A/W 2025
                </span>
                <span className="text-zinc-500 font-bold tracking-wider">EUR €38 / UK £34</span>
              </div>

              <div className="pt-6 sm:pt-10">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">Structura Architectural Monograph</div>
                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-['Syne',sans-serif] tracking-tight leading-[1.05] mt-3">
                  THE ARCHITECTURE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#e50914]">
                    OF SILENCE.
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-light max-w-xs leading-relaxed">
                  A study in monolithic concrete geometry, Scandinavian shadow, and tactile typography.
                </p>
              </div>
            </div>

            {/* Emblem / Geometric Sculpture */}
            <div className="my-auto py-6 flex justify-center relative z-10">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 border border-[#e50914]/60 rotate-45 flex items-center justify-center shadow-[0_0_30px_rgba(229,9,20,0.25)]">
                <div className="w-12 h-12 border border-white/30 -rotate-45 flex items-center justify-center">
                  <div className="w-4 h-4 bg-[#e50914]"></div>
                </div>
              </div>
            </div>

            {/* Cover Footer & Flip Hint */}
            <div className="pt-6 border-t border-zinc-800/90 flex items-end justify-between relative z-10">
              <div>
                <div className="text-xs font-mono text-[#e50914] font-bold">PRINCE MAHMUD // LEAD ART DIRECTION</div>
                <div className="text-[10px] font-mono text-zinc-500 mt-0.5">COPENHAGEN · LONDON · ZURICH</div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 group-hover:text-[#e50914]">
                <span>Click edge to flip</span>
                <ChevronRight className="w-4 h-4 text-[#e50914] animate-pulse" />
              </div>
            </div>
          </div>
        );

      case 1: // Inside Front Cover
        return (
          <div className="w-full h-full bg-[#f6f6f6] text-zinc-900 p-8 sm:p-12 flex flex-col justify-between border-r border-zinc-300 relative select-none">
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
            <div>
              <div className="text-xs font-mono text-zinc-500 pb-3 border-b border-zinc-300 flex justify-between">
                <span>STRUCTURA MONOGRAPH</span>
                <span>VOL. XIV // 2025</span>
              </div>
              <div className="mt-8 space-y-4">
                <span className="text-xs font-mono text-[#e50914] font-bold uppercase tracking-wider">EDITORIAL PREFACE</span>
                <h2 className="text-xl sm:text-2xl font-bold font-['Syne',sans-serif] text-zinc-950">
                  The Weight of the Unspoken Word
                </h2>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-light">
                  When designing for architectural spaces, white space is not merely blank paper—it is the acoustic quiet through which monolithic structures speak.
                </p>
                <p className="text-xs text-zinc-600 leading-relaxed font-light">
                  Every column margin in this issue aligns strictly with the golden ratio, paired with bespoke cut matrices in Archivo and Playfair Display.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-300 text-[10px] font-mono text-zinc-500 space-y-1">
              <div>Lead Typography & Grid Architect: Prince Mahmud</div>
              <div>Published by Structura Monograph Press · Copenhagen</div>
              <div>Paper: Munken Polar 150gsm archival uncoated stock</div>
            </div>
          </div>
        );

      case 2: // Page 02 - Manifesto
        return (
          <div className="w-full h-full bg-[#fafafa] text-zinc-900 p-6 sm:p-10 flex flex-col justify-between border-r border-zinc-300 relative select-none">
            <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
            <div>
              <div className="flex justify-between text-[11px] font-mono text-zinc-500 pb-2 border-b border-zinc-300">
                <span>ESSAYS & DIALOGUES</span>
                <span className="font-bold">PAGE 02</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-['Syne',sans-serif] text-zinc-950 mt-6 tracking-tight">
                01. Concrete & Negative Space
              </h2>
              <div className="mt-4 space-y-3 text-xs sm:text-sm text-zinc-700 font-light leading-relaxed">
                <p>
                  Brutalism is often misunderstood as brutality. In truth, it is the stark honesty of materials—allowing timber grain in raw concrete to breathe alongside daylight.
                </p>
                <div className="p-3.5 bg-zinc-100 rounded-md border-l-2 border-[#e50914] text-xs italic font-['Playfair_Display',serif]">
                  "Form follows not only function, but silence."
                </div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-300">
              FOLIO 02 · STRUCTURA ARCHIVE
            </div>
          </div>
        );

      case 3: // Page 03 - Table of Contents
        return (
          <div className="w-full h-full bg-[#fafafa] text-zinc-900 p-6 sm:p-10 flex flex-col justify-between border-l border-zinc-300 relative select-none">
            <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
            <div>
              <div className="flex justify-between text-[11px] font-mono text-zinc-500 pb-2 border-b border-zinc-300">
                <span>CONTENTS</span>
                <span className="font-bold">PAGE 03</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-['Syne',sans-serif] text-zinc-950 mt-6 tracking-tight">
                Curated Features
              </h2>
              <div className="mt-5 space-y-3 font-mono text-xs">
                {[
                  { p: '04', title: 'The Void Gallery | Copenhagen', author: 'Elena Vance' },
                  { p: '18', title: 'The Textiles of Form & Silhouette', author: 'Soren Lind' },
                  { p: '34', title: 'Brutalism\'s Concrete Renaissance', author: 'Prince Mahmud' },
                  { p: '62', title: 'Shadow Gradients & Modernist Spines', author: 'Studio Archive' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-baseline justify-between border-b border-dashed border-zinc-300 pb-1.5">
                    <div>
                      <span className="font-bold text-zinc-950">{item.title}</span>
                      <div className="text-[10px] text-zinc-500">{item.author}</div>
                    </div>
                    <span className="text-[#e50914] font-bold">P. {item.p}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-300">
              FOLIO 03 · TABLE OF CONTENTS
            </div>
          </div>
        );

      case 4: // Page 04 - Feature Spread 1 (Left Half)
        return (
          <div className="w-full h-full relative overflow-hidden bg-zinc-950 select-none">
            <img
              src="./assets/projects/magazine_silence.jpg"
              alt="Feature Spread Left"
              className="w-[200%] h-full max-w-none object-cover object-left"
              referrerPolicy="no-referrer"
            />
            {/* Spine shadow */}
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-zinc-800 bg-white/80 px-2 py-0.5 rounded shadow">
              Page 84 · The Architecture of Silence
            </div>
          </div>
        );

      case 5: // Page 05 - Feature Spread 1 (Right Half)
        return (
          <div className="w-full h-full relative overflow-hidden bg-zinc-950 select-none">
            <img
              src="./assets/projects/magazine_silence.jpg"
              alt="Feature Spread Right"
              className="w-[200%] h-full max-w-none object-cover object-right -translate-x-1/2"
              referrerPolicy="no-referrer"
            />
            {/* Spine shadow */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-3 right-4 text-[10px] font-mono text-zinc-800 bg-white/80 px-2 py-0.5 rounded shadow">
              Page 85 · The Textiles of Form
            </div>
          </div>
        );

      case 6: // Page 06 - Feature Spread 2 (Left Half: Brutalism Photo)
        return (
          <div className="w-full h-full relative overflow-hidden bg-zinc-950 select-none">
            <img
              src="./assets/projects/magazine_spread.jpg"
              alt="Concrete Renaissance Left"
              className="w-[200%] h-full max-w-none object-cover object-left"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-3 left-4 text-[10px] font-mono text-zinc-800 bg-white/80 px-2 py-0.5 rounded shadow">
              Page 24 · Raw Concrete
            </div>
          </div>
        );

      case 7: // Page 07 - Feature Spread 2 (Right Half: Typography)
        return (
          <div className="w-full h-full relative overflow-hidden bg-zinc-950 select-none">
            <img
              src="./assets/projects/magazine_spread.jpg"
              alt="Concrete Renaissance Right"
              className="w-[200%] h-full max-w-none object-cover object-right -translate-x-1/2"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/40 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-3 right-4 text-[10px] font-mono text-zinc-800 bg-white/80 px-2 py-0.5 rounded shadow">
              Page 25 · Concrete Renaissance
            </div>
          </div>
        );

      case 8: // Page 08 - Typographic System Essay
        return (
          <div className="w-full h-full bg-[#fafafa] text-zinc-900 p-6 sm:p-10 flex flex-col justify-between border-r border-zinc-300 relative select-none">
            <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
            <div>
              <div className="flex justify-between text-[11px] font-mono text-zinc-500 pb-2 border-b border-zinc-300">
                <span>TYPOGRAPHIC RIGOR</span>
                <span className="font-bold">PAGE 08</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-['Syne',sans-serif] text-zinc-950 mt-6 tracking-tight">
                The 12-Column Compound Grid
              </h2>
              <div className="mt-4 space-y-3 text-xs sm:text-sm text-zinc-700 font-light leading-relaxed">
                <p>
                  To balance dense academic prose with stark architectural photography, Prince developed an asymmetric baseline grid that maintains optical equilibrium across 168 pages.
                </p>
                <p>
                  Every headline scale was mathematically calibrated to the Fibonacci sequence, guaranteeing harmonious proportions regardless of viewport or paper trim.
                </p>
              </div>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-300">
              FOLIO 08 · DESIGN SPECIFICATIONS
            </div>
          </div>
        );

      case 9: // Page 09 - Pull Quote
        return (
          <div className="w-full h-full bg-[#111116] text-white p-6 sm:p-10 flex flex-col justify-between border-l border-zinc-800 relative select-none">
            <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-black/50 to-transparent pointer-events-none"></div>
            <div>
              <div className="flex justify-between text-[11px] font-mono text-zinc-500 pb-2 border-b border-zinc-800">
                <span>MANIFESTO</span>
                <span className="font-bold text-[#e50914]">PAGE 09</span>
              </div>
              <div className="mt-10 sm:mt-14">
                <span className="text-[#e50914] text-4xl font-serif">“</span>
                <blockquote className="text-lg sm:text-2xl font-['Playfair_Display',serif] italic text-zinc-100 leading-snug">
                  A magazine spread must breathe. If every quadrant screams for attention, the reader hears only noise.
                </blockquote>
                <div className="text-xs font-mono text-zinc-400 mt-4 font-semibold">
                  — Prince Mahmud, Design Notes
                </div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-zinc-600 pt-2 border-t border-zinc-800">
              FOLIO 09 · PRINCIPLES OF RESTRAINT
            </div>
          </div>
        );

      case 10: // Page 10 - Stockists
        return (
          <div className="w-full h-full bg-[#fafafa] text-zinc-900 p-6 sm:p-10 flex flex-col justify-between border-r border-zinc-300 relative select-none">
            <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-black/20 to-transparent pointer-events-none"></div>
            <div>
              <div className="flex justify-between text-[11px] font-mono text-zinc-500 pb-2 border-b border-zinc-300">
                <span>STOCKISTS</span>
                <span className="font-bold">PAGE 10</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-['Syne',sans-serif] text-zinc-950 mt-6 tracking-tight">
                Global Stockists
              </h2>
              <div className="mt-5 space-y-2 text-xs font-mono text-zinc-700">
                {[
                  'Palais de Tokyo Boutique · Paris',
                  'Tate Modern Bookshop · London',
                  'MoMA Design Store · New York',
                  'Daikanyama T-Site · Tokyo',
                  'Louisiana Museum · Copenhagen',
                  'Kunsthalle Basel · Switzerland'
                ].map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2 py-1 border-b border-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e50914]"></span>
                    <span>{s}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-300">
              FOLIO 10 · DISTRIBUTION DIRECTORY
            </div>
          </div>
        );

      case 11: // Page 11 - Back Cover
      default:
        return (
          <div className="w-full h-full bg-[#0a0a0e] text-white p-8 sm:p-12 flex flex-col justify-between border-l border-zinc-800 relative select-none">
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-black/80 to-transparent pointer-events-none"></div>
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#e50914] font-bold tracking-widest">
                STRUCTURA MONOGRAPH // FINIS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-['Syne',sans-serif] text-white mt-4">
                The Architecture of Silence
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                Bi-annual publication documenting architectural brutalism, minimal monographs, and typographic mastery.
              </p>
            </div>

            {/* Barcode & ISBN */}
            <div className="pt-6 border-t border-zinc-800 space-y-2">
              <div className="font-mono text-xs text-zinc-400">
                ISBN 978-0-994821-14-2
              </div>
              <div className="h-10 w-44 bg-white/90 rounded p-1 flex items-center justify-between">
                {[...Array(28)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-full bg-black ${i % 3 === 0 ? 'w-1.5' : i % 2 === 0 ? 'w-0.5' : 'w-1'}`}
                  ></div>
                ))}
              </div>
              <div className="text-[10px] font-mono text-zinc-500">
                © 2025 Structura Monograph. All Rights Reserved.
              </div>
            </div>
          </div>
        );
    }
  };

  // Determine which page numbers are visible on the stationary left and right spreads
  // Spread 0: Left = null (Book Closed), Right = Page 0 (Cover)
  // Spread 1: Left = Page 1, Right = Page 2
  // Spread 2: Left = Page 4, Right = Page 5
  // Spread 3: Left = Page 6, Right = Page 7
  // Spread 4: Left = Page 8, Right = Page 9
  // Spread 5: Left = Page 10, Right = Page 11 (Back Cover)
  const getSpreadPages = (sIndex: number) => {
    switch (sIndex) {
      case 0:
        return { left: null, right: 0 };
      case 1:
        return { left: 1, right: 2 };
      case 2:
        return { left: 4, right: 5 };
      case 3:
        return { left: 6, right: 7 };
      case 4:
        return { left: 8, right: 9 };
      case 5:
      default:
        return { left: 10, right: 11 };
    }
  };

  const currentSpreadPages = getSpreadPages(spreadIndex);

  // For the turning leaf:
  // When flipping 'next' from spread S to S+1:
  // The right page of spread S lifts up and turns over to become the left page of spread S+1!
  // Turning leaf FRONT = current right page (Page X)
  // Turning leaf BACK = next spread's left page (Page Y)
  const nextSpreadPages = getSpreadPages(spreadIndex + 1);
  const prevSpreadPages = getSpreadPages(spreadIndex - 1);

  // Calculate dynamic 3D angle during the flip
  const turningLeafAngle = flipDirection === 'next'
    ? -180 * flipProgress
    : -180 + 180 * flipProgress;

  // Realistic paper bend (curvature along Y-axis peaking around 90 degrees)
  const turningLeafBend = Math.sin(flipProgress * Math.PI) * 4;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/94 backdrop-blur-xl overflow-hidden animate-in fade-in duration-300 select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl flex flex-col h-[94vh] max-h-[880px] bg-[#07070a] border border-zinc-800 rounded-2xl shadow-[0_0_90px_rgba(0,0,0,0.95)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-800 bg-[#0e0e14] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-md bg-[#e50914]/20 text-[#e50914]">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <span>{initialMagazineTitle}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-[#e50914] font-semibold">3D Realistic Page-Turner</span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                Spread 0{spreadIndex + 1} of 0{totalSpreads} · {spreadIndex === 0 ? 'Cover Closed' : spreadIndex === 5 ? 'Back Cover' : `Pages 0${currentSpreadPages.left} — 0${currentSpreadPages.right}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-lg border transition-colors ${
                soundEnabled
                  ? 'bg-zinc-800 border-zinc-700 text-[#e50914]'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-500'
              }`}
              title={soundEnabled ? 'Paper Turn Sound Active' : 'Sound Muted'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Auto Play Slideshow */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-mono transition-colors ${
                isPlaying
                  ? 'bg-[#e50914] border-[#e50914] text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Auto Flip'}</span>
            </button>

            {/* Reset to Cover */}
            <button
              onClick={() => {
                if (!isFlipping) setSpreadIndex(0);
              }}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
              title="Return to Cover"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-lg hover:border-zinc-700 transition-colors"
              title="Close Reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Physics Flipbook Stage */}
        <div className="relative flex-grow flex items-center justify-center p-4 sm:p-8 lg:p-10 overflow-hidden bg-gradient-to-b from-[#09090d] via-[#07070a] to-[#040406] perspective-3000">
          
          {/* Ambient Crimson Aura Underneath Book */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[30rem] bg-[#e50914]/10 rounded-full blur-[160px] pointer-events-none"></div>

          {/* Left Arrow Quick Trigger */}
          <button
            onClick={handlePrevPage}
            disabled={spreadIndex === 0 || isFlipping}
            className={`absolute left-4 sm:left-6 z-40 p-3.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-white shadow-2xl transition-all duration-200 ${
              spreadIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#e50914] hover:scale-110 active:scale-95'
            }`}
            title="Flip Backward (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Quick Trigger */}
          <button
            onClick={handleNextPage}
            disabled={spreadIndex === totalSpreads - 1 || isFlipping}
            className={`absolute right-4 sm:right-6 z-40 p-3.5 rounded-full bg-zinc-950/80 border border-zinc-800 text-white shadow-2xl transition-all duration-200 ${
              spreadIndex === totalSpreads - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-[#e50914] hover:scale-110 active:scale-95'
            }`}
            title="Flip Forward (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Real 3D Book Chassis */}
          <div className="relative w-full max-w-4xl aspect-[16/10.5] sm:aspect-[16/10] rounded-xl flex preserve-3d shadow-[0_30px_90px_rgba(0,0,0,0.95)]">
            
            {/* Soft Page Stack Shadow Behind Entire Book */}
            <div className="absolute -inset-2 bg-black/60 rounded-xl blur-lg -z-10"></div>

            {/* Left Page Half (Stationary or Background) */}
            <div
              onClick={() => {
                if (spreadIndex > 0) handlePrevPage();
              }}
              onMouseEnter={() => setIsHoveringLeftCorner(true)}
              onMouseLeave={() => setIsHoveringLeftCorner(false)}
              className={`w-1/2 h-full rounded-l-lg overflow-hidden relative border border-r-0 border-zinc-800/90 shadow-inner ${
                spreadIndex === 0
                  ? 'bg-transparent border-transparent pointer-events-none'
                  : 'bg-zinc-900 cursor-w-resize'
              }`}
            >
              {/* If flipping backward, the page underneath is prevSpreadPages.left */}
              {isFlipping && flipDirection === 'prev' ? (
                prevSpreadPages.left !== null ? renderPage(prevSpreadPages.left, false) : null
              ) : (
                currentSpreadPages.left !== null ? renderPage(currentSpreadPages.left, false) : null
              )}

              {/* Dynamic Shadow Cast On Left Page as page lands */}
              {isFlipping && flipDirection === 'next' && (
                <div
                  className="absolute inset-0 bg-black pointer-events-none transition-opacity"
                  style={{
                    opacity: flipProgress > 0.5 ? (flipProgress - 0.5) * 0.7 : 0
                  }}
                ></div>
              )}

              {/* Left Dog-Ear Interactive Hover Corner Peel */}
              {spreadIndex > 0 && isHoveringLeftCorner && !isFlipping && (
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-zinc-400 to-transparent shadow-lg transform -rotate-12 translate-y-1 pointer-events-none transition-transform duration-300">
                  <div className="text-[9px] font-mono font-bold text-black p-1">FLIP ◀</div>
                </div>
              )}
            </div>

            {/* Central Book Spine & Binding Crease */}
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 z-30 pointer-events-none paper-spine-shadow flex items-center justify-center">
              <div className="w-[1.5px] h-full bg-black/40 shadow-[0_0_4px_rgba(0,0,0,0.6)]"></div>
            </div>

            {/* Right Page Half (Stationary or Background) */}
            <div
              onClick={() => {
                if (spreadIndex < totalSpreads - 1) handleNextPage();
              }}
              onMouseEnter={() => setIsHoveringRightCorner(true)}
              onMouseLeave={() => setIsHoveringRightCorner(false)}
              className="w-1/2 h-full rounded-r-lg overflow-hidden relative border border-l-0 border-zinc-800/90 shadow-inner bg-zinc-900 cursor-e-resize"
            >
              {/* If flipping forward, the right underlying page is already revealed! (nextSpreadPages.right) */}
              {isFlipping && flipDirection === 'next' ? (
                renderPage(nextSpreadPages.right, true)
              ) : (
                renderPage(currentSpreadPages.right, true)
              )}

              {/* Dynamic Shadow Cast On Right Page as page lifts */}
              {isFlipping && flipDirection === 'next' && (
                <div
                  className="absolute inset-0 bg-black pointer-events-none transition-opacity"
                  style={{
                    opacity: (1 - flipProgress) * 0.5
                  }}
                ></div>
              )}

              {/* Right Dog-Ear Interactive Hover Corner Peel */}
              {spreadIndex < totalSpreads - 1 && isHoveringRightCorner && !isFlipping && (
                <div className="absolute bottom-0 right-0 w-14 h-14 bg-gradient-to-tl from-zinc-300 via-white to-transparent shadow-2xl rounded-tl-xl transform -rotate-6 -translate-y-1 -translate-x-1 pointer-events-none transition-all duration-300 border-t border-l border-white/60">
                  <div className="text-[9px] font-mono font-bold text-black text-right p-1.5 pt-3">
                    PEEL ▶
                  </div>
                </div>
              )}
            </div>

            {/* ============================================================== */}
            {/* THE PHYSICAL TURNING LEAF (Double-Sided 3D Rotating Leaf) */}
            {/* ============================================================== */}
            {isFlipping && (
              <div
                className={`absolute top-0 bottom-0 w-1/2 z-40 preserve-3d pointer-events-none ${
                  flipDirection === 'next'
                    ? 'left-1/2 origin-left'
                    : 'left-0 origin-right'
                }`}
                style={{
                  transform: `rotateY(${turningLeafAngle}deg) skewY(${flipDirection === 'next' ? -turningLeafBend : turningLeafBend}deg)`,
                  transition: 'none' // Controlled dynamically via requestAnimationFrame for butter-smooth 60fps
                }}
              >
                {/* FRONT FACE OF THE TURNING LEAF */}
                <div className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-r-lg shadow-[-15px_0_35px_rgba(0,0,0,0.65)]">
                  {flipDirection === 'next' ? (
                    renderPage(currentSpreadPages.right, true)
                  ) : (
                    renderPage(currentSpreadPages.left !== null ? currentSpreadPages.left : 0, false)
                  )}

                  {/* Dynamic Darkening Shadow as Leaf turns away from viewer */}
                  <div
                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/60 via-black/30 to-transparent"
                    style={{
                      opacity: Math.sin(flipProgress * Math.PI) * 0.75
                    }}
                  ></div>
                </div>

                {/* BACK FACE OF THE TURNING LEAF (Mirrored 180deg) */}
                <div
                  className="absolute inset-0 w-full h-full backface-hidden overflow-hidden rounded-l-lg shadow-[15px_0_35px_rgba(0,0,0,0.65)]"
                  style={{
                    transform: 'rotateY(180deg)'
                  }}
                >
                  {flipDirection === 'next' ? (
                    renderPage(nextSpreadPages.left !== null ? nextSpreadPages.left : 1, false)
                  ) : (
                    renderPage(prevSpreadPages.right, true)
                  )}

                  {/* Dynamic Light Sheen as Leaf flattens on the opposite side */}
                  <div
                    className="absolute inset-0 pointer-events-none bg-gradient-to-l from-black/50 via-white/10 to-transparent"
                    style={{
                      opacity: Math.sin(flipProgress * Math.PI) * 0.65
                    }}
                  ></div>
                </div>
              </div>
            )}

          </div>

        </div>

        {/* Bottom Interactive Thumbnail & Spread Jumper */}
        <div className="px-5 py-3.5 border-t border-zinc-800 bg-[#0c0c12] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          
          {/* Thumbnails of every spread */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            {['Cover', 'Pages 02-03', 'Pages 04-05', 'Pages 06-07', 'Pages 08-09', 'Back Cover'].map((name, idx) => (
              <button
                key={idx}
                disabled={isFlipping}
                onClick={() => {
                  if (idx !== spreadIndex && !isFlipping) {
                    playRealisticPaperFlipSound();
                    setSpreadIndex(idx);
                  }
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all whitespace-nowrap ${
                  idx === spreadIndex
                    ? 'bg-[#e50914] text-white font-bold shadow-[0_0_12px_rgba(229,9,20,0.4)]'
                    : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Quick Actions & Shortcut Guide */}
          <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span className="hidden lg:inline text-zinc-500">
              Flip by clicking right/left pages or using Arrow Keys (← →)
            </span>
            <div className="h-3 w-px bg-zinc-800 hidden lg:block"></div>
            <button
              onClick={handlePrevPage}
              disabled={spreadIndex === 0 || isFlipping}
              className="px-3 py-1.5 text-xs font-semibold rounded bg-zinc-950 border border-zinc-800 text-zinc-300 hover:text-white disabled:opacity-30 transition-colors"
            >
              ← Prev Spread
            </button>
            <button
              onClick={handleNextPage}
              disabled={spreadIndex === totalSpreads - 1 || isFlipping}
              className="px-3 py-1.5 text-xs font-semibold rounded bg-[#e50914] text-white hover:bg-[#c80812] disabled:opacity-30 transition-colors shadow-[0_0_10px_rgba(229,9,20,0.3)]"
            >
              Next Spread →
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
