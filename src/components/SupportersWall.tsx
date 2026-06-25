import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Award, Crown, ShieldAlert, Sparkles, Star, Trash, Plus, Edit2, X, Check, Search, Flame } from "lucide-react";
import { LocalDataService, Supporter } from "../services/dataService";

interface SupportersWallProps {
  onBack: () => void;
  isAdminUnlocked?: boolean;
}

export default function SupportersWall({ onBack, isAdminUnlocked = false }: SupportersWallProps) {
  const [supporters, setSupporters] = useState<Supporter[]>(() => LocalDataService.getSupporters());
  const [searchTerm, setSearchTerm] = useState("");
  
  // Administrative Form overlay toggles
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  // Supporter Form fields
  const [supUsername, setSupUsername] = useState("");
  const [supIsDayOne, setSupIsDayOne] = useState(true);
  const [supContributionTier, setSupContributionTier] = useState("Obsidian Patron");
  const [supCustomTitle, setSupCustomTitle] = useState("Pioneer Explorer");
  const [supBackerNumber, setSupBackerNumber] = useState(1);
  const [supFavBlock, setSupFavBlock] = useState("Redstone Dust");

  const resetForm = () => {
    setSupUsername("");
    setSupIsDayOne(true);
    setSupContributionTier("Obsidian Patron");
    setSupCustomTitle("Pioneer Explorer");
    setSupBackerNumber(supporters.length + 1);
    setSupFavBlock("Redstone Dust");
    setEditId(null);
    setShowForm(false);
  };

  const handleOpenAddForm = () => {
    resetForm();
    setSupBackerNumber(supporters.length + 1);
    setShowForm(true);
  };

  const handleEditSupporterClick = (sup: Supporter) => {
    setEditId(sup.id);
    setSupUsername(sup.username);
    setSupIsDayOne(sup.isDayOne);
    setSupContributionTier(sup.contributionTier || "Obsidian Patron");
    setSupCustomTitle(sup.customTitle || "Pioneer Explorer");
    setSupBackerNumber(sup.backerNumber || 1);
    setSupFavBlock(sup.favBlock || "Redstone Dust");
    setShowForm(true);
  };

  const handleSaveSupporter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supUsername.trim()) return;

    const data = {
      username: supUsername.trim(),
      isDayOne: supIsDayOne,
      contributionTier: supContributionTier.trim(),
      customTitle: supCustomTitle.trim(),
      backerNumber: Number(supBackerNumber) || 1,
      favBlock: supFavBlock.trim()
    };

    if (editId) {
      LocalDataService.updateSupporter(editId, data);
    } else {
      LocalDataService.addSupporter(data);
    }

    setSupporters(LocalDataService.getSupporters());
    resetForm();
  };

  const handleDeleteSupporter = (id: string) => {
    if (confirm("Delete this supporter from the monument?")) {
      LocalDataService.deleteSupporter(id);
      setSupporters(LocalDataService.getSupporters());
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#070B19] select-none h-full relative overflow-hidden">
      
      {/* Decorative Golden Ambient Particles */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none z-0"></div>
      <div className="absolute top-20 right-10 w-24 h-24 bg-amber-500/10 blur-[80px] pointer-events-none"></div>

      {/* Header Panel */}
      <div className="px-4 py-3 bg-[#070B19]/90 border-b border-white/5 flex items-center justify-between shrink-0 z-10 relative">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold font-mono py-1.5 cursor-pointer active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 text-amber-400" />
          <span>PORTAL BACK</span>
        </button>
        <div className="flex items-center gap-2">
          {isAdminUnlocked && (
            <button
              onClick={handleOpenAddForm}
              className="px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold text-[9px] uppercase rounded flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
              <span>Add Supporter</span>
            </button>
          )}
          <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase tracking-wider">Supporters Wall</span>
        </div>
      </div>

      {/* Scrollable Monument Body */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 pb-24 z-10 relative">
        
        {/* Golden Banner Header */}
        <div className="text-center space-y-2 p-5 bg-gradient-to-b from-amber-500/15 via-minecraft-deep to-[#070B19] rounded-2xl border border-amber-500/30 shadow-[0_10px_30px_rgba(245,158,11,0.08)] mc-border-blocky">
          <div className="inline-flex p-2 bg-amber-500/10 rounded-full border border-amber-500/30 text-amber-400 animate-pulse mb-1">
            <Crown className="w-6 h-6" />
          </div>
          <h2 className="text-base font-extrabold text-white font-mono tracking-wider uppercase">
            Founding Supporters
          </h2>
          <p className="text-[10px] text-white/70 max-w-[90%] mx-auto leading-relaxed">
            A golden monument celebrating the pioneers who supported StrayzilBase since Day One. These adventurers have written their names into our history.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search supporter username or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-white placeholder-white/30 focus:outline-none focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white font-mono text-[9px] uppercase hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        {/* Featured Supporter Section (Hall of Fame) */}
        {!searchTerm && (
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-amber-400 font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
              <span>✨ Revered Hall of Fame (Featured)</span>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {supporters.filter(s => s.contributionTier === "Obsidian Patron").slice(0, 2).map((sup, sIdx) => (
                <div 
                  key={`featured-${sup.id}`}
                  className="bg-gradient-to-br from-amber-500/15 via-[#1a1412] to-amber-950/20 rounded-2xl border-2 border-amber-400/50 p-4 relative overflow-hidden shadow-lg shadow-amber-950/40"
                >
                  {/* Glowing background */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-500/15 blur-[35px] pointer-events-none"></div>
                  
                  {/* Absolute Crown Accent */}
                  <div className="absolute right-4 top-4 opacity-15">
                    <Crown className="w-12 h-12 text-amber-400" />
                  </div>

                  <div className="flex items-start gap-3 relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shadow-md shadow-amber-400/20 shrink-0">
                      👑
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h4 className="text-sm font-black font-mono text-white tracking-wide">{sup.username}</h4>
                        <span className="text-[8px] font-mono font-extrabold text-amber-950 bg-amber-400 px-1.5 py-0.5 rounded uppercase tracking-wider">
                          FOUNDER
                        </span>
                        <span className="text-[8px] font-mono font-extrabold text-white bg-red-600 px-1.5 py-0.5 rounded uppercase tracking-wider flex items-center gap-0.5">
                          <Flame className="w-2 h-2 fill-white stroke-none" />
                          <span>DAY ONE</span>
                        </span>
                      </div>
                      <p className="text-[10px] font-mono font-bold text-amber-400 mt-1 uppercase tracking-wider">
                        ★ {sup.customTitle || "Legendary Architect"} ★
                      </p>
                      <p className="text-[9px] text-white/50 font-mono mt-0.5">
                        Tier: <span className="text-white font-semibold">{sup.contributionTier}</span>
                      </p>
                      
                      <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-white/30">
                        <span>BACKER NO: <span className="text-amber-400 font-bold">#{sup.backerNumber}</span></span>
                        <span>FAV: {sup.favBlock}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supporters Wall Cards Container */}
        <div className="space-y-3">
          <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-white/40 border-b border-white/5 pb-1">
            <span>Explorer Details</span>
            <span>Identity Plaque</span>
          </div>

          <div className="space-y-3">
            {supporters.filter(sup => 
              sup.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (sup.customTitle && sup.customTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
              (sup.contributionTier && sup.contributionTier.toLowerCase().includes(searchTerm.toLowerCase()))
            ).length === 0 ? (
              <div className="p-8 text-center text-xs text-white/40 bg-white/2 rounded-xl border border-white/5 font-mono">
                🗿 No matching supporters found on the monument...
              </div>
            ) : (
              supporters
                .filter(sup => 
                  sup.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (sup.customTitle && sup.customTitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (sup.contributionTier && sup.contributionTier.toLowerCase().includes(searchTerm.toLowerCase()))
                )
                .map((sup, idx) => (
                <motion.div
                  key={sup.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(idx * 0.03, 0.3) }}
                  className={`p-4 rounded-xl border flex flex-col gap-2.5 transition-all duration-200 relative ${
                    sup.isDayOne
                      ? "bg-gradient-to-r from-amber-500/10 via-[#0d1630] to-[#070b19] border-amber-500/30 hover:border-amber-500/60 shadow-[0_2px_10px_rgba(245,158,11,0.03)]"
                      : "bg-minecraft-deep/40 border-white/5 hover:border-minecraft-light/30"
                  }`}
                >
                  {/* Top Row: Username and Status/Backer Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center border font-bold text-xs shrink-0 ${
                        sup.isDayOne
                          ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                          : "bg-minecraft-blue/30 text-minecraft-cyan border-minecraft-blue/40"
                      }`}>
                        {sup.isDayOne ? "👑" : "🛡️"}
                      </div>
                      
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold font-mono text-white tracking-wide truncate">{sup.username}</h4>
                        {sup.isDayOne ? (
                          <span className="text-[8px] font-mono font-medium text-amber-400 uppercase tracking-widest flex items-center gap-0.5 mt-0.5">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            <span>Day One Supporter</span>
                          </span>
                        ) : (
                          <span className="text-[8px] font-mono text-minecraft-cyan uppercase tracking-wider mt-0.5 block">
                            Elite Supporter
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[9px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                        #{sup.backerNumber || (idx + 1)}
                      </span>
                      {isAdminUnlocked && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleEditSupporterClick(sup)}
                            className="text-minecraft-cyan p-1 hover:bg-minecraft-blue/20 rounded cursor-pointer transition-colors"
                            title="Edit Supporter"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteSupporter(sup.id)}
                            className="text-rose-400 p-1 hover:bg-rose-500/10 rounded cursor-pointer transition-colors"
                            title="Delete Supporter"
                          >
                            <Trash className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Specifications Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono border-t border-white/5 pt-2.5 bg-black/10 p-2 rounded-lg">
                    <div className="min-w-0">
                      <span className="text-[8px] text-white/30 uppercase block">Contribution Tier</span>
                      <span className="text-minecraft-cyan font-bold truncate block">{sup.contributionTier || (sup.isDayOne ? "Obsidian Patron" : "Iron Guardian")}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] text-white/30 uppercase block">Custom Title</span>
                      <span className="text-amber-400 font-bold truncate block">{sup.customTitle || "Pioneer Explorer"}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-1.5 mt-0.5 border-t border-white/5 pt-1.5 truncate">
                      <span className="text-[8px] text-white/30 uppercase">Fav Block:</span>
                      <span className="text-white/80 font-sans text-[10px] flex items-center gap-1">
                        🧱 {sup.favBlock || "Redstone Dust"}
                      </span>
                    </div>
                  </div>

                  {/* Bottom date badge */}
                  <div className="flex justify-between items-center text-[8px] font-mono text-white/20 px-1 pt-0.5">
                    <span>STRAYZILBACKER v0.1</span>
                    <span>JOINED ON {sup.dateAdded}</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Gold footer plaque */}
        <div className="p-3 bg-amber-500/5 rounded-lg border border-amber-500/10 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <p className="text-[9px] text-amber-300/60 leading-relaxed font-mono">
            *This list is fully customizable in real time. Access the Hidden Admin Panel on your Profile tab using your secure admin credentials to append, modify, or exclude players on the wall.
          </p>
        </div>

      </div>

      {/* ADMIN OVERLAY FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans select-none"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#070B19] border-2 border-amber-500/50 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Overlay Form Header */}
              <div className="bg-gradient-to-r from-amber-500/10 to-transparent px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5 uppercase">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span>{editId ? "Modify" : "Enshrine"} Supporter</span>
                </span>
                <button
                  onClick={resetForm}
                  className="p-1 hover:bg-white/5 text-white/40 hover:text-white rounded transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Form Content Scroll area */}
              <form onSubmit={handleSaveSupporter} className="p-4 space-y-4 overflow-y-auto flex-1">
                {/* Username */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Supporter Username</label>
                  <input
                    type="text"
                    placeholder="e.g. Strayzil_Builder"
                    value={supUsername}
                    onChange={(e) => setSupUsername(e.target.value)}
                    className="w-full px-3 py-2 bg-[#050813] text-xs text-white placeholder-slate-600 rounded border border-white/10 focus:outline-none focus:border-amber-500/50 font-mono"
                    required
                  />
                </div>

                {/* Day One Checkbox */}
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 cursor-pointer text-xs font-mono text-white/80">
                    <input
                      type="checkbox"
                      checked={supIsDayOne}
                      onChange={(e) => setSupIsDayOne(e.target.checked)}
                      className="accent-amber-500"
                    />
                    <span>Day One Backer (Golden Card)</span>
                  </label>
                </div>

                {/* Specs Fields */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Contribution Tier */}
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/40 font-mono block uppercase">Contribution Tier</label>
                    <select
                      value={supContributionTier}
                      onChange={(e) => setSupContributionTier(e.target.value)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded text-white text-[11px] focus:outline-none focus:border-amber-500/50 font-mono"
                    >
                      <option value="Obsidian Patron" className="bg-[#070B19]">Obsidian Patron</option>
                      <option value="Diamond Champion" className="bg-[#070B19]">Diamond Champion</option>
                      <option value="Gold Veteran" className="bg-[#070B19]">Gold Veteran</option>
                      <option value="Iron Guardian" className="bg-[#070B19]">Iron Guardian</option>
                      <option value="Redstone Sponsor" className="bg-[#070B19]">Redstone Sponsor</option>
                    </select>
                  </div>

                  {/* Custom Title */}
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/40 font-mono block uppercase">Custom Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Master Builder"
                      value={supCustomTitle}
                      onChange={(e) => setSupCustomTitle(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-[#050813] text-xs text-white rounded border border-white/10 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>

                  {/* Backer Number */}
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/40 font-mono block uppercase">Backer Number (#)</label>
                    <input
                      type="number"
                      placeholder="Backer #"
                      value={supBackerNumber}
                      onChange={(e) => setSupBackerNumber(Number(e.target.value) || 1)}
                      className="w-full px-2.5 py-1.5 bg-[#050813] text-xs text-white rounded border border-white/10 focus:outline-none focus:border-amber-500/50 font-mono"
                      min={1}
                    />
                  </div>

                  {/* Favorite Block */}
                  <div className="space-y-1">
                    <label className="text-[9px] text-white/40 font-mono block uppercase">Favorite Block</label>
                    <input
                      type="text"
                      placeholder="e.g. Netherite Block"
                      value={supFavBlock}
                      onChange={(e) => setSupFavBlock(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-[#050813] text-xs text-white rounded border border-white/10 focus:outline-none focus:border-amber-500/50"
                    />
                  </div>
                </div>

                {/* Submissions buttons */}
                <div className="flex justify-end gap-2 pt-3 border-t border-white/5 shrink-0">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-3 py-1.5 text-xs text-white/60 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs uppercase rounded hover:from-amber-400 hover:to-amber-500 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{editId ? "Save Changes" : "Seal Monument"}</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
