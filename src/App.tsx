/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SelectedProjects } from './components/SelectedProjects';
import { AboutSection } from './components/AboutSection';
import { SkillsAndProcess } from './components/SkillsAndProcess';
import { Testimonials } from './components/Testimonials';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CategoryModal } from './components/CategoryModal';
import { ProjectModal } from './components/ProjectModal';
import { ResumeModal } from './components/ResumeModal';
import { MagazineFlipbookModal } from './components/MagazineFlipbookModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import { Project, PortfolioCategory } from './data/portfolioData';

const AUTH_SESSION_KEY = 'prince_admin_authenticated';

function PortfolioApp() {
  const { data } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState<boolean>(false);
  const [isFlipbookOpen, setIsFlipbookOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [flipbookTitle, setFlipbookTitle] = useState<string>('The Architecture of Silence');
  const [contactSubject, setContactSubject] = useState<string>('Magazine & Editorial Design');

  const handleOpenContact = (subject?: string) => {
    if (subject) {
      setContactSubject(subject);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenLogin = () => {
    if (isAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    try {
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
    } catch {
      // ignore storage errors
    }
    setIsLoginOpen(false);
    setIsAdminOpen(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    try {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    } catch {
      // ignore storage errors
    }
    setIsAdminOpen(false);
  };

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentList = selectedCategory 
      ? data.projects.filter(p => p.category === selectedCategory.name)
      : data.projects;

    const currentIndex = currentList.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % currentList.length;
    setSelectedProject(currentList[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentList = selectedCategory 
      ? data.projects.filter(p => p.category === selectedCategory.name)
      : data.projects;

    const currentIndex = currentList.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + currentList.length) % currentList.length;
    setSelectedProject(currentList[prevIndex]);
  };

  const handleOpenFlipbook = (title?: string) => {
    if (title) setFlipbookTitle(title);
    setIsFlipbookOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] selection:bg-[#e50914] selection:text-white font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Fixed Navigation with Login Access */}
      <Navbar
        onOpenContact={() => handleOpenContact()}
        onOpenLogin={handleOpenLogin}
        isAuthenticated={isAuthenticated}
      />

      {/* Main Content Layout */}
      <main>
        {/* Hero Section */}
        <Hero
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => handleOpenContact()}
        />

        {/* Selected Projects Grid (Category View & All Projects) */}
        <SelectedProjects
          onSelectCategory={(category) => {
            setSelectedCategory(category);
          }}
          onSelectProject={(project) => {
            setSelectedProject(project);
          }}
          onOpenFlipbook={handleOpenFlipbook}
        />

        {/* Philosophy & Heritage */}
        <AboutSection />

        {/* Technical Rigor, Skills & 5-Step Process */}
        <SkillsAndProcess />

        {/* Testimonials */}
        <Testimonials />

        {/* Moody Cinematic Contact & Inquiry */}
        <ContactSection
          initialSubject={contactSubject}
        />
      </main>

      {/* Clean Dark Footer */}
      <Footer />

      {/* Category Archive Modal (Shows all items inside the chosen category) */}
      <CategoryModal
        category={selectedCategory}
        projects={data.projects}
        onClose={() => setSelectedCategory(null)}
        onSelectProject={(project) => {
          setSelectedProject(project);
        }}
      />

      {/* Interactive Case Study / Item Scroll Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
        onInquire={(title) => {
          handleOpenContact(`Inquiry regarding ${title}`);
        }}
        onOpenFlipbook={handleOpenFlipbook}
        onBackToCategory={selectedCategory ? () => setSelectedProject(null) : undefined}
      />

      {/* Interactive 3D Magazine Page Flip Modal */}
      <MagazineFlipbookModal
        isOpen={isFlipbookOpen}
        onClose={() => setIsFlipbookOpen(false)}
        initialMagazineTitle={flipbookTitle}
      />

      {/* Interactive CV / Career Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        onContact={() => {
          setIsResumeOpen(false);
          handleOpenContact('General Project Discussion');
        }}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Full Management Admin Dashboard (Protected by Auth) */}
      <AdminDashboard
        isOpen={isAdminOpen && isAuthenticated}
        onClose={() => setIsAdminOpen(false)}
        onLogout={handleLogout}
      />
    </div>
  );
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMessage: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error?.message || 'Unexpected rendering error' };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#09090b] text-[#f4f4f5] flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-4 p-6 rounded-2xl bg-zinc-950 border border-zinc-800">
            <h1 className="text-xl font-bold text-white">Portfolio Recovery</h1>
            <p className="text-xs text-zinc-400">{this.state.errorMessage}</p>
            <button
              onClick={() => {
                try {
                  localStorage.clear();
                } catch {
                  // ignore
                }
                window.location.reload();
              }}
              className="px-4 py-2 rounded-lg bg-[#e50914] text-white text-xs font-bold"
            >
              Reset Cache & Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <PortfolioApp />
      </PortfolioProvider>
    </ErrorBoundary>
  );
}
