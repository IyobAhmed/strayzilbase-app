import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Youtube, Users, Eye, Heart, MessageSquare, ExternalLink, Sparkles } from "lucide-react";

interface CreatorHubProps {
  onBack: () => void;
}

export default function CreatorHub({ onBack }: CreatorHubProps) {
  return (
    <div className="flex-1 flex flex-col bg-[#070B19] select-none h-full relative overflow-hidden font-sans">
      {/* Decorative Red/Crimson Ambient Background */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-red-600/10 to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-24 left-10 w-36 h-36 bg-red-600/10 blur-[90px] pointer-events-none"></div>

      {/* Header Panel */}
      <div className="px-4 py-3 bg-[#070B19]/90 border-b border-white/5 flex items-center justify-between shrink-0 z-10 relative">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold font-mono py-1.5 cursor-pointer active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 text-red-500" />
          <span>PORTAL BACK</span>
        </button>
        <span className="text-[10px] font-mono text-red-400 font-semibold uppercase tracking-wider">Creator Hub</span>
      </div>

      {/* Main Content Scroll Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 pb-24 z-10 relative">
        {/* Creator Identity Banner */}
        <div className="text-center space-y-3 p-6 bg-gradient-to-b from-red-600/15 via-[#120808] to-[#070B19] rounded-2xl border border-red-500/30 shadow-[0_10px_30px_rgba(239,68,68,0.05)] mc-border-blocky">
          <motion.div 
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="inline-flex p-3 bg-red-600 rounded-2xl border border-red-400/30 text-white shadow-xl shadow-red-600/30 mb-2"
          >
            <Youtube className="w-8 h-8 fill-white stroke-none" />
          </motion.div>
          <h2 className="text-xl font-black text-white font-mono tracking-widest uppercase">
            STRAYZIL
          </h2>
          <p className="text-[11px] text-white/75 max-w-[85%] mx-auto leading-relaxed">
            Welcome to the official Creator Spotlight! Strayzil creates high-quality, entertaining Minecraft tutorials, builders logs, and redstone experiments.
          </p>

          <div className="pt-2">
            <span className="text-[9px] font-mono bg-red-600/15 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-full uppercase font-bold tracking-widest animate-pulse">
              ● Official Channel Content
            </span>
          </div>
        </div>

        {/* Statistics Grid - Glassmorphic design */}
        <div className="space-y-3">
          <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest px-1">Channel Statistics</h3>
          <div className="grid grid-cols-2 gap-3">
            {/* Subscribers */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-red-500/5 blur-xl"></div>
              <Users className="w-5 h-5 text-red-400 mb-2" />
              <div>
                <span className="text-2xl font-black text-white font-mono leading-none tracking-tight">650+</span>
                <span className="text-[9px] text-white/40 font-mono block mt-1 uppercase tracking-wider">Subscribers</span>
              </div>
            </div>

            {/* Views */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-red-500/5 blur-xl"></div>
              <Eye className="w-5 h-5 text-red-400 mb-2" />
              <div>
                <span className="text-2xl font-black text-white font-mono leading-none tracking-tight">250K+</span>
                <span className="text-[9px] text-white/40 font-mono block mt-1 uppercase tracking-wider">Total Views</span>
              </div>
            </div>

            {/* Likes */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-red-500/5 blur-xl"></div>
              <Heart className="w-5 h-5 text-red-400 mb-2" />
              <div>
                <span className="text-2xl font-black text-white font-mono leading-none tracking-tight">5,000+</span>
                <span className="text-[9px] text-white/40 font-mono block mt-1 uppercase tracking-wider">Likes Generated</span>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-between shadow-xl backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-12 h-12 bg-red-500/5 blur-xl"></div>
              <MessageSquare className="w-5 h-5 text-red-400 mb-2" />
              <div>
                <span className="text-2xl font-black text-white font-mono leading-none tracking-tight">2,000+</span>
                <span className="text-[9px] text-white/40 font-mono block mt-1 uppercase tracking-wider">Engaged Comments</span>
              </div>
            </div>
          </div>
        </div>

        {/* Video Featurette Block */}
        <div className="bg-minecraft-deep/40 border border-white/5 rounded-2xl p-4 space-y-3">
          <span className="text-[8px] font-mono text-red-400 font-bold uppercase tracking-widest block">Featured Playlists</span>
          <h4 className="text-xs font-bold text-white font-mono">100 Days Survival Series & Hardcore Redstone Guides</h4>
          <p className="text-[10px] text-white/60 leading-relaxed">
            Tune in for epic builds, survival checklists, and full walkthroughs designed to elevate your Minecraft skills. New uploads are launching soon.
          </p>
        </div>

        {/* Large Visit Button */}
        <div className="pt-2">
          <a
            href="https://youtube.com/@strayzil"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 active:translate-y-0.5 text-white font-mono font-black text-xs uppercase rounded-xl border border-red-500 shadow-[0_6px_20px_rgba(220,38,38,0.25)] flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer text-center"
          >
            <Youtube className="w-4 h-4 fill-white stroke-none animate-pulse" />
            <span className="tracking-widest">Visit Strayzil Channel</span>
            <ExternalLink className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

        {/* Brand footnote */}
        <div className="p-3 bg-red-500/5 rounded-lg border border-red-500/10 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-red-400 shrink-0" />
          <p className="text-[9px] text-red-400/60 leading-relaxed font-mono">
            Subscribing and dropping likes is free and fuels our core development for the official Strayzil Base launcher, map catalogs, and web server infrastructure!
          </p>
        </div>
      </div>
    </div>
  );
}
