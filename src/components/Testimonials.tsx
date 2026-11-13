import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star, Building2, MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const Testimonials: React.FC = () => {
  const { testimonials } = PORTFOLIO_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex] || testimonials[0];

  return (
    <section id="testimonials" className="py-16 sm:py-24 lg:py-32 relative border-t border-zinc-800/80 bg-zinc-950/60 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] h-[20rem] sm:w-[30rem] sm:h-[30rem] bg-[#e50914]/5 rounded-full blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e50914] font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#e50914] shadow-[0_0_8px_#e50914]"></span>
            Client Endorsements
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Trusted by Visionaries
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 font-light">
            Reflections from editors-in-chief, product leaders, and luxury brand founders.
          </p>
        </div>

        {/* Minimalist Quote Box */}
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-zinc-950 border border-zinc-800 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-black/80">
            
            {/* Top Quote Icon & Rating */}
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 rounded-2xl bg-[#e50914]/10 text-[#e50914] border border-[#e50914]/20">
                <Quote className="w-6 h-6" />
              </div>

              {/* 5-Star Indicator */}
              <div className="flex items-center gap-1 text-[#e50914]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
            </div>

            {/* Main Quote Statement */}
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-100 leading-relaxed font-editorial italic min-h-[140px] flex items-center">
              "{current.quote}"
            </blockquote>

            {/* Author Attribution & Project Meta */}
            <div className="mt-10 pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <div className="text-lg font-bold text-white tracking-tight">
                  {current.author}
                </div>
                <div className="text-xs text-zinc-400 flex items-center gap-2 mt-0.5 font-mono">
                  <span>{current.role}</span>
                  <span className="text-zinc-600">·</span>
                  <span className="text-[#e50914] flex items-center gap-1 font-semibold">
                    <Building2 className="w-3 h-3" />
                    {current.company}
                  </span>
                  <span className="text-zinc-600">·</span>
                  <span className="flex items-center gap-1 text-zinc-500">
                    <MapPin className="w-3 h-3" />
                    {current.location}
                  </span>
                </div>
              </div>

              {/* Slider Pagination Controls */}
              <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                <span className="text-xs font-mono text-zinc-500 mr-2">
                  0{currentIndex + 1} / 0{testimonials.length}
                </span>

                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
