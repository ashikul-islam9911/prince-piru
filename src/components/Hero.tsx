import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { CreativeWorkspaceBackground } from './CreativeWorkspaceBackground';
import { AdobeOrbitRing } from './AdobeOrbitRing';

interface HeroProps {
  onOpenResume?: () => void;
  onOpenContact?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const { data } = usePortfolio();
  const { profile, stats } = data;

  return (
    <section className="relative min-h-[88vh] pt-24 sm:pt-28 lg:pt-36 pb-14 sm:pb-16 lg:pb-24 overflow-hidden flex flex-col justify-between">
      {/* Cinematic Red & Black Atmospheric Studio Background */}
      <CreativeWorkspaceBackground />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Monumental Typographic Hierarchy */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6 text-left">
            
            {/* Kicker Tag */}
            <div className="inline-flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="h-px w-6 sm:w-8 bg-[#e50914]"></span>
              <span className="text-[11px] sm:text-sm font-semibold tracking-wider uppercase text-zinc-300 font-mono">
                {profile.greeting}
              </span>
              <span className="hidden sm:inline text-zinc-600">/</span>
              <span className="hidden sm:inline text-xs text-zinc-400 font-medium">Independent Practice</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[2rem] leading-[1.12] sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white sm:leading-[1.08] text-balance">
              {profile.tagline.includes('|') ? (
                <>
                  {profile.tagline.split('|')[0]}{' '}
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400 mt-1 sm:mt-0">
                    |{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e50914] to-[#ff4d58] drop-shadow-[0_0_30px_rgba(229,9,20,0.5)]">
                      {profile.tagline.split('|')[1]}
                    </span>
                  </span>
                </>
              ) : (
                profile.tagline
              )}
            </h1>

            {/* Subtle Action Strip */}
            <div className="flex flex-wrap items-center gap-3 pt-1 sm:pt-2">
              <a
                href="#work"
                className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#e50914] hover:bg-[#c80812] text-white text-xs sm:text-sm font-bold shadow-[0_0_24px_rgba(229,9,20,0.35)] hover:shadow-[0_0_32px_rgba(229,9,20,0.55)] transition-all active:scale-95"
              >
                <span>Explore Selected Works</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              {onOpenContact && (
                <button
                  onClick={onOpenContact}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-200 hover:text-white text-xs sm:text-sm font-semibold transition-all"
                >
                  <span>Start a Commission</span>
                  <ArrowUpRight className="w-4 h-4 text-[#e50914] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Workstation Portrait with 3D Orbiting Adobe Software Suite */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <AdobeOrbitRing>
              <div className="relative w-full max-w-[230px] sm:max-w-[340px] md:max-w-md animate-hero-float">
              
              {/* Backlight Crimson Ambient Pulsing Glow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#e50914]/40 via-[#e50914]/15 to-transparent rounded-3xl blur-2xl animate-crimson-pulse"></div>

              {/* Main Portrait Card Container with Laser Sweep Border */}
              <div className="relative rounded-2xl bg-zinc-950/90 border border-zinc-800/90 p-2 sm:p-2.5 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden group hover:border-[#e50914]/50 transition-colors duration-500">
                
                {/* Laser Sweep Shimmer Effect */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e50914] to-transparent animate-laser-sweep pointer-events-none"></div>

                {/* Subtle Decorative Editorial Corner Marks */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 w-3 h-3 border-t-2 border-l-2 border-[#e50914]"></div>
                <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 w-3 h-3 border-t-2 border-r-2 border-[#e50914]"></div>
                <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 z-20 w-3 h-3 border-b-2 border-l-2 border-[#e50914]"></div>
                <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 z-20 w-3 h-3 border-b-2 border-r-2 border-[#e50914]"></div>

                {/* Portrait Image Container */}
                <div className="relative aspect-square sm:aspect-[4/5] w-full rounded-xl overflow-hidden bg-zinc-950">
                  <img
                    src={profile.portraitImage}
                    alt="Prince - Senior Magazine & UI/UX Expert at Studio Workstation"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Cinematic Contrast Scrim Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none"></div>

                </div>
              </div>

            </div>
          </AdobeOrbitRing>
        </div>

        </div>

        {/* 4-Column Key Statistics Counters Strip */}
        <div className="mt-10 sm:mt-16 lg:mt-24 pt-6 sm:pt-8 border-t border-zinc-800/80">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="relative p-4 sm:p-6 rounded-xl bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/80 transition-all group"
              >
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white font-['Syne',sans-serif] tabular-nums group-hover:text-[#e50914] transition-colors">
                    {stat.value}
                  </span>
                </div>
                <div className="mt-1.5 sm:mt-2 text-xs sm:text-sm font-semibold text-zinc-200">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-500 mt-0.5">
                  {stat.sub}
                </div>
                <div className="absolute bottom-0 left-4 right-4 sm:left-6 sm:right-6 h-0.5 bg-gradient-to-r from-transparent via-[#e50914]/0 to-transparent group-hover:via-[#e50914]/50 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
