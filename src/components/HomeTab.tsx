import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Bell, Flame, Award, BookOpen, Layers, ArrowRight, ShieldCheck, Youtube, 
  Eye, Heart, MessageSquare, ExternalLink, Users, Calculator, Compass, 
  Hammer, Map, RefreshCw, MessageCircle, FolderDown, Settings, Info 
} from "lucide-react";
import { LocalDataService, Announcement, NewsArticle, WikiEntry } from "../services/dataService";

interface HomeTabProps {
  onNavigateToTab: (tabIndex: number) => void;
  onSelectNews: (article: NewsArticle) => void;
  onSelectWiki: (entry: WikiEntry) => void;
  onOpenSupportersWall: () => void;
  onOpenSubPage: (page: string) => void;
}

export default function HomeTab({
  onNavigateToTab,
  onSelectNews,
  onSelectWiki,
  onOpenSupportersWall,
  onOpenSubPage,
}: HomeTabProps) {
  const announcements = LocalDataService.getAnnouncements();
  const news = LocalDataService.getNews();
  const wikiEntries = LocalDataService.getWiki();

  // State to track expanded announcements
  const [expandedAnn, setExpandedAnn] = useState<string | null>(null);

  // Take first 3 announcements, news, and wiki items as featured
  const featuredAnnouncements = announcements.slice(0, 3);
  const featuredNews = news.slice(0, 2);
  const featuredWiki = wikiEntries.slice(0, 2);

  const featuredMods = [
    {
      name: "Strayzil Optimizer v1.2",
      downloads: "12.4K",
      category: "Performance",
      rating: "4.9",
      icon: "⚡"
    },
    {
      name: "PixelCraft Glass Shaders",
      downloads: "8.1K",
      category: "Graphics",
      rating: "4.8",
      icon: "🔮"
    },
    {
      name: "Voxel Furniture Pack",
      downloads: "5.3K",
      category: "Decoration",
      rating: "4.7",
      icon: "🪵"
    }
  ];

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "alert": return "bg-rose-500/20 text-rose-400 border-rose-500/30";
      case "update": return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30";
      case "event": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      default: return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const bentoPortals = [
    { id: "creator", title: "Creator Hub", desc: "YouTube & Stats", icon: Youtube, color: "from-red-500/10 to-transparent border-red-500/30 text-red-400" },
    { id: "tools", title: "Minecraft Tools", desc: "XP & Ore guides", icon: Calculator, color: "from-emerald-500/10 to-transparent border-emerald-500/30 text-emerald-400" },
    { id: "seeds", title: "Seed Vault", desc: "Spectacular spawns", icon: Compass, color: "from-teal-500/10 to-transparent border-teal-500/30 text-teal-400" },
    { id: "builds", title: "Build Gallery", desc: "Design showcase", icon: Hammer, color: "from-amber-500/10 to-transparent border-amber-500/30 text-amber-400" },
    { id: "roadmap", title: "Content Roadmap", desc: "Strayzil Future", icon: Map, color: "from-purple-500/10 to-transparent border-purple-500/30 text-purple-400" },
    { id: "updates", title: "Update Center", desc: "App release logs", icon: RefreshCw, color: "from-blue-500/10 to-transparent border-blue-500/30 text-blue-400" },
    { id: "feedback", title: "Feedback", desc: "Send suggestions", icon: MessageCircle, color: "from-cyan-500/10 to-transparent border-cyan-500/30 text-cyan-400" },
    { id: "downloads", title: "Downloads", desc: "Staged expansions", icon: FolderDown, color: "from-sky-500/10 to-transparent border-sky-500/30 text-sky-400" },
  ];

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 pb-24">
      {/* Welcome Hero Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-sky-600 to-blue-800 p-5 rounded-2xl relative overflow-hidden flex flex-col justify-between shadow-2xl shadow-sky-500/20 border border-sky-500/30"
      >
        {/* Decorative corner grid from theme */}
        <div className="absolute right-[-20px] top-[-20px] opacity-20 pointer-events-none">
          <div className="w-48 h-48 bg-white grid grid-cols-4 gap-1 transform rotate-12">
            <div className="bg-white/40 h-10 w-10"></div><div className="bg-white/10 h-10 w-10"></div><div className="bg-white/30 h-10 w-10"></div><div className="bg-white/10 h-10 w-10"></div>
            <div className="bg-white/20 h-10 w-10"></div><div className="bg-white/40 h-10 w-10"></div><div className="bg-white/10 h-10 w-10"></div><div className="bg-white/30 h-10 w-10"></div>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 blur-xl"></div>
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-mono text-sky-200 font-semibold">
            <Flame className="w-3.5 h-3.5 text-sky-200 animate-pulse" />
            <span>Minecraft Companion Platform</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
            Strayzil<span className="text-sky-300 font-mono">Base</span>
          </h2>
          <p className="text-xs text-sky-100/90 leading-relaxed max-w-[95%]">
            Welcome to Version 0.1 of your premium Minecraft companion portal. Explore news, wiki resources, and our growing sandbox community.
          </p>
        </div>

        {/* Supporters Wall Portal Button */}
        <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between relative z-10">
          <button
            onClick={onOpenSupportersWall}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/25 text-white rounded-lg text-[11px] font-semibold border border-white/25 transition-all duration-200 cursor-pointer shadow-[0_2px_8px_rgba(255,255,255,0.05)] active:scale-95"
          >
            <Award className="w-4 h-4 text-yellow-300 animate-bounce" />
            <span>Founding Supporters Wall</span>
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenSubPage("settings")}
              className="p-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 hover:text-white rounded-lg cursor-pointer transition-colors"
              title="Settings"
            >
              <Settings className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-sky-200/60">Beta v0.1</span>
          </div>
        </div>
      </motion.div>

      {/* COMPANION PORTALS BENTO GRID */}
      <div className="space-y-3 select-none">
        <div className="flex items-center justify-between pl-1">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
            <span className="w-1.5 h-3 bg-sky-500 rounded-xs inline-block"></span>
            Sandbox Companion Kit
          </h3>
          <span className="text-[9px] font-mono text-white/30 uppercase">Offline Ready</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {bentoPortals.map((portal) => {
            const IconComponent = portal.icon;
            return (
              <button
                key={portal.id}
                onClick={() => onOpenSubPage(portal.id)}
                className={`p-3.5 bg-gradient-to-br border rounded-2xl text-left space-y-1.5 hover:scale-[1.01] hover:border-white/25 transition-all duration-150 cursor-pointer active:translate-y-0.5 shadow-lg ${portal.color}`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/5">
                    <IconComponent className="w-4.5 h-4.5" />
                  </div>
                  <ArrowRight className="w-3 h-3 opacity-30" />
                </div>
                <div>
                  <h4 className="text-[11px] font-extrabold text-white font-mono uppercase tracking-wide leading-tight">{portal.title}</h4>
                  <p className="text-[9px] text-white/50 font-sans leading-none mt-0.5">{portal.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Announcements Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono flex items-center gap-2">
            <span className="w-1.5 h-3 bg-minecraft-cyan rounded-xs inline-block"></span>
            Announcements
          </h3>
          <span className="text-[10px] font-mono text-white/40">Latest Updates</span>
        </div>

        <div className="space-y-2.5">
          {featuredAnnouncements.length === 0 ? (
            <div className="p-4 text-center text-xs text-white/40 bg-white/5 rounded-xl">
              No announcements available.
            </div>
          ) : (
            featuredAnnouncements.map((ann, idx) => (
              <motion.div
                key={ann.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => setExpandedAnn(expandedAnn === ann.id ? null : ann.id)}
                className="p-3.5 rounded-xl bg-minecraft-deep border border-minecraft-blue/40 hover:border-minecraft-cyan/40 transition-all duration-200 cursor-pointer active:bg-minecraft-blue/10"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] px-2 py-0.5 rounded border font-mono font-medium tracking-wide uppercase ${getCategoryColor(ann.category)}`}>
                        {ann.category}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono">{ann.date}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-white/95 leading-snug">{ann.title}</h4>
                  </div>
                  <Bell className="w-3.5 h-3.5 text-white/30 shrink-0" />
                </div>
                
                {/* Expandable Content Container */}
                <div className={`overflow-hidden transition-all duration-300 ${expandedAnn === ann.id ? "max-h-40 mt-2 opacity-100" : "max-h-0 opacity-0"}`}>
                  <p className="text-[11px] text-white/70 leading-relaxed border-t border-white/5 pt-2 whitespace-pre-wrap">
                    {ann.content}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Featured News Slider/Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono flex items-center gap-2">
            <span className="w-1.5 h-3 bg-minecraft-light rounded-xs inline-block"></span>
            Featured News
          </h3>
          <button
            onClick={() => onNavigateToTab(2)} // Navigate to News Tab
            className="text-[10px] font-mono text-minecraft-cyan hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>See All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {featuredNews.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              onClick={() => onSelectNews(article)}
              className="group rounded-xl overflow-hidden bg-minecraft-deep/80 border border-minecraft-blue/30 hover:border-minecraft-light/50 transition-all duration-200 cursor-pointer"
            >
              <div className="relative h-24 bg-minecraft-blue overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-minecraft-deep to-transparent"></div>
              </div>
              <div className="p-2.5 space-y-1">
                <span className="text-[9px] font-mono text-white/40">{article.date}</span>
                <h4 className="text-[11px] font-semibold text-white group-hover:text-minecraft-cyan transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Featured Wiki Pages */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono flex items-center gap-2">
            <span className="w-1.5 h-3 bg-minecraft-cyan rounded-xs inline-block"></span>
            Featured Wiki Entries
          </h3>
          <button
            onClick={() => onNavigateToTab(3)} // Wiki Tab
            className="text-[10px] font-mono text-minecraft-cyan hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>See All</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-2">
          {featuredWiki.map((entry, idx) => (
            <div
              key={entry.id}
              onClick={() => onSelectWiki(entry)}
              className="flex items-center gap-3 p-2.5 rounded-xl bg-minecraft-deep/50 border border-minecraft-blue/20 hover:border-minecraft-cyan/30 cursor-pointer transition-colors active:bg-minecraft-blue/5"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-minecraft-blue border border-white/5">
                <img src={entry.image} alt={entry.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] font-bold text-white tracking-wide flex items-center gap-1.5 uppercase font-mono">
                  {entry.title}
                  <span className="text-[9px] px-1.5 py-0.2 bg-minecraft-blue/60 text-minecraft-cyan font-normal rounded capitalize font-sans">
                    {entry.category}
                  </span>
                </h4>
                <p className="text-[10px] text-white/50 truncate">{entry.summary}</p>
              </div>
              <BookOpen className="w-3.5 h-3.5 text-white/30 mr-1" />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Mods Placeholder */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white tracking-wide uppercase font-mono flex items-center gap-2">
            <span className="w-1.5 h-3 bg-yellow-500 rounded-xs inline-block"></span>
            Featured Mods
          </h3>
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 font-mono uppercase">Preview</span>
        </div>

        <div className="grid grid-cols-1 gap-2.5">
          {featuredMods.map((mod, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-minecraft-deep/30 border border-white/5 flex items-center justify-between relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-minecraft-blue/40 flex items-center justify-center text-lg border border-minecraft-blue/40">
                  {mod.icon}
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-white leading-tight">{mod.name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[9px] text-minecraft-cyan font-mono">{mod.category}</span>
                    <span className="text-[9px] text-white/30">•</span>
                    <span className="text-[9px] text-white/40">{mod.downloads} downloads</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-yellow-400 font-mono">⭐ {mod.rating}</span>
                <p className="text-[8px] text-white/30 mt-0.5">Strayzil Hub</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* StrayzilBase Launch & Sandbox Info */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-minecraft-deep to-[#050813] border border-white/5 space-y-2.5">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wide">Developer Launch Info</h4>
        </div>
        <p className="text-[10px] text-white/60 leading-relaxed">
          StrayzilBase Version 0.1 operates on standard React sandboxed memory storage. Adding news, wiki topics, announcements, or supporters in the hidden Profile Admin Panel saves changes instantly to your local browser storage.
        </p>
        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <span className="text-[9px] font-mono text-minecraft-cyan">Platform: React Single-Page-App</span>
          <span className="text-[9px] font-mono text-white/30">Build: 2026-BETA</span>
        </div>
      </div>
    </div>
  );
}
