import React, { useState, useEffect } from 'react';
import { ArrowUp, Clock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export const Footer: React.FC = () => {
  const { data, settings } = usePortfolio();
  const { socials } = data;
  const [londonTime, setLondonTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(now);
      setLondonTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-10 sm:py-12 border-t border-zinc-800/80 bg-[#070709] relative z-10 text-xs font-mono text-zinc-400 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand Identity & London Time */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-left">
            <a
              href="#"
              className="flex items-baseline gap-1 text-lg font-black text-white hover:opacity-90 transition-opacity"
            >
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.brandName}
                  className="h-7 w-auto max-w-[130px] object-contain rounded"
                />
              ) : (
                <>
                  <span className="font-['Syne',sans-serif] tracking-wider uppercase">
                    {settings.brandName || data.profile.name}
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e50914]"></span>
                </>
              )}
            </a>

            <span className="hidden sm:inline text-zinc-700">|</span>

            <div className="flex items-center gap-2 text-zinc-400">
              <Clock className="w-3.5 h-3.5 text-[#e50914]" />
              <span>London Studio : {londonTime ? `${londonTime} GMT` : '00:00:00 GMT'}</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-zinc-400 hover:text-[#e50914] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-zinc-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Prince Mahmud. All Rights Reserved. Magazine & UI/UX Specialist.
          </div>
          <div>
            Crafted with uncompromising typographic hierarchy & dark aesthetic.
          </div>
        </div>
      </div>
    </footer>
  );
};
