import React from "react";
import { ArrowLeft, Sparkles, FolderDown, Compass, Eye, ShieldCheck, Download } from "lucide-react";

interface DownloadCenterProps {
  onBack: () => void;
}

export default function DownloadCenter({ onBack }: DownloadCenterProps) {
  const PREVIEWS = [
    {
      title: "Strayzil Core Expansion Mod",
      category: "Mods",
      description: "A custom Fabric/Forge expansion adding unique decorative copper elements, obsidian gear sets, and deepslate structures natively.",
      status: "Analyzing Compatibility",
      size: "4.2 MB"
    },
    {
      title: "Obsidian Twilight Resource Pack",
      category: "Texture Packs",
      description: "An eye-safe, high-contrast dark fantasy replacement for standard UI textures. Inspired directly by our slate-deep purple visual theme.",
      status: "Rendering Textures",
      size: "18.5 MB"
    },
    {
      title: "Trial Chamber Arena World Map",
      category: "Maps",
      description: "A customized multiplayer arena set deep within a massive generated Trial Chamber, perfect for practicing combat sweeps against Breezes.",
      status: "Polishing Coordinates",
      size: "24.1 MB"
    },
    {
      title: "Breeze Wind Blast Bedrock Addon",
      category: "Addons",
      description: "Integrates wind charge knockback physics and customized trial dungeon behaviors directly into mobile Bedrock worlds seamlessly.",
      status: "Refining Behavior Packs",
      size: "1.8 MB"
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#070B19] select-none h-full relative overflow-hidden font-sans">
      {/* Decorative Cyan Background */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none z-0"></div>

      {/* Header Panel */}
      <div className="px-4 py-3 bg-[#070B19]/90 border-b border-white/5 flex items-center justify-between shrink-0 z-10 relative">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold font-mono py-1.5 cursor-pointer active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400" />
          <span>PORTAL BACK</span>
        </button>
        <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">Download Center</span>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24 z-10 relative">
        {/* Banner */}
        <div className="text-center space-y-2 p-5 bg-gradient-to-b from-cyan-500/15 via-minecraft-deep to-[#070B19] rounded-2xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(6,182,212,0.05)] mc-border-blocky">
          <div className="inline-flex p-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 text-cyan-400 mb-1">
            <FolderDown className="w-6 h-6 animate-bounce" />
          </div>
          <h2 className="text-base font-extrabold text-white font-mono tracking-wider uppercase">
            Downloads Repository
          </h2>
          <p className="text-[10px] text-white/70 max-w-[90%] mx-auto leading-relaxed font-sans">
            Curated selection of community-tested modifications, texture packs, and maps. Built to run with zero configurations required.
          </p>
        </div>

        {/* Status notice */}
        <div className="p-3.5 bg-cyan-950/20 border border-cyan-500/30 rounded-xl space-y-1">
          <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold font-mono uppercase">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span>REPOSITORY STAGING IN PROGRESS</span>
          </div>
          <p className="text-[10px] text-white/60 leading-relaxed font-sans">
            Binaries are currently locked for cloud CDN staging. The assets below represent our upcoming launch roster. They will be downloadable directly inside this panel shortly!
          </p>
        </div>

        {/* Preview List */}
        <div className="space-y-4">
          {PREVIEWS.map((asset) => (
            <div 
              key={asset.title}
              className="bg-minecraft-deep/30 border border-white/5 p-4 rounded-xl space-y-2.5 hover:border-cyan-500/20 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                  {asset.category}
                </span>
                <span className="text-[9px] font-mono text-white/30 uppercase">{asset.size}</span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wide">{asset.title}</h3>
                <p className="text-[10px] text-white/75 font-sans leading-relaxed">{asset.description}</p>
              </div>

              {/* Status footer with mock button */}
              <div className="pt-2.5 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[9px] font-mono text-cyan-400 font-bold uppercase">
                  <Compass className="w-3.5 h-3.5 animate-spin" />
                  <span>Status: {asset.status}</span>
                </div>

                <button
                  disabled
                  className="px-2.5 py-1 bg-white/5 border border-white/10 text-white/30 font-mono font-bold text-[9px] uppercase rounded flex items-center gap-1 cursor-not-allowed"
                >
                  <Download className="w-3 h-3" />
                  <span>LOCKED</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/10 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <p className="text-[9px] text-cyan-300/60 leading-relaxed font-mono">
            *All forthcoming downloads are curated and signed. StrayzilBase runs malware scanning protocols to guarantee safe offline loading on your devices.
          </p>
        </div>
      </div>
    </div>
  );
}
