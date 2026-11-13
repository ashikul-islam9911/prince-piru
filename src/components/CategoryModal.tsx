import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowUpRight } from 'lucide-react';
import { PortfolioCategory, Project } from '../data/portfolioData';

interface CategoryModalProps {
  category: PortfolioCategory | null;
  projects: Project[];
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  category,
  projects,
  onClose,
  onSelectProject
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!category) return null;

  // Filter projects belonging to this category
  const categoryProjects = projects.filter(p => p.category === category.name);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#09090b] border border-zinc-800/90 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Minimalist Category Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md shrink-0 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors border border-zinc-800 flex items-center gap-1.5 text-xs font-mono"
            >
              <ArrowLeft className="w-4 h-4 text-[#e50914]" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="h-4 w-px bg-zinc-800 hidden sm:block"></div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {category.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400">
              {categoryProjects.length} Items
            </span>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors"
              title="Close (Esc)"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Items Grid */}
        <div className="overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categoryProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group relative flex flex-col rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-[#e50914]/60 transition-all duration-300 overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl hover:shadow-[#e50914]/15"
              >
                {/* Thumbnail / Cover */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity"></div>
                  
                  {/* Hover Quick Action */}
                  <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="p-2 rounded-full bg-[#e50914] text-white shadow-[0_0_15px_#e50914]">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Item Title Below Thumbnail */}
                <div className="p-5 flex items-center justify-between gap-4 bg-zinc-950 border-t border-zinc-800/80">
                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#e50914] transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <span className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-white group-hover:border-[#e50914]/40 transition-colors shrink-0">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
