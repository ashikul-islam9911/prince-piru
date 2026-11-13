import React, { useState } from 'react';
import { Layers, ArrowRight, CheckCircle2, Clock, Cpu } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const SkillsAndProcess: React.FC = () => {
  const { data } = usePortfolio();
  const { skills, workflow } = data;
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-32 relative border-t border-zinc-800/80 overflow-hidden">
      
      {/* Background Subtle Gradient */}
      <div className="absolute bottom-10 right-10 w-80 h-80 sm:w-96 sm:h-96 bg-[#e50914]/5 rounded-full blur-[170px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e50914] font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#e50914] shadow-[0_0_8px_#e50914]"></span>
            Technical Rigor & Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Software Mastery & 5-Step Process
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-2xl font-light">
            A disciplined synthesis of industry-standard creative software and a battle-tested five-stage execution pipeline.
          </p>
        </div>

        {/* 2-Column Split: Software Skills & Workflow Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Software Skill Badges & Progress */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#e50914]" />
                Software Proficiencies
              </h3>
              <span className="text-[11px] font-mono text-zinc-500">10+ Years Baseline</span>
            </div>

            <div className="space-y-3">
              {skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-2 h-2 rounded-full bg-[#e50914] shrink-0"></div>
                      <span className="text-sm font-bold text-white group-hover:text-[#e50914] transition-colors truncate">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 font-semibold shrink-0 ml-2">{skill.level}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 rounded-full bg-zinc-900 overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-[#e50914] to-[#ff4d58] rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>

                  <p className="text-xs text-zinc-500 font-light line-clamp-2">
                    {skill.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 5-Step Visual Workflow Pipeline */}
          <div id="process" className="lg:col-span-7 space-y-5 sm:space-y-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#e50914]" />
                5-Step Production Pipeline
              </h3>
              <span className="text-[11px] font-mono text-[#e50914]">Discover → Deliver</span>
            </div>

            {/* Step Selection Navigation */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-2 rounded-xl bg-zinc-900/80 border border-zinc-800">
              {workflow.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`py-2 px-2.5 sm:px-1.5 text-center rounded-lg transition-all ${
                    idx === workflow.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                  } ${
                    activeStep === idx
                      ? 'bg-[#e50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.4)]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                  }`}
                >
                  <div className="text-[10px] font-mono opacity-80">{item.step}</div>
                  <div className="text-xs font-bold truncate">{item.name}</div>
                </button>
              ))}
            </div>

            {/* Active Workflow Card Details */}
            {(() => {
              const current = workflow[activeStep];
              return (
                <div className="p-5 sm:p-8 rounded-2xl bg-zinc-950/90 border border-zinc-800 shadow-xl space-y-5 sm:space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-900">
                    <div>
                      <div className="text-xs font-mono text-[#e50914] font-bold">STAGE {current.step} OF 05</div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                        {current.name} : <span className="font-light text-zinc-300 text-base sm:text-lg">{current.tagline}</span>
                      </h4>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 self-start sm:self-auto">
                      <Clock className="w-3.5 h-3.5 text-[#e50914]" />
                      <span>{current.duration}</span>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {current.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    {/* Activities List */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                        Key Activities
                      </div>
                      <ul className="space-y-2">
                        {current.activities.map((act, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2 text-xs text-zinc-300 font-light">
                            <span className="text-[#e50914] mt-0.5">▪</span>
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Deliverables List */}
                    <div className="space-y-2.5">
                      <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold">
                        Phase Deliverables
                      </div>
                      <ul className="space-y-2">
                        {current.deliverables.map((del, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2 text-xs text-white">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Step Pagination Controls */}
                  <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : workflow.length - 1))}
                      className="text-zinc-400 hover:text-white transition-colors"
                    >
                      ← Previous Stage
                    </button>
                    <span className="text-zinc-600">·</span>
                    <button
                      onClick={() => setActiveStep((prev) => (prev < workflow.length - 1 ? prev + 1 : 0))}
                      className="text-[#e50914] hover:text-[#ff4d58] font-bold transition-colors flex items-center gap-1"
                    >
                      <span>Next Stage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })()}

          </div>

        </div>

      </div>
    </section>
  );
};
