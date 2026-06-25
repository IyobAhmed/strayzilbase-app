import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Plus, Compass, Copy, Check, Edit2, Trash, X, Sparkles } from "lucide-react";
import { LocalDataService, Seed } from "../services/dataService";

interface SeedVaultProps {
  onBack: () => void;
  isAdminUnlocked?: boolean;
}

export default function SeedVault({ onBack, isAdminUnlocked = false }: SeedVaultProps) {
  const [seeds, setSeeds] = useState<Seed[]>(() => LocalDataService.getSeeds());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Admin form state
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form fields
  const [formName, setFormName] = useState("");
  const [formSeedNumber, setFormSeedNumber] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCoordinates, setFormCoordinates] = useState("");
  const [formCategory, setFormCategory] = useState("Survival");

  const resetForm = () => {
    setFormName("");
    setFormSeedNumber("");
    setFormDescription("");
    setFormCoordinates("");
    setFormCategory("Survival");
    setEditId(null);
    setShowForm(false);
  };

  const handleOpenAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditClick = (seed: Seed) => {
    setEditId(seed.id);
    setFormName(seed.name);
    setFormSeedNumber(seed.seedNumber);
    setFormDescription(seed.description);
    setFormCoordinates(seed.coordinates);
    setFormCategory(seed.category || "Survival");
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSeedNumber.trim() || !formDescription.trim() || !formCoordinates.trim()) return;

    const data = {
      name: formName.trim(),
      seedNumber: formSeedNumber.trim(),
      description: formDescription.trim(),
      coordinates: formCoordinates.trim(),
      category: formCategory.trim()
    };

    if (editId) {
      LocalDataService.updateSeed(editId, data);
    } else {
      LocalDataService.addSeed(data);
    }

    setSeeds(LocalDataService.getSeeds());
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this seed permanently?")) {
      LocalDataService.deleteSeed(id);
      setSeeds(LocalDataService.getSeeds());
    }
  };

  const handleCopySeed = (seedNumber: string, seedId: string) => {
    navigator.clipboard.writeText(seedNumber).then(() => {
      setCopiedId(seedId);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      alert(`Seed: ${seedNumber}`);
    });
  };

  return (
    <div className="flex-1 flex flex-col bg-[#070B19] select-none h-full relative overflow-hidden font-sans">
      {/* Decorative Emerald/Teal Gradient */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none z-0"></div>

      {/* Header Panel */}
      <div className="px-4 py-3 bg-[#070B19]/90 border-b border-white/5 flex items-center justify-between shrink-0 z-10 relative">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold font-mono py-1.5 cursor-pointer active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-400" />
          <span>PORTAL BACK</span>
        </button>
        <div className="flex items-center gap-2">
          {isAdminUnlocked && (
            <button
              onClick={handleOpenAddForm}
              className="px-2 py-1 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 font-mono font-bold text-[9px] uppercase rounded flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
              <span>Add Seed</span>
            </button>
          )}
          <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">Seed Vault</span>
        </div>
      </div>

      {/* Seeds list scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24 z-10 relative">
        
        {/* Banner */}
        <div className="text-center space-y-2 p-5 bg-gradient-to-b from-emerald-500/15 via-minecraft-deep to-[#070B19] rounded-2xl border border-emerald-500/30 shadow-[0_10px_30px_rgba(16,185,129,0.05)] mc-border-blocky">
          <div className="inline-flex p-2 bg-emerald-500/10 rounded-full border border-emerald-500/30 text-emerald-400 mb-1">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-base font-extrabold text-white font-mono tracking-wider uppercase">
            Minecraft Seed Vault
          </h2>
          <p className="text-[10px] text-white/70 max-w-[90%] mx-auto leading-relaxed">
            Discover spectacular spawns, deep cave complexes, double mansions, and pristine build hubs. Click the clip button to copy the seed directly!
          </p>
        </div>

        {/* Seeds Cards */}
        <div className="space-y-4">
          {seeds.length === 0 ? (
            <div className="p-8 text-center text-xs text-white/40 bg-white/2 rounded-xl border border-white/5 font-mono">
              🌾 No custom seeds found... Add your first seed in Admin Mode!
            </div>
          ) : (
            seeds.map((seed, idx) => (
              <motion.div
                key={seed.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.04, 0.4) }}
                className="p-4 rounded-xl border border-white/5 bg-minecraft-deep/30 space-y-3 relative hover:border-emerald-500/20 transition-all duration-200"
              >
                {/* Header info */}
                <div className="flex items-start justify-between gap-2 border-b border-white/5 pb-2">
                  <div>
                    <span className="text-[8px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {seed.category || "Survival"}
                    </span>
                    <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wide pt-1">{seed.name}</h3>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleCopySeed(seed.seedNumber, seed.id)}
                      className="px-2.5 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-emerald-400 font-mono font-bold text-[9px] uppercase rounded flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
                    >
                      {copiedId === seed.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Seed</span>
                        </>
                      )}
                    </button>

                    {isAdminUnlocked && (
                      <div className="flex items-center gap-0.5">
                        <button
                          onClick={() => handleEditClick(seed)}
                          className="text-emerald-400 p-1 hover:bg-emerald-500/10 rounded cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(seed.id)}
                          className="text-rose-400 p-1 hover:bg-rose-500/10 rounded cursor-pointer"
                        >
                          <Trash className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Seed Number and Coordinates */}
                <div className="grid grid-cols-2 gap-2 font-mono text-[10px] p-2 bg-black/15 rounded-lg">
                  <div>
                    <span className="text-[8px] text-white/30 uppercase block">Seed Number</span>
                    <span className="text-white font-bold select-all">{seed.seedNumber}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-white/30 uppercase block">Coordinates</span>
                    <span className="text-emerald-400 font-bold">{seed.coordinates}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-[11px] text-white/70 leading-relaxed font-sans">{seed.description}</p>
              </motion.div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />
          <p className="text-[9px] text-emerald-300/60 leading-relaxed font-mono">
            Seeds are compatible with Minecraft Java & Bedrock Edition v1.20 and v1.21. Coordinates point directly to spawn points or unique terrain landmarks!
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
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 font-sans"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#070B19] border-2 border-emerald-500/50 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-gradient-to-r from-emerald-500/10 to-transparent px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5 uppercase">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span>{editId ? "Modify" : "Add"} Minecraft Seed</span>
                </span>
                <button
                  onClick={resetForm}
                  className="p-1 hover:bg-white/5 text-white/40 hover:text-white rounded transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-4 space-y-4 overflow-y-auto flex-1">
                {/* Seed Name */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Seed Landmark Name</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    placeholder="e.g. Double Mansion Spawner"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Seed Number */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Seed Number</label>
                  <input
                    type="text"
                    value={formSeedNumber}
                    onChange={(e) => setFormSeedNumber(e.target.value)}
                    required
                    placeholder="e.g. -459039203922901"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                {/* Coordinates */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Feature Coordinates</label>
                  <input
                    type="text"
                    value={formCoordinates}
                    onChange={(e) => setFormCoordinates(e.target.value)}
                    required
                    placeholder="e.g. X: 120, Y: 64, Z: -250"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-[#070B19] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Survival">Survival spawn</option>
                    <option value="Village">Village</option>
                    <option value="Scenic">Scenic/Mountain</option>
                    <option value="Cave">Cave/Trial Chamber</option>
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Description & Unique Aspects</label>
                  <textarea
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    required
                    rows={3}
                    placeholder="Describe what makes this seed amazing..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-emerald-500 resize-none font-sans"
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
                    className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg flex items-center gap-1 shadow-lg shadow-emerald-400/10 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Save Seed</span>
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
