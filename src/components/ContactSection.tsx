import React, { useState } from 'react';
import { Mail, Copy, Check, ArrowUpRight, Send, MapPin, Globe, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface ContactSectionProps {
  initialSubject?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialSubject = 'Magazine & Editorial Design' }) => {
  const { data, settings } = usePortfolio();
  const { profile, socials } = data;
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: initialSubject,
    budget: '$5k - $10k',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 relative border-t border-zinc-800/80 bg-zinc-950 overflow-hidden">
      
      {/* Background Crimson Atmosphere */}
      <div className="absolute top-1/4 left-1/4 w-[22rem] h-[22rem] sm:w-[35rem] sm:h-[35rem] bg-[#e50914]/8 rounded-full blur-[190px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#e50914] font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-[#e50914] shadow-[0_0_8px_#e50914]"></span>
            Start a Collaboration
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Let's Work Together.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl font-light">
            Currently accepting commissions for select magazine publications, digital product redesigns, and luxury brand identities.
          </p>
        </div>

        {/* 2-Column Split: Direct Contact & Interactive Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Outreach & Social Links */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            
            {/* 1-Click Copy Email Card */}
            <div className="p-5 sm:p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/90 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                <span>DIRECT EMAIL DISPATCH</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Active Inbox
                </span>
              </div>

              <div className="text-lg sm:text-xl font-bold text-white tracking-tight break-all">
                {profile.email}
              </div>

              <button
                onClick={handleCopyEmail}
                className="w-full py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-mono text-white flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Email Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-[#e50914]" />
                    <span>Copy Email Address</span>
                  </>
                )}
              </button>
            </div>

            {/* Studio Location & Availability Card */}
            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-900">
                <span className="flex items-center gap-2 text-zinc-300">
                  <MapPin className="w-3.5 h-3.5 text-[#e50914]" />
                  Base Location
                </span>
                <span className="text-white">{profile.location}</span>
              </div>

              <div className="flex items-center justify-between text-zinc-400 pb-2 border-b border-zinc-900">
                <span className="flex items-center gap-2 text-zinc-300">
                  <Globe className="w-3.5 h-3.5 text-[#e50914]" />
                  Time Zone
                </span>
                <span className="text-white">GMT / London Time</span>
              </div>

              <div className="flex items-center justify-between text-zinc-400 pt-1">
                <span className="flex items-center gap-2 text-zinc-300">
                  <Sparkles className="w-3.5 h-3.5 text-[#e50914]" />
                  Lead Time
                </span>
                <span className="text-emerald-400 font-bold">2 - 3 Weeks Notice</span>
              </div>
            </div>

            {/* Social Footprints */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-3 font-semibold">
                Design Archives & Networks
              </div>
              <div className="flex flex-wrap gap-2">
                {socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-all"
                  >
                    <span>{s.name}</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-[#e50914] transition-colors" />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: High-End Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-zinc-950 border border-zinc-800 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Inquiry Received</h3>
                  <p className="text-sm text-zinc-400 max-w-md mx-auto font-light leading-relaxed">
                    Thank you for reaching out. Prince will review your project brief and respond within 24 hours with availability and proposal deck.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', service: initialSubject, budget: '$5k - $10k', message: '' });
                    }}
                    className="mt-4 px-5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Elena Vance"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#e50914] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@structura.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#e50914] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                        Service Scope *
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#e50914] transition-colors"
                      >
                        <option value="Magazine & Editorial Design">Magazine & Editorial Design</option>
                        <option value="UI/UX Platform & Case Studies">UI/UX Platform & Web App</option>
                        <option value="Luxury Brand Identity">Luxury Brand Identity</option>
                        <option value="Hardcover Book Covers & Print">Book Covers & Special Editions</option>
                        <option value="Complete Creative Retainer">Complete Retainer</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                        Estimated Budget Tier
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#e50914] transition-colors"
                      >
                        <option value="$3k - $5k">$3,000 - $5,000</option>
                        <option value="$5k - $10k">$5,000 - $10,000</option>
                        <option value="$10k - $25k">$10,000 - $25,000</option>
                        <option value="$25k+">$25,000+ (Comprehensive)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                      Project Details & Timeline *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell Prince about your publication, timeline requirements, and core aesthetic vision..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#e50914] transition-colors resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full group py-3.5 px-6 rounded-xl bg-[#e50914] hover:bg-[#c80812] text-white text-sm font-bold shadow-[0_0_25px_rgba(229,9,20,0.4)] hover:shadow-[0_0_35px_rgba(229,9,20,0.6)] flex items-center justify-center gap-2 transition-all active:scale-98"
                  >
                    <span>Submit Project Brief</span>
                    <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
