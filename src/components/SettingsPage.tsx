import React, { useState } from "react";
import { ArrowLeft, Sliders, Palette, ZoomIn, Eye, RefreshCw, Info, Youtube, Mail, Check, AlertTriangle, ShieldCheck } from "lucide-react";
import { LocalDataService } from "../services/dataService";

interface SettingsPageProps {
  onBack: () => void;
  activeTheme: string;
  onThemeChange: (theme: string) => void;
}

export default function SettingsPage({ onBack, activeTheme, onThemeChange }: SettingsPageProps) {
  // Local state persisted in localStorage
  const [accent, setAccent] = useState(() => localStorage.getItem("strayzil_accent") || "cyan");
  const [fontSize, setFontSize] = useState(() => localStorage.getItem("strayzil_font_size") || "normal");
  const [animations, setAnimations] = useState(() => localStorage.getItem("strayzil_animations") !== "false");
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleAccentChange = (color: string) => {
    setAccent(color);
    localStorage.setItem("strayzil_accent", color);
    // Custom global dispatch event to notify other components to refresh color borders
    window.dispatchEvent(new Event("accent_changed"));
  };

  const handleFontSizeChange = (size: string) => {
    setFontSize(size);
    localStorage.setItem("strayzil_font_size", size);
    
    // Apply class to document body
    document.documentElement.classList.remove("text-sz-small", "text-sz-normal", "text-sz-large", "text-sz-xlarge");
    if (size === "large") {
      document.documentElement.classList.add("text-sz-large");
    } else if (size === "xlarge") {
      document.documentElement.classList.add("text-sz-xlarge");
    } else {
      document.documentElement.classList.add("text-sz-normal");
    }
  };

  const toggleAnimations = () => {
    const val = !animations;
    setAnimations(val);
    localStorage.setItem("strayzil_animations", val ? "true" : "false");
  };

  const handleResetData = () => {
    localStorage.clear();
    LocalDataService.initialize();
    
    setShowConfirmReset(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      window.location.reload(); // Refresh to reload fresh default seeded items
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#070B19] select-none h-full relative overflow-hidden font-sans">
      {/* Decorative Cyan Gradient */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none z-0"></div>

      {/* Header Panel */}
      <div className="px-4 py-3 bg-[#070B19]/90 border-b border-white/5 flex items-center justify-between shrink-0 z-10 relative">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold font-mono py-1.5 cursor-pointer active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 text-sky-400" />
          <span>PORTAL BACK</span>
        </button>
        <span className="text-[10px] font-mono text-sky-400 font-semibold uppercase tracking-wider">System Settings</span>
      </div>

      {/* Main Panel Content Scroll */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24 z-10 relative">
        
        {/* Toast confirmation */}
        {showSuccessToast && (
          <div className="fixed top-12 left-1/2 transform -translate-x-1/2 bg-sky-500 text-slate-950 font-mono font-bold text-xs py-2 px-4 rounded-xl shadow-2xl z-50 flex items-center gap-1.5 border border-sky-400">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Database Factory Reset Complete! Reloading...</span>
          </div>
        )}

        {/* SECTION 1: VISUAL THEME SELECTOR */}
        <div className="bg-minecraft-deep/30 border border-white/5 p-4 rounded-2xl space-y-3.5 text-left">
          <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5 text-sky-400" />
            <span>App Visual Theme</span>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {/* Slate */}
            <button
              onClick={() => onThemeChange("slate")}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                activeTheme === "slate"
                  ? "bg-slate-900/60 border-sky-500/40 text-sky-400"
                  : "bg-black/10 border-white/5 text-white/40 hover:bg-black/20"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-slate-950 border border-sky-400/40 flex items-center justify-center">
                {activeTheme === "slate" && <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />}
              </div>
              <span className="text-[9px] font-mono uppercase font-semibold">Slate</span>
            </button>

            {/* Deep Night */}
            <button
              onClick={() => onThemeChange("deepnight")}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                activeTheme === "deepnight"
                  ? "bg-purple-950/40 border-purple-500/40 text-purple-400"
                  : "bg-black/10 border-white/5 text-white/40 hover:bg-black/20"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-[#050110] border border-purple-500/40 flex items-center justify-center">
                {activeTheme === "deepnight" && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
              </div>
              <span className="text-[9px] font-mono uppercase font-semibold">Deep Night</span>
            </button>

            {/* Light Mode */}
            <button
              onClick={() => onThemeChange("light")}
              className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                activeTheme === "light"
                  ? "bg-white border-sky-500/40 text-sky-600 font-bold"
                  : "bg-black/10 border-white/5 text-white/40 hover:bg-black/20"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white border border-sky-400 flex items-center justify-center">
                {activeTheme === "light" && <div className="w-2.5 h-2.5 rounded-full bg-sky-500" />}
              </div>
              <span className="text-[9px] font-mono uppercase font-semibold">Light</span>
            </button>
          </div>
        </div>

        {/* SECTION 2: ACCENT COLOR SELECTION */}
        <div className="bg-minecraft-deep/30 border border-white/5 p-4 rounded-2xl space-y-3.5 text-left">
          <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-wider">
            <Palette className="w-3.5 h-3.5 text-sky-400" />
            <span>Accent Highlight Color</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            {/* Cyan */}
            <button
              onClick={() => handleAccentChange("cyan")}
              className={`p-2 rounded-lg border flex flex-col items-center gap-1.5 cursor-pointer ${
                accent === "cyan" ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400" : "bg-black/10 border-white/5 text-white/40"
              }`}
            >
              <div className="w-3.5 h-3.5 rounded bg-cyan-400" />
              <span className="text-[8px] font-mono uppercase">Cyan</span>
            </button>

            {/* Emerald */}
            <button
              onClick={() => handleAccentChange("emerald")}
              className={`p-2 rounded-lg border flex flex-col items-center gap-1.5 cursor-pointer ${
                accent === "emerald" ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400" : "bg-black/10 border-white/5 text-white/40"
              }`}
            >
              <div className="w-3.5 h-3.5 rounded bg-emerald-400" />
              <span className="text-[8px] font-mono uppercase">Emerald</span>
            </button>

            {/* Gold */}
            <button
              onClick={() => handleAccentChange("gold")}
              className={`p-2 rounded-lg border flex flex-col items-center gap-1.5 cursor-pointer ${
                accent === "gold" ? "bg-amber-500/10 border-amber-500/40 text-amber-400" : "bg-black/10 border-white/5 text-white/40"
              }`}
            >
              <div className="w-3.5 h-3.5 rounded bg-amber-400" />
              <span className="text-[8px] font-mono uppercase">Gold</span>
            </button>

            {/* Rose */}
            <button
              onClick={() => handleAccentChange("rose")}
              className={`p-2 rounded-lg border flex flex-col items-center gap-1.5 cursor-pointer ${
                accent === "rose" ? "bg-rose-500/10 border-rose-500/40 text-rose-400" : "bg-black/10 border-white/5 text-white/40"
              }`}
            >
              <div className="w-3.5 h-3.5 rounded bg-rose-400" />
              <span className="text-[8px] font-mono uppercase">Rose</span>
            </button>
          </div>
        </div>

        {/* SECTION 3: FONT SIZE CONFIGURATION */}
        <div className="bg-minecraft-deep/30 border border-white/5 p-4 rounded-2xl space-y-3.5 text-left">
          <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-wider">
            <ZoomIn className="w-3.5 h-3.5 text-sky-400" />
            <span>App Interface Font Size</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleFontSizeChange("normal")}
              className={`p-2 rounded-lg border font-mono text-[10px] cursor-pointer ${
                fontSize === "normal" ? "bg-sky-500/10 border-sky-500/30 text-sky-400 font-bold" : "bg-black/10 border-white/5 text-white/40"
              }`}
            >
              Normal (12px)
            </button>
            <button
              onClick={() => handleFontSizeChange("large")}
              className={`p-2 rounded-lg border font-mono text-[10px] cursor-pointer ${
                fontSize === "large" ? "bg-sky-500/10 border-sky-500/30 text-sky-400 font-bold" : "bg-black/10 border-white/5 text-white/40"
              }`}
            >
              Large (14px)
            </button>
            <button
              onClick={() => handleFontSizeChange("xlarge")}
              className={`p-2 rounded-lg border font-mono text-[10px] cursor-pointer ${
                fontSize === "xlarge" ? "bg-sky-500/10 border-sky-500/30 text-sky-400 font-bold" : "bg-black/10 border-white/5 text-white/40"
              }`}
            >
              Larger (16px)
            </button>
          </div>
        </div>

        {/* SECTION 4: SYSTEM CONTROLS (Animations & Factory Reset) */}
        <div className="bg-minecraft-deep/30 border border-white/5 p-4 rounded-2xl space-y-3 text-left">
          <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5 text-sky-400" />
            <span>Diagnostic System Controls</span>
          </div>

          {/* Toggle animations checkbox */}
          <div className="flex items-center justify-between py-1.5 border-b border-white/5 font-mono text-[10px] text-white/80">
            <span>INTERFACE LAYOUT TRANSITIONS</span>
            <button
              onClick={toggleAnimations}
              className={`px-3 py-1 rounded text-[9px] font-bold uppercase transition-all ${
                animations ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30" : "bg-white/5 text-white/40 border border-white/10"
              }`}
            >
              {animations ? "ENABLED" : "DISABLED"}
            </button>
          </div>

          {/* Factory Reset button */}
          <div className="pt-2">
            {!showConfirmReset ? (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="w-full py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-mono font-bold text-[10px] uppercase tracking-wider rounded-xl border border-rose-500/20 flex items-center justify-center gap-1.5 cursor-pointer active:translate-y-0.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>FACTORY RESET CACHED DATA</span>
              </button>
            ) : (
              <div className="p-3 bg-rose-950/20 rounded-xl border border-rose-500/30 space-y-3 animate-fade-in text-center">
                <div className="flex items-center justify-center gap-1.5 text-rose-400 text-[10px] font-mono font-bold uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  <span>WARNING: IRREVERSIBLE OPERATION</span>
                </div>
                <p className="text-[10px] text-white/60 leading-relaxed font-sans pl-1">
                  This wipes all custom seeds, build showcases, custom supporter details, and restores default factory seed templates. Proceed?
                </p>
                <div className="flex gap-2 justify-center font-mono">
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="px-3 py-1 bg-white/5 hover:bg-white/10 text-white text-[9px] uppercase rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleResetData}
                    className="px-3 py-1 bg-rose-500 text-slate-950 text-[9px] uppercase rounded font-bold"
                  >
                    Yes, Wipe Data
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* SECTION 5: ABOUT APP SPECS */}
        <div className="bg-minecraft-deep/30 border border-white/5 p-4 rounded-2xl space-y-4 text-left">
          <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-wider border-b border-white/5 pb-2">
            <Info className="w-3.5 h-3.5 text-sky-400" />
            <span>About Companion Software</span>
          </div>

          <div className="space-y-3 font-mono text-xs text-white/80">
            <div className="grid grid-cols-2 gap-1 py-1 border-b border-white/5 text-[10px]">
              <span className="text-white/40 uppercase">App Name</span>
              <span className="text-white font-bold text-right">StrayzilBase</span>
            </div>
            <div className="grid grid-cols-2 gap-1 py-1 border-b border-white/5 text-[10px]">
              <span className="text-white/40 uppercase">Developer</span>
              <span className="text-white font-bold text-right">Strayzil</span>
            </div>
            <div className="grid grid-cols-2 gap-1 py-1 border-b border-white/5 text-[10px]">
              <span className="text-white/40 uppercase">Software Version</span>
              <span className="text-sky-400 font-bold text-right">0.1 Launch Edition</span>
            </div>
            <div className="grid grid-cols-2 gap-1 py-1 border-b border-white/5 text-[10px]">
              <span className="text-white/40 uppercase">Strayzil Mission</span>
              <span className="text-white text-right font-sans text-[10px] leading-relaxed">
                "Build one of the best Minecraft community platforms."
              </span>
            </div>
          </div>

          {/* Social CTAs */}
          <div className="space-y-2 pt-1">
            <a
              href="https://youtube.com/@strayzil"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-mono font-bold text-[10px] uppercase rounded-xl flex items-center justify-center gap-1.5 shadow-[0_4px_15px_rgba(225,29,72,0.2)] transition-transform active:translate-y-0.5"
            >
              <Youtube className="w-4 h-4 fill-white" />
              <span>Visit Official Channel</span>
            </a>

            <a
              href="mailto:strayzilent@gmail.com"
              className="w-full py-2 bg-slate-900/80 border border-white/10 hover:border-white/20 text-white/90 font-mono font-bold text-[10px] uppercase rounded-xl flex items-center justify-center gap-1.5 transition-transform active:translate-y-0.5"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Strayzil Direct</span>
            </a>
          </div>
        </div>

        {/* Footnote */}
        <div className="p-3 bg-sky-500/5 rounded-lg border border-sky-500/10 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
          <p className="text-[9px] text-sky-300/60 leading-relaxed font-mono">
            StrayzilBase guarantees absolute security, privacy, and full offline caching functionality with zero client trackers.
          </p>
        </div>

      </div>
    </div>
  );
}
