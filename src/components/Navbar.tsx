import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Lock } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenLogin: () => void;
  isAuthenticated?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  onOpenLogin,
  isAuthenticated = false
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { data, settings } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ['work', 'about', 'skills', 'process', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills & Process', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const loginLabel = isAuthenticated ? 'Dashboard' : 'Login';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800/80 py-3 shadow-2xl shadow-black/60'
          : 'bg-transparent border-b border-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Logo / Custom Logo */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#"
              className="group flex items-center gap-2 text-2xl font-black tracking-tight text-white transition-opacity hover:opacity-90"
            >
              {settings.logoUrl ? (
                <img
                  src={settings.logoUrl}
                  alt={settings.brandName}
                  className="h-8 w-auto max-w-[140px] object-contain rounded"
                />
              ) : (
                <div className="flex items-baseline gap-1">
                  <span className="font-['Syne',sans-serif] tracking-wider text-xl uppercase">
                    {settings.brandName || data.profile.name}
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#e50914] shadow-[0_0_10px_#e50914]"></span>
                </div>
              )}
            </a>

            {/* Live Freelance Status Badge (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-medium tracking-tight">{data.profile.availability}</span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`transition-colors tracking-tight ${
                    isActive
                      ? 'text-[#e50914] font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA & Login */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm group"
              title={loginLabel}
            >
              <Lock className="w-3.5 h-3.5 text-[#e50914]" />
              <span>{loginLabel}</span>
            </button>

            <button
              onClick={onOpenContact}
              className="group flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#e50914] hover:bg-[#c80812] text-white text-xs font-semibold shadow-[0_0_20px_rgba(229,9,20,0.35)] hover:shadow-[0_0_25px_rgba(229,9,20,0.5)] transition-all active:scale-95"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200"
              title={loginLabel}
            >
              <Lock className="w-3.5 h-3.5 text-[#e50914]" />
              <span>{loginLabel}</span>
            </button>
            <button
              onClick={onOpenContact}
              className="px-3 py-1.5 rounded bg-[#e50914] text-white text-xs font-bold shadow-[0_0_12px_rgba(229,9,20,0.3)]"
            >
              Let's Talk
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-zinc-950/98 border-b border-zinc-800/90 px-4 pt-4 pb-6 space-y-4 backdrop-blur-xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-zinc-300 hover:text-[#e50914] py-1 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200"
            >
              <Lock className="w-3.5 h-3.5 text-[#e50914]" />
              {loginLabel}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="flex-1 py-2 rounded-lg bg-[#e50914] text-white text-xs font-bold text-center"
            >
              Start Project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
