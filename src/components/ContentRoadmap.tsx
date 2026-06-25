import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Plus, Calendar, Compass, Edit2, Trash, X, Check, Eye } from "lucide-react";
import { LocalDataService, RoadmapItem } from "../services/dataService";

interface ContentRoadmapProps {
  onBack: () => void;
  isAdminUnlocked?: boolean;
}

export default function ContentRoadmap({ onBack, isAdminUnlocked = false }: ContentRoadmapProps) {
  const [items, setItems] = useState<RoadmapItem[]>(() => LocalDataService.getRoadmap());
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Admin states
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  // Form fields
  const [formTitle, setFormTitle] = useState("");
  const [formCategory, setFormCategory] = useState<"Coming Soon Features" | "Website Progress" | "App Updates" | "Community Goals">("Coming Soon Features");
  const [formDescription, setFormDescription] = useState("");
  const [formStatus, setFormStatus] = useState<"planned" | "in-progress" | "completed">("planned");
  const [formTargetDate, setFormTargetDate] = useState("");

  const resetForm = () => {
    setFormTitle("");
    setFormCategory("Coming Soon Features");
    setFormDescription("");
    setFormStatus("planned");
    setFormTargetDate("");
    setEditId(null);
    setShowForm(false);
  };

  const handleOpenAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditClick = (item: RoadmapItem) => {
    setEditId(item.id);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormDescription(item.description);
    setFormStatus(item.status);
    setFormTargetDate(item.targetDate);
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim() || !formTargetDate.trim()) return;

    const data = {
      title: formTitle.trim(),
      category: formCategory,
      description: formDescription.trim(),
      status: formStatus,
      targetDate: formTargetDate.trim()
    };

    if (editId) {
      LocalDataService.updateRoadmap(editId, data);
    } else {
      LocalDataService.addRoadmap(data);
    }

    setItems(LocalDataService.getRoadmap());
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this roadmap goal?")) {
      LocalDataService.deleteRoadmap(id);
      setItems(LocalDataService.getRoadmap());
    }
  };

  const categories = ["All", "Coming Soon Features", "Website Progress", "App Updates", "Community Goals"];

  const filteredItems = selectedCategory === "All" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const getStatusStyle = (status: "planned" | "in-progress" | "completed") => {
    switch (status) {
      case "planned":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      case "in-progress":
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    }
  };

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
        <div className="flex items-center gap-2">
          {isAdminUnlocked && (
            <button
              onClick={handleOpenAddForm}
              className="px-2 py-1 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-slate-950 font-mono font-bold text-[9px] uppercase rounded flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
              <span>Add Goal</span>
            </button>
          )}
          <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">Content Roadmap</span>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="bg-[#070B19]/50 border-b border-white/5 py-2.5 px-4 shrink-0 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth z-10 relative">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-150 cursor-pointer ${
              selectedCategory === cat
                ? "bg-cyan-500 text-slate-950 shadow-[0_2px_8px_rgba(6,182,212,0.3)] font-bold"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Roadmap Items Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 pb-24 z-10 relative">
        {/* Banner */}
        <div className="text-center space-y-2 p-5 bg-gradient-to-b from-cyan-500/15 via-minecraft-deep to-[#070B19] rounded-2xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(6,182,212,0.05)] mc-border-blocky">
          <div className="inline-flex p-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 text-cyan-400 mb-1">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-base font-extrabold text-white font-mono tracking-wider uppercase">
            Strayzil Content Roadmap
          </h2>
          <p className="text-[10px] text-white/70 max-w-[90%] mx-auto leading-relaxed">
            Follow our development log, upcoming server-side AI expansions, custom website integrations, and major gameplay tool release targets.
          </p>
        </div>

        {/* List */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs text-white/40 bg-white/2 rounded-xl border border-white/5 font-mono">
              🚧 No roadmap entries found in this category... Add goals in Admin Mode!
            </div>
          ) : (
            filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.04, 0.4) }}
                className="p-4 rounded-xl border border-white/5 bg-minecraft-deep/30 space-y-2.5 relative hover:border-cyan-500/20 transition-all duration-200"
              >
                {/* Header Row: Title, status, actions */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-white tracking-tight pt-1">{item.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-1 shrink-0">
                    <span className={`text-[8px] font-mono font-extrabold border px-2 py-0.5 rounded uppercase tracking-widest ${getStatusStyle(item.status)}`}>
                      {item.status === "planned" ? "Planned" : item.status === "in-progress" ? "Working" : "Done"}
                    </span>

                    {isAdminUnlocked && (
                      <div className="flex items-center gap-0.5 ml-1">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="text-cyan-400 p-1 hover:bg-cyan-500/10 rounded cursor-pointer"
                          title="Edit"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-rose-400 p-1 hover:bg-rose-500/10 rounded cursor-pointer"
                          title="Delete"
                        >
                          <Trash className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-white/70 leading-relaxed font-sans">{item.description}</p>

                {/* Footer block */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[9px] font-mono text-white/30">
                  <span className="flex items-center gap-1 uppercase">
                    <Calendar className="w-3 h-3 text-cyan-400" />
                    <span>Target Date: <span className="text-white">{item.targetDate}</span></span>
                  </span>
                  <span>STRAYZIL ROADMAP v0.1</span>
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
              className="bg-[#070B19] border-2 border-cyan-500/50 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-gradient-to-r from-cyan-500/10 to-transparent px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5 uppercase">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>{editId ? "Modify" : "Create"} Roadmap Goal</span>
                </span>
                <button
                  onClick={resetForm}
                  className="p-1 hover:bg-white/5 text-white/40 hover:text-white rounded transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-4 space-y-4 overflow-y-auto flex-1">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Goal Title</label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    required
                    placeholder="e.g. 1.21 Trial Guides"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full bg-[#070B19] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Coming Soon Features">Coming Soon Features</option>
                    <option value="Website Progress">Website Progress</option>
                    <option value="App Updates">App Updates</option>
                    <option value="Community Goals">Community Goals</option>
                  </select>
                </div>

                {/* Target Date */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Target Date</label>
                  <input
                    type="text"
                    value={formTargetDate}
                    onChange={(e) => setFormTargetDate(e.target.value)}
                    required
                    placeholder="e.g. July 2026, Q3 2026"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                {/* Status */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Development Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full bg-[#070B19] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="planned">Planned</option>
                    <option value="in-progress">In Progress / Active</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Goal Details</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    required
                    rows={4}
                    placeholder="Describe what will be accomplished..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 resize-none"
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
                    className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg flex items-center gap-1 shadow-lg shadow-cyan-400/10 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Enact Goal</span>
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
