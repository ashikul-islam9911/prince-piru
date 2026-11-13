import React, { useEffect, useState } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  FileText, 
  Download, 
  ZoomIn, 
  ExternalLink
} from 'lucide-react';
import { Project, ProjectAsset } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onInquire: (projectTitle: string) => void;
  onOpenFlipbook?: (magazineTitle: string) => void;
  onBackToCategory?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onNext,
  onPrev,
  onInquire,
  onBackToCategory
}) => {
  const [lightboxAsset, setLightboxAsset] = useState<{ url: string; title: string; caption?: string } | null>(null);

  // Keyboard navigation (Esc to close, Left/Right arrow to cycle projects)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxAsset) {
          setLightboxAsset(null);
        } else {
          onClose();
        }
      }
      if (!lightboxAsset) {
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, lightboxAsset]);

  if (!project) return null;

  const galleryItems: ProjectAsset[] = project.gallery || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#09090b] border border-zinc-800/90 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[94vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Minimalist Header */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-4 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md shrink-0 z-20">
          <div className="flex items-center gap-3">
            {onBackToCategory && (
              <button
                onClick={onBackToCategory}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors border border-zinc-800 flex items-center gap-1.5 text-xs font-mono"
                title="Back to Items"
              >
                <ArrowLeft className="w-4 h-4 text-[#e50914]" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Navigation & Close */}
          <div className="flex items-center gap-2">
            <button
              onClick={onPrev}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors border border-transparent hover:border-zinc-700"
              title="Previous Project (Left Arrow)"
              aria-label="Previous Project"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={onNext}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors border border-transparent hover:border-zinc-700"
              title="Next Project (Right Arrow)"
              aria-label="Next Project"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="h-5 w-px bg-zinc-800 mx-1"></div>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded-lg transition-colors border border-transparent hover:border-zinc-700"
              title="Close (Esc)"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Minimalist Visual Scroll Stream */}
        <div className="overflow-y-auto p-4 sm:p-8 space-y-8 scroll-smooth">
          
          {/* Fallback to Cover Thumbnail only if no Main Files are attached */}
          {galleryItems.length === 0 && (
            <div
              onClick={() => setLightboxAsset({ url: project.imageUrl, title: project.title, caption: project.subtitle })}
              className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-2xl cursor-zoom-in group"
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-auto object-contain max-h-[85vh] mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="px-4 py-2 rounded-full bg-black/80 text-white text-xs font-mono flex items-center gap-2 border border-zinc-700 shadow-xl backdrop-blur-sm">
                  <ZoomIn className="w-3.5 h-3.5 text-[#e50914]" />
                  <span>Click to Zoom</span>
                </div>
              </div>
            </div>
          )}

          {/* Vertical Main Files Stream: PNG, WebP, JPG Mockups & PDFs */}
          {galleryItems.map((asset, index) => {
            const isPdf = asset.type === 'pdf';

            return (
              <div key={asset.id || index} className="space-y-3">
                {isPdf ? (
                  <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl flex flex-col">
                    {/* Header bar on PDF */}
                    <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 text-xs font-mono text-zinc-300">
                      <div className="flex items-center gap-2 font-bold text-white">
                        <FileText className="w-4 h-4 text-[#e50914]" />
                        <span>{asset.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={asset.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-[#e50914]" />
                          <span>View Fullscreen</span>
                        </a>
                        <a
                          href={asset.url}
                          download={`${project.title.replace(/\s+/g, '_')}_Document.pdf`}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white transition-colors"
                        >
                          <Download className="w-3.5 h-3.5 text-[#e50914]" />
                          <span>Download</span>
                        </a>
                      </div>
                    </div>

                    {/* Scrollable PDF Viewer */}
                    <div className="relative w-full h-[650px] sm:h-[800px] bg-zinc-950">
                      <iframe
                        src={`${asset.url}#toolbar=1&navpanes=0&scrollbar=1`}
                        className="w-full h-full border-0"
                        title={asset.title}
                      />
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setLightboxAsset({ url: asset.url, title: asset.title, caption: asset.caption })}
                    className="relative rounded-2xl overflow-hidden bg-zinc-900/70 border border-zinc-800/80 shadow-2xl cursor-zoom-in group"
                  >
                    <img
                      src={asset.url}
                      alt={asset.title}
                      className="w-full h-auto object-contain max-h-[85vh] mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                      <div className="px-4 py-2 rounded-full bg-black/80 text-white text-xs font-mono flex items-center gap-2 border border-zinc-700 shadow-xl backdrop-blur-sm">
                        <ZoomIn className="w-3.5 h-3.5 text-[#e50914]" />
                        <span>Click to Zoom</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Minimalist Bottom Bar */}
          <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between">
            <button
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#e50914] hover:bg-[#c80812] transition-colors rounded-lg shadow-[0_0_15px_rgba(229,9,20,0.35)]"
            >
              <span>Discuss This Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onClose}
              className="text-xs font-mono text-zinc-400 hover:text-white transition-colors"
            >
              Close Viewer
            </button>
          </div>

        </div>

      </div>

      {/* Fullscreen Lightbox for Images/Mockups */}
      {lightboxAsset && (
        <div
          className="fixed inset-0 z-60 bg-black/95 flex flex-col items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightboxAsset(null)}
        >
          <div className="absolute top-4 right-4 flex items-center gap-3 z-10">
            <button
              onClick={() => setLightboxAsset(null)}
              className="p-2 rounded-lg bg-zinc-900/90 text-white hover:bg-zinc-800 border border-zinc-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div
            className="max-w-6xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxAsset.url}
              alt={lightboxAsset.title}
              className="max-h-[82vh] w-auto object-contain rounded-xl shadow-2xl border border-zinc-800"
            />
          </div>
        </div>
      )}

    </div>
  );
};
