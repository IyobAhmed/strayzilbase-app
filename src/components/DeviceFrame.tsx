import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
}

export default function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <div className="min-h-screen w-full bg-minecraft-dark flex flex-col relative font-sans overflow-hidden transition-colors duration-300">
      {/* Decorative Minecraft-inspired background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-10">
        <div className="absolute top-[10%] left-[15%] w-12 h-12 bg-minecraft-light blur-[80px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-24 h-24 bg-minecraft-cyan blur-[120px]"></div>
        <div className="absolute top-[50%] right-[30%] w-16 h-16 bg-minecraft-blue blur-[90px]"></div>
      </div>

      {/* Main Container - Full Viewport */}
      <div className="relative z-10 w-full flex-1 flex flex-col overflow-hidden bg-minecraft-dark">
        {children}
      </div>
    </div>
  );
}
