import React from 'react';
import { X, Download, Printer, Mail, Award, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContact: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose, onContact }) => {
  if (!isOpen) return null;

  const { data } = usePortfolio();
  const { profile, skills, education, certifications, competencies } = data;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#09090b] border border-zinc-800 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#e50914]"></span>
            <span>CURRICULUM VITAE · PRINCE MAHMUD</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
              title="Print CV"
            >
              <Printer className="w-3.5 h-3.5 text-[#e50914]" />
              <span className="hidden sm:inline">Print CV</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body / Paper Container */}
        <div className="p-6 sm:p-10 space-y-8 max-h-[82vh] overflow-y-auto">
          
          {/* Header Zone */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-zinc-800">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Prince Mahmud
              </h2>
              <div className="text-sm font-mono text-[#e50914] font-bold mt-1">
                Senior Magazine & UI/UX Expert · Brand Identity Specialist
              </div>
              <p className="text-xs text-zinc-400 mt-2 font-light max-w-xl">
                10+ years specializing in tactile editorial layouts, design token architectures, and high-conversion SaaS digital interfaces for global publications and tech firms.
              </p>
            </div>

            <div className="text-right space-y-1 text-xs font-mono text-zinc-400 shrink-0 self-start sm:self-auto">
              <div>{profile.email}</div>
              <div>London & Worldwide Remote</div>
              <div className="text-emerald-400">Available for Select Commissions</div>
            </div>
          </div>

          {/* Experience Grid */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-bold">
              <Briefcase className="w-4 h-4 text-[#e50914]" />
              Career Track Record
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-850 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white text-sm">Lead Visual Architect & Independent Practice</span>
                  <span className="text-[#e50914]">2020 - Present</span>
                </div>
                <div className="text-xs text-zinc-400">London, New York, Zurich & Tokyo Clients</div>
                <p className="text-xs text-zinc-400 font-light pt-1">
                  Directing end-to-end editorial publications, avant-garde monographs, design tokens, and institutional financial terminals. Produced over 150+ successful client releases.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-850 space-y-1">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-white text-sm">Senior Editorial & UI Art Director</span>
                  <span className="text-zinc-400">2016 - 2020</span>
                </div>
                <div className="text-xs text-zinc-400">Vanguard Studio / European Publications</div>
                <p className="text-xs text-zinc-400 font-light pt-1">
                  Headed print prepress and digital design systems. Architected multi-column editorial frameworks for high-gloss biannuals and digital commerce platforms.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-bold">
                <GraduationCap className="w-4 h-4 text-[#e50914]" />
                Education
              </div>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-zinc-950/60 border border-zinc-850">
                    <div className="text-xs text-[#e50914] font-mono">{edu.year}</div>
                    <div className="text-xs font-bold text-white">{edu.degree}</div>
                    <div className="text-[11px] text-zinc-400">{edu.institution}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-bold">
                <Award className="w-4 h-4 text-[#e50914]" />
                Accreditations
              </div>
              <div className="space-y-2">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-zinc-950/60 border border-zinc-850 text-xs text-zinc-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e50914]"></span>
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Software Skills */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-white font-bold">
              <Sparkles className="w-4 h-4 text-[#e50914]" />
              Software Mastery & Craft
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skills.map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-850">
                  <div className="text-xs font-bold text-white">{s.name}</div>
                  <div className="text-[11px] font-mono text-[#e50914]">{s.experience} · {s.level}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400 font-mono text-center sm:text-left">
              Looking for full credentials or references? Reach out directly.
            </div>

            <button
              onClick={() => {
                onClose();
                onContact();
              }}
              className="px-5 py-2.5 rounded-xl bg-[#e50914] hover:bg-[#c80812] text-white text-xs font-bold transition-all shadow-[0_0_15px_rgba(229,9,20,0.35)]"
            >
              Contact Prince
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
