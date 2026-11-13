import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  User, 
  FolderPlus, 
  Sliders, 
  GitCommit, 
  Settings, 
  Eye, 
  Check, 
  Trash2, 
  Plus, 
  Upload, 
  Download, 
  RefreshCw, 
  Save, 
  X, 
  ArrowRight, 
  BarChart3, 
  Users, 
  Layers, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Image as ImageIcon,
  Clock,
  LogOut,
  ExternalLink,
  Pencil
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { PortfolioCategory, Project, SkillItem, ProjectAsset } from '../../data/portfolioData';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, onLogout }) => {
  const { 
    data, 
    settings, 
    analytics, 
    updateProfile, 
    updateStats, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    addProject, 
    updateProject, 
    deleteProject, 
    addAssetToProject, 
    deleteAssetFromProject, 
    updateSkill, 
    updateSkillLevel, 
    addSkill, 
    deleteSkill, 
    updateWorkflowStep, 
    updateSettings, 
    resetToDefaults, 
    exportBackup, 
    importBackup 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'overview' | 'hero' | 'categories' | 'skills' | 'workflow' | 'settings'>('overview');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  // Profile form state
  const [profileForm, setProfileForm] = useState(data.profile);
  const [statsForm, setStatsForm] = useState(data.stats);

  // Category modal / edit state
  const [editingCategory, setEditingCategory] = useState<PortfolioCategory | null>(null);
  const [editCatName, setEditCatName] = useState('');
  const [editCatTagline, setEditCatTagline] = useState('');
  const [editCatImg, setEditCatImg] = useState('');
  const [confirmDeleteCatId, setConfirmDeleteCatId] = useState<string | null>(null);
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [newCategoryTagline, setNewCategoryTagline] = useState('');
  const [newCategoryImg, setNewCategoryImg] = useState('/assets/projects/magazine_silence.jpg');

  // Project state
  const [selectedCategoryForProjects, setSelectedCategoryForProjects] = useState<string>(data.categories[0]?.name || 'Magazine Design');
  const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editProjTitle, setEditProjTitle] = useState('');
  const [editProjCategory, setEditProjCategory] = useState('');
  const [editProjClient, setEditProjClient] = useState('');
  const [editProjYear, setEditProjYear] = useState('');
  const [editProjSummary, setEditProjSummary] = useState('');
  const [editProjImg, setEditProjImg] = useState('');
  const [editProjAssets, setEditProjAssets] = useState<ProjectAsset[]>([]);
  const [editProjNewAssetUrl, setEditProjNewAssetUrl] = useState('');
  const [editProjNewAssetTitle, setEditProjNewAssetTitle] = useState('');
  const [editProjNewAssetType, setEditProjNewAssetType] = useState<'image' | 'mockup' | 'pdf' | 'logo'>('image');
  const [confirmDeleteProjId, setConfirmDeleteProjId] = useState<string | null>(null);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectSubtitle, setNewProjectSubtitle] = useState('');
  const [newProjectClient, setNewProjectClient] = useState('');
  const [newProjectYear, setNewProjectYear] = useState('2025');
  const [newProjectImg, setNewProjectImg] = useState('/assets/projects/kronos_vault.jpg');
  const [newProjectAssets, setNewProjectAssets] = useState<ProjectAsset[]>([]);
  const [newProjAssetUrl, setNewProjAssetUrl] = useState('');
  const [newProjAssetTitle, setNewProjAssetTitle] = useState('');
  const [newProjAssetType, setNewProjAssetType] = useState<'image' | 'mockup' | 'pdf' | 'logo'>('image');
  
  // Asset upload modal for a project
  const [selectedProjectForAssets, setSelectedProjectForAssets] = useState<Project | null>(null);
  const [newAssetTitle, setNewAssetTitle] = useState('');
  const [newAssetType, setNewAssetType] = useState<'image' | 'mockup' | 'pdf' | 'logo'>('mockup');
  const [newAssetUrl, setNewAssetUrl] = useState('');
  const [newAssetCaption, setNewAssetCaption] = useState('');

  // Skill state
  const [isNewSkillOpen, setIsNewSkillOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(90);
  const [newSkillExp, setNewSkillExp] = useState('5+ Years');
  const [newSkillCategory, setNewSkillCategory] = useState<'Software' | 'Specialization' | 'Craft'>('Software');
  const [newSkillDesc, setNewSkillDesc] = useState('');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState(settings);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(null), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    updateStats(statsForm);
    showToast('Hero Profile & Statistics successfully saved!');
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    showToast('Site Settings & Credentials updated!');
  };

  // Image File Uploader Helper
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        callback(event.target.result as string);
        showToast('Thumbnail image uploaded!');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Main Files Uploader Helper (PNG, WebP, JPG, PDF — supports multiple files)
  const handleMainFilesUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onAssetsReady: (assets: ProjectAsset[]) => void
  ) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    Promise.all(
      files.map(
        (file, idx) =>
          new Promise<ProjectAsset | null>((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const result = event.target?.result;
              if (!result) {
                resolve(null);
                return;
              }
              const lowerName = file.name.toLowerCase();
              const isPdf = file.type === 'application/pdf' || lowerName.endsWith('.pdf');
              const ext = lowerName.split('.').pop()?.toUpperCase() || 'FILE';
              const cleanTitle = file.name.replace(/\.[^/.]+$/, '') || 'Main Project File';
              const sizeLabel =
                file.size >= 1024 * 1024
                  ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
                  : `${Math.max(1, Math.round(file.size / 1024))} KB`;

              resolve({
                id: `asset-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
                title: cleanTitle,
                type: isPdf ? 'pdf' : 'image',
                url: result as string,
                badge: isPdf ? 'PDF Document' : `${ext} Main File`,
                fileSize: sizeLabel
              });
            };
            reader.onerror = () => resolve(null);
            reader.readAsDataURL(file);
          })
      )
    ).then((results) => {
      const validAssets = results.filter((item): item is ProjectAsset => item !== null);
      if (validAssets.length > 0) {
        onAssetsReady(validAssets);
        showToast(
          validAssets.length === 1
            ? `Main file "${validAssets[0].title}" attached!`
            : `${validAssets.length} main files attached!`
        );
      }
    });

    e.target.value = '';
  };

  const openEditCategoryModal = (cat: PortfolioCategory) => {
    setEditingCategory(cat);
    setEditCatName(cat.name);
    setEditCatTagline(cat.tagline || '');
    setEditCatImg(cat.imageUrl);
  };

  const openEditProjectModal = (project: Project) => {
    setEditingProject(project);
    setEditProjTitle(project.title);
    setEditProjCategory(project.category);
    setEditProjClient(project.client);
    setEditProjYear(project.year);
    setEditProjSummary(project.summary || project.subtitle || '');
    setEditProjImg(project.imageUrl);
    setEditProjAssets(project.gallery ? [...project.gallery] : []);
    setEditProjNewAssetUrl('');
    setEditProjNewAssetTitle('');
    setEditProjNewAssetType('image');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#070709] text-zinc-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
      
      {/* Top Admin Navigation Bar */}
      <header className="h-16 px-6 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#e50914] flex items-center justify-center font-black text-white text-sm shadow-[0_0_15px_rgba(229,9,20,0.5)]">
            P
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-wide">CMS Control Center</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
                Live Sync Active
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono">
              Signed in as {settings.adminEmail}
            </p>
          </div>
        </div>

        {/* Top Right Quick Actions */}
        <div className="flex items-center gap-3">
          {saveToast && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/90 border border-emerald-500/40 text-emerald-300 text-xs font-mono animate-in fade-in">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{saveToast}</span>
            </div>
          )}

          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#e50914]" />
            <span>View Live Site</span>
          </button>

          <button
            onClick={onLogout || onClose}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800 transition-colors"
            title="Log Out of Admin"
          >
            <LogOut className="w-3.5 h-3.5 text-[#e50914]" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Admin Workspace with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-zinc-950/90 border-r border-zinc-800/80 flex flex-col shrink-0">
          <div className="p-4 space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 px-3 py-2">
              Management Modules
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#e50914] text-white font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'hero'
                  ? 'bg-[#e50914] text-white font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Hero & Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('categories')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'categories'
                  ? 'bg-[#e50914] text-white font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <FolderPlus className="w-4 h-4" />
              <span>Categories & Works</span>
            </button>

            <button
              onClick={() => setActiveTab('skills')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'skills'
                  ? 'bg-[#e50914] text-white font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span>Skills & Software</span>
            </button>

            <button
              onClick={() => setActiveTab('workflow')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'workflow'
                  ? 'bg-[#e50914] text-white font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <GitCommit className="w-4 h-4" />
              <span>5-Step Pipeline</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'settings'
                  ? 'bg-[#e50914] text-white font-bold shadow-[0_0_15px_rgba(229,9,20,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site Logo & Settings</span>
            </button>
          </div>

          <div className="mt-auto p-4 border-t border-zinc-800/80 space-y-2">
            <div className="text-[11px] font-mono text-zinc-500">
              Live Storage: {data.projects.length} Works · {data.categories.length} Categories
            </div>
            <button
              onClick={() => {
                if (window.confirm('Reset all content back to factory default? Custom edits will be replaced.')) {
                  resetToDefaults();
                  setProfileForm(data.profile);
                  showToast('Reset to default content.');
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 text-zinc-500" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-10 bg-[#09090b]">
          
          {/* ============================================================== */}
          {/* TAB 1: OVERVIEW & ANALYTICS                                     */}
          {/* ============================================================== */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Executive Dashboard
                </h1>
                <p className="text-sm text-zinc-400 font-light mt-1">
                  Real-time visitor telemetry, content inventory, and recent publishing activity.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
                    <span>TOTAL VISITORS</span>
                    <Users className="w-4 h-4 text-[#e50914]" />
                  </div>
                  <div className="text-3xl font-black text-white font-['Syne',sans-serif]">
                    {analytics.totalVisitors.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1 font-mono">
                    <span>↑ +18.4%</span>
                    <span className="text-zinc-500">vs last month</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
                    <span>PAGE VIEWS</span>
                    <BarChart3 className="w-4 h-4 text-[#e50914]" />
                  </div>
                  <div className="text-3xl font-black text-white font-['Syne',sans-serif]">
                    {analytics.totalPageViews.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-2 font-mono">
                    Avg duration: {analytics.avgDuration}
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
                    <span>CURATED DISCIPLINES</span>
                    <FolderPlus className="w-4 h-4 text-[#e50914]" />
                  </div>
                  <div className="text-3xl font-black text-white font-['Syne',sans-serif]">
                    {data.categories.length}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-2 font-mono">
                    Across Magazines & Identity
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl">
                  <div className="flex items-center justify-between text-zinc-400 text-xs font-mono mb-2">
                    <span>PORTFOLIO ITEMS</span>
                    <Layers className="w-4 h-4 text-[#e50914]" />
                  </div>
                  <div className="text-3xl font-black text-white font-['Syne',sans-serif]">
                    {data.projects.length}
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-2 font-mono">
                    All items live & viewable
                  </div>
                </div>
              </div>

              {/* Activity Feed & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Activity Feed */}
                <div className="lg:col-span-2 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2 font-mono">
                      <Clock className="w-4 h-4 text-[#e50914]" />
                      Recent Activity & Changes
                    </h3>
                    <span className="text-xs font-mono text-zinc-500">Live feed</span>
                  </div>

                  <div className="divide-y divide-zinc-900">
                    {analytics.recentActivities.map((act, idx) => (
                      <div key={`${act.id}-${idx}`} className="py-3 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-[#e50914]"></span>
                          <span className="text-zinc-200 font-medium">{act.action}</span>
                        </div>
                        <span className="text-zinc-500 font-mono text-[11px]">{act.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Management Panel */}
                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
                    Quick Shortcuts
                  </h3>
                  <p className="text-xs text-zinc-400 font-light">
                    Direct access to publishing and global configuration.
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={() => setActiveTab('categories')}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-medium text-white transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Plus className="w-4 h-4 text-[#e50914]" />
                        <span>Add New Project / Item</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>

                    <button
                      onClick={() => setActiveTab('hero')}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-medium text-white transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <User className="w-4 h-4 text-[#e50914]" />
                        <span>Edit Hero Portrait & Bio</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>

                    <button
                      onClick={() => setActiveTab('skills')}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-medium text-white transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Sliders className="w-4 h-4 text-[#e50914]" />
                        <span>Adjust Skill Proficiency %</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>

                    <button
                      onClick={() => setActiveTab('settings')}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-xs font-medium text-white transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Settings className="w-4 h-4 text-[#e50914]" />
                        <span>Change Website Logo & Credentials</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-500" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 2: HERO & PROFILE EDITOR                                    */}
          {/* ============================================================== */}
          {activeTab === 'hero' && (
            <div className="max-w-4xl space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Hero Section & Personal Profile
                </h1>
                <p className="text-sm text-zinc-400 font-light mt-1">
                  Modify your primary introduction, greetings, biographical text, portrait photograph, and statistics.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-6">
                
                {/* Hero Portrait Photo */}
                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Hero Portrait Photo
                  </h3>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-28 h-28 rounded-2xl overflow-hidden bg-zinc-900 border-2 border-zinc-800 shadow-xl shrink-0">
                      <img
                        src={profileForm.portraitImage}
                        alt="Hero Portrait Preview"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>

                    <div className="space-y-3 flex-1 w-full">
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#e50914] hover:bg-[#c80812] transition-colors shadow">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload New Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => setProfileForm(p => ({ ...p, portraitImage: url })))}
                          />
                        </label>
                        <span className="text-xs text-zinc-500 font-mono">or paste an image URL below</span>
                      </div>

                      <input
                        type="text"
                        value={profileForm.portraitImage}
                        onChange={(e) => setProfileForm(p => ({ ...p, portraitImage: e.target.value }))}
                        placeholder="/assets/path or https://..."
                        className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono focus:outline-none focus:border-[#e50914]"
                      />
                    </div>
                  </div>
                </div>

                {/* Typography & Identity */}
                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Headlines & Bio
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                        Brand / Display Name
                      </label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-[#e50914]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                        Hero Greeting Text
                      </label>
                      <input
                        type="text"
                        value={profileForm.greeting}
                        onChange={(e) => setProfileForm(p => ({ ...p, greeting: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-[#e50914]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                      Professional Tagline
                    </label>
                    <input
                      type="text"
                      value={profileForm.tagline}
                      onChange={(e) => setProfileForm(p => ({ ...p, tagline: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-[#e50914]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                      Bio Narrative
                    </label>
                    <textarea
                      rows={4}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm(p => ({ ...p, bio: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white leading-relaxed focus:outline-none focus:border-[#e50914]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                        Availability Badge
                      </label>
                      <input
                        type="text"
                        value={profileForm.statusBadge}
                        onChange={(e) => setProfileForm(p => ({ ...p, statusBadge: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-[#e50914]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                        Location / Timezone Note
                      </label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm(p => ({ ...p, location: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white focus:outline-none focus:border-[#e50914]"
                      />
                    </div>
                  </div>
                </div>

                {/* Stats Counters */}
                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Experience & Portfolio Statistics
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statsForm.map((stat, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase">
                          Stat #{idx + 1} Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const updated = [...statsForm];
                            updated[idx].label = e.target.value;
                            setStatsForm(updated);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded text-white font-mono"
                        />

                        <label className="block text-[11px] font-mono text-zinc-400 uppercase">
                          Value (e.g. 10+, 150+)
                        </label>
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) => {
                            const updated = [...statsForm];
                            updated[idx].value = e.target.value;
                            setStatsForm(updated);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded text-[#e50914] font-bold font-mono"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#e50914] hover:bg-[#c80812] shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Changes</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 3: CATEGORIES & WORKS MANAGER                               */}
          {/* ============================================================== */}
          {activeTab === 'categories' && (
            <div className="space-y-8 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Categories & Works Architecture
                  </h1>
                  <p className="text-sm text-zinc-400 font-light mt-1">
                    Add new disciplines, manage categories, and add works with mockups & PDF attachments.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsNewCategoryOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-[#e50914]" />
                    <span>+ Add Category</span>
                  </button>
                  <button
                    onClick={() => {
                      setNewProjectTitle('');
                      setNewProjectSubtitle('');
                      setNewProjectClient('');
                      setNewProjectAssets([]);
                      setNewProjAssetUrl('');
                      setNewProjAssetTitle('');
                      setNewProjAssetType('image');
                      setIsNewProjectOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#e50914] hover:bg-[#c80812] shadow-[0_0_15px_rgba(229,9,20,0.3)] transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add New Project / Item</span>
                  </button>
                </div>
              </div>

              {/* 1. Category Cards List */}
              <div className="space-y-4">
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  Active Categories ({data.categories.length})
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.categories.map((cat) => {
                    const count = data.projects.filter(p => p.category === cat.name).length;

                    return (
                      <div
                        key={cat.id}
                        className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-4 hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <img
                            src={cat.imageUrl}
                            alt={cat.title}
                            className="w-16 h-12 rounded-lg object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                          />
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-white truncate">{cat.name}</h4>
                            <p className="text-xs text-zinc-400 font-mono truncate">{count} Projects</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => openEditCategoryModal(cat)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-colors"
                            title="Edit Category & Thumbnail"
                          >
                            <Pencil className="w-3.5 h-3.5 text-[#e50914]" />
                            <span>Edit</span>
                          </button>

                          {confirmDeleteCatId === cat.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  deleteCategory(cat.id);
                                  setConfirmDeleteCatId(null);
                                  showToast(`Deleted ${cat.name}`);
                                }}
                                className="px-2 py-1 rounded text-[11px] font-bold bg-red-600 text-white hover:bg-red-500"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => setConfirmDeleteCatId(null)}
                                className="px-2 py-1 rounded text-[11px] font-mono bg-zinc-800 text-zinc-300 hover:text-white"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setConfirmDeleteCatId(cat.id)}
                              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-900 transition-colors"
                              title="Delete Category"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 2. Projects & Items Explorer */}
              <div className="pt-6 border-t border-zinc-800 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      Items & Publications by Category
                    </h3>
                    <p className="text-xs text-zinc-400 font-light">
                      Filter items by discipline, edit mockups, or attach full PDF editions.
                    </p>
                  </div>

                  {/* Category Filter Selector */}
                  <div className="flex flex-wrap items-center gap-2">
                    {data.categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCategoryForProjects(c.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                          selectedCategoryForProjects === c.name
                            ? 'bg-[#e50914] text-white font-bold'
                            : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Projects in chosen category */}
                <div className="space-y-4">
                  {data.projects
                    .filter(p => p.category === selectedCategoryForProjects)
                    .map((project, idx) => (
                      <div
                        key={project.id}
                        className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/90 hover:border-zinc-700 transition-all space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={project.imageUrl}
                              alt={project.title}
                              className="w-20 h-14 rounded-xl object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-mono text-zinc-500 font-bold">#{idx + 1}</span>
                                <h4 className="text-base font-bold text-white">{project.title}</h4>
                              </div>
                              <p className="text-xs text-zinc-400 font-light">{project.client} · {project.year}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <button
                              onClick={() => setSelectedProjectForAssets(project)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                            >
                              <Layers className="w-3.5 h-3.5 text-[#e50914]" />
                              <span>Manage Assets ({project.gallery?.length || 0})</span>
                            </button>

                            <button
                              onClick={() => openEditProjectModal(project)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 transition-colors"
                              title="Edit Item & Thumbnail"
                            >
                              <Pencil className="w-3.5 h-3.5 text-[#e50914]" />
                              <span>Edit</span>
                            </button>

                            {confirmDeleteProjId === project.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => {
                                    deleteProject(project.id);
                                    setConfirmDeleteProjId(null);
                                    showToast('Deleted project.');
                                  }}
                                  className="px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-red-600 text-white hover:bg-red-500"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setConfirmDeleteProjId(null)}
                                  className="px-2 py-1.5 rounded-lg text-[11px] font-mono bg-zinc-800 text-zinc-300 hover:text-white"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDeleteProjId(project.id)}
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-zinc-850"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Gallery Assets Preview Strip */}
                        {project.gallery && project.gallery.length > 0 && (
                          <div className="pt-3 border-t border-zinc-900 flex flex-wrap items-center gap-2">
                            <span className="text-[11px] font-mono text-zinc-500 uppercase mr-1">Visual Stream:</span>
                            {project.gallery.map((asset, aIdx) => (
                              <div
                                key={asset.id || aIdx}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-300"
                              >
                                {asset.type === 'pdf' ? (
                                  <FileText className="w-3 h-3 text-[#e50914]" />
                                ) : (
                                  <ImageIcon className="w-3 h-3 text-zinc-400" />
                                )}
                                <span>{asset.title}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>

            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 4: SKILLS & SOFTWARE PROFICIENCY (WITH DRAGGABLE SLIDERS)    */}
          {/* ============================================================== */}
          {activeTab === 'skills' && (
            <div className="space-y-8 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Software Rigor & Skills Architecture
                  </h1>
                  <p className="text-sm text-zinc-400 font-light mt-1">
                    Drag the sliders to adjust proficiency percentages. Changes reflect live on the website immediately!
                  </p>
                </div>

                <button
                  onClick={() => setIsNewSkillOpen(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#e50914] hover:bg-[#c80812] shadow transition-all shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Software Skill</span>
                </button>
              </div>

              {/* Skills List with Live Interactive Draggable Sliders */}
              <div className="space-y-4">
                {data.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xs font-black font-mono text-[#e50914]">
                          {skill.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">{skill.name}</h4>
                          <span className="text-[11px] font-mono text-zinc-500 uppercase">{skill.experience} · {skill.category}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Numerical Percentage */}
                        <div className="text-xl font-black font-mono text-[#e50914] w-14 text-right">
                          {skill.level}%
                        </div>

                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${skill.name}?`)) {
                              deleteSkill(skill.name);
                              showToast(`Deleted ${skill.name}`);
                            }
                          }}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-900 transition-colors"
                          title="Delete Skill"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Interactive Slider to drag and increase/decrease % */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                        <span>Drag slider to calibrate proficiency:</span>
                        <span className="text-zinc-300 font-bold">{skill.level} / 100%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={skill.level}
                        onChange={(e) => updateSkillLevel(skill.name, parseInt(e.target.value, 10))}
                        className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#e50914]"
                      />
                    </div>

                    {/* Description preview */}
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 5: 5-STEP PRODUCTION PIPELINE (WORKFLOW)                    */}
          {/* ============================================================== */}
          {activeTab === 'workflow' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  5-Step Production Pipeline
                </h1>
                <p className="text-sm text-zinc-400 font-light mt-1">
                  Fine-tune each milestone of your editorial and design process. Every step title, duration, and deliverable is editable.
                </p>
              </div>

              <div className="space-y-6">
                {data.workflow.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-xl space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded bg-[#e50914]/20 text-[#e50914] font-mono font-bold text-xs">
                          Step {step.step}
                        </span>
                        <h4 className="text-base font-bold text-white">{step.name}</h4>
                      </div>
                      <span className="text-xs font-mono text-zinc-400">{step.duration}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                          Step Name
                        </label>
                        <input
                          type="text"
                          value={step.name}
                          onChange={(e) => updateWorkflowStep(idx, { name: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={step.tagline}
                          onChange={(e) => updateWorkflowStep(idx, { tagline: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={step.duration}
                          onChange={(e) => updateWorkflowStep(idx, { duration: e.target.value })}
                          className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                        Detailed Description
                      </label>
                      <textarea
                        rows={2}
                        value={step.description}
                        onChange={(e) => updateWorkflowStep(idx, { description: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* TAB 6: SETTINGS, LOGO & CREDENTIALS                             */}
          {/* ============================================================== */}
          {activeTab === 'settings' && (
            <div className="space-y-8 max-w-4xl">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Global Configuration & Branding
                </h1>
                <p className="text-sm text-zinc-400 font-light mt-1">
                  Manage website logo, contact emails, access credentials, and database backups.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-6">
                
                {/* Website Logo Setting */}
                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Website Logo & Header Branding
                  </h3>

                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
                      {settingsForm.logoUrl ? (
                        <img
                          src={settingsForm.logoUrl}
                          alt="Custom Logo"
                          className="w-full h-full object-contain p-2"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-[#e50914] text-white flex items-center justify-center font-bold font-mono">
                          P
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 flex-1 w-full">
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors">
                          <Upload className="w-3.5 h-3.5 text-[#e50914]" />
                          <span>Upload Logo File</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (url) => setSettingsForm(s => ({ ...s, logoUrl: url })))}
                          />
                        </label>
                        {settingsForm.logoUrl && (
                          <button
                            type="button"
                            onClick={() => setSettingsForm(s => ({ ...s, logoUrl: '' }))}
                            className="text-xs text-zinc-400 hover:text-red-400 underline font-mono"
                          >
                            Remove Logo
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        value={settingsForm.logoUrl}
                        onChange={(e) => setSettingsForm(s => ({ ...s, logoUrl: e.target.value }))}
                        placeholder="Or enter logo URL (leave empty for typography mark)"
                        className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Access Credentials & Emails */}
                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Access Credentials & Contact
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                        Administrator Access Email
                      </label>
                      <input
                        type="email"
                        value={settingsForm.adminEmail}
                        onChange={(e) => setSettingsForm(s => ({ ...s, adminEmail: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                        Admin Access PIN / Password
                      </label>
                      <input
                        type="password"
                        value={settingsForm.adminPin}
                        onChange={(e) => setSettingsForm(s => ({ ...s, adminPin: e.target.value }))}
                        className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wider mb-1.5">
                      Public Inquiry Email
                    </label>
                    <input
                      type="email"
                      value={settingsForm.contactEmail}
                      onChange={(e) => setSettingsForm(s => ({ ...s, contactEmail: e.target.value }))}
                      className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>

                {/* Backup & Data Synchronization */}
                <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                    Configuration Backup & Restore
                  </h3>
                  <p className="text-xs text-zinc-400 font-light">
                    Export your complete portfolio data as a JSON file, or restore from a previously exported backup.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        const json = exportBackup();
                        const blob = new Blob([json], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `prince_portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
                        a.click();
                        showToast('Exported backup JSON');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white transition-colors"
                    >
                      <Download className="w-3.5 h-3.5 text-[#e50914]" />
                      <span>Export Backup JSON</span>
                    </button>

                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#e50914]" />
                      <span>Import / Restore JSON</span>
                      <input
                        type="file"
                        accept="application/json"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const content = event.target?.result as string;
                            if (content && importBackup(content)) {
                              showToast('Backup restored successfully!');
                            } else {
                              alert('Invalid backup JSON format.');
                            }
                          };
                          reader.readAsText(file);
                        }}
                      />
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-[#e50914] hover:bg-[#c80812] shadow-[0_0_15px_rgba(229,9,20,0.4)] transition-all"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Global Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* ============================================================== */}
      {/* MODAL: ADD NEW CATEGORY                                         */}
      {/* ============================================================== */}
      {isNewCategoryOpen && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <h3 className="text-base font-bold text-white">Create New Category</h3>
              <button onClick={() => setIsNewCategoryOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Category Name (e.g. Packaging Design)
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Packaging Design"
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Category Tagline (Optional)
                </label>
                <input
                  type="text"
                  value={newCategoryTagline}
                  onChange={(e) => setNewCategoryTagline(e.target.value)}
                  placeholder="Curated creative collection."
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase">
                  Category Thumbnail Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                    <img
                      src={newCategoryImg || '/assets/projects/magazine_silence.jpg'}
                      alt="Category thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#e50914]" />
                      <span>Upload Thumbnail</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setNewCategoryImg(url))}
                      />
                    </label>
                    <input
                      type="text"
                      value={newCategoryImg}
                      onChange={(e) => setNewCategoryImg(e.target.value)}
                      placeholder="Or paste image URL..."
                      className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-900">
              <button
                onClick={() => setIsNewCategoryOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newCategoryName.trim()) {
                    showToast('Please enter a category name');
                    return;
                  }
                  const trimmedName = newCategoryName.trim();
                  addCategory({
                    id: `cat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                    name: trimmedName as any,
                    title: trimmedName,
                    displayTitle: trimmedName,
                    tagline: newCategoryTagline.trim() || 'Curated creative collection.',
                    imageUrl: newCategoryImg || '/assets/projects/magazine_silence.jpg',
                    accentBadge: 'Specialized Suite'
                  });
                  setSelectedCategoryForProjects(trimmedName);
                  setIsNewCategoryOpen(false);
                  setNewCategoryName('');
                  setNewCategoryTagline('');
                  showToast('Category created!');
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#e50914] hover:bg-[#c80812]"
              >
                Create Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: EDIT EXISTING CATEGORY                                   */}
      {/* ============================================================== */}
      {editingCategory && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <h3 className="text-base font-bold text-white">Edit Category</h3>
              <button onClick={() => setEditingCategory(null)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={editCatName}
                  onChange={(e) => setEditCatName(e.target.value)}
                  placeholder="Category Name..."
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Category Tagline
                </label>
                <input
                  type="text"
                  value={editCatTagline}
                  onChange={(e) => setEditCatTagline(e.target.value)}
                  placeholder="Curated creative collection."
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase">
                  Category Thumbnail Image
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                    <img
                      src={editCatImg || '/assets/projects/magazine_silence.jpg'}
                      alt="Category thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#e50914]" />
                      <span>Upload New Thumbnail</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setEditCatImg(url))}
                      />
                    </label>
                    <input
                      type="text"
                      value={editCatImg}
                      onChange={(e) => setEditCatImg(e.target.value)}
                      placeholder="Or paste image URL..."
                      className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-900">
              <button
                onClick={() => setEditingCategory(null)}
                className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editCatName.trim()) {
                    showToast('Please enter a category name');
                    return;
                  }
                  const trimmedName = editCatName.trim();
                  const oldName = editingCategory.name;
                  updateCategory(editingCategory.id, {
                    name: trimmedName as any,
                    title: trimmedName,
                    displayTitle: trimmedName,
                    tagline: editCatTagline.trim() || editingCategory.tagline,
                    imageUrl: editCatImg.trim() || editingCategory.imageUrl
                  });
                  if (selectedCategoryForProjects === oldName) {
                    setSelectedCategoryForProjects(trimmedName);
                  }
                  setEditingCategory(null);
                  showToast('Category updated successfully!');
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#e50914] hover:bg-[#c80812]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Category</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD NEW PROJECT / ITEM                                   */}
      {/* ============================================================== */}
      {isNewProjectOpen && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <h3 className="text-base font-bold text-white">Add New Project / Item</h3>
              <button onClick={() => setIsNewProjectOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Assign to Category
                </label>
                <select
                  value={selectedCategoryForProjects}
                  onChange={(e) => setSelectedCategoryForProjects(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                >
                  {data.categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Project Title (e.g. VOGUE Horizon Edition)
                </label>
                <input
                  type="text"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  placeholder="Title..."
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={newProjectClient}
                    onChange={(e) => setNewProjectClient(e.target.value)}
                    placeholder="Client..."
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Year Released
                  </label>
                  <input
                    type="text"
                    value={newProjectYear}
                    onChange={(e) => setNewProjectYear(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase">
                  1. Item Cover Thumbnail (Card Image — PNG, WebP, JPG)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                    <img
                      src={newProjectImg || '/assets/projects/kronos_vault.jpg'}
                      alt="Item thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#e50914]" />
                      <span>Upload Thumbnail</span>
                      <input
                        type="file"
                        accept=".png,.webp,.jpg,.jpeg,image/png,image/webp,image/jpeg,image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setNewProjectImg(url))}
                      />
                    </label>
                    <input
                      type="text"
                      value={newProjectImg}
                      onChange={(e) => setNewProjectImg(e.target.value)}
                      placeholder="Or paste thumbnail URL..."
                      className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Main Project File(s) Section */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs font-mono text-zinc-200 font-bold uppercase">
                      2. Main Project File(s) (PNG, WebP, JPG, PDF)
                    </label>
                    <p className="text-[11px] text-zinc-400">
                      Displayed inside the item scroll viewer when opened.
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#e50914] hover:bg-[#c80812] transition-colors shadow">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Main File(s)</span>
                    <input
                      type="file"
                      multiple
                      accept=".png,.webp,.jpg,.jpeg,.svg,.pdf,image/png,image/webp,image/jpeg,image/*,application/pdf"
                      className="hidden"
                      onChange={(e) =>
                        handleMainFilesUpload(e, (assets) =>
                          setNewProjectAssets((prev) => [...prev, ...assets])
                        )
                      }
                    />
                  </label>
                </div>

                {newProjectAssets.length > 0 ? (
                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {newProjectAssets.map((asset, idx) => (
                      <div
                        key={asset.id || idx}
                        className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          {asset.type === 'pdf' ? (
                            <div className="p-2 rounded bg-red-950/60 border border-red-500/30 text-[#e50914] shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                          ) : (
                            <img
                              src={asset.url}
                              alt={asset.title}
                              className="w-10 h-10 rounded object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                            />
                          )}
                          <div className="min-w-0 flex-1 space-y-1">
                            <input
                              type="text"
                              value={asset.title}
                              onChange={(e) =>
                                setNewProjectAssets((prev) =>
                                  prev.map((item) =>
                                    item.id === asset.id ? { ...item, title: e.target.value } : item
                                  )
                                )
                              }
                              className="w-full px-2 py-1 text-xs bg-zinc-900 border border-zinc-800 rounded text-white"
                            />
                            <div className="text-[10px] font-mono text-zinc-500 uppercase">
                              {asset.badge || asset.type} {asset.fileSize ? `· ${asset.fileSize}` : ''}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setNewProjectAssets((prev) => prev.filter((item) => item.id !== asset.id))
                          }
                          className="p-1.5 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-900 shrink-0"
                          title="Remove Main File"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-lg border border-dashed border-zinc-800 text-[11px] font-mono text-zinc-500 text-center">
                    No main files uploaded yet. Upload PNG, WebP, JPG or PDF files above, or add a URL below.
                  </div>
                )}

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-1">
                  <select
                    value={newProjAssetType}
                    onChange={(e) => setNewProjAssetType(e.target.value as any)}
                    className="px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                  >
                    <option value="image">Image (PNG/WebP/JPG)</option>
                    <option value="mockup">3D Mockup</option>
                    <option value="logo">Logo File</option>
                    <option value="pdf">PDF Document</option>
                  </select>
                  <input
                    type="text"
                    value={newProjAssetUrl}
                    onChange={(e) => setNewProjAssetUrl(e.target.value)}
                    placeholder="Or paste Main File URL..."
                    className="flex-1 min-w-[140px] px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!newProjAssetUrl.trim()) {
                        showToast('Enter a Main File URL or click Upload Main File(s)');
                        return;
                      }
                      const urlVal = newProjAssetUrl.trim();
                      const isPdfUrl = newProjAssetType === 'pdf' || urlVal.toLowerCase().endsWith('.pdf');
                      const added: ProjectAsset = {
                        id: `asset-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                        title: newProjAssetTitle.trim() || 'Main Project File',
                        type: isPdfUrl ? 'pdf' : newProjAssetType,
                        url: urlVal,
                        badge: isPdfUrl ? 'PDF Document' : 'Main File'
                      };
                      setNewProjectAssets((prev) => [...prev, added]);
                      setNewProjAssetUrl('');
                      setNewProjAssetTitle('');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-white shrink-0"
                  >
                    + Add URL
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-900">
              <button
                onClick={() => setIsNewProjectOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newProjectTitle.trim()) {
                    showToast('Please enter a project title');
                    return;
                  }
                  const coverUrl = newProjectImg.trim() || '/assets/projects/kronos_vault.jpg';
                  const newProj: Project = {
                    id: `proj-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                    title: newProjectTitle.trim(),
                    subtitle: 'Bespoke design exploration',
                    category: selectedCategoryForProjects as any,
                    year: newProjectYear || '2025',
                    client: newProjectClient.trim() || 'Private Client',
                    location: 'London & Remote',
                    imageUrl: coverUrl,
                    featured: true,
                    summary: 'Curated editorial exploration.',
                    challenge: 'Precision visual hierarchy.',
                    solution: 'Swiss grid and dark obsidian contrast.',
                    deliverables: ['Visual Assets', 'Mockups', 'Specification'],
                    tools: ['Adobe InDesign', 'Figma', 'Photoshop'],
                    metrics: [{ label: 'Satisfaction', value: '100%' }],
                    gallery: newProjectAssets
                  };
                  addProject(newProj);
                  setIsNewProjectOpen(false);
                  setNewProjectAssets([]);
                  showToast('Project added to category!');
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#e50914] hover:bg-[#c80812]"
              >
                Publish Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: EDIT EXISTING PROJECT / ITEM                             */}
      {/* ============================================================== */}
      {editingProject && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl my-auto">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <h3 className="text-base font-bold text-white">Edit Project / Item</h3>
              <button onClick={() => setEditingProject(null)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Category
                </label>
                <select
                  value={editProjCategory}
                  onChange={(e) => setEditProjCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                >
                  {data.categories.map((c) => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Item Title
                </label>
                <input
                  type="text"
                  value={editProjTitle}
                  onChange={(e) => setEditProjTitle(e.target.value)}
                  placeholder="Project Title..."
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Client Name
                  </label>
                  <input
                    type="text"
                    value={editProjClient}
                    onChange={(e) => setEditProjClient(e.target.value)}
                    placeholder="Client..."
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                    Year Released
                  </label>
                  <input
                    type="text"
                    value={editProjYear}
                    onChange={(e) => setEditProjYear(e.target.value)}
                    placeholder="2025"
                    className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Short Summary / Subtitle
                </label>
                <textarea
                  rows={2}
                  value={editProjSummary}
                  onChange={(e) => setEditProjSummary(e.target.value)}
                  placeholder="Brief editorial note..."
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-mono text-zinc-400 uppercase">
                  1. Item Cover Thumbnail (Card Image — PNG, WebP, JPG)
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
                    <img
                      src={editProjImg || '/assets/projects/kronos_vault.jpg'}
                      alt="Item thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-colors">
                      <Upload className="w-3.5 h-3.5 text-[#e50914]" />
                      <span>Upload New Thumbnail</span>
                      <input
                        type="file"
                        accept=".png,.webp,.jpg,.jpeg,image/png,image/webp,image/jpeg,image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, (url) => setEditProjImg(url))}
                      />
                    </label>
                    <input
                      type="text"
                      value={editProjImg}
                      onChange={(e) => setEditProjImg(e.target.value)}
                      placeholder="Or paste thumbnail URL..."
                      className="w-full px-3 py-1.5 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Main Project File(s) Section inside Edit Modal */}
              <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <label className="block text-xs font-mono text-zinc-200 font-bold uppercase">
                      2. Main Project File(s) ({editProjAssets.length}) — PNG, WebP, JPG, PDF
                    </label>
                    <p className="text-[11px] text-zinc-400">
                      Main design files & PDFs displayed in the item scroll viewer.
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-white bg-[#e50914] hover:bg-[#c80812] transition-colors shadow">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Main File(s)</span>
                    <input
                      type="file"
                      multiple
                      accept=".png,.webp,.jpg,.jpeg,.svg,.pdf,image/png,image/webp,image/jpeg,image/*,application/pdf"
                      className="hidden"
                      onChange={(e) =>
                        handleMainFilesUpload(e, (assets) =>
                          setEditProjAssets((prev) => [...prev, ...assets])
                        )
                      }
                    />
                  </label>
                </div>

                {editProjAssets.length > 0 ? (
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {editProjAssets.map((asset, idx) => (
                      <div
                        key={asset.id || idx}
                        className="p-2.5 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0 flex-1">
                          {asset.type === 'pdf' ? (
                            <div className="p-2 rounded bg-red-950/60 border border-red-500/30 text-[#e50914] shrink-0">
                              <FileText className="w-4 h-4" />
                            </div>
                          ) : (
                            <img
                              src={asset.url}
                              alt={asset.title}
                              className="w-10 h-10 rounded object-cover bg-zinc-900 border border-zinc-800 shrink-0"
                            />
                          )}
                          <div className="min-w-0 flex-1 space-y-1">
                            <input
                              type="text"
                              value={asset.title}
                              onChange={(e) =>
                                setEditProjAssets((prev) =>
                                  prev.map((item) =>
                                    item.id === asset.id ? { ...item, title: e.target.value } : item
                                  )
                                )
                              }
                              className="w-full px-2 py-1 text-xs bg-zinc-900 border border-zinc-800 rounded text-white"
                            />
                            <div className="text-[10px] font-mono text-zinc-500 uppercase">
                              {asset.badge || asset.type} {asset.fileSize ? `· ${asset.fileSize}` : ''}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setEditProjAssets((prev) => prev.filter((item) => item.id !== asset.id))
                          }
                          className="p-1.5 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-900 shrink-0"
                          title="Remove Main File"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-lg border border-dashed border-zinc-800 text-[11px] font-mono text-zinc-500 text-center">
                    No main files attached yet. Upload PNG, WebP, JPG or PDF files above.
                  </div>
                )}

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 pt-1">
                  <select
                    value={editProjNewAssetType}
                    onChange={(e) => setEditProjNewAssetType(e.target.value as any)}
                    className="px-2.5 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                  >
                    <option value="image">Image (PNG/WebP/JPG)</option>
                    <option value="mockup">3D Mockup</option>
                    <option value="logo">Logo File</option>
                    <option value="pdf">PDF Document</option>
                  </select>
                  <input
                    type="text"
                    value={editProjNewAssetUrl}
                    onChange={(e) => setEditProjNewAssetUrl(e.target.value)}
                    placeholder="Or paste Main File URL..."
                    className="flex-1 min-w-[140px] px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!editProjNewAssetUrl.trim()) {
                        showToast('Enter a Main File URL or click Upload Main File(s)');
                        return;
                      }
                      const urlVal = editProjNewAssetUrl.trim();
                      const isPdfUrl =
                        editProjNewAssetType === 'pdf' || urlVal.toLowerCase().endsWith('.pdf');
                      const added: ProjectAsset = {
                        id: `asset-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                        title: editProjNewAssetTitle.trim() || 'Main Project File',
                        type: isPdfUrl ? 'pdf' : editProjNewAssetType,
                        url: urlVal,
                        badge: isPdfUrl ? 'PDF Document' : 'Main File'
                      };
                      setEditProjAssets((prev) => [...prev, added]);
                      setEditProjNewAssetUrl('');
                      setEditProjNewAssetTitle('');
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-white shrink-0"
                  >
                    + Add URL
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-zinc-900">
              <button
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!editProjTitle.trim()) {
                    showToast('Please enter a project title');
                    return;
                  }
                  updateProject(editingProject.id, {
                    title: editProjTitle.trim(),
                    category: editProjCategory as any,
                    client: editProjClient.trim() || 'Private Client',
                    year: editProjYear.trim() || '2025',
                    summary: editProjSummary.trim() || editingProject.summary,
                    subtitle: editProjSummary.trim() || editingProject.subtitle,
                    imageUrl: editProjImg.trim() || editingProject.imageUrl,
                    gallery: editProjAssets
                  });
                  setSelectedCategoryForProjects(editProjCategory);
                  setEditingProject(null);
                  showToast('Item thumbnail & main files updated!');
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#e50914] hover:bg-[#c80812]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: MANAGE PROJECT VISUAL ASSETS (MOCKUPS & PDFS)            */}
      {/* ============================================================== */}
      {selectedProjectForAssets && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-5 shadow-2xl my-auto max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 shrink-0">
              <div>
                <h3 className="text-base font-bold text-white">
                  Visual Assets for: {selectedProjectForAssets.title}
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Upload multiple mockups, logos, or PDF documents to display in the scroll view.
                </p>
              </div>
              <button onClick={() => setSelectedProjectForAssets(null)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* List of current assets */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {(selectedProjectForAssets.gallery || []).length === 0 ? (
                <div className="p-6 text-center text-zinc-500 text-xs font-mono rounded-xl bg-zinc-900/40 border border-dashed border-zinc-800">
                  No visual assets added yet. Use the form below to add mockups or PDFs.
                </div>
              ) : (
                selectedProjectForAssets.gallery?.map((asset, aIdx) => (
                  <div
                    key={asset.id || aIdx}
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {asset.type === 'pdf' ? (
                        <div className="p-2 rounded-lg bg-red-950/60 border border-red-500/30 text-[#e50914]">
                          <FileText className="w-4 h-4" />
                        </div>
                      ) : (
                        <img
                          src={asset.url}
                          alt={asset.title}
                          className="w-12 h-10 rounded object-cover bg-zinc-950 border border-zinc-800 shrink-0"
                        />
                      )}
                      <div className="min-w-0">
                        <div className="font-bold text-white truncate">{asset.title}</div>
                        <div className="text-[11px] font-mono text-zinc-500 uppercase">{asset.type} · {asset.badge || 'Asset'}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        deleteAssetFromProject(selectedProjectForAssets.id, asset.id);
                        setSelectedProjectForAssets(p => p ? {
                          ...p,
                          gallery: (p.gallery || []).filter(a => a.id !== asset.id)
                        } : null);
                        showToast('Asset removed from project');
                      }}
                      className="p-1.5 rounded text-zinc-400 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                      title="Delete Asset"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Add Asset Form */}
            <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800 shrink-0 space-y-3">
              <div className="text-xs font-bold text-white uppercase font-mono">
                + Add Visual Asset / PDF to Scroll View
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                    Asset Type
                  </label>
                  <select
                    value={newAssetType}
                    onChange={(e) => setNewAssetType(e.target.value as any)}
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                  >
                    <option value="mockup">3D Mockup</option>
                    <option value="logo">Primary Logo</option>
                    <option value="pdf">PDF Document / Spec</option>
                    <option value="image">Detail Graphic / Photo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                    Asset Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 3D Foil Stamping Mockup"
                    value={newAssetTitle}
                    onChange={(e) => setNewAssetTitle(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                  File Upload or URL
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="/assets/projects/... or https://..."
                    value={newAssetUrl}
                    onChange={(e) => setNewAssetUrl(e.target.value)}
                    className="flex-1 px-3 py-1.5 text-xs bg-zinc-950 border border-zinc-800 rounded-lg text-white font-mono"
                  />
                  <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs text-white shrink-0 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#e50914]" />
                    <span>Browse</span>
                    <input
                      type="file"
                      accept=".png,.webp,.jpg,.jpeg,.svg,.pdf,image/png,image/webp,image/jpeg,image/*,application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
                        if (isPdf) setNewAssetType('pdf');
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          if (event.target?.result) {
                            setNewAssetUrl(event.target.result as string);
                            if (!newAssetTitle) setNewAssetTitle(file.name.replace(/\.[^/.]+$/, ''));
                          }
                        };
                        reader.readAsDataURL(file);
                        e.target.value = '';
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => {
                    if (!newAssetUrl.trim()) {
                      showToast('Please select or enter an image / PDF URL');
                      return;
                    }
                    const assetObj: ProjectAsset = {
                      id: `asset-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
                      title: newAssetTitle.trim() || 'Visual Asset',
                      type: newAssetType,
                      url: newAssetUrl.trim(),
                      badge: newAssetType === 'pdf' ? 'PDF Document' : '3D Mockup'
                    };
                    addAssetToProject(selectedProjectForAssets.id, assetObj);
                    setSelectedProjectForAssets(p => p ? {
                      ...p,
                      gallery: [...(p.gallery || []), assetObj]
                    } : null);
                    setNewAssetTitle('');
                    setNewAssetUrl('');
                    showToast('Asset added to scroll stream!');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#e50914] hover:bg-[#c80812]"
                >
                  + Add to Scroll View
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL: ADD NEW SKILL                                            */}
      {/* ============================================================== */}
      {isNewSkillOpen && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <h3 className="text-base font-bold text-white">Add Software / Craft Skill</h3>
              <button onClick={() => setIsNewSkillOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Software / Skill Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Adobe Premiere Pro"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono text-zinc-400 uppercase mb-1">
                  <span>Proficiency:</span>
                  <span className="text-[#e50914] font-bold">{newSkillLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#e50914]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Experience (e.g. 8+ Years)
                </label>
                <input
                  type="text"
                  placeholder="8+ Years"
                  value={newSkillExp}
                  onChange={(e) => setNewSkillExp(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Proficiency scope & deliverables..."
                  value={newSkillDesc}
                  onChange={(e) => setNewSkillDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-zinc-900 border border-zinc-800 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-900">
              <button
                onClick={() => setIsNewSkillOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-mono text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!newSkillName.trim()) {
                    showToast('Please enter a skill name');
                    return;
                  }
                  addSkill({
                    name: newSkillName.trim(),
                    level: newSkillLevel,
                    experience: newSkillExp || '5+ Years',
                    category: newSkillCategory,
                    description: newSkillDesc.trim() || 'High-fidelity execution.',
                    iconName: 'figma'
                  });
                  setIsNewSkillOpen(false);
                  setNewSkillName('');
                  showToast('Skill added!');
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#e50914] hover:bg-[#c80812]"
              >
                Add Skill
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
