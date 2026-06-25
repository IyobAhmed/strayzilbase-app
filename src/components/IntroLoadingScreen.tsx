import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Hammer, Blocks, Sparkles, Play } from "lucide-react";

interface IntroLoadingScreenProps {
  onFinished: () => void;
  activeTheme?: string;
}

const SPLASH_TEXTS = [
  "Don't dig straight down!",
  "The Creaking is watching you!",
  "Mace is overpowered!",
  "Agnes approved!",
  "Vu Bui's favorite!",
  "100% Voxel Polish!",
  "Redstone-powered!",
  "Watch out for Creepers!",
  "Bundles are finally here!",
  "The longest pass@admin123!"
];

const STAGES = [
  { progress: 10, text: "Locating Stronghold..." },
  { progress: 28, text: "Generating Pale Garden..." },
  { progress: 45, text: "Summoning The Creaking..." },
  { progress: 62, text: "Loading StrayzilBase assets..." },
  { progress: 80, text: "Waxing Copper Bulbs..." },
  { progress: 95, text: "Entering the Overworld..." },
  { progress: 100, text: "Server Connection Secure!" }
];

export default function IntroLoadingScreen({ onFinished, activeTheme = "slate" }: IntroLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);
  const [splash, setSplash] = useState("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Select random splash text
    const randomSplash = SPLASH_TEXTS[Math.floor(Math.random() * SPLASH_TEXTS.length)];
    setSplash(randomSplash);

    // Slower, dramatic loading sequence
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Much smaller incremental steps to make it a bit slower and suspenseful
      const increment = Math.floor(Math.random() * 5) + 3;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      // Find the appropriate loading text stage
      const matchingStageIndex = STAGES.findIndex(s => currentProgress <= s.progress);
      if (matchingStageIndex !== -1) {
        setStageIndex(matchingStageIndex);
      } else {
        setStageIndex(STAGES.length - 1);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        // Show the "Create World" trigger button instead of auto-directing
        setIsReady(true);
      }
    }, 120); // Perfectly calibrated slower pace

    return () => clearInterval(interval);
  }, []);

  const isLight = activeTheme === "light";
  const isDeepNight = activeTheme === "deepnight";

  // Dynamic Styles Mapping
  const bgClass = isLight 
    ? "bg-[#F3F4F6]" 
    : isDeepNight 
      ? "bg-[#03010A]" 
      : "bg-[#070B19]";

  const textPrimary = isLight ? "text-slate-950 font-bold" : "text-white";
  const textSecondary = isLight ? "text-slate-600 font-medium" : "text-slate-400";
  const labelSecondary = isLight ? "text-slate-500" : "text-slate-500";
  const borderCol = isLight ? "border-slate-300" : "border-slate-800";
  
  const accentText = isLight 
    ? "text-emerald-600" 
    : isDeepNight 
      ? "text-fuchsia-400" 
      : "text-sky-400";

  const progressBg = isLight 
    ? "bg-slate-200 border-slate-300" 
    : "bg-slate-950 border-slate-800";

  const progressBarGradient = isLight
    ? "from-emerald-600 to-emerald-400"
    : isDeepNight
      ? "from-fuchsia-600 to-purple-500"
      : "from-sky-600 to-sky-400";

  // Floating particles matching theme
  const particle1Color = isLight ? "bg-amber-400/20" : isDeepNight ? "bg-fuchsia-500/20" : "bg-sky-500/20";
  const particle2Color = isLight ? "bg-emerald-400/20" : isDeepNight ? "bg-purple-500/20" : "bg-indigo-500/20";

  return (
    <div className={`absolute inset-0 ${bgClass} z-50 flex flex-col items-center justify-center p-6 select-none overflow-hidden font-sans transition-colors duration-500`}>
      {/* Dynamic theme-aware glowing ambient particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className={`absolute top-[20%] left-[20%] w-36 h-36 ${particle1Color} rounded-full blur-[100px] animate-pulse`}></div>
        <div className={`absolute bottom-[20%] right-[20%] w-36 h-36 ${particle2Color} rounded-full blur-[100px] animate-pulse`}></div>
      </div>

      {/* Main Logo container */}
      <div className="relative flex flex-col items-center gap-2 mb-12">
        {/* Animated glowing voxel cube logo */}
        <motion.div
          animate={{
            rotateY: [0, 180, 360],
            y: [0, -8, 0]
          }}
          transition={{
            rotateY: { repeat: Infinity, duration: 5, ease: "linear" },
            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
          }}
          className={`w-16 h-16 rounded-lg shadow-[inset_0_-8px_0_rgba(0,0,0,0.25)] flex items-center justify-center border-2 relative ${
            isLight 
              ? "bg-emerald-500 border-emerald-400 text-white" 
              : isDeepNight 
                ? "bg-fuchsia-600 border-fuchsia-400 text-white" 
                : "bg-sky-500 border-sky-400 text-slate-950"
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          <span className="text-4xl font-black font-mono">S</span>
          {/* Inner particle sparkles */}
          <Sparkles className="w-4 h-4 text-white absolute top-1 right-1 animate-ping" />
        </motion.div>

        {/* Title text */}
        <div className="text-center mt-3 z-10">
          <h1 className={`text-2xl font-black tracking-wider uppercase font-mono ${textPrimary}`}>
            STRAYZIL<span className={accentText}>BASE</span>
          </h1>
          <p className={`text-[10px] font-mono tracking-widest uppercase mt-0.5 ${accentText}`}>Companion Portal</p>
        </div>

        {/* Minecraft Yellow Splash Text that pops/swings */}
        <motion.div
          animate={{ scale: [0.95, 1.15, 0.95] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="absolute -bottom-6 -right-6 bg-yellow-400 text-slate-950 text-[10px] font-extrabold uppercase py-1 px-2.5 rounded shadow-lg border border-yellow-300 font-sans tracking-tight whitespace-nowrap transform rotate-[-8deg] z-20"
        >
          {splash}
        </motion.div>
      </div>

      {/* Voxel Loading Status Bar / Interactive Create World Section */}
      <div className="w-full max-w-[280px] space-y-4 z-10 text-center min-h-[90px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!isReady ? (
            <motion.div
              key="loading-bar-group"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              {/* Loading stage text */}
              <motion.p
                key={stageIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-[10px] font-mono tracking-wider h-4 ${textSecondary}`}
              >
                {STAGES[stageIndex]?.text || "Generating World..."}
              </motion.p>

              {/* Outer progress border */}
              <div className={`w-full h-4 rounded border-2 p-0.5 overflow-hidden flex ${progressBg}`}>
                {/* Inner segmented loader */}
                <div
                  className={`h-full bg-gradient-to-r ${progressBarGradient} rounded-sm shadow-[inset_0_-1px_0_rgba(0,0,0,0.2)] transition-all duration-150`}
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Percent count */}
              <div className="flex justify-between items-center text-[9px] font-mono px-1 pt-0.5">
                <span className={labelSecondary}>STRAYZIL v0.1 BETA</span>
                <span className={`${accentText} font-bold`}>{progress}%</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="create-world-group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="space-y-3 pt-2"
            >
              {/* Animated Join Text */}
              <p className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest animate-pulse">
                ● World Generation Complete
              </p>

              {/* Minecraft Styled Interactive Button */}
              <button
                onClick={onFinished}
                className="w-full py-2.5 px-4 bg-gradient-to-b from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 active:translate-y-0.5 text-slate-950 font-bold text-xs uppercase rounded-lg border-2 border-emerald-400/80 shadow-[0_4px_16px_rgba(16,185,129,0.3),inset_0_2px_0_rgba(255,255,255,0.25)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4),inset_0_2px_0_rgba(255,255,255,0.4)] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950 stroke-none" />
                <span className="tracking-wide">Create World & Join</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative Tips Footnote */}
      <div className="absolute bottom-6 text-center max-w-xs px-4">
        <span className={`text-[9px] font-mono uppercase tracking-widest ${labelSecondary}`}>Builder Tip</span>
        <p className={`text-[10px] leading-relaxed mt-1 font-sans ${textSecondary}`}>
          "Administrators can unlock high-privilege operations in the Profile Tab with their secure keyphrase."
        </p>
      </div>
    </div>
  );
}
