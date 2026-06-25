import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, MessageSquare, Share2, Send, Plus, Users, Globe, Smile } from "lucide-react";
import { LocalDataService, CommunityPost } from "../services/dataService";
import { AuthService } from "../services/auth.ts";

export default function CommunityTab() {
  const [posts, setPosts] = useState<CommunityPost[]>(LocalDataService.getPosts());
  const [newPostContent, setNewPostContent] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");
  const [showShareNotification, setShowShareNotification] = useState<string | null>(null);

  // Get current user profile for comments or authoring posts
  const profile = AuthService.getProfile();

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost = LocalDataService.addPost(
      profile.username,
      profile.avatarUrl,
      newPostContent.trim()
    );

    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setIsCreating(false);
  };

  const handleLike = (postId: string) => {
    LocalDataService.likePost(postId);
    // Reload from local storage
    setPosts(LocalDataService.getPosts());
  };

  const handleAddComment = (e: React.FormEvent, postId: string) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    LocalDataService.addComment(postId, profile.username, commentText.trim());
    setCommentText("");
    // Reload from storage
    setPosts(LocalDataService.getPosts());
  };

  const handleShare = (postId: string) => {
    // Emulate sharing link
    const shareUrl = `${window.location.origin}/community/post/${postId}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setShowShareNotification(postId);
      setTimeout(() => setShowShareNotification(null), 2500);
    }).catch(() => {
      // Fallback
      alert(`Shared: ${shareUrl}`);
    });
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5 pb-24 select-none">
      
      {/* Header Info */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-xs text-minecraft-cyan font-semibold uppercase tracking-wider font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>Overworld Hub</span>
          </div>
          <h2 className="text-lg font-bold text-white tracking-tight">Community Feed</h2>
        </div>
        
        {/* Toggle Compose Button */}
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="flex items-center gap-1 px-3 py-1.5 bg-minecraft-blue hover:bg-minecraft-light/80 text-white text-[11px] font-bold rounded-lg transition-all duration-200 cursor-pointer border border-minecraft-light/30 shadow-[0_2px_8px_rgba(61,107,219,0.2)] active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Compose</span>
        </button>
      </div>

      {/* Share Toast Notification */}
      <AnimatePresence>
        {showShareNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-12 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-emerald-500/90 text-white rounded-lg text-xs font-semibold shadow-lg z-50 flex items-center gap-1.5 backdrop-blur-md border border-emerald-400/40"
          >
            <span>📋 Post link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compose Form */}
      <AnimatePresence>
        {isCreating && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleCreatePost}
            className="overflow-hidden p-4 rounded-xl bg-minecraft-deep border border-minecraft-cyan/30 space-y-3 mc-border-blocky"
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md overflow-hidden bg-minecraft-blue border border-white/10">
                <img src={profile.avatarUrl} alt={profile.username} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
              <span className="text-[11px] font-bold font-mono text-white/95">{profile.username}</span>
              <span className="text-[9px] px-1.5 py-0.2 bg-minecraft-cyan/10 text-minecraft-cyan border border-minecraft-cyan/20 rounded font-mono uppercase">Author</span>
            </div>

            <textarea
              placeholder="What are you building in Minecraft today? Share coordinates, builds, or advice..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              maxLength={280}
              rows={3}
              className="w-full p-2.5 bg-[#050813] text-white text-xs rounded-lg border border-white/10 focus:outline-none focus:border-minecraft-cyan/50 resize-none placeholder-white/30 leading-relaxed font-sans"
            />

            <div className="flex items-center justify-between pt-1">
              <span className="text-[9px] text-white/40 font-mono">{280 - newPostContent.length} characters left</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-2.5 py-1 text-[11px] text-white/60 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1 px-3 py-1 bg-minecraft-cyan hover:bg-cyan-400 text-minecraft-dark text-[11px] font-extrabold rounded-md cursor-pointer transition-colors"
                >
                  <Send className="w-3 h-3" />
                  <span>Publish</span>
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Community Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="p-8 text-center text-xs text-white/40 bg-white/5 rounded-xl border border-white/5 font-mono">
            🌍 The Overworld is silent... be the first to publish a post!
          </div>
        ) : (
          posts.map((post) => (
            <motion.div
              key={post.id}
              layout
              className="p-4 rounded-xl bg-minecraft-deep/60 border border-minecraft-blue/20 space-y-3"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg overflow-hidden bg-minecraft-blue border border-white/10 shrink-0">
                    <img src={post.authorAvatar} alt={post.author} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-white leading-tight font-mono">{post.author}</h4>
                    <span className="text-[9px] text-white/40 font-mono flex items-center gap-1">
                      <Globe className="w-2.5 h-2.5 text-minecraft-cyan/50" />
                      {post.date}
                    </span>
                  </div>
                </div>
                
                {/* Simulated category tag */}
                <span className="text-[8px] font-mono uppercase text-minecraft-cyan/80 bg-minecraft-cyan/10 px-1.5 py-0.5 rounded border border-minecraft-cyan/20">
                  Minecraft Sandbox
                </span>
              </div>

              {/* Post Content */}
              <p className="text-[11px] text-white/80 leading-relaxed font-sans whitespace-pre-wrap select-text selection:bg-minecraft-light">
                {post.content}
              </p>

              {/* Action Buttons Row */}
              <div className="flex items-center gap-5 pt-2 border-t border-white/5">
                {/* Like Button */}
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 text-[10px] font-mono cursor-pointer transition-colors ${post.likedByUser ? "text-rose-400" : "text-white/40 hover:text-white/60"}`}
                >
                  <Heart className={`w-3.5 h-3.5 ${post.likedByUser ? "fill-rose-400 text-rose-400" : ""}`} />
                  <span>{post.likes}</span>
                </button>

                {/* Comment Toggle Button */}
                <button
                  onClick={() => setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)}
                  className={`flex items-center gap-1.5 text-[10px] font-mono cursor-pointer transition-colors ${activeCommentPostId === post.id ? "text-minecraft-cyan" : "text-white/40 hover:text-white/60"}`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{post.commentsCount} Comments</span>
                </button>

                {/* Share Button */}
                <button
                  onClick={() => handleShare(post.id)}
                  className="flex items-center gap-1.5 text-[10px] font-mono text-white/40 hover:text-white/60 cursor-pointer ml-auto"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Expandable Comments Drawer */}
              {activeCommentPostId === post.id && (
                <div className="mt-3 pt-3 border-t border-white/5 space-y-3 animate-fade-in bg-black/15 p-3 rounded-lg">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider block">Discussion Tray</span>

                  {/* List existing comments */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto">
                    {post.comments.length === 0 ? (
                      <p className="text-[10px] text-white/30 italic py-1">No comments yet. Write the first response!</p>
                    ) : (
                      post.comments.map((comment, cidx) => (
                        <div key={cidx} className="text-[10px] bg-white/2 p-2 rounded border border-white/5">
                          <div className="flex justify-between items-center mb-0.5 font-mono">
                            <span className="font-bold text-minecraft-cyan">{comment.author}</span>
                            <span className="text-[8px] text-white/30">{comment.date}</span>
                          </div>
                          <p className="text-white/80 leading-relaxed font-sans">{comment.content}</p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Add comment form */}
                  <form onSubmit={(e) => handleAddComment(e, post.id)} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Write a friendly reply..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="flex-1 px-2.5 py-1.5 bg-[#050813] text-xs text-white placeholder-white/30 rounded border border-white/10 focus:outline-none focus:border-minecraft-cyan/50"
                    />
                    <button
                      type="submit"
                      className="px-3 bg-minecraft-blue text-white hover:bg-minecraft-light/80 text-xs font-bold rounded border border-minecraft-light/30 cursor-pointer"
                    >
                      Reply
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
