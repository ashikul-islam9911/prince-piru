import React from 'react';

export const CreativeWorkspaceBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
      
      {/* Deep Obsidian Black Base */}
      <div className="absolute inset-0 bg-[#070709]"></div>

      {/* Dramatic Crimson Ambient Light Nebula (Red & Black Theme) */}
      {/* 1. Top-Left Crimson Glow */}
      <div className="absolute -top-32 -left-32 w-[38rem] h-[38rem] sm:w-[50rem] sm:h-[50rem] bg-[#e50914]/14 rounded-full blur-[160px] animate-crimson-pulse"></div>
      
      {/* 2. Center-Right Crimson Focal Backlight for Hero Portrait */}
      <div className="absolute top-1/4 right-[5%] sm:right-[15%] w-[34rem] h-[34rem] sm:w-[46rem] sm:h-[46rem] bg-[#e50914]/16 rounded-full blur-[170px]"></div>

      {/* 3. Bottom Subtle Deep Crimson Grounding Fog */}
      <div className="absolute -bottom-28 left-1/3 w-[40rem] h-[30rem] bg-[#a0000f]/10 rounded-full blur-[180px]"></div>

      {/* Modernist Geometric Grid Lines with Smooth Radial Fade */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a12_1px,transparent_1px),linear-gradient(to_bottom,#27272a12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_45%,#000_65%,transparent_100%)]"></div>

      {/* Cinematic Vignette (Darkening Corners to Pure Obsidian Black) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#070709_100%)] opacity-80"></div>

      {/* Large Typography Watermark (Clean, Subtle, Editorial) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center opacity-[0.03] tracking-widest font-black uppercase text-[15vw] leading-none whitespace-nowrap text-white font-['Syne',sans-serif]">
        PORTFOLIO
      </div>

      {/* Subtle Red Horizon Flare Line */}
      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e50914]/20 to-transparent"></div>

    </div>
  );
};
