import React, { useEffect, useRef, useState } from 'react';

export interface AdobeApp {
  id: string;
  name: string;
  abbreviation: string;
  category: string;
  color: string;
  bgColor: string;
  borderColor: string;
  glowColor: string;
}

export const ADOBE_APPS: AdobeApp[] = [
  {
    id: 'ps',
    name: 'Adobe Photoshop',
    abbreviation: 'Ps',
    category: 'Raster & Photo VFX',
    color: '#31a8ff',
    bgColor: '#001e36',
    borderColor: '#31a8ff',
    glowColor: 'rgba(49, 168, 255, 0.75)',
  },
  {
    id: 'ai',
    name: 'Adobe Illustrator',
    abbreviation: 'Ai',
    category: 'Vector & Brand Identity',
    color: '#ff9a00',
    bgColor: '#331400',
    borderColor: '#ff9a00',
    glowColor: 'rgba(255, 154, 0, 0.75)',
  },
  {
    id: 'id',
    name: 'Adobe InDesign',
    abbreviation: 'Id',
    category: 'Editorial & Magazine Layout',
    color: '#ff3366',
    bgColor: '#330014',
    borderColor: '#ff3366',
    glowColor: 'rgba(255, 51, 102, 0.8)',
  },
  {
    id: 'pr',
    name: 'Adobe Premiere Pro',
    abbreviation: 'Pr',
    category: 'Cinematic Video Editing',
    color: '#ea77ff',
    bgColor: '#260033',
    borderColor: '#ea77ff',
    glowColor: 'rgba(234, 119, 255, 0.75)',
  },
  {
    id: 'ae',
    name: 'Adobe After Effects',
    abbreviation: 'Ae',
    category: 'VFX & Motion Graphics',
    color: '#9999ff',
    bgColor: '#140033',
    borderColor: '#9999ff',
    glowColor: 'rgba(153, 153, 255, 0.75)',
  },
  {
    id: 'lr',
    name: 'Adobe Lightroom',
    abbreviation: 'Lr',
    category: 'Color Mastery & Tone',
    color: '#31a8ff',
    bgColor: '#001e36',
    borderColor: '#31a8ff',
    glowColor: 'rgba(49, 168, 255, 0.75)',
  },
  {
    id: 'xd',
    name: 'Adobe XD',
    abbreviation: 'Xd',
    category: 'UI/UX Interactive Systems',
    color: '#ff61f6',
    bgColor: '#330026',
    borderColor: '#ff61f6',
    glowColor: 'rgba(255, 97, 246, 0.75)',
  },
  {
    id: 'cc',
    name: 'Creative Cloud',
    abbreviation: 'Cc',
    category: 'Master Creative Suite',
    color: '#e50914',
    bgColor: '#330005',
    borderColor: '#e50914',
    glowColor: 'rgba(229, 9, 20, 0.85)',
  },
];

interface AdobeOrbitRingProps {
  children: React.ReactNode;
}

export const AdobeOrbitRing: React.FC<AdobeOrbitRingProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeApp, setActiveApp] = useState<AdobeApp | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Animation angle state stored in ref for 60/120 FPS buttery smooth transforms without re-rendering
  const angleRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  isPausedRef.current = isPaused;

  const [yOffset, setYOffset] = useState(55);

  useEffect(() => {
    const handleResize = () => {
      setYOffset(window.innerWidth < 640 ? 38 : 55);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();
    // Speed of revolution in radians per second (~20 seconds for full 360 degree 3D orbit)
    const speed = 0.32;

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      if (!isPausedRef.current) {
        angleRef.current = (angleRef.current + speed * delta) % (Math.PI * 2);
      }

      const isMobile = window.innerWidth < 640;
      // Orbit ellipse radii
      // Horizontal radius scaled for mobile screen widths to eliminate overflow
      const Rx = isMobile ? 155 : 255;
      // Vertical radius for 3D perspective depth
      const Ry = isMobile ? 65 : 105;
      // Vertical center offset to position orbit lower around photo
      const yCenterOffset = isMobile ? 32 : 55;
      // Inclination tilt angle of the 3D orbital plane (-15 degrees)
      const tiltAngle = -0.26; // ~ -15 degrees in radians
      const cosTilt = Math.cos(tiltAngle);
      const sinTilt = Math.sin(tiltAngle);

      const totalItems = ADOBE_APPS.length;
      const angleStep = (Math.PI * 2) / totalItems;

      ADOBE_APPS.forEach((app, i) => {
        const el = itemsRef.current[i];
        if (!el) return;

        // Current angle for this specific Adobe app
        const theta = angleRef.current + i * angleStep;

        const u = Math.cos(theta);
        const v = Math.sin(theta); // Depth parameter along orbit

        // Unrotated coordinates
        const x0 = Rx * u;
        const y0 = Ry * v;

        // Tilted orbit coordinates
        const x = x0 * cosTilt - y0 * sinTilt;
        const y = x0 * sinTilt + y0 * cosTilt;

        // v represents depth:
        // When v >= 0: In FRONT of the portrait card
        // When v < 0: In BACK (BEHIND) the portrait card
        const isFront = v >= 0;

        // Smooth scale: 0.72 (farthest behind) to 1.15 (closest in front)
        const scale = isFront ? 0.92 + 0.23 * v : 0.72 + 0.20 * (v + 1);

        // Smooth opacity: 0.55 (farthest behind) to 1.0 (in front)
        const opacity = isFront ? 1.0 : 0.55 + 0.35 * (v + 1);

        // Z-Index: 5 when behind the portrait card (card has z-20), 35 when in front!
        const zIndex = isFront ? 35 : 5;

        // Apply direct style transforms without causing React re-renders, shifted lower by yCenterOffset
        el.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y + yCenterOffset}px), 0) scale(${scale})`;
        el.style.zIndex = `${zIndex}`;
        el.style.opacity = `${opacity}`;
      });

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[270px] sm:max-w-sm md:max-w-md flex items-center justify-center"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        setActiveApp(null);
      }}
    >
      {/* 3D Tilted Orbital Rings (Visual Halo Path shifted lower) */}
      {/* 1. Back Ring Halo (Behind Photo, z-4) */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center z-[4]"
        style={{ transform: `translate3d(0, ${yOffset}px, 0) rotate(-15deg)` }}
      >
        <div className="w-[125%] sm:w-[135%] h-[58%] rounded-[50%] border border-[#e50914]/20 border-dashed shadow-[0_0_30px_rgba(229,9,20,0.15)] [mask-image:linear-gradient(to_bottom,#000_30%,transparent_70%)]"></div>
      </div>

      {/* 2. Front Ring Halo (In Front of Photo, z-30) */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center z-[30]"
        style={{ transform: `translate3d(0, ${yOffset}px, 0) rotate(-15deg)` }}
      >
        <div className="w-[125%] sm:w-[135%] h-[58%] rounded-[50%] border-t-2 border-b-0 border-l border-r border-[#e50914]/40 shadow-[0_0_35px_rgba(229,9,20,0.25)] [mask-image:linear-gradient(to_top,#000_40%,transparent_100%)]"></div>
      </div>

      {/* The 8 Orbiting 3D Adobe Software Logos */}
      {ADOBE_APPS.map((app, index) => (
        <div
          key={app.id}
          ref={(el) => {
            itemsRef.current[index] = el;
          }}
          className="absolute top-1/2 left-1/2 pointer-events-auto cursor-pointer select-none transition-shadow duration-300 group"
          style={{
            transform: 'translate3d(-50%, -50%, 0) scale(0.9)',
            zIndex: 5,
          }}
          onMouseEnter={() => setActiveApp(app)}
        >
          {/* Logo Badge Container */}
          <div
            className="relative flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border sm:border-2 transition-transform duration-300 group-hover:scale-125"
            style={{
              backgroundColor: '#0a0a0c',
              borderColor: app.borderColor,
              boxShadow: `0 8px 24px rgba(0,0,0,0.9), 0 0 18px ${app.glowColor}`,
            }}
          >
            {/* Glossy Top Glass Highlight */}
            <div className="absolute inset-x-1 top-0.5 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-lg pointer-events-none"></div>

            {/* Adobe Software Monogram */}
            <span
              className="font-black text-xs sm:text-base tracking-tight font-sans"
              style={{
                color: app.color,
                textShadow: `0 0 12px ${app.color}`,
              }}
            >
              {app.abbreviation}
            </span>

            {/* Active Orbit Pulse Glow */}
            <div
              className="absolute -inset-1 rounded-2xl opacity-40 blur-md pointer-events-none"
              style={{ backgroundColor: app.color }}
            ></div>
          </div>

          {/* Hover Tooltip Card */}
          <div className="absolute left-1/2 -bottom-11 -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50 whitespace-nowrap">
            <div className="px-2.5 py-1 rounded-md bg-zinc-950/95 border border-zinc-800 text-[10px] font-mono text-zinc-200 shadow-xl flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: app.color }}
              ></span>
              <span className="font-bold text-white">{app.name}</span>
              <span className="text-zinc-500">·</span>
              <span className="text-zinc-400">{app.category}</span>
            </div>
          </div>
        </div>
      ))}

      {/* Main Center Content: Prince's Portrait Card (z-20) */}
      <div className="relative z-20 w-full">{children}</div>
    </div>
  );
};
