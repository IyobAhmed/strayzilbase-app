import React from "react";
import { ArrowLeft, Sparkles, Youtube, Mail, Info, ShieldAlert } from "lucide-react";

interface AboutPageProps {
  onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="flex-1 flex flex-col bg-[#070B19] select-none h-full relative overflow-hidden font-sans">
      {/* Decorative Gold Light Flare */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none z-0"></div>

      {/* Header Panel */}
      <div className="px-4 py-3 bg-[#070B19]/90 border-b border-white/5 flex items-center justify-between shrink-0 z-10 relative">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold font-mono py-1.5 cursor-pointer active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>PORTAL BACK</span>
        </button>
        <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase tracking-wider">About App</span>
      </div>

      {/* Content scroll area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24 z-10 relative">
        
        {/* Large Logo Block */}
        <div className="text-center py-6 space-y-3 bg-gradient-to-b from-amber-500/15 via-minecraft-deep to-[#070B19] rounded-2xl border border-amber-500/30 shadow-2xl mc-border-blocky">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto text-slate-950 font-black text-2xl font-mono border-2 border-white/20 shadow-inner">
            SZ
          </div>
          <div className="space-y-1">
            <h1 className="text-lg font-black text-white font-mono tracking-widest uppercase">StrayzilBase</h1>
            <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 rounded uppercase tracking-widest">
              Version 0.1 Launch Edition
            </span>
          </div>
        </div>

        {/* Development Spec sheet */}
        <div className="bg-minecraft-deep/30 border border-white/5 p-4 rounded-xl space-y-3">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-white/40 uppercase tracking-wide border-b border-white/5 pb-1.5">
            <Info className="w-4 h-4 text-amber-400" />
            <span>Developer Specifications</span>
          </div>

          <div className="space-y-2.5 font-mono text-[10px] text-white/80">
            <div className="flex justify-between">
              <span className="text-white/40 uppercase">Architecture</span>
              <span className="text-white">Full-Stack Offline Staging</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 uppercase">Chief Developer</span>
              <span className="text-amber-400 font-bold">Strayzil</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 uppercase">Framework Target</span>
              <span className="text-white">React 18 + Vite Engine</span>
            </div>
            <div className="flex justify-between">
              <span className="text-white/40 uppercase">CSS styling</span>
              <span className="text-white">Tailwind CSS Standard</span>
            </div>
          </div>
        </div>

        {/* Core Mission statement block */}
        <div className="bg-[#0c1630] border-l-4 border-amber-500 p-4 rounded-xl space-y-2 text-left shadow-lg">
          <span className="text-[9px] font-mono text-amber-400 font-black uppercase tracking-widest">Strayzil Mission Declaration</span>
          <blockquote className="text-xs text-white/95 leading-relaxed font-sans italic">
            "Build one of the best Minecraft community platforms, creating spaces for builders, redstone engineers, survival experts, and content fans to thrive together."
          </blockquote>
        </div>

        {/* Action Panel */}
        <div className="space-y-2.5 pt-1">
          <a
            href="https://youtube.com/@strayzil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono font-black text-xs uppercase rounded-xl flex items-center justify-center gap-2 shadow-[0_6px_20px_rgba(225,29,72,0.3)] transition-transform active:translate-y-0.5"
          >
            <Youtube className="w-4.5 h-4.5 fill-white" />
            <span className="tracking-widest">Official YouTube Portal</span>
          </a>

          <a
            href="mailto:strayzilent@gmail.com"
            className="w-full py-3 bg-slate-900/80 border border-white/10 hover:border-white/20 text-white/95 font-mono font-bold text-xs uppercase rounded-xl flex items-center justify-center gap-2 transition-transform active:translate-y-0.5"
          >
            <Mail className="w-4.5 h-4.5" />
            <span className="tracking-wider">Submit feedback (strayzilent@gmail.com)</span>
          </a>
        </div>

        {/* Plaque disclaimer */}
        <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-[9px] text-amber-300/50 leading-relaxed font-mono">
            StrayzilBase is a non-commercial community companion launcher. All trademark rights of Minecraft belong to Mojang Studios & Microsoft.
          </p>
        </div>

      </div>
    </div>
  );
}
