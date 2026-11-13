import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioCategory, Project } from '../data/portfolioData';

interface SelectedProjectsProps {
  onSelectCategory: (category: PortfolioCategory) => void;
  onSelectProject?: (project: Project) => void;
  onOpenFlipbook?: (magazineTitle: string) => void;
}

export const SelectedProjects: React.FC<SelectedProjectsProps> = ({ 
  onSelectCategory
}) => {
  const { data } = usePortfolio();

  return (
    <section id="work" className="py-24 lg:py-32 relative border-t border-zinc-800/80">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#e50914]/5 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Section Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e50914] font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#e50914] shadow-[0_0_8px_#e50914]"></span>
            Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Selected Works
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl font-light">
            Select a discipline below to explore curated publications, brand identities, and digital case studies.
          </p>
        </div>

        {/* Pure Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {data.categories.map((cat) => {
            const projectCount = data.projects.filter(p => p.category === cat.name).length;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat)}
                className="group relative flex flex-col rounded-2xl bg-zinc-950/80 border border-zinc-800/90 hover:border-[#e50914]/60 transition-all duration-300 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-[#e50914]/15"
              >
                {/* Category Thumbnail Image - Clean, no floating text on top */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={cat.imageUrl}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />

                  {/* Subtle Gradient Scrim on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>

                  {/* Hover Quick Action Indicator */}
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2.5 rounded-full bg-[#e50914] text-white shadow-[0_0_15px_#e50914]">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Below Thumbnail: Title & Project Count (No short description) */}
                <div className="p-5 sm:p-6 flex items-center justify-between gap-4 bg-zinc-950 border-t border-zinc-800/80">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-[#e50914] transition-colors leading-snug">
                      {cat.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:border-zinc-700 transition-colors">
                      {projectCount} Projects
                    </span>
                    <span className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-[#e50914]/40 transition-colors">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inquiries Footer */}
        <div className="mt-14 text-center">
          <p className="text-sm text-zinc-400">
            Have a custom magazine or brand project in mind?{' '}
            <a
              href="#contact"
              className="text-[#e50914] font-semibold underline underline-offset-4 hover:text-[#ff4d58] transition-colors"
            >
              Request a private portfolio deck & case archive
            </a>
          </p>
        </div>

      </div>
    </section>
  );
};
