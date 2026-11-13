export interface ProjectAsset {
  id: string;
  title: string;
  type: 'image' | 'mockup' | 'pdf' | 'logo';
  url: string;
  caption?: string;
  fileSize?: string;
  badge?: string;
  createdAt?: string;
}

export interface PortfolioCategory {
  id: string;
  name: 'Magazine Design' | 'UI/UX Case Studies' | 'Brand Identity' | 'Book Covers & Print';
  title: string;
  displayTitle: string;
  tagline: string;
  imageUrl: string;
  accentBadge: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Magazine Design' | 'UI/UX Case Studies' | 'Brand Identity' | 'Book Covers & Print';
  year: string;
  client: string;
  location: string;
  imageUrl: string;
  featured: boolean;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  tools: string[];
  metrics: { label: string; value: string }[];
  accentColor?: string;
  gallery?: ProjectAsset[];
}

export interface SkillItem {
  name: string;
  category: 'Software' | 'Specialization' | 'Craft';
  level: number; // percentage
  experience: string;
  description: string;
  iconName: string;
}

export interface WorkflowStep {
  step: string;
  name: string;
  tagline: string;
  description: string;
  activities: string[];
  deliverables: string[];
  duration: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  location: string;
  projectType: string;
  year: string;
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Prince",
    tagline: "Magazine & UI/UX Expert | Brand Identity Specialist",
    greeting: "Hello, I'm Prince",
    bio: "An accomplished Senior Creative Director and Visual Architect specializing in tactile editorial magazine layouts, high-conversion UI/UX systems, and iconic brand identities. Over the past decade, I have collaborated with luxury fashion houses, tech disruptors, and architectural monographs across London, New York, Copenhagen, and Tokyo.",
    email: "princemahmud9911@gmail.com",
    availability: "Available for Freelance & Select Contracts",
    statusBadge: "Available for Q2/Q3 Projects",
    location: "London & Remote Worldwide",
    timezone: "GMT / UTC+0 (Collaborates Across US & EU)",
    experienceYears: "10+",
    completedProjects: "150+",
    happyClients: "100+",
    satisfactionRate: "99%",
    portraitImage: "./assets/aistudio/WhatsApp_Image_2026-07-22_at_8.34.38_PM_copy_c4f4f2fe.jpg"
  },
  stats: [
    { label: "Years Experience", value: "10+", sub: "Editorial & Digital" },
    { label: "Projects Completed", value: "150+", sub: "Print & Interfaces" },
    { label: "Happy Clients", value: "100+", sub: "Global Brands & Agencies" },
    { label: "Client Satisfaction", value: "99%", sub: "5-Star Retainers" }
  ],
  categories: [
    {
      id: "cat-magazine",
      name: "Magazine Design",
      title: "Magazine Design & Editorial",
      displayTitle: "Editorial Magazines & Collector Editions",
      tagline: "VOGUE, TIME, Avant-Garde architecture monographs & cultural journals with full PDF editions.",
      imageUrl: "./assets/projects/magazine_covers_collection.jpg",
      accentBadge: "Editorial Magazine Issues"
    },
    {
      id: "cat-branding",
      name: "Brand Identity",
      title: "Brand Identity, Logos & Packaging",
      displayTitle: "Brand Identity, Food Logos & Luxury Seals",
      tagline: "Artisanal gourmet food logos, luxury atelier seals, 3D foil mockups, and identity guidelines.",
      imageUrl: "./assets/projects/food_logo_branding.jpg",
      accentBadge: "Identity Suites & Logos"
    },
    {
      id: "cat-uiux",
      name: "UI/UX Case Studies",
      title: "UI/UX Systems & Digital Products",
      displayTitle: "UI/UX Systems & Fintech Dashboards",
      tagline: "Institutional wealth management terminals, responsive mobile suites, and atomic design tokens.",
      imageUrl: "./assets/projects/kronos_vault.jpg",
      accentBadge: "Digital Products & Apps"
    },
    {
      id: "cat-bookprint",
      name: "Book Covers & Print",
      title: "Book Covers, Spine & Monograph Art",
      displayTitle: "Hardcover Book Covers & Monograph Editions",
      tagline: "Clothbound architectural monographs, split spine foil jackets, and fine art publications.",
      imageUrl: "./assets/projects/book_cover_editorial_1794505509147.jpg",
      accentBadge: "Hardcovers & Monographs"
    }
  ] as PortfolioCategory[],
  projects: [
    {
      id: "architecture-of-silence",
      title: "The Architecture of Silence",
      subtitle: "Monograph & Avant-Garde Editorial Magazine",
      category: "Magazine Design",
      year: "2025",
      client: "Structura Monograph",
      location: "Copenhagen, Denmark",
      imageUrl: "./assets/projects/magazine_silence.jpg",
      featured: true,
      summary: "A 168-page biennial architectural and minimalist culture magazine exploring monolithic concrete spaces and stark Scandinavian interior forms.",
      challenge: "Creating an uncompromising Swiss grid layout system capable of accommodating high-contrast monochrome architectural photography alongside dense bilingual essay texts without visual fatigue.",
      solution: "Engineered a custom 12-column mathematical grid with asymmetric margins, bespoke typography scale in Archivo & Playfair, and deliberate crimson micro-accents for folio markers.",
      deliverables: ["168-Page Editorial Layout", "Custom Baseline Grid", "Prepress Print Specifications", "Digital Replica Edition"],
      tools: ["Adobe InDesign", "Adobe Photoshop", "Glyphs", "Adobe Illustrator"],
      metrics: [
        { label: "Copies Distributed", value: "12,000+" },
        { label: "Stockists Worldwide", value: "48 Boutiques" },
        { label: "Design Award", value: "European Design Awards Nominee" }
      ],
      gallery: [
        {
          id: "aos-1",
          title: "Editorial Interior Spread & Modular Grid",
          type: "mockup",
          badge: "Magazine Spread Mockup",
          url: "./assets/projects/magazine_spread.jpg",
          caption: "Double-page minimalist spread featuring asymmetric margins, micro-folio markers, and duotone monochrome reproduction."
        },
        {
          id: "aos-2",
          title: "Bespoke Cover Foil Stamping & Bookmark",
          type: "mockup",
          badge: "3D Print Mockup",
          url: "./assets/projects/mockup_stationery_foil.jpg",
          caption: "Tactile foil-stamped bookmark and linen slipcase detailing for the deluxe limited edition."
        },
        {
          id: "aos-3",
          title: "Prepress Technical Specification Sheet",
          type: "pdf",
          badge: "Editorial PDF Document",
          url: "./assets/projects/sample_spec_sheet.pdf",
          caption: "Official CMYK prepress calibration sheet, paper weights (170gsm Fedrigoni Tintoretto), and binding guidelines.",
          fileSize: "2.4 MB"
        }
      ]
    },
    {
      id: "kronos-fintech-os",
      title: "KRONOS Vault & Wealth OS",
      subtitle: "High-Frequency Portfolio & Dark Theme Web Platform",
      category: "UI/UX Case Studies",
      year: "2025",
      client: "Kronos Capital",
      location: "Zurich, Switzerland",
      imageUrl: "./assets/projects/kronos_vault.jpg",
      featured: true,
      summary: "An ultra-responsive dark-mode financial terminal and mobile wealth companion designed for sovereign wealth funds and institutional asset managers.",
      challenge: "Transforming dense real-time algorithmic market feeds, multi-currency assets, and risk hedges into an intuitive, razor-sharp visual interface with zero latency.",
      solution: "Constructed an atomic design system with high-contrast crimson data highlights, tabular numeric alignment, and ergonomic widget modularity across desktop and mobile screens.",
      deliverables: ["Desktop Terminal Web App", "iOS & Android Mobile UI", "Comprehensive Design System (320+ Components)", "Interactive Prototypes"],
      tools: ["Figma", "Design Tokens", "Tailwind CSS Architecture", "Protopie"],
      metrics: [
        { label: "AUM Managed", value: "$4.2B" },
        { label: "Task Speed Increase", value: "+38%" },
        { label: "User NPS Score", value: "84" }
      ],
      gallery: [
        {
          id: "kronos-1",
          title: "Institutional Terminal Dark Dashboard",
          type: "image",
          badge: "UI/UX Desktop Canvas",
          url: "./assets/projects/kronos_vault.jpg",
          caption: "Modular financial dashboard with real-time liquidity depth charts, tabular numeric alignment, and high-frequency trade feeds."
        },
        {
          id: "kronos-2",
          title: "Mobile Wealth Companion Interface",
          type: "mockup",
          badge: "Mobile UI Mockup",
          url: "./assets/projects/uiux_fintech_dashboard_1794505469736.jpg",
          caption: "Handheld iOS terminal with biometric vault authentication and instant multi-asset rebalancing."
        },
        {
          id: "kronos-3",
          title: "KRONOS Design Token & Component Spec",
          type: "pdf",
          badge: "System PDF Document",
          url: "./assets/projects/sample_spec_sheet.pdf",
          caption: "Complete design token taxonomy, WCAG AAA dark-mode color contrast proofs, and micro-interaction specifications.",
          fileSize: "3.1 MB"
        }
      ]
    },
    {
      id: "aurelius-atelier",
      title: "Aurelius Atelier & Privé",
      subtitle: "Bespoke Brand Identity & Luxury Packaging Suite",
      category: "Brand Identity",
      year: "2024",
      client: "Aurelius Luxury Group",
      location: "Milan & Paris",
      imageUrl: "./assets/projects/maison_rouge.jpg",
      featured: true,
      summary: "Complete visual identity rebrand for a private high-jewelry and haute horlogerie atelier, featuring deep charcoal tactile card stocks and metallic crimson edge foils.",
      challenge: "Elevating the brand to compete directly with century-old Parisian luxury maisons while projecting contemporary architectural refinement and restraint.",
      solution: "Sculpted an engraved serif wordmark, custom monograph seal, foil-stamped stationery suite, and packaging boxes with precision crimson contrast accents.",
      deliverables: ["Brand Identity Guidelines (80 Pages)", "Bespoke Wordmark & Seal", "Stationery & Packaging Suite", "Digital Brand Presence"],
      tools: ["Adobe Illustrator", "Figma", "Adobe Photoshop", "Physical Foil Prototyping"],
      metrics: [
        { label: "Brand Valuation Growth", value: "+145%" },
        { label: "Press Coverage", value: "Vogue & Robb Report" },
        { label: "Packaging Elegance", value: "100% Recyclable Luxury" }
      ],
      gallery: [
        {
          id: "aur-1",
          title: "Primary Logo Mark & Debossed Seal",
          type: "logo",
          badge: "Primary Brand Mark",
          url: "./assets/projects/brand_mockup_suite.jpg",
          caption: "Architectural geometric 'A' monogram debossed in heavy matte black stock with metallic crimson foil tipping."
        },
        {
          id: "aur-2",
          title: "Luxury Stationery & Business Card Suite",
          type: "mockup",
          badge: "Stationery 3D Mockup",
          url: "./assets/projects/logo_stationery.jpg",
          caption: "600gsm duplexed cotton business cards with hot-stamped crimson metallic edging and correspondence cards."
        },
        {
          id: "aur-3",
          title: "Rigid Luxury Presentation Box & Packaging",
          type: "mockup",
          badge: "Packaging Mockup",
          url: "./assets/projects/packaging_art_direction_1794505525596.jpg",
          caption: "Matte noir clamshell jewelry box with magnetic closure and custom velvet interior insert."
        },
        {
          id: "aur-4",
          title: "Brand Identity Guidelines & Vector Construction Grid",
          type: "pdf",
          badge: "Brand Guide PDF",
          url: "./assets/projects/sample_spec_sheet.pdf",
          caption: "80-page brand manual detailing typographic scales, clear space formulas, Pantone textile codes, and print dielines.",
          fileSize: "4.8 MB"
        }
      ]
    },
    {
      id: "urban-forms-study",
      title: "Urban Forms: Modernist Study",
      subtitle: "Architectural Hardcover Monograph & Book Design",
      category: "Book Covers & Print",
      year: "2024",
      client: "Avery Jensen Press",
      location: "London, UK",
      imageUrl: "./assets/projects/monolith_echoes.jpg",
      featured: true,
      summary: "Award-winning hardcover architectural publication documenting brutalist and modernist urban structures across post-war European capitals.",
      challenge: "Creating a tactile book jacket that stands out dramatically in museum bookstores while honoring the stark concrete geometry of the subject matter.",
      solution: "Applied a stark split crimson wrap spine over raw cotton-textured cover stock, debossed sans typography, and an intricate 3-column interior essay grid.",
      deliverables: ["Hardcover Jacket & Spine", "Debossing Stamp Matrices", "320-Page Interior Book Layout", "Slipcase Outer Design"],
      tools: ["Adobe InDesign", "Adobe Photoshop", "Adobe Illustrator"],
      metrics: [
        { label: "Print Runs Sold Out", value: "3 Editions" },
        { label: "Bestseller Status", value: "#1 Architecture Title" },
        { label: "Typography Recognition", value: "TDC Award Finalist" }
      ],
      gallery: [
        {
          id: "uf-1",
          title: "Hardcover Book Jacket & Debossed Spine",
          type: "mockup",
          badge: "Book Hardcover Mockup",
          url: "./assets/projects/book_cover_editorial_1794505509147.jpg",
          caption: "Clothbound hardcover with split crimson linen wrap and blind-embossed architectural typography."
        },
        {
          id: "uf-2",
          title: "Full-Bleed Photographic Chapter Opener",
          type: "image",
          badge: "Editorial Photo Plate",
          url: "./assets/projects/solitude_stone.jpg",
          caption: "Duotone concrete monolith plate with Swiss asymmetric margin notes."
        },
        {
          id: "uf-3",
          title: "Book Binding & Paper Weight Dossier",
          type: "pdf",
          badge: "Technical Print PDF",
          url: "./assets/projects/sample_spec_sheet.pdf",
          caption: "Thread-sewn section binding specifications, head and tail band selections, and FSC certified paper stocks.",
          fileSize: "1.8 MB"
        }
      ]
    },
    {
      id: "velvet-rouge-parfum",
      title: "Velvet Rouge Haute Parfumerie",
      subtitle: "Fragrance Packaging & Editorial Art Direction",
      category: "Brand Identity",
      year: "2025",
      client: "Maison de Rouge",
      location: "Grasse & Paris",
      imageUrl: "./assets/projects/packaging_art_direction_1794505525596.jpg",
      featured: false,
      summary: "Sensory packaging design and campaign art direction for an exclusive niche fragrance crafted with nocturnal damask rose and smoky cedar.",
      challenge: "Translating an intense, dark, sultry scent profile into tangible matte black glass bottles with crimson blind-embossed typographic packaging.",
      solution: "Engineered bespoke matte soft-touch packaging with crimson foil typography, weighted stone-textured bottle cap, and editorial lookbook photography direction.",
      deliverables: ["Bottle & Cap Industrial Graphics", "Outer Rigid Box Packaging", "Editorial Launch Lookbook", "Point-of-Sale Visual Displays"],
      tools: ["Adobe Illustrator", "Adobe Photoshop", "KeyShot 3D", "InDesign"],
      metrics: [
        { label: "Pre-Orders Reached", value: "2,500 Units" },
        { label: "Boutique Placements", value: "Le Bon Marché & Harrods" },
        { label: "Customer Rating", value: "4.9 / 5.0" }
      ],
      gallery: [
        {
          id: "vr-1",
          title: "Matte Noir Flacon with Crimson Foil Neck",
          type: "mockup",
          badge: "Bottle 3D Mockup",
          url: "./assets/projects/aura_botanica.jpg",
          caption: "Heavy frosted glass bottle with crimson gradient foil and engraved brass pump mechanism."
        },
        {
          id: "vr-2",
          title: "Editorial Box Packaging & Soft-Touch Sleeve",
          type: "mockup",
          badge: "Packaging Mockup",
          url: "./assets/projects/packaging_art_direction_1794505525596.jpg",
          caption: "Velvet-touch outer presentation box with deep crimson blind-debossing."
        },
        {
          id: "vr-3",
          title: "Fragrance Dieline & Foil Stamping Spec",
          type: "pdf",
          badge: "Packaging Dieline PDF",
          url: "./assets/projects/sample_spec_sheet.pdf",
          caption: "Exact 1:1 vector dielines with bleed, crease, score, and hot-stamping registration marks.",
          fileSize: "2.1 MB"
        }
      ]
    },
    {
      id: "vogue-horizon-edition",
      title: "VOGUE Horizon: Future Culture",
      subtitle: "Seasonal Editorial Spread & Typographic Direction",
      category: "Magazine Design",
      year: "2024",
      client: "Horizon Media Syndicate",
      location: "New York, USA",
      imageUrl: "./assets/projects/magazine_silence.jpg",
      featured: false,
      summary: "Special edition culture journal analyzing the convergence of digital generative art, haute couture, and sustainable manufacturing in the 21st century.",
      challenge: "Harmonizing disparate editorial contributions from 18 international authors under a cohesive, high-energy typographic visual umbrella.",
      solution: "Formulated dynamic headline lockups, pull-quote oversized typographical sculptures, and full-bleed photographic dividers.",
      deliverables: ["Editorial Layout (120 Pages)", "Magazine Cover Suite", "Digital Web Interactive Story", "Art Direction Guidelines"],
      tools: ["Adobe InDesign", "Figma", "Photoshop", "Lightroom"],
      metrics: [
        { label: "Readership", value: "85,000+" },
        { label: "Digital Engagement", value: "+62%" },
        { label: "Industry Citation", value: "SPD 59th Annual Medal" }
      ],
      gallery: [
        {
          id: "vh-1",
          title: "Collector's Issue Cover Masthead & Grid",
          type: "image",
          badge: "Editorial Cover",
          url: "./assets/projects/magazine_silence.jpg",
          caption: "High-contrast editorial masthead with modern serif treatment and archival paper texture."
        },
        {
          id: "vh-2",
          title: "Feature Article Double Page Spread",
          type: "mockup",
          badge: "Spread Mockup",
          url: "./assets/projects/magazine_spread.jpg",
          caption: "Editorial layout showcasing multi-tier typographical hierarchy and asymmetric callouts."
        },
        {
          id: "vh-3",
          title: "Editorial Proof & Layout Dossier",
          type: "pdf",
          badge: "Proof Dossier PDF",
          url: "./assets/projects/sample_spec_sheet.pdf",
          caption: "High-resolution proof dossier including typography license records and color proof signoffs.",
          fileSize: "3.5 MB"
        }
      ]
    },
    {
      id: "food-gourmet-branding",
      title: "Atelier & Harvest Gourmet Dining",
      subtitle: "Artisanal Restaurant Brand Identity & Food Logo Suite",
      category: "Brand Identity",
      year: "2025",
      client: "Atelier & Harvest Group",
      location: "London & New York",
      imageUrl: "./assets/projects/food_logo_branding.jpg",
      featured: true,
      summary: "End-to-end culinary visual identity and food logo system for a Michelin-starred farm-to-table dining establishment.",
      challenge: "Formulating a luxury food brand mark that bridges rustic botanical craftsmanship with modern haute cuisine sophistication.",
      solution: "Engineered an engraved gold foil culinary shield featuring wheat and artisan cutlery, embossed onto handmade textured card stocks and ceramics.",
      deliverables: ["Primary Food Logo Mark", "Monogram & Sub-mark Seal", "Menu & Wine List Dossier", "Packaging & Apron Graphics"],
      tools: ["Adobe Illustrator", "Photoshop", "Physical Foil Testing"],
      metrics: [
        { label: "Guest Retention", value: "+42%" },
        { label: "Menu Redesign Impact", value: "3x Wine Sales" },
        { label: "Identity Awards", value: "Restaurant & Bar Design Shortlist" }
      ],
      gallery: [
        {
          id: "fg-1",
          title: "Primary Gourmet Shield Logo on Textured Menu",
          type: "logo",
          badge: "Primary Food Logo",
          url: "./assets/projects/food_logo_branding.jpg",
          caption: "Bespoke gold foil stamped crest featuring artisanal wheat sheaf and cutlery on raw handmade cotton card stock."
        },
        {
          id: "fg-2",
          title: "Minimalist Culinary Monogram & Ceramic Plate Stamp",
          type: "logo",
          badge: "Secondary Mark",
          url: "./assets/projects/brand_mockup_suite.jpg",
          caption: "Custom debossed cutlery mark for artisanal ceramic tableware, takeaway packaging, and wax stamp seals."
        },
        {
          id: "fg-3",
          title: "Tactile Menu & Wine List Stationery Suite",
          type: "mockup",
          badge: "Stationery 3D Mockup",
          url: "./assets/projects/logo_stationery.jpg",
          caption: "Leather-bound dinner menu with hot-stamped gold foil typography and matching sommelier notes."
        },
        {
          id: "fg-4",
          title: "Food Brand Guidelines & Dieline Specifications",
          type: "pdf",
          badge: "Brand Guide PDF",
          url: "./assets/projects/sample_spec_sheet.pdf",
          caption: "Complete kitchen dielines, food packaging vectors, Pantone food-safe ink swatches, and clear space rules.",
          fileSize: "4.2 MB"
        }
      ]
    },
    {
      id: "time-pioneers-edition",
      title: "TIME: New Century Pioneers",
      subtitle: "Cultural Monograph & Special Anniversary Edition",
      category: "Magazine Design",
      year: "2025",
      client: "TIME Media Syndicate",
      location: "New York, USA",
      imageUrl: "./assets/projects/magazine_covers_collection.jpg",
      featured: true,
      summary: "Special collector's edition magazine analyzing the iconic red-border format across 10 distinct cultural visionaries.",
      challenge: "Reinventing the classic cover hierarchy with stark monochrome portraiture and high-contrast crimson framing.",
      solution: "Sculpted an ultra-modern sans-serif typographic grid with modular asymmetric interior feature essays.",
      deliverables: ["10-Cover Collector Suite", "144-Page Interior Grid", "Digital Replica Edition"],
      tools: ["Adobe InDesign", "Photoshop", "Glyphs"],
      metrics: [
        { label: "Newsstand Sellout", value: "94% in 48 Hours" },
        { label: "Special Edition Print", value: "50,000 Copies" },
        { label: "Design Award", value: "SPD Gold Medal" }
      ],
      gallery: [
        {
          id: "tp-1",
          title: "10-Cover Collector's Suite Grid",
          type: "image",
          badge: "Magazine Covers Collection",
          url: "./assets/projects/magazine_covers_collection.jpg",
          caption: "Complete array of special edition TIME & VOGUE format covers with high-contrast monochrome portraiture."
        },
        {
          id: "tp-2",
          title: "Double-Page Feature Essay Spread",
          type: "mockup",
          badge: "Editorial Spread",
          url: "./assets/projects/magazine_spread.jpg",
          caption: "Asymmetric Swiss grid layout with high-contrast crimson drop caps and mathematical margin notes."
        },
        {
          id: "tp-3",
          title: "TIME Full Magazine Digital PDF Edition",
          type: "pdf",
          badge: "Full Magazine PDF",
          url: "./assets/projects/sample_spec_sheet.pdf",
          caption: "Complete 144-page publication in press-ready digital format with interactive table of contents.",
          fileSize: "6.8 MB"
        }
      ]
    },
    {
      id: "birthday-anniversary-edition",
      title: "Celebration & Birthday Luxury Edition",
      subtitle: "Bespoke Monograph & Archival Anniversary Magazine",
      category: "Magazine Design",
      year: "2024",
      client: "Private Luxury Client",
      location: "Paris & Geneva",
      imageUrl: "./assets/projects/solitude_stone.jpg",
      featured: false,
      summary: "Privately commissioned luxury publication celebrating a milestone celebration with bespoke foil cover and fine art paper stocks.",
      challenge: "Transforming personal family archives and high-society event photography into a timeless museum-grade magazine monograph.",
      solution: "Bound in tactile linen with debossed gold foil titles, custom photo duotones, and commemorative essays.",
      deliverables: ["Hardcover Magazine Monograph", "Silk Slipcase", "High-Resolution Archival PDF"],
      tools: ["Adobe InDesign", "Photoshop", "Lightroom"],
      metrics: [
        { label: "Limited Edition", value: "100 Numbered Copies" },
        { label: "Paper Weight", value: "200gsm Fedrigoni" },
        { label: "Client Rating", value: "5.0 / 5.0" }
      ],
      gallery: [
        {
          id: "bday-1",
          title: "Hardcover Milestone Edition with Gold Foil Slipcase",
          type: "mockup",
          badge: "Luxury Monograph Mockup",
          url: "./assets/projects/mockup_stationery_foil.jpg",
          caption: "Custom clothbound hardcover monograph with metallic foil typography and silk bookmark ribbon."
        },
        {
          id: "bday-2",
          title: "Archival Memory & Retrospective Spread",
          type: "mockup",
          badge: "Interior Spread",
          url: "./assets/projects/magazine_spread.jpg",
          caption: "Curated duotone retrospective spread balancing historic archival photos with modern typography."
        },
        {
          id: "bday-3",
          title: "Celebration Magazine Full PDF Edition",
          type: "pdf",
          badge: "Keepsake PDF",
          url: "./assets/projects/sample_spec_sheet.pdf",
          caption: "Complete celebration publication with typography specifications and prepress color calibration.",
          fileSize: "5.1 MB"
        }
      ]
    }
  ] as Project[],
  skills: [
    {
      name: "Figma",
      category: "Software",
      level: 98,
      experience: "8+ Years",
      description: "Advanced component architecture, variables, auto layout 5.0, tokens, interactive micro-prototypes, and developer handoff workflows.",
      iconName: "figma"
    },
    {
      name: "Adobe InDesign",
      category: "Software",
      level: 99,
      experience: "10+ Years",
      description: "Master pages, multi-column modular grids, GREP styles, nested paragraph styles, book synchronization, and prepress CMYK/pantone color separations.",
      iconName: "indesign"
    },
    {
      name: "Adobe Photoshop",
      category: "Software",
      level: 96,
      experience: "10+ Years",
      description: "Non-destructive photo manipulation, advanced frequency separation, high-fashion retouching, and photorealistic editorial mockups.",
      iconName: "photoshop"
    },
    {
      name: "Adobe Illustrator",
      category: "Software",
      level: 95,
      experience: "10+ Years",
      description: "Precision vector geometry, custom typographic logomarks, iconography suites, packaging dielines, and foil stamping production files.",
      iconName: "illustrator"
    },
    {
      name: "UI/UX Architecture",
      category: "Specialization",
      level: 96,
      experience: "8+ Years",
      description: "User research, mental modeling, information architecture, wireframing, heuristic evaluations, and high-conversion UX pathways.",
      iconName: "layout"
    },
    {
      name: "Design Systems & Tokens",
      category: "Specialization",
      level: 94,
      experience: "6+ Years",
      description: "Building scalable enterprise design systems bridging Figma tokens with Tailwind CSS, React components, and accessibility WCAG standards.",
      iconName: "layers"
    }
  ] as SkillItem[],
  competencies: [
    "Editorial Layout & Grid Systems",
    "High-End Magazine Art Direction",
    "Luxury Brand Identity Systems",
    "Digital Product & SaaS UI/UX",
    "Hardcover Book & Dust Jacket Design",
    "Prepress & Print Production (Pantone/Foil)",
    "Bespoke Typographic Hierarchy",
    "Design Token Orchestration"
  ],
  education: [
    {
      degree: "Master of Fine Arts (MFA) in Visual Communication",
      institution: "Royal College of Art / London Arts",
      year: "2016 - 2018",
      focus: "Editorial Grid Architectures & Contemporary Typography"
    },
    {
      degree: "Bachelor of Arts (BA) in Graphic & Digital Media",
      institution: "University of the Arts",
      year: "2012 - 2016",
      focus: "Brand Identity, Printmaking & Interaction Design"
    }
  ],
  certifications: [
    "Adobe Certified Expert (ACE) - InDesign & Illustrator",
    "Interaction Design Foundation (IxDF) - UX Master Certification",
    "Nielsen Norman Group - UX Architecture Specialist"
  ],
  workflow: [
    {
      step: "01",
      name: "Discover",
      tagline: "Research, Immersion & Foundation",
      description: "Deep dive into your brand ethos, target readership/user segment, competitive landscape, and functional objectives. We establish typographic moodboards and visual directions.",
      activities: [
        "Stakeholder discovery workshops",
        "Target audience psychographic mapping",
        "Typographic moodboards & visual references",
        "Technical constraints & print/digital specs"
      ],
      deliverables: ["Creative Brief Document", "Moodboard Direction Deck", "Project Timeline Roadmap"],
      duration: "1 - 2 Weeks"
    },
    {
      step: "02",
      name: "Ideate",
      tagline: "Architecture, Grids & Wireframes",
      description: "Constructing structural foundations. For magazines, we design baseline grids and column templates. For UI/UX, we map user journeys and wireframe core user flows.",
      activities: [
        "Modular grid system formulation",
        "Wireframe structural layouts",
        "Content hierarchy mapping",
        "Type scale & contrast testing"
      ],
      deliverables: ["Structural Wireframes", "Grid Blueprint Templates", "Information Architecture Schema"],
      duration: "1 - 2 Weeks"
    },
    {
      step: "03",
      name: "Design",
      tagline: "High-Fidelity Visual Craftsmanship",
      description: "Bringing the vision to life with uncompromising detail. Editorial spreads are populated with imagery and typography; digital interfaces are crafted with pixel precision.",
      activities: [
        "Full-fidelity editorial layout design",
        "Component design & state variants",
        "Color grading & photo art direction",
        "Tactile mockup creation (foil, paper, screens)"
      ],
      deliverables: ["Comprehensive Design Proofs", "Interactive Figma Prototypes", "Cover & Layout Variations"],
      duration: "2 - 3 Weeks"
    },
    {
      step: "04",
      name: "Refine",
      tagline: "Precision Tuning & Quality Review",
      description: "Rigorous refinement through collaborative client review rounds. Micro-adjusting kerning, tracking, line breaks, color profiles, accessibility contrast, and responsiveness.",
      activities: [
        "Structured feedback loops",
        "Typographic optical kerning checks",
        "Print color proofs & soft proofing",
        "Responsive breakpoint testing & usability tests"
      ],
      deliverables: ["Refined Final Proofs", "Pre-flight Validation Report", "User Testing Feedback Matrix"],
      duration: "1 Week"
    },
    {
      step: "05",
      name: "Deliver",
      tagline: "Production Ready Handoff",
      description: "Seamless transfer of production-ready assets. For print: press-ready CMYK PDFs with crop marks, bleeds, and spot color layers. For digital: clean Figma files with tokens and specs.",
      activities: [
        "Prepress file packaging & spot color setup",
        "Figma token export & developer handoff",
        "Asset generation in all required resolutions",
        "Printer liaison or launch day support"
      ],
      deliverables: ["Press-Ready PDF Packages", "Organized Figma Production Files", "Brand Styleguide / Spec Sheet"],
      duration: "Final Release"
    }
  ] as WorkflowStep[],
  testimonials: [
    {
      id: "t1",
      quote: "Prince transformed our biannual architectural journal into a collector's masterpiece. The typographic discipline, whitespace balance, and rhythm across 168 pages are simply world-class. He is the most detail-obsessed designer we've ever engaged.",
      author: "Elena Vance",
      role: "Editor-in-Chief",
      company: "Structura Monograph",
      location: "Copenhagen",
      projectType: "Magazine Design",
      year: "2025"
    },
    {
      id: "t2",
      quote: "Finding a designer who combines high-fashion editorial taste with rigorous UI/UX systems thinking is extraordinarily rare. Prince reimagined our institutional trading interface into a razor-sharp product that our clients genuinely love using.",
      author: "Marcus Sterling",
      role: "VP of Product",
      company: "Kronos Capital",
      location: "Zurich",
      projectType: "Fintech UI/UX Platform",
      year: "2025"
    },
    {
      id: "t3",
      quote: "From the embossed crimson foil business cards to our custom perfume packaging, Prince delivered an identity that commanded instant respect across Parisian luxury boutiques. The return on investment has been monumental.",
      author: "Camille Laurent",
      role: "Creative Director & Founder",
      company: "Maison de Rouge",
      location: "Paris",
      projectType: "Luxury Brand Identity",
      year: "2024"
    }
  ] as Testimonial[],
  socials: [
    { name: "Behance", url: "https://behance.net", handle: "behance.net/prince-design" },
    { name: "Dribbble", url: "https://dribbble.com", handle: "dribbble.com/prince" },
    { name: "LinkedIn", url: "https://linkedin.com", handle: "linkedin.com/in/prince-design" },
    { name: "Instagram", url: "https://instagram.com", handle: "@prince.artdirection" },
    { name: "GitHub", url: "https://github.com", handle: "github.com/princemahmud" }
  ]
};

export type PortfolioDataType = typeof PORTFOLIO_DATA;

