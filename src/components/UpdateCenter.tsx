import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Plus, History, Bug, Edit2, Trash, X, Check, Calendar, Settings } from "lucide-react";
import { LocalDataService, UpdateLog } from "../services/dataService";

interface UpdateCenterProps {
  onBack: () => void;
  isAdminUnlocked?: boolean;
}

export default function UpdateCenter({ onBack, isAdminUnlocked = false }: UpdateCenterProps) {
  const [logs, setLogs] = useState<UpdateLog[]>(() => LocalDataService.getUpdates());

  // Admin states
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Form states
  const [formVersion, setFormVersion] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formType, setFormType] = useState<"major" | "minor" | "patch">("minor");
  const [formFeaturesText, setFormFeaturesText] = useState("");
  const [formBugfixesText, setFormBugfixesText] = useState("");

  const resetForm = () => {
    setFormVersion("");
    setFormDate(new Date().toISOString().split("T")[0]);
    setFormType("minor");
    setFormFeaturesText("");
    setFormBugfixesText("");
    setEditId(null);
    setShowForm(false);
  };

  const handleOpenAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const handleEditClick = (log: UpdateLog) => {
    setEditId(log.id);
    setFormVersion(log.version);
    setFormDate(log.date);
    setFormType(log.type);
    setFormFeaturesText(log.newFeatures.join("\n"));
    setFormBugfixesText(log.bugFixes.join("\n"));
    setShowForm(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formVersion.trim() || !formDate.trim()) return;

    const newFeatures = formFeaturesText
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const bugFixes = formBugfixesText
      .split("\n")
      .map(item => item.trim())
      .filter(item => item.length > 0);

    const data = {
      version: formVersion.trim(),
      date: formDate.trim(),
      type: formType,
      newFeatures,
      bugFixes
    };

    if (editId) {
      LocalDataService.updateUpdate(editId, data);
    } else {
      LocalDataService.addUpdate(data);
    }

    setLogs(LocalDataService.getUpdates());
    resetForm();
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this changelog entry permanently?")) {
      LocalDataService.deleteUpdate(id);
      setLogs(LocalDataService.getUpdates());
    }
  };

  const getTypeStyle = (type: "major" | "minor" | "patch") => {
    switch (type) {
      case "major":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "minor":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "patch":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#070B19] select-none h-full relative overflow-hidden font-sans">
      {/* Decorative Purple/Indigo Background */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-purple-500/10 to-transparent pointer-events-none z-0"></div>

      {/* Header Panel */}
      <div className="px-4 py-3 bg-[#070B19]/90 border-b border-white/5 flex items-center justify-between shrink-0 z-10 relative">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold font-mono py-1.5 cursor-pointer active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-4 h-4 text-purple-400" />
          <span>PORTAL BACK</span>
        </button>
        <div className="flex items-center gap-2">
          {isAdminUnlocked && (
            <button
              onClick={handleOpenAddForm}
              className="px-2 py-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 text-slate-950 font-mono font-bold text-[9px] uppercase rounded flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3 stroke-[3]" />
              <span>Add Log</span>
            </button>
          )}
          <span className="text-[10px] font-mono text-purple-400 font-semibold uppercase tracking-wider">Update Center</span>
        </div>
      </div>

      {/* Update Logs Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 pb-24 z-10 relative">
        {/* Banner Header */}
        <div className="text-center space-y-2 p-5 bg-gradient-to-b from-purple-500/15 via-minecraft-deep to-[#070B19] rounded-2xl border border-purple-500/30 shadow-[0_10px_30px_rgba(168,85,247,0.05)] mc-border-blocky">
          <div className="inline-flex p-2 bg-purple-500/10 rounded-full border border-purple-500/30 text-purple-400 mb-1 animate-pulse">
            <History className="w-6 h-6" />
          </div>
          <h2 className="text-base font-extrabold text-white font-mono tracking-wider uppercase">
            Strayzil Changelog History
          </h2>
          <p className="text-[10px] text-white/70 max-w-[90%] mx-auto leading-relaxed">
            Monitor version logs, incremental patch descriptions, visual updates, bug diagnostics, and feature drops across the Strayzil companion app lifecycle.
          </p>
        </div>

        {/* Logs List */}
        <div className="space-y-6">
          {logs.length === 0 ? (
            <div className="p-8 text-center text-xs text-white/40 bg-white/2 rounded-xl border border-white/5 font-mono">
              📜 No update logs found... Write the first entry in Admin Mode!
            </div>
          ) : (
            logs.map((log, idx) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                className="bg-minecraft-deep/30 border border-white/5 rounded-2xl p-5 space-y-4 hover:border-purple-500/20 transition-colors duration-200"
              >
                {/* Version & Date */}
                <div className="flex items-start justify-between border-b border-white/5 pb-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-white font-mono tracking-wide">{log.version}</h3>
                      <span className={`text-[8px] font-mono font-bold uppercase tracking-widest border px-1.5 py-0.5 rounded ${getTypeStyle(log.type)}`}>
                        {log.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>Released: {log.date}</span>
                    </div>
                  </div>

                  {isAdminUnlocked && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleEditClick(log)}
                        className="text-purple-400 p-1.5 hover:bg-purple-500/10 rounded cursor-pointer transition-colors"
                        title="Edit Changelog"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(log.id)}
                        className="text-rose-400 p-1.5 hover:bg-rose-500/10 rounded cursor-pointer transition-colors"
                        title="Delete Changelog"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* New Features Drop */}
                {log.newFeatures && log.newFeatures.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      <span>Features Introduced</span>
                    </span>
                    <ul className="space-y-1 pl-1">
                      {log.newFeatures.map((feat, fIdx) => (
                        <li key={fIdx} className="text-[11px] text-white/70 flex items-start gap-1.5 leading-relaxed">
                          <span className="text-emerald-500 font-mono shrink-0 font-bold">✔</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bug Fixes */}
                {log.bugFixes && log.bugFixes.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Bug className="w-3.5 h-3.5 text-purple-400" />
                      <span>Repairs & Optimizations</span>
                    </span>
                    <ul className="space-y-1 pl-1">
                      {log.bugFixes.map((fix, bIdx) => (
                        <li key={bIdx} className="text-[11px] text-white/60 flex items-start gap-1.5 leading-relaxed">
                          <span className="text-purple-400 font-mono shrink-0 font-bold">🛠</span>
                          <span>{fix}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
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
              className="bg-[#070B19] border-2 border-purple-500/50 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-gradient-to-r from-purple-500/10 to-transparent px-4 py-3 border-b border-white/5 flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5 uppercase">
                  <History className="w-4 h-4 text-purple-400" />
                  <span>{editId ? "Modify" : "Publish"} Release Log</span>
                </span>
                <button
                  onClick={resetForm}
                  className="p-1 hover:bg-white/5 text-white/40 hover:text-white rounded transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-4 space-y-4 overflow-y-auto flex-1">
                {/* Version */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Version Number</label>
                  <input
                    type="text"
                    value={formVersion}
                    onChange={(e) => setFormVersion(e.target.value)}
                    required
                    placeholder="e.g. v0.1.0-Launch"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Date */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Release Date</label>
                  <input
                    type="text"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    required
                    placeholder="YYYY-MM-DD"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* Release Type */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Release Scope</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full bg-[#070B19] border border-white/10 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="major">Major Upgrade</option>
                    <option value="minor">Minor Feature Drop</option>
                    <option value="patch">Patch Repair</option>
                  </select>
                </div>

                {/* Features list */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Features Introduced (One per line)</label>
                  <textarea
                    value={formFeaturesText}
                    onChange={(e) => setFormFeaturesText(e.target.value)}
                    rows={3}
                    placeholder="Added offline enchantment tool&#10;Added profile bio edits..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-purple-500 resize-none font-sans"
                  />
                </div>

                {/* Bug fixes list */}
                <div className="space-y-1">
                  <label className="text-[9px] text-white/40 font-mono block uppercase">Bugfixes & Optimizations (One per line)</label>
                  <textarea
                    value={formBugfixesText}
                    onChange={(e) => setFormBugfixesText(e.target.value)}
                    rows={3}
                    placeholder="Fixed light mode text readability&#10;Corrected dev HMR console issues..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-purple-500 resize-none font-sans"
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
                    className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 bg-purple-400 hover:bg-purple-300 rounded-lg flex items-center gap-1 shadow-lg shadow-purple-400/10 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Publish Log</span>
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
