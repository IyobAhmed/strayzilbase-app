import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, BookOpen, Layers, Swords, Info, ArrowLeft, Eye } from "lucide-react";
import { LocalDataService, WikiEntry } from "../services/dataService";

interface WikiTabProps {
  selectedWiki: WikiEntry | null;
  onSelectWiki: (entry: WikiEntry | null) => void;
  isAdminUnlocked?: boolean;
}

type CategoryType = "all" | "mobs" | "blocks" | "biomes" | "structures";

export default function WikiTab({ selectedWiki, onSelectWiki, isAdminUnlocked = false }: WikiTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const wikiEntries = LocalDataService.getWiki();

  // Filter categories and search terms
  const filteredEntries = wikiEntries.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoriesList: { value: CategoryType; label: string; icon: string }[] = [
    { value: "all", label: "All", icon: "🌐" },
    { value: "mobs", label: "Mobs", icon: "🧟" },
    { value: "blocks", label: "Blocks", icon: "🧱" },
    { value: "biomes", label: "Biomes", icon: "🌳" },
    { value: "structures", label: "Structures", icon: "🏰" },
  ];

  return (
    <div className="flex-1 overflow-hidden flex flex-col select-none relative">
      <AnimatePresence mode="wait">
        {!selectedWiki ? (
          /* Wiki Listing View */
          <motion.div
            key="wiki-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Header, Search & Category Filter */}
            <div className="px-4 py-5 space-y-4 border-b border-white/5 bg-[#070B19]/80 backdrop-blur-md shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs text-minecraft-cyan font-semibold uppercase tracking-wider font-mono">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Strayzil Database</span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">Blocky Wiki</h2>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search materials, mobs, biomes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-minecraft-deep/80 text-xs text-white placeholder-white/30 rounded-lg border border-white/10 focus:outline-none focus:border-minecraft-cyan/50 transition-colors font-sans"
                />
              </div>

              {/* Category Carousel */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
                {categoriesList.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase tracking-wide border shrink-0 transition-all duration-200 cursor-pointer flex items-center gap-1.5 active:scale-95 ${
                      selectedCategory === cat.value
                        ? "bg-minecraft-cyan text-minecraft-dark border-minecraft-cyan shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                        : "bg-minecraft-deep/50 text-white/60 border-white/5 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Wiki Cards Grid */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 pb-24">
              {filteredEntries.length === 0 ? (
                <div className="p-8 text-center text-xs text-white/40 bg-white/5 rounded-xl font-mono">
                  🔍 No wiki records found for your filters.
                </div>
              ) : (
                filteredEntries.map((entry, idx) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => onSelectWiki(entry)}
                    className="p-3 bg-minecraft-deep/40 hover:bg-minecraft-deep/80 border border-minecraft-blue/15 hover:border-minecraft-cyan/30 rounded-xl flex items-center justify-between cursor-pointer transition-all duration-200 hover:shadow-[0_4px_12px_rgba(34,211,238,0.05)]"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Image Thumbnail */}
                      <div className="w-12 h-12 rounded-lg bg-minecraft-blue overflow-hidden shrink-0 border border-white/5">
                        <img
                          src={entry.image}
                          alt={entry.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-xs font-bold text-white uppercase tracking-wide font-mono flex items-center gap-1.5">
                          {entry.title}
                          <span className="text-[8px] scale-90 px-1 py-0.2 bg-minecraft-blue text-minecraft-cyan rounded font-sans capitalize font-normal border border-minecraft-cyan/15">
                            {entry.category}
                          </span>
                        </h3>
                        <p className="text-[10px] text-white/50 line-clamp-1 mt-0.5">{entry.summary}</p>
                      </div>
                    </div>

                    <Eye className="w-3.5 h-3.5 text-white/30 hover:text-minecraft-cyan ml-2 shrink-0" />
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          /* Wiki Detailed Viewer */
          <motion.div
            key="wiki-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col overflow-hidden bg-[#070B19]"
          >
            {/* Back Header */}
            <div className="px-4 py-3 bg-[#070B19]/90 border-b border-white/5 flex items-center justify-between shrink-0">
              <button
                onClick={() => onSelectWiki(null)}
                className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold font-mono py-1.5 cursor-pointer active:scale-95 transition-transform"
              >
                <ArrowLeft className="w-4 h-4 text-minecraft-cyan" />
                <span>WIKI DATABASE</span>
              </button>
              <span className="text-[10px] font-mono text-white/30 uppercase">Entry View</span>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24 select-text">
              
              {/* Banner Image */}
              <div className="relative h-44 rounded-xl overflow-hidden bg-minecraft-blue border border-white/10 shrink-0 shadow-lg">
                <img
                  src={selectedWiki.image}
                  alt={selectedWiki.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070B19] via-[#070B19]/30 to-transparent"></div>
                
                {/* Title overlay */}
                <div className="absolute bottom-3 left-4">
                  <span className="text-[8px] font-mono tracking-widest uppercase text-minecraft-cyan bg-minecraft-cyan/10 px-2 py-0.5 rounded border border-minecraft-cyan/20">
                    Category: {selectedWiki.category}
                  </span>
                  <h1 className="text-lg font-black text-white mt-1 uppercase font-mono tracking-wide drop-shadow-sm">
                    {selectedWiki.title}
                  </h1>
                </div>
              </div>

              {/* Statistics Panel */}
              <div className="p-3.5 bg-minecraft-deep/75 rounded-xl border border-minecraft-blue/30 space-y-2.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-minecraft-cyan font-bold uppercase tracking-wider">
                  <Swords className="w-3.5 h-3.5" />
                  <span>Interactive Stats Panel</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(selectedWiki.stats).map(([label, val]) => (
                    <div key={label} className="p-2 rounded bg-black/20 border border-white/5 flex flex-col">
                      <span className="text-[8px] text-white/40 font-mono uppercase tracking-tight">{label}</span>
                      <span className="text-[10px] text-white font-bold font-mono mt-0.5 truncate">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description & Overview */}
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-[10px] font-mono text-white/30 uppercase font-semibold">
                  <Info className="w-3.5 h-3.5" />
                  <span>Encyclopedia Overview</span>
                </div>
                <h3 className="text-xs font-semibold text-minecraft-cyan">{selectedWiki.summary}</h3>
                <p className="text-[11px] text-white/70 leading-relaxed font-sans whitespace-pre-wrap pt-1 select-text">
                  {selectedWiki.content}
                </p>
              </div>

              {/* Sandbox info disclaimer */}
              <div className="p-3.5 rounded-lg bg-white/2 border border-white/5">
                <p className="text-[9px] text-white/40 leading-relaxed italic">
                  *Wiki information relies on standard vanilla Minecraft mechanics. If custom mods are loaded, behavioral traits or loot rates may alter slightly.
                </p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
