import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Calendar, User, Newspaper, ArrowLeft, Heart, MessageSquare, Send, MapPin, Share2 } from "lucide-react";
import { LocalDataService, NewsArticle } from "../services/dataService";
import { AuthService } from "../services/auth.ts";

interface NewsTabProps {
  selectedArticle: NewsArticle | null;
  onSelectArticle: (article: NewsArticle | null) => void;
  isAdminUnlocked?: boolean;
}

export default function NewsTab({ selectedArticle, onSelectArticle, isAdminUnlocked = false }: NewsTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showShareNotification, setShowShareNotification] = useState(false);
  const [dataReloadTrigger, setDataReloadTrigger] = useState(0);

  const news = LocalDataService.getNews();
  const profile = AuthService.getProfile();

  // Find dynamic up-to-date article state from localstorage
  const currentArticle = selectedArticle
    ? news.find((n) => n.id === selectedArticle.id) || selectedArticle
    : null;

  // Search filter logic
  const filteredNews = news.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLike = (articleId: string) => {
    LocalDataService.likeNews(articleId);
    setDataReloadTrigger(prev => prev + 1); // trigger state update to re-fetch
  };

  const handleAddComment = (e: React.FormEvent, articleId: string) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    LocalDataService.addNewsComment(articleId, profile.username, commentText.trim());
    setCommentText("");
    setDataReloadTrigger(prev => prev + 1);
  };

  const handleShare = (articleId: string) => {
    const shareUrl = `${window.location.origin}/news/article/${articleId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShowShareNotification(true);
      setTimeout(() => setShowShareNotification(false), 2000);
    }).catch(() => {
      alert(`Shared Article link: ${shareUrl}`);
    });
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col select-none relative">
      {/* Toast Notification */}
      <AnimatePresence>
        {showShareNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-emerald-500/90 text-white rounded-lg text-xs font-semibold shadow-lg z-50 flex items-center gap-1.5 backdrop-blur-md border border-emerald-400/40 font-mono"
          >
            <span>📋 Article link copied!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!currentArticle ? (
          /* News Feed Grid View */
          <motion.div
            key="news-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Header with Search */}
            <div className="px-4 py-5 space-y-4 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md shrink-0">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs text-sky-400 font-semibold uppercase tracking-wider font-mono">
                  <Newspaper className="w-3.5 h-3.5" />
                  <span>Minecraft Chronicles</span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">Voxel News Hub</h2>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Search articles, drops..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-900 text-xs text-white placeholder-white/30 rounded-lg border border-white/10 focus:outline-none focus:border-sky-500/50 transition-colors font-sans"
                />
              </div>
            </div>

            {/* Scrollable Articles list */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24">
              {filteredNews.length === 0 ? (
                <div className="p-8 text-center text-xs text-white/40 bg-white/5 rounded-xl font-mono border border-dashed border-white/10">
                  🔍 No news articles matched your search.
                </div>
              ) : (
                filteredNews.map((article, idx) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => onSelectArticle(article)}
                    className="p-3 bg-slate-900/55 hover:bg-slate-900 border border-white/5 hover:border-sky-500/30 rounded-xl flex gap-3 cursor-pointer transition-all duration-200 active:scale-[0.98]"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-800 border border-white/5 relative">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Metadata & Description */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[9px] font-mono text-slate-400">
                          <span className="flex items-center gap-0.5">
                            <Calendar className="w-2.5 h-2.5 text-sky-400" />
                            {article.date}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-sky-300">
                            <User className="w-2.5 h-2.5" />
                            {article.author}
                          </span>
                        </div>
                        <h3 className="text-xs font-bold text-white leading-snug line-clamp-2 hover:text-sky-400 transition-colors">
                          {article.title}
                        </h3>
                      </div>
                      
                      {/* Interactive Tags preview */}
                      <div className="flex items-center justify-between mt-1 text-[9px] font-mono text-slate-400">
                        <span className="line-clamp-1 flex-1 mr-2 text-[10px] text-white/50">
                          {article.summary}
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="flex items-center gap-0.5 text-rose-400">
                            ❤️ {article.likes}
                          </span>
                          <span className="flex items-center gap-0.5 text-sky-400">
                            💬 {article.commentsCount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        ) : (
          /* Full Article Reader View */
          <motion.div
            key="news-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col overflow-hidden bg-[#020617]"
          >
            {/* Back Button Header */}
            <div className="px-4 py-3 bg-[#020617]/90 border-b border-white/5 flex items-center justify-between shrink-0">
              <button
                onClick={() => onSelectArticle(null)}
                className="flex items-center gap-1 text-white/80 hover:text-white text-xs font-bold font-mono py-1.5 cursor-pointer active:scale-95 transition-transform"
              >
                <ArrowLeft className="w-4 h-4 text-sky-400" />
                <span>BACK TO NEWS</span>
              </button>
              <span className="text-[10px] font-mono text-white/30 uppercase">News Reader</span>
            </div>

            {/* Article Content Container */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 pb-24 select-text">
              {/* Feature Banner */}
              <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900 border border-white/10 shrink-0 shadow-lg">
                <img
                  src={currentArticle.thumbnail}
                  alt={currentArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                
                {/* Meta details anchored in banner */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3 text-[10px] text-white/90 font-mono">
                    <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded">
                      <Calendar className="w-3 h-3 text-sky-400" />
                      {currentArticle.date}
                    </span>
                    <span className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded">
                      <User className="w-3 h-3 text-sky-400" />
                      {currentArticle.author}
                    </span>
                  </div>
                </div>
              </div>

              {/* Title & Body */}
              <div className="space-y-3">
                <h1 className="text-base font-extrabold text-white leading-snug tracking-tight">
                  {currentArticle.title}
                </h1>
                
                {/* Author Info Board: Posted By, Date, Where/Location */}
                <div className="p-3 rounded-lg bg-slate-900/80 border border-white/5 space-y-2">
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Publication Data</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <User className="w-3.5 h-3.5 text-sky-400" />
                      <span>By: <b className="text-white font-sans">{currentArticle.author}</b></span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-300">
                      <MapPin className="w-3.5 h-3.5 text-sky-400 animate-bounce" />
                      <span>At: <b className="text-white font-sans">{currentArticle.location || "Mojang HQ"}</b></span>
                    </div>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 pt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-sky-400" />
                    <span>Published On: <b className="text-sky-300 font-sans">{currentArticle.date} (19:00 UTC)</b></span>
                  </div>
                </div>
                
                <div className="p-3 bg-slate-900/40 rounded-lg border-l-2 border-sky-400 text-[11px] text-slate-300 italic leading-relaxed font-sans">
                  {currentArticle.summary}
                </div>

                <div className="text-[11px] text-white/90 space-y-3.5 leading-relaxed font-sans pt-1">
                  <p className="whitespace-pre-wrap">{currentArticle.content}</p>
                </div>
              </div>

              {/* Like / Comment Counter Action Row */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-white/5 pt-2.5">
                <div className="flex items-center gap-4">
                  {/* Like News Button */}
                  <button
                    onClick={() => handleLike(currentArticle.id)}
                    className={`flex items-center gap-1.5 text-[11px] font-mono cursor-pointer transition-colors ${currentArticle.likedByUser ? "text-rose-400" : "text-slate-400 hover:text-white"}`}
                  >
                    <Heart className={`w-4 h-4 ${currentArticle.likedByUser ? "fill-rose-400 text-rose-400" : ""}`} />
                    <span>{currentArticle.likes} Likes</span>
                  </button>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-sky-400">
                    <MessageSquare className="w-4 h-4" />
                    <span>{currentArticle.comments?.length || 0} Comments</span>
                  </div>
                </div>

                <button
                  onClick={() => handleShare(currentArticle.id)}
                  className="flex items-center gap-1 text-[10px] font-mono text-slate-400 hover:text-white cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Reader Discussion Section */}
              <div className="pt-4 border-t border-white/5 space-y-3">
                <h3 className="text-xs font-bold text-white flex items-center gap-1.5 font-mono">
                  <span className="w-1.5 h-3.5 bg-sky-500 rounded-sm"></span>
                  Discussion Feed
                </h3>

                {/* List Comments */}
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {!currentArticle.comments || currentArticle.comments.length === 0 ? (
                    <p className="text-[10px] text-slate-500 italic py-2">No comments left yet. Be the first to start the conversation!</p>
                  ) : (
                    currentArticle.comments.map((comment, cidx) => (
                      <div key={cidx} className="text-[10px] bg-slate-900/40 p-2.5 rounded-lg border border-white/5">
                        <div className="flex justify-between items-center mb-1 font-mono">
                          <span className="font-bold text-sky-400">{comment.author}</span>
                          <span className="text-[8px] text-slate-500">{comment.date}</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed font-sans">{comment.content}</p>
                      </div>
                    ))
                  )}
                </div>

                {/* Add Comment Input Form */}
                <form onSubmit={(e) => handleAddComment(e, currentArticle.id)} className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder={`Reply as ${profile.username}...`}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-950 text-xs text-white placeholder-slate-500 rounded border border-white/10 focus:outline-none focus:border-sky-500/50 font-sans"
                  />
                  <button
                    type="submit"
                    className="px-3.5 bg-sky-500 text-slate-950 hover:bg-sky-400 text-xs font-extrabold rounded cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send</span>
                  </button>
                </form>
              </div>

              {/* Footer metadata details */}
              <div className="pt-4 border-t border-white/5 text-[9px] text-slate-500 leading-relaxed font-mono">
                Mojang Studios, Stockholm, Sweden. Copyright Mojang AB. Articles and reports compiled by StrayzilBase editorial staff.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
