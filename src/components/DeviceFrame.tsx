import React from "react";
import { Smartphone } from "lucide-react";

interface DeviceFrameProps {
  children: React.ReactNode;
}

export default function DeviceFrame({ children }: DeviceFrameProps) {
  return (
    <div className="min-h-screen bg-minecraft-dark flex flex-col items-center justify-center p-0 md:p-6 select-none font-sans overflow-x-hidden transition-colors duration-300">
      {/* Decorative Minecraft-inspired background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-20">
        <div className="absolute top-[10%] left-[15%] w-12 h-12 bg-minecraft-light blur-[80px]"></div>
        <div className="absolute bottom-[20%] right-[10%] w-24 h-24 bg-minecraft-cyan blur-[120px]"></div>
        <div className="absolute top-[50%] right-[30%] w-16 h-16 bg-minecraft-blue blur-[90px]"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-md md:max-w-[430px] h-screen md:h-[860px] md:rounded-[48px] md:border-[10px] md:border-slate-800 md:shadow-[0_25px_60px_-15px_rgba(2,6,23,0.95),0_0_0_2px_rgba(56,189,248,0.15)] bg-minecraft-dark flex flex-col overflow-hidden transition-all duration-300">
        
        {/* Physical Camera Notch/Speaker */}
        <div className="hidden md:flex absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-slate-800 rounded-b-2xl z-50 items-center justify-center">
          <div className="w-12 h-1 bg-minecraft-dark rounded-full mr-4"></div>
          <div className="w-2.5 h-2.5 bg-minecraft-dark rounded-full border border-slate-700"></div>
        </div>

        {/* Content Viewport */}
        <div className="flex-1 w-full flex flex-col overflow-hidden relative bg-minecraft-dark pt-0">
          {children}
        </div>

        {/* Android Native-Style Bottom Navigation Pill */}
        <div className="w-full h-5 bg-minecraft-dark flex items-center justify-center pb-2 pt-1 z-40">
          <div className="w-32 h-1.5 bg-white/20 rounded-full"></div>
        </div>
      </div>

      {/* Desktop App branding footer */}
      <div className="hidden md:flex items-center gap-2 mt-4 text-xs text-white/40 z-10">
        <Smartphone className="w-4 h-4 text-minecraft-cyan/50" />
        <span>StrayzilBase v0.1 Mobile Sandbox</span>
        <span className="text-white/20">•</span>
        <span className="text-minecraft-cyan/50 font-semibold font-mono">Android-First Viewport</span>
      </div>
    </div>
  );
}
