import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Send, Sparkles, AlertTriangle, Lightbulb, MessageSquare, Check, Mail } from "lucide-react";

interface CommunityFeedbackProps {
  onBack: () => void;
}

type FeedbackType = "feature" | "bug" | "suggestion" | "other";

export default function CommunityFeedback({ onBack }: CommunityFeedbackProps) {
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("feature");
  const [feedbackTitle, setFeedbackTitle] = useState("");
  const [feedbackBody, setFeedbackBody] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackTitle.trim() || !feedbackBody.trim()) return;

    // Build mailto link as requested: "opens the user's email app with pre-filled content"
    const subject = `[StrayzilBase Feedback] [${feedbackType.toUpperCase()}] ${feedbackTitle.trim()}`;
    const mailtoBody = `Type: ${feedbackType.toUpperCase()}\nUser Contact: ${userEmail || "Anonymous"}\n\nMessage:\n${feedbackBody.trim()}\n\n-- Sent via StrayzilBase v0.1 Companion App`;
    const mailtoUrl = `mailto:strayzilent@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailtoBody)}`;

    // Open mail client
    window.location.href = mailtoUrl;

    // Show visual confirmation
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
      // Clear fields
      setFeedbackTitle("");
      setFeedbackBody("");
      setUserEmail("");
    }, 3500);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#070B19] select-none h-full relative overflow-hidden font-sans">
      {/* Decorative Cyan/Blue Background */}
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
        <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase tracking-wider">Community Feedback</span>
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-14 left-1/2 transform -translate-x-1/2 px-4 py-2.5 bg-cyan-500 text-slate-950 rounded-xl text-xs font-bold shadow-2xl z-50 flex items-center gap-2 border border-cyan-400/40"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Opening email client pre-filled... Thanks!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form Content Area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24 z-10 relative">
        {/* Banner */}
        <div className="text-center space-y-2 p-5 bg-gradient-to-b from-cyan-500/15 via-minecraft-deep to-[#070B19] rounded-2xl border border-cyan-500/30 shadow-[0_10px_30px_rgba(6,182,212,0.05)] mc-border-blocky">
          <div className="inline-flex p-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 text-cyan-400 mb-1">
            <Mail className="w-6 h-6" />
          </div>
          <h2 className="text-base font-extrabold text-white font-mono tracking-wider uppercase">
            Community Feedback Portal
          </h2>
          <p className="text-[10px] text-white/70 max-w-[90%] mx-auto leading-relaxed font-sans">
            Have a brilliant feature request, caught a bug in the companion guides, or want to drop suggestions? Send direct feedback to <span className="text-cyan-400 underline font-mono select-all font-bold">strayzilent@gmail.com</span>.
          </p>
        </div>

        {/* Feedback Type Select Grid */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setFeedbackType("feature")}
            className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all duration-150 cursor-pointer ${
              feedbackType === "feature"
                ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
                : "bg-white/3 border-white/5 text-white/40 hover:bg-white/5"
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Feature Request</span>
          </button>

          <button
            onClick={() => setFeedbackType("bug")}
            className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all duration-150 cursor-pointer ${
              feedbackType === "bug"
                ? "bg-rose-500/10 border-rose-500/40 text-rose-400"
                : "bg-white/3 border-white/5 text-white/40 hover:bg-white/5"
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Bug Report</span>
          </button>

          <button
            onClick={() => setFeedbackType("suggestion")}
            className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all duration-150 cursor-pointer ${
              feedbackType === "suggestion"
                ? "bg-amber-500/10 border-amber-500/40 text-amber-400"
                : "bg-white/3 border-white/5 text-white/40 hover:bg-white/5"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Suggestion</span>
          </button>

          <button
            onClick={() => setFeedbackType("other")}
            className={`p-3 rounded-xl border flex flex-col items-center text-center gap-1.5 transition-all duration-150 cursor-pointer ${
              feedbackType === "other"
                ? "bg-purple-500/10 border-purple-500/40 text-purple-400"
                : "bg-white/3 border-white/5 text-white/40 hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Other / Chat</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[9px] text-white/40 font-mono block uppercase">Your Email / Username (Optional)</label>
            <input
              type="text"
              placeholder="e.g. steve@gmail.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] text-white/40 font-mono block uppercase">Feedback Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Suggestion for new Ore Tracker tool"
              value={feedbackTitle}
              onChange={(e) => setFeedbackTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[9px] text-white/40 font-mono block uppercase">Detailed Description</label>
            <textarea
              required
              rows={5}
              placeholder="Provide complete steps to reproduce a bug, or detailed reasons why your feature request is awesome..."
              value={feedbackBody}
              onChange={(e) => setFeedbackBody(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 active:translate-y-0.5 text-slate-950 font-mono font-black text-xs uppercase rounded-xl border border-cyan-500 shadow-[0_6px_20px_rgba(6,182,212,0.2)] flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer"
          >
            <Send className="w-4 h-4 fill-slate-950 text-slate-950 animate-bounce" />
            <span className="tracking-widest">Compile & Send Pre-filled Mail</span>
          </button>
        </form>

        {/* Info card */}
        <div className="p-3 bg-cyan-500/5 rounded-lg border border-cyan-500/10 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
          <p className="text-[9px] text-cyan-300/60 leading-relaxed font-mono">
            Submitting this form prepares a prefilled drafts template directly inside your default mail handler (Gmail/Outlook), allowing direct transmission of code, logs, and suggestions securely!
          </p>
        </div>
      </div>
    </div>
  );
}
