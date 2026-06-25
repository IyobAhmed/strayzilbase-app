import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Plus, Image, User, Hammer, Edit2, Trash, X, Check, Sparkles } from "lucide-react";
import { LocalDataService, BuildShowcase } from "../services/dataService";

interface BuildShowcaseTabProps {
  onBack: () => void;
  isAdminUnlocked?: boolean;
}

export default function BuildShowcaseTab({ onBack, isAdminUnlocked = false }: BuildShowcaseTabProps) {
  const [builds, setBuilds] = useState<BuildShowcase[]>(() => LocalDataService.getBuilds());
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Admin form state
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form fields
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<"Houses" | "Castles" | "Farms" | "Redstone" | "Cities">("Houses");
  const [formDescription, setFormDescription] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formBuilder, setFormBuilder] = useState("");

  const resetForm = () => {
    setFormTitle("");
    setFormCategory("Houses");
    setFormDescription("");
    setFormImage("");
    setFormBuilder("");
    setEditId(null);
    setShowForm(false);
  };

  const handleOpenAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditClick = (build: BuildShowcase) => {
    setEditId(build.id);
    setFormTitle(build.title);
    setFormCategory(build.category);
    setFormDescription(build.description);
    setFormImage(build.image);
    setFormBuilder(build.builder);
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim() || !formBuilder.trim()) return;

    // Use a default beautiful unsplash image if empty
    const imgUrl = formImage.trim() || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80";

    const data = {
      title: formTitle.trim(),
      category: formCategory,
      description: formDescription.trim(),
      image: imgUrl,
      builder: formBuilder.trim()
    };

    if (editId) {
      LocalDataService.updateBuild(editId, data);
    } else {
      LocalDataService.addBuild(data);
    }

    setBuilds(LocalDataService.getBuilds());
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this build showcase entry?")) {
      LocalDataService.deleteBuild(id);
      setBuilds(LocalDataService.getBuilds());
    }
  };

  const categories = ["All", "Houses", "Castles", "Farms", "Redstone", "Cities"];

  const filteredBuilds = selectedCategory === "All"
    ? builds
    : builds.filter(b => b.category === selectedCategory);

  return (
    <div className="flex-1 flex flex-col bg-[#070B19] select-none h-full relative overflow-hidden font-sans">
      {/* Decorative Golden Ambient Particles */}
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
        <div className="flex items-center gap-2">
          {isAdminUnlocked && (
            <button
              onClick={handleOpenAddForm}
              className="px-2 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-mono font-bold text-[9px] uppercase rounded flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
              <span>Add Build</span>
            </button>
          )}
          <span className="text-[10px] font-mono text-amber-400 font-semibold uppercase tracking-wider">Build Gallery</span>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="bg-[#070B19]/50 border-b border-white/5 py-2.5 px-4 shrink-0 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth z-10 relative">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-150 cursor-pointer ${
              selectedCategory === cat
                ? "bg-amber-500 text-slate-950 shadow-[0_2px_8px_rgba(245,158,11,0.3)] font-bold"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scrollable grid area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24 z-10 relative">
        
        {/* Banner */}
        <div className="text-center space-y-2 p-5 bg-gradient-to-b from-amber-500/15 via-minecraft-deep to-[#070B19] rounded-2xl border border-amber-500/30 shadow-[0_10px_30px_rgba(245,158,11,0.05)] mc-border-blocky">
          <div className="inline-flex p-2 bg-amber-500/10 rounded-full border border-amber-500/30 text-amber-400 mb-1">
            <Hammer className="w-6 h-6" />
          </div>
          <h2 className="text-base font-extrabold text-white font-mono tracking-wider uppercase">
            Strayzil Design Gallery
          </h2>
          <p className="text-[10px] text-white/70 max-w-[90%] mx-auto leading-relaxed">
            Feast your eyes on highly optimized redstone logic, giant survival mansions, castle gatehouses, and full-scale community server projects.
          </p>
        </div>

        {/* Gallery Items */}
        <div className="grid grid-cols-1 gap-4">
          {filteredBuilds.length === 0 ? (
            <div className="p-8 text-center text-xs text-white/40 bg-white/2 rounded-xl border border-white/5 font-mono">
              🏯 No builds found in this category... Publish yours in Admin Mode!
            </div>
          ) : (
            filteredBuilds.map((build, idx) => (
              <motion.div
                key={build.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(idx * 0.04, 0.4) }}
                className="bg-minecraft-deep/40 rounded-2xl border border-white/5 overflow-hidden flex flex-col hover:border-amber-500/20 transition-all duration-200 shadow-xl group"
              >
                {/* Image panel */}
                <div className="h-40 w-full relative overflow-hidden bg-slate-950">
                  <img
                    src={build.image}
                    alt={build.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  
                  {/* Category tag */}
                  <span className="absolute top-3 left-3 text-[8px] font-mono font-bold text-amber-400 bg-slate-950/80 px-2.5 py-1 rounded-full border border-amber-500/30 uppercase tracking-widest backdrop-blur-md">
                    {build.category}
                  </span>

                  {/* Actions overlay */}
                  {isAdminUnlocked && (
                    <div className="absolute top-3 right-3 flex items-center gap-1">
                      <button
                        onClick={() => handleEditClick(build)}
                        className="bg-slate-950/80 p-1.5 hover:bg-slate-900 rounded-lg text-amber-400 border border-white/10 cursor-pointer backdrop-blur-md transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(build.id)}
                        className="bg-slate-950/80 p-1.5 hover:bg-rose-950 rounded-lg text-rose-400 border border-white/10 cursor-pointer backdrop-blur-md transition-colors"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Text Body */}
                <div className="p-4 space-y-1.5">
                  <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wide truncate">{build.title}</h3>
                  <p className="text-[10px] text-white/60 leading-relaxed font-sans">{build.description}</p>
                  
                  {/* Builder details */}
                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/30">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-amber-400" />
                      <span>Builder: <span className="text-white">{build.builder}</span></span>
                    </span>
                    <span>STRAYZIL ARCHITECTURE</span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* ADMIN OVERLAY FORM */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#070B19] border-2 border-amber-500/50 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-gradient-to-r from-amber-500/10 to-transparent px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5 uppercase">
                  <Hammer className="w-4 h-4 text-amber-400" />
                  <span>{editId ? "Modify" : "Exhibit"} Minecraft Build</span>
                </span>
                <button
                  onClick={resetForm}
                  className="p-1 hover:bg-white/5 text-white/40 hover:text-white rounded transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-4 space-y-4 overflow-y-auto flex-1">
                {/* Build Title */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Build Project Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                    placeholder="e.g. Iron Golem Megafactory"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Builder name */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Master Builder</label>
                  <input
                    type="text"
                    value={formBuilder}
                    onChange={(e) => setFormBuilder(e.target.value)}
                    required
                    placeholder="e.g. Steve_The_Great"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>

                {/* Image URL */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Display Screenshot URL</label>
                  <input
                    type="text"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    placeholder="https://images.unsplash.com/... (optional)"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Project Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#070B19] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Houses">Houses</option>
                    <option value="Castles">Castles</option>
                    <option value="Farms">Farms</option>
                    <option value="Redstone">Redstone</option>
                    <option value="Cities">Cities</option>
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Project Description & Materials</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    required
                    rows={3}
                    placeholder="Describe how the build was planned, blocks used, and performance metrics..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-500 resize-none font-sans"
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-end gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-xs font-mono font-semibold uppercase tracking-wider text-white/60 hover:text-white rounded-lg hover:bg-white/5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg flex items-center gap-1 shadow-lg shadow-amber-400/10 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Exhibit Build</span>
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
