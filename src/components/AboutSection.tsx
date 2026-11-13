import React from 'react';
import { Sparkles, Award, Compass, BookOpen, Layers } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const AboutSection: React.FC = () => {
  const { data } = usePortfolio();
  const { profile, competencies, education } = data;

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-32 relative border-t border-zinc-800/80 bg-zinc-950/40 overflow-hidden">
      
      {/* Background Accent Glow */}
      <div className="absolute top-1/3 left-0 w-72 h-72 sm:w-80 sm:h-80 bg-[#e50914]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e50914] font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#e50914] shadow-[0_0_8px_#e50914]"></span>
            Philosophy & Heritage
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            About Prince
          </h2>
        </div>

        {/* 2-Column Split: Editorial Bio & Competencies Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Deep Bio Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xl sm:text-2xl font-light text-zinc-200 leading-relaxed font-editorial italic">
              "Design is the deliberate orchestration of silence, contrast, and mathematical grid systems to provoke unmistakable emotional resonance."
            </p>

            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed font-light">
              <p>
                {profile.bio}
              </p>
              <p>
                Trained in classic Swiss typographic hierarchy and modern interaction architecture, I bridge the tactile intimacy of high-gloss print with the hyper-responsive demands of modern digital products. Whether establishing a 168-page magazine layout from a raw editorial brief or structuring a design system for a fintech terminal, I treat typography as sacred architecture.
              </p>
            </div>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-900">
              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                <Compass className="w-5 h-5 text-[#e50914] mb-2" />
                <div className="text-sm font-bold text-white">Mathematical Grid</div>
                <div className="text-xs text-zinc-500 mt-1">12-column Swiss precision baseline rhythm.</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                <BookOpen className="w-5 h-5 text-[#e50914] mb-2" />
                <div className="text-sm font-bold text-white">Tactile Craft</div>
                <div className="text-xs text-zinc-500 mt-1">Obsessive paper stock & prepress finishes.</div>
              </div>

              <div className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80">
                <Layers className="w-5 h-5 text-[#e50914] mb-2" />
                <div className="text-sm font-bold text-white">Scalable Systems</div>
                <div className="text-xs text-zinc-500 mt-1">Design tokens bridging Figma to production.</div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Competencies & Education */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Core Competencies Matrix */}
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-[#e50914]" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
                  Core Specializations
                </h3>
              </div>
              <ul className="grid grid-cols-1 gap-2.5">
                {competencies.map((comp, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e50914]"></span>
                    <span>{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Academic Pedigree */}
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-[#e50914]" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
                  Education & Credentials
                </h3>
              </div>

              {education.map((edu, idx) => (
                <div key={idx} className="text-left space-y-1 pb-3 border-b border-zinc-900 last:border-b-0 last:pb-0">
                  <div className="text-xs text-[#e50914] font-mono">{edu.year}</div>
                  <div className="text-sm font-bold text-white">{edu.degree}</div>
                  <div className="text-xs text-zinc-400">{edu.institution}</div>
                  <div className="text-xs text-zinc-500 font-light">{edu.focus}</div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
