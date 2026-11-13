import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PORTFOLIO_DATA, 
  PortfolioDataType, 
  PortfolioCategory, 
  Project, 
  SkillItem, 
  WorkflowStep, 
  ProjectAsset 
} from '../data/portfolioData';

export interface SiteSettings {
  logoUrl: string;
  brandName: string;
  adminEmail: string;
  adminPin: string;
  contactEmail: string;
  footerNote: string;
}

export interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  category: 'profile' | 'category' | 'project' | 'skill' | 'workflow' | 'settings';
}

export interface AnalyticsData {
  totalVisitors: number;
  uniqueVisitors: number;
  totalPageViews: number;
  avgDuration: string;
  recentActivities: ActivityLog[];
}

interface PortfolioContextType {
  data: PortfolioDataType;
  settings: SiteSettings;
  analytics: AnalyticsData;
  updateProfile: (fields: Partial<PortfolioDataType['profile']>) => void;
  updateStats: (stats: PortfolioDataType['stats']) => void;
  addCategory: (category: PortfolioCategory) => void;
  updateCategory: (id: string, updated: Partial<PortfolioCategory>) => void;
  deleteCategory: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updated: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addAssetToProject: (projectId: string, asset: ProjectAsset) => void;
  deleteAssetFromProject: (projectId: string, assetId: string) => void;
  updateSkill: (skillName: string, updated: Partial<SkillItem>) => void;
  updateSkillLevel: (skillName: string, level: number) => void;
  addSkill: (skill: SkillItem) => void;
  deleteSkill: (skillName: string) => void;
  updateWorkflowStep: (index: number, updated: Partial<WorkflowStep>) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;
  exportBackup: () => string;
  importBackup: (jsonString: string) => boolean;
}

const STORAGE_KEY_DATA = 'prince_portfolio_cms_data_v2';
const STORAGE_KEY_SETTINGS = 'prince_portfolio_cms_settings_v2';
const STORAGE_KEY_ANALYTICS = 'prince_portfolio_cms_analytics_v2';

const DEFAULT_SETTINGS: SiteSettings = {
  logoUrl: '',
  brandName: 'Prince',
  adminEmail: 'princemahmud9911@gmail.com',
  adminPin: 'Piru9911',
  contactEmail: 'princemahmud9911@gmail.com',
  footerNote: 'Senior Creative Director & Visual Architect specializing in tactile editorial magazine layouts and luxury brand identities.'
};

const DEFAULT_ANALYTICS: AnalyticsData = {
  totalVisitors: 14820,
  uniqueVisitors: 11430,
  totalPageViews: 48950,
  avgDuration: '3m 42s',
  recentActivities: [
    { id: 'act-1', action: 'Published VOGUE Horizon Collector Edition', timestamp: '2 hours ago', category: 'project' },
    { id: 'act-2', action: 'Added Atelier & Harvest Gourmet Food Logo', timestamp: 'Yesterday', category: 'project' },
    { id: 'act-3', action: 'Updated Adobe InDesign skill proficiency', timestamp: '3 days ago', category: 'skill' },
    { id: 'act-4', action: 'Refined 5-Step Production Pipeline', timestamp: '5 days ago', category: 'workflow' }
  ]
};

let uniqueIdCounter = 0;
const generateUniqueId = (prefix: string): string => {
  uniqueIdCounter += 1;
  const randomSuffix = Math.random().toString(36).slice(2, 7);
  return `${prefix}-${Date.now()}-${uniqueIdCounter}-${randomSuffix}`;
};

const normalizeAnalytics = (raw: AnalyticsData): AnalyticsData => {
  const seenIds = new Set<string>();
  const normalizedActivities = (raw.recentActivities || []).map((act, index) => {
    let id = act.id || `act-init-${index}`;
    if (seenIds.has(id)) {
      id = `${id}-${index}-${Math.random().toString(36).slice(2, 6)}`;
    }
    seenIds.add(id);
    return { ...act, id };
  });
  return {
    ...raw,
    recentActivities: normalizedActivities
  };
};

const toRelativeAssetUrl = (url?: string): string => {
  if (!url) return '';
  return url.startsWith('/assets/') ? `.${url}` : url;
};

const normalizePortfolioData = (raw: PortfolioDataType): PortfolioDataType => ({
  ...raw,
  profile: {
    ...raw.profile,
    portraitImage: toRelativeAssetUrl(raw.profile?.portraitImage)
  },
  categories: (raw.categories || []).map(cat => ({
    ...cat,
    imageUrl: toRelativeAssetUrl(cat.imageUrl)
  })),
  projects: (raw.projects || []).map(proj => ({
    ...proj,
    imageUrl: toRelativeAssetUrl(proj.imageUrl),
    gallery: (proj.gallery || []).map(asset => ({
      ...asset,
      url: toRelativeAssetUrl(asset.url)
    }))
  }))
});

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Data state (Portfolio content)
  const [data, setData] = useState<PortfolioDataType>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        return normalizePortfolioData(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load portfolio data from storage', e);
    }
    return PORTFOLIO_DATA;
  });

  // 2. Settings state (Logo, access email, PIN)
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load settings from storage', e);
    }
    return DEFAULT_SETTINGS;
  });

  // 3. Analytics state (visitor counts, activity feed)
  const [analytics, setAnalytics] = useState<AnalyticsData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANALYTICS);
      if (saved) {
        return normalizeAnalytics({ ...DEFAULT_ANALYTICS, ...JSON.parse(saved) });
      }
    } catch (e) {
      console.error('Failed to load analytics from storage', e);
    }
    return DEFAULT_ANALYTICS;
  });

  // Increment simulated page views per session
  useEffect(() => {
    const sessionKey = 'prince_session_counted';
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, '1');
      setAnalytics(prev => {
        const updated = {
          ...prev,
          totalVisitors: prev.totalVisitors + 1,
          totalPageViews: prev.totalPageViews + 1
        };
        try {
          localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(updated));
        } catch (e) {
          // ignore
        }
        return updated;
      });
    }
  }, []);

  // Helper to log activities
  const logActivity = (action: string, category: ActivityLog['category']) => {
    setAnalytics(prev => {
      const newActivities: ActivityLog[] = [
        {
          id: generateUniqueId('act'),
          action,
          timestamp: 'Just now',
          category
        },
        ...prev.recentActivities.slice(0, 9)
      ];
      const updated = { ...prev, recentActivities: newActivities };
      try {
        localStorage.setItem(STORAGE_KEY_ANALYTICS, JSON.stringify(updated));
      } catch (e) {
        // ignore
      }
      return updated;
    });
  };

  // Save data to localStorage on change using functional updater to avoid stale closures
  const updatePortfolioData = (
    updater: (prev: PortfolioDataType) => PortfolioDataType,
    activityMsg?: string,
    category: ActivityLog['category'] = 'project'
  ) => {
    setData(prev => {
      const newData = updater(prev);
      try {
        localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(newData));
      } catch (e) {
        console.warn('LocalStorage limit for portfolio data reached', e);
      }
      return newData;
    });

    if (activityMsg) {
      logActivity(activityMsg, category);
    }
  };

  // Update Profile (Hero, Bio, Greeting, Avatar)
  const updateProfile = (fields: Partial<PortfolioDataType['profile']>) => {
    updatePortfolioData(
      prev => ({
        ...prev,
        profile: {
          ...prev.profile,
          ...fields
        }
      }),
      `Updated hero profile details (${Object.keys(fields).join(', ')})`,
      'profile'
    );
  };

  // Update Stats
  const updateStats = (stats: PortfolioDataType['stats']) => {
    updatePortfolioData(
      prev => ({
        ...prev,
        stats
      }),
      'Updated experience & project statistics',
      'profile'
    );
  };

  // Add Category
  const addCategory = (category: PortfolioCategory) => {
    updatePortfolioData(
      prev => ({
        ...prev,
        categories: [...prev.categories, category]
      }),
      `Added new category: ${category.name}`,
      'category'
    );
  };

  // Update Category
  const updateCategory = (id: string, updated: Partial<PortfolioCategory>) => {
    updatePortfolioData(
      prev => {
        const existingCategory = prev.categories.find(cat => cat.id === id);
        const oldName = existingCategory?.name;
        const newName = updated.name;
        const shouldRenameProjects = Boolean(oldName && newName && oldName !== newName);

        return {
          ...prev,
          categories: prev.categories.map(cat =>
            cat.id === id ? { ...cat, ...updated } : cat
          ),
          projects: shouldRenameProjects
            ? prev.projects.map(proj =>
                proj.category === oldName ? { ...proj, category: newName as any } : proj
              )
            : prev.projects
        };
      },
      `Updated category: ${updated.name || id}`,
      'category'
    );
  };

  // Delete Category
  const deleteCategory = (id: string) => {
    const target = data.categories.find(c => c.id === id);
    updatePortfolioData(
      prev => ({
        ...prev,
        categories: prev.categories.filter(cat => cat.id !== id)
      }),
      `Removed category: ${target?.name || id}`,
      'category'
    );
  };

  // Add Project
  const addProject = (project: Project) => {
    updatePortfolioData(
      prev => ({
        ...prev,
        projects: [project, ...prev.projects]
      }),
      `Created new project: ${project.title}`,
      'project'
    );
  };

  // Update Project
  const updateProject = (id: string, updated: Partial<Project>) => {
    updatePortfolioData(
      prev => ({
        ...prev,
        projects: prev.projects.map(proj =>
          proj.id === id ? { ...proj, ...updated } : proj
        )
      }),
      `Updated project: ${updated.title || id}`,
      'project'
    );
  };

  // Delete Project
  const deleteProject = (id: string) => {
    const target = data.projects.find(p => p.id === id);
    updatePortfolioData(
      prev => ({
        ...prev,
        projects: prev.projects.filter(proj => proj.id !== id)
      }),
      `Deleted project: ${target?.title || id}`,
      'project'
    );
  };

  // Add Asset to Project
  const addAssetToProject = (projectId: string, asset: ProjectAsset) => {
    updatePortfolioData(
      prev => ({
        ...prev,
        projects: prev.projects.map(proj =>
          proj.id === projectId
            ? { ...proj, gallery: [...(proj.gallery || []), asset] }
            : proj
        )
      }),
      `Added asset "${asset.title}" to project`,
      'project'
    );
  };

  // Delete Asset from Project
  const deleteAssetFromProject = (projectId: string, assetId: string) => {
    updatePortfolioData(
      prev => ({
        ...prev,
        projects: prev.projects.map(proj =>
          proj.id === projectId
            ? { ...proj, gallery: (proj.gallery || []).filter(a => a.id !== assetId) }
            : proj
        )
      }),
      'Removed visual asset from project',
      'project'
    );
  };

  // Update Skill
  const updateSkill = (skillName: string, updated: Partial<SkillItem>) => {
    updatePortfolioData(
      prev => ({
        ...prev,
        skills: prev.skills.map(s =>
          s.name.toLowerCase() === skillName.toLowerCase() ? { ...s, ...updated } : s
        )
      }),
      `Modified skill: ${skillName}`,
      'skill'
    );
  };

  // Drag slider to adjust skill level percentage
  const updateSkillLevel = (skillName: string, level: number) => {
    const clampedLevel = Math.max(0, Math.min(100, Math.round(level)));
    updatePortfolioData(prev => ({
      ...prev,
      skills: prev.skills.map(s =>
        s.name.toLowerCase() === skillName.toLowerCase() ? { ...s, level: clampedLevel } : s
      )
    }));
  };

  // Add Skill
  const addSkill = (skill: SkillItem) => {
    updatePortfolioData(
      prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }),
      `Added software skill: ${skill.name} (${skill.level}%)`,
      'skill'
    );
  };

  // Delete Skill
  const deleteSkill = (skillName: string) => {
    updatePortfolioData(
      prev => ({
        ...prev,
        skills: prev.skills.filter(s => s.name.toLowerCase() !== skillName.toLowerCase())
      }),
      `Deleted skill: ${skillName}`,
      'skill'
    );
  };

  // Update Workflow Step (5-Step Production Pipeline)
  const updateWorkflowStep = (index: number, updated: Partial<WorkflowStep>) => {
    updatePortfolioData(
      prev => {
        const updatedWorkflow = [...prev.workflow];
        if (updatedWorkflow[index]) {
          updatedWorkflow[index] = { ...updatedWorkflow[index], ...updated };
        }
        return {
          ...prev,
          workflow: updatedWorkflow
        };
      },
      `Edited Production Pipeline Step ${data.workflow[index]?.step || index + 1}`,
      'workflow'
    );
  };

  // Update Settings (Logo, email, PIN)
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    logActivity(`Updated site settings (${Object.keys(newSettings).join(', ')})`, 'settings');
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setData(PORTFOLIO_DATA);
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY_DATA);
      localStorage.removeItem(STORAGE_KEY_SETTINGS);
    } catch (e) {
      console.error(e);
    }
    logActivity('Reset portfolio data to default state', 'settings');
  };

  // Export Backup
  const exportBackup = (): string => {
    const backupObj = {
      data,
      settings,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(backupObj, null, 2);
  };

  // Import Backup
  const importBackup = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.data && parsed.settings) {
        setData(parsed.data);
        setSettings(parsed.settings);
        localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(parsed.data));
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(parsed.settings));
        logActivity('Imported full configuration backup', 'settings');
        return true;
      }
    } catch (e) {
      console.error('Failed to parse backup JSON', e);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
