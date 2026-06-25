import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User, Shield, Calendar, Award, Crown, Eye, Trash, Plus, Check, Lock, Unlock,
  Sliders, FileText, BookOpen, Bell, Users, EyeOff, Sparkles, MessageSquare, HardDrive, Palette
} from "lucide-react";
import { AuthService, UserProfile } from "../services/auth";
import { LocalDataService, Announcement, NewsArticle, WikiEntry, Supporter } from "../services/dataService";

interface ProfileTabProps {
  onReloadData: () => void;
  activeTheme?: string;
  onThemeChange?: (theme: string) => void;
  isAdminUnlocked: boolean;
  setIsAdminUnlocked: (val: boolean) => void;
}

const AVATAR_PRESETS = [
  { name: "Steve", url: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&auto=format&fit=crop&q=80" },
  { name: "Alex", url: "https://images.unsplash.com/photo-1601987177651-8edfe6c20009?w=150&auto=format&fit=crop&q=80" },
  { name: "Enderman", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=150&auto=format&fit=crop&q=80" },
  { name: "Creeper", url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=150&auto=format&fit=crop&q=80" },
  { name: "Zombie", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=150&auto=format&fit=crop&q=80" },
];

export default function ProfileTab({ onReloadData, activeTheme = "slate", onThemeChange, isAdminUnlocked, setIsAdminUnlocked }: ProfileTabProps) {
  // Profile State
  const [profile, setProfile] = useState<UserProfile>(AuthService.getProfile());
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editUsername, setEditUsername] = useState(profile.username);
  const [editBadge, setEditBadge] = useState(profile.badge);
  const [editMedal, setEditMedal] = useState(profile.isMedalOfHonour);
  const [editSupporter, setEditSupporter] = useState(profile.isSupporter);
  const [editAvatarUrl, setEditAvatarUrl] = useState(profile.avatarUrl || "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&auto=format&fit=crop&q=80");

  // Admin Verification State
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [adminUsernameInput, setAdminUsernameInput] = useState("");
  const [passcodeInput, setPasscodeInput] = useState("");
  const [passcodeError, setPasscodeError] = useState("");

  // Admin Tab State
  const [activeAdminTab, setActiveAdminTab] = useState<"news" | "wiki" | "announcements" | "supporters">("news");

  // Local copy lists for Admin Panel
  const [announcements, setAnnouncements] = useState<Announcement[]>(() => LocalDataService.getAnnouncements());
  const [news, setNews] = useState<NewsArticle[]>(() => LocalDataService.getNews());
  const [wiki, setWiki] = useState<WikiEntry[]>(() => LocalDataService.getWiki());
  const [supporters, setSupporters] = useState<Supporter[]>(() => LocalDataService.getSupporters());

  // Form states for creating/editing items in Admin Mode
  const [editItemId, setEditItemId] = useState<string | null>(null); // Null means Creating, String means Editing

  // Announcement Form State
  const [annTitle, setAnnTitle] = useState("");
  const [annContent, setAnnContent] = useState("");
  const [annCategory, setAnnCategory] = useState<"alert" | "update" | "event">("update");

  // News Form State
  const [newsTitle, setNewsTitle] = useState("");
  const [newsSummary, setNewsSummary] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [newsThumbnail, setNewsThumbnail] = useState("");

  // Wiki Form State
  const [wikiTitle, setWikiTitle] = useState("");
  const [wikiCategory, setWikiCategory] = useState<"mobs" | "blocks" | "biomes" | "structures">("mobs");
  const [wikiSummary, setWikiSummary] = useState("");
  const [wikiContent, setWikiContent] = useState("");
  const [wikiImage, setWikiImage] = useState("");
  const [wikiStat1Label, setWikiStat1Label] = useState("Health");
  const [wikiStat1Value, setWikiStat1Value] = useState("");
  const [wikiStat2Label, setWikiStat2Label] = useState("Spawns");
  const [wikiStat2Value, setWikiStat2Value] = useState("");

  // Supporter Form State
  const [supUsername, setSupUsername] = useState("");
  const [supIsDayOne, setSupIsDayOne] = useState(true);
  const [supContributionTier, setSupContributionTier] = useState("Obsidian Patron");
  const [supCustomTitle, setSupCustomTitle] = useState("Pioneer Explorer");
  const [supBackerNumber, setSupBackerNumber] = useState(1);
  const [supFavBlock, setSupFavBlock] = useState("Redstone Dust");

  // Badges lists
  const badgePresets = ["Elder Guardian", "Nether Explorer", "Redstone Master", "Day One Legend", "Voxel Architect", "Administrator"];

  // Handlers for Profile update
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = AuthService.updateProfile({
      username: editUsername.trim() || profile.username,
      badge: editBadge,
      isMedalOfHonour: editMedal,
      isSupporter: editSupporter,
      avatarUrl: editAvatarUrl,
    });
    setProfile(updated);
    setIsEditingProfile(false);
    onReloadData();
  };

  // Handlers for Admin Passcode
  const handleUnlockAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUsernameInput.trim() === "StrayzilAdmin" && passcodeInput === "Thelongestpass@admin123history") {
      setIsAdminUnlocked(true);
      setShowPasscodeModal(false);
      setPasscodeInput("");
      setAdminUsernameInput("");
      setPasscodeError("");
      
      // Auto upgrade profile with administrator status
      const updated = AuthService.updateProfile({
        username: "StrayzilAdmin",
        badge: "Administrator",
        isMedalOfHonour: true,
        isSupporter: true
      });
      setProfile(updated);
      setEditUsername("StrayzilAdmin");
      setEditBadge("Administrator");
      setEditMedal(true);
      setEditSupporter(true);
      onReloadData();
    } else {
      setPasscodeError("Incorrect Admin credentials. Access denied.");
    }
  };

  const handleLockAdmin = () => {
    setIsAdminUnlocked(false);
  };

  // --- CRUD HANDLERS ---

  // ANNOUNCEMENTS
  const handleAddOrEditAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    if (editItemId) {
      LocalDataService.updateAnnouncement(editItemId, {
        title: annTitle.trim(),
        content: annContent.trim(),
        category: annCategory,
      });
    } else {
      LocalDataService.addAnnouncement({
        title: annTitle.trim(),
        content: annContent.trim(),
        category: annCategory
      });
    }
    
    // Reset Form
    setAnnTitle("");
    setAnnContent("");
    setAnnCategory("update");
    setEditItemId(null);
    setAnnouncements(LocalDataService.getAnnouncements());
    onReloadData();
  };

  // NEWS
  const handleAddOrEditNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle.trim() || !newsSummary.trim()) return;

    const thumbnail = newsThumbnail.trim() || "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=80";

    if (editItemId) {
      LocalDataService.updateNews(editItemId, {
        title: newsTitle.trim(),
        summary: newsSummary.trim(),
        content: newsContent.trim(),
        thumbnail,
      });
    } else {
      LocalDataService.addNews({
        title: newsTitle.trim(),
        summary: newsSummary.trim(),
        content: newsContent.trim(),
        thumbnail,
        author: "Admin Team"
      });
    }

    setNewsTitle("");
    setNewsSummary("");
    setNewsContent("");
    setNewsThumbnail("");
    setEditItemId(null);
    setNews(LocalDataService.getNews());
    onReloadData();
  };

  // WIKI
  const handleAddOrEditWiki = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wikiTitle.trim() || !wikiSummary.trim()) return;

    const image = wikiImage.trim() || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80";
    const stats: Record<string, string> = {};
    if (wikiStat1Label.trim() && wikiStat1Value.trim()) {
      stats[wikiStat1Label.trim()] = wikiStat1Value.trim();
    }
    if (wikiStat2Label.trim() && wikiStat2Value.trim()) {
      stats[wikiStat2Label.trim()] = wikiStat2Value.trim();
    }

    if (editItemId) {
      LocalDataService.updateWiki(editItemId, {
        title: wikiTitle.trim(),
        category: wikiCategory,
        summary: wikiSummary.trim(),
        content: wikiContent.trim(),
        image,
        stats,
      });
    } else {
      LocalDataService.addWiki({
        title: wikiTitle.trim(),
        category: wikiCategory,
        summary: wikiSummary.trim(),
        content: wikiContent.trim(),
        image,
        stats,
      });
    }

    setWikiTitle("");
    setWikiCategory("mobs");
    setWikiSummary("");
    setWikiContent("");
    setWikiImage("");
    setWikiStat1Label("Health");
    setWikiStat1Value("");
    setWikiStat2Label("Spawns");
    setWikiStat2Value("");
    setEditItemId(null);
    setWiki(LocalDataService.getWiki());
    onReloadData();
  };

  // SUPPORTERS
  const handleAddOrEditSupporter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supUsername.trim()) return;

    const supData = {
      username: supUsername.trim(),
      isDayOne: supIsDayOne,
      contributionTier: supContributionTier.trim() || "Obsidian Patron",
      customTitle: supCustomTitle.trim() || "Pioneer Explorer",
      backerNumber: Number(supBackerNumber) || 1,
      favBlock: supFavBlock.trim() || "Redstone Dust"
    };

    if (editItemId) {
      LocalDataService.updateSupporter(editItemId, supData);
    } else {
      LocalDataService.addSupporter(supData);
    }

    setSupUsername("");
    setSupIsDayOne(true);
    setSupContributionTier("Obsidian Patron");
    setSupCustomTitle("Pioneer Explorer");
    setSupBackerNumber(supporters.length + 1);
    setSupFavBlock("Redstone Dust");
    setEditItemId(null);
    setSupporters(LocalDataService.getSupporters());
    onReloadData();
  };

  // DELETE OPERATIONS
  const handleDeleteItem = (id: string, type: "news" | "wiki" | "announcements" | "supporters") => {
    if (confirm(`Delete this ${type} item?`)) {
      if (type === "news") {
        LocalDataService.deleteNews(id);
        setNews(LocalDataService.getNews());
      } else if (type === "wiki") {
        LocalDataService.deleteWiki(id);
        setWiki(LocalDataService.getWiki());
      } else if (type === "announcements") {
        LocalDataService.deleteAnnouncement(id);
        setAnnouncements(LocalDataService.getAnnouncements());
      } else if (type === "supporters") {
        LocalDataService.deleteSupporter(id);
        setSupporters(LocalDataService.getSupporters());
      }
      onReloadData();
    }
  };

  // Load Edit Models
  const loadEditModel = (item: any, type: "news" | "wiki" | "announcements" | "supporters") => {
    setEditItemId(item.id);
    if (type === "announcements") {
      setAnnTitle(item.title);
      setAnnContent(item.content);
      setAnnCategory(item.category);
    } else if (type === "news") {
      setNewsTitle(item.title);
      setNewsSummary(item.summary);
      setNewsContent(item.content);
      setNewsThumbnail(item.thumbnail);
    } else if (type === "wiki") {
      setWikiTitle(item.title);
      setWikiCategory(item.category);
      setWikiSummary(item.summary);
      setWikiContent(item.content);
      setWikiImage(item.image);
      const statKeys = Object.keys(item.stats || {});
      setWikiStat1Label(statKeys[0] || "Health");
      setWikiStat1Value(item.stats?.[statKeys[0]] || "");
      setWikiStat2Label(statKeys[1] || "Spawns");
      setWikiStat2Value(item.stats?.[statKeys[1]] || "");
    } else if (type === "supporters") {
      setSupUsername(item.username);
      setSupIsDayOne(item.isDayOne);
      setSupContributionTier(item.contributionTier || "Obsidian Patron");
      setSupCustomTitle(item.customTitle || "Pioneer Explorer");
      setSupBackerNumber(item.backerNumber || 1);
      setSupFavBlock(item.favBlock || "Redstone Dust");
    }
  };

  // Clear Form state
  const clearForm = () => {
    setEditItemId(null);
    setAnnTitle("");
    setAnnContent("");
    setNewsTitle("");
    setNewsSummary("");
    setNewsContent("");
    setNewsThumbnail("");
    setWikiTitle("");
    setWikiSummary("");
    setWikiContent("");
    setWikiImage("");
    setWikiStat1Value("");
    setWikiStat2Value("");
    setSupUsername("");
    setSupContributionTier("Obsidian Patron");
    setSupCustomTitle("Pioneer Explorer");
    setSupBackerNumber(supporters.length + 1);
    setSupFavBlock("Redstone Dust");
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 pb-24 select-none">
      
      {/* Profile Dashboard Card */}
      <div className="mc-glass p-5 rounded-2xl space-y-4 mc-border-blocky">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-minecraft-blue border-2 border-minecraft-light overflow-hidden shrink-0 shadow-inner relative">
            <img src={profile.avatarUrl} alt={profile.username} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-black/60 text-[8px] font-mono text-center text-white/80 py-0.5">STEVE</div>
          </div>
          
          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono truncate">{profile.username}</h3>
              {profile.isSupporter && <Crown className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />}
            </div>
            
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[9px] px-2 py-0.5 bg-minecraft-blue text-minecraft-cyan rounded font-mono border border-minecraft-cyan/20 uppercase tracking-tight">
                {profile.badge}
              </span>
              {profile.isMedalOfHonour && (
                <span className="text-[9px] px-2 py-0.5 bg-yellow-500/10 text-yellow-400 rounded font-mono border border-yellow-500/30 uppercase flex items-center gap-0.5">
                  <Award className="w-2.5 h-2.5" />
                  <span>Honour Medal</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Profile Stats Overview */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[10px] font-mono text-white/50">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-minecraft-cyan/75" />
            <span>Joined: {profile.joinDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-minecraft-cyan/75" />
            <span>Tier: {profile.isSupporter ? "Founding Elite" : "Standard Companion"}</span>
          </div>
        </div>

        {/* Edit Button */}
        <div className="pt-2">
          {!isEditingProfile ? (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="w-full py-1.5 bg-minecraft-blue/40 hover:bg-minecraft-blue text-[11px] font-bold rounded-lg border border-minecraft-blue/50 text-white/90 cursor-pointer active:scale-98 transition-all"
            >
              Modify Demo Profile
            </button>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-3 p-3 bg-black/20 rounded-lg border border-white/5 animate-fade-in text-left">
              <span className="text-[9px] font-mono text-minecraft-cyan uppercase tracking-wider block">Editing Profile Fields</span>
              
              <div className="space-y-1">
                <label className="text-[9px] text-white/40 font-mono">Username</label>
                <input
                  type="text"
                  value={editUsername}
                  onChange={(e) => setEditUsername(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-[#050813] text-xs text-white rounded border border-white/10 focus:outline-none"
                  maxLength={18}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[9px] text-white/40 font-mono">Select Badge</label>
                <select
                  value={editBadge}
                  onChange={(e) => setEditBadge(e.target.value)}
                  disabled={!isAdminUnlocked}
                  className="w-full px-2 py-1.5 bg-[#050813] text-xs text-white rounded border border-white/10 focus:outline-none font-mono disabled:opacity-50"
                >
                  {badgePresets.map(preset => (
                    <option key={preset} value={preset} className="bg-[#070B19]">{preset}</option>
                  ))}
                </select>
              </div>

              {/* Profile Picture (Avatar) Selector */}
              <div className="space-y-1.5">
                <label className="text-[9px] text-white/40 font-mono block">Profile Avatar</label>
                
                {/* Micro thumbnail carousel */}
                <div className="flex items-center gap-1.5 pb-1 flex-wrap">
                  {AVATAR_PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset.name}
                      onClick={() => setEditAvatarUrl(preset.url)}
                      className={`w-9 h-9 rounded-lg overflow-hidden border-2 relative cursor-pointer active:scale-95 transition-all ${
                        editAvatarUrl === preset.url ? "border-minecraft-cyan scale-105" : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                      title={preset.name}
                    >
                      <img src={preset.url} alt={preset.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="space-y-0.5">
                  <span className="text-[8px] font-mono text-white/30">Or input custom skin/image URL:</span>
                  <input
                    type="text"
                    value={editAvatarUrl}
                    onChange={(e) => setEditAvatarUrl(e.target.value)}
                    placeholder="https://example.com/avatar.png"
                    className="w-full px-2 py-1 bg-[#050813] text-[10px] text-white rounded border border-white/10 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-4">
                  <label className={`flex items-center gap-1.5 text-[10px] font-mono ${isAdminUnlocked ? "cursor-pointer text-white/80" : "opacity-45 cursor-not-allowed text-white/45"}`}>
                    <input
                      type="checkbox"
                      checked={editMedal}
                      onChange={(e) => isAdminUnlocked && setEditMedal(e.target.checked)}
                      disabled={!isAdminUnlocked}
                      className="accent-minecraft-cyan"
                    />
                    <span>Medal of Honour</span>
                  </label>
                  
                  <label className={`flex items-center gap-1.5 text-[10px] font-mono ${isAdminUnlocked ? "cursor-pointer text-white/80" : "opacity-45 cursor-not-allowed text-white/45"}`}>
                    <input
                      type="checkbox"
                      checked={editSupporter}
                      onChange={(e) => isAdminUnlocked && setEditSupporter(e.target.checked)}
                      disabled={!isAdminUnlocked}
                      className="accent-minecraft-cyan"
                    />
                    <span>Supporter Status</span>
                  </label>
                </div>
                {!isAdminUnlocked && (
                  <p className="text-[8px] font-mono text-amber-500/70">
                    * Badges, Medal & Supporter status require Admin Mode.
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="px-2.5 py-1 text-[10px] text-white/60 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 bg-minecraft-cyan text-minecraft-dark font-extrabold text-[10px] rounded flex items-center gap-0.5 cursor-pointer"
                >
                  <Check className="w-3 h-3" />
                  <span>Apply</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Themes & Appearance Card */}
      <div className="mc-glass p-4 rounded-xl border border-white/5 space-y-3.5 text-left mc-border-blocky">
        <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-wider">
          <Palette className="w-3.5 h-3.5 text-minecraft-cyan" />
          <span>Themes & Appearance</span>
        </div>
        <p className="text-[10px] text-white/50 leading-relaxed pl-1">
          Select a dynamic visual palette to customize StrayzilBase background tones, overlays, and color accents.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-1">
          {/* Slate Button */}
          <button
            onClick={() => onThemeChange?.("slate")}
            className={`p-2.5 rounded-lg border flex flex-col items-center gap-1.5 transition-all cursor-pointer relative ${
              activeTheme === "slate"
                ? "bg-slate-900/60 border-sky-500/50 text-sky-400 font-bold"
                : "bg-black/10 border-white/5 text-white/60 hover:text-white hover:bg-black/20"
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-slate-950 border border-sky-400/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-sky-400" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider">Slate</span>
            {activeTheme === "slate" && (
              <span className="absolute top-1 right-1.5 text-[8px] text-sky-400 font-bold">✔</span>
            )}
          </button>

          {/* Deep Night Button */}
          <button
            onClick={() => onThemeChange?.("deepnight")}
            className={`p-2.5 rounded-lg border flex flex-col items-center gap-1.5 transition-all cursor-pointer relative ${
              activeTheme === "deepnight"
                ? "bg-purple-950/40 border-purple-500/50 text-purple-400 font-bold"
                : "bg-black/10 border-white/5 text-white/60 hover:text-white hover:bg-black/20"
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-[#050110] border border-purple-500/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider">Deep Night</span>
            {activeTheme === "deepnight" && (
              <span className="absolute top-1 right-1.5 text-[8px] text-purple-400 font-bold">✔</span>
            )}
          </button>

          {/* Light Mode Button */}
          <button
            onClick={() => onThemeChange?.("light")}
            className={`p-2.5 rounded-lg border flex flex-col items-center gap-1.5 transition-all cursor-pointer relative ${
              activeTheme === "light"
                ? "bg-white border-sky-500/50 text-sky-600 font-bold"
                : "bg-black/10 border-white/5 text-white/60 hover:text-white hover:bg-black/20"
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-white border border-sky-500/40 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-sky-500" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider">Light</span>
            {activeTheme === "light" && (
              <span className="absolute top-1 right-1.5 text-[8px] text-sky-500 font-bold">✔</span>
            )}
          </button>
        </div>
      </div>

      {/* Hidden Admin Mode Access Panel */}
      <div className="mc-glass p-4 rounded-xl border border-white/5 text-center space-y-3">
        {!isAdminUnlocked ? (
          <>
            <div className="flex items-center justify-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-wider">
              <Lock className="w-3.5 h-3.5 text-minecraft-cyan" />
              <span>Restricted Administration Mode</span>
            </div>
            <p className="text-[10px] text-white/50 leading-relaxed max-w-[90%] mx-auto">
              Unlock the Hidden Admin Panel to dynamically add, edit, or delete items on the Home tab, Wiki, News, and Supporters list.
            </p>
            <button
              onClick={() => setShowPasscodeModal(true)}
              className="px-4 py-1.5 bg-[#0e172e] hover:bg-minecraft-blue text-[11px] font-bold rounded-lg border border-white/10 text-minecraft-cyan cursor-pointer transition-colors"
            >
              Unlock with Password
            </button>
          </>
        ) : (
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold font-mono">
                <Unlock className="w-3.5 h-3.5 animate-bounce" />
                <span>ADMIN PANEL UNLOCKED</span>
              </div>
              <button
                onClick={handleLockAdmin}
                className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 border border-rose-500/20 rounded hover:bg-rose-500/20"
              >
                LOCK SESSION
              </button>
            </div>

            {/* Admin Management Navigation Tabs */}
            <div className="flex items-center gap-1 border-b border-white/5 pb-2 overflow-x-auto">
              {(["news", "wiki", "announcements", "supporters"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveAdminTab(tab); clearForm(); }}
                  className={`px-2.5 py-1 text-[9px] font-mono uppercase rounded transition-colors ${activeAdminTab === tab ? "bg-minecraft-cyan text-minecraft-dark font-extrabold" : "text-white/50 hover:text-white bg-white/2"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Admin Active Tab Editor */}
            <div className="space-y-4 pt-1">
              
              {/* CREATE OR EDIT FORM MODULE */}
              <form onSubmit={
                activeAdminTab === "announcements" ? handleAddOrEditAnnouncement :
                activeAdminTab === "news" ? handleAddOrEditNews :
                activeAdminTab === "wiki" ? handleAddOrEditWiki :
                handleAddOrEditSupporter
              } className="p-3 bg-white/2 border border-white/5 rounded-lg space-y-3">
                <span className="text-[10px] font-bold text-minecraft-cyan font-mono flex items-center gap-1 uppercase">
                  <Sliders className="w-3.5 h-3.5" />
                  {editItemId ? "✏️ Edit Record" : "➕ Add Record"}
                </span>

                {/* ANNOUNCEMENT INPUTS */}
                {activeAdminTab === "announcements" && (
                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      placeholder="Announcement Title"
                      value={annTitle}
                      onChange={(e) => setAnnTitle(e.target.value)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded focus:border-minecraft-cyan/50 text-white font-sans"
                      required
                    />
                    <textarea
                      placeholder="Content details..."
                      value={annContent}
                      onChange={(e) => setAnnContent(e.target.value)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded focus:border-minecraft-cyan/50 text-white text-[11px]"
                      rows={3}
                      required
                    />
                    <select
                      value={annCategory}
                      onChange={(e) => setAnnCategory(e.target.value as any)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded text-white font-mono"
                    >
                      <option value="update" className="bg-[#070B19]">Update/Patch</option>
                      <option value="alert" className="bg-[#070B19]">Alert/Warning</option>
                      <option value="event" className="bg-[#070B19]">Event/Community</option>
                    </select>
                  </div>
                )}

                {/* NEWS INPUTS */}
                {activeAdminTab === "news" && (
                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      placeholder="Article Title"
                      value={newsTitle}
                      onChange={(e) => setNewsTitle(e.target.value)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded text-white"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Short Article Summary"
                      value={newsSummary}
                      onChange={(e) => setNewsSummary(e.target.value)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded text-white"
                      required
                    />
                    <textarea
                      placeholder="Full Article Content..."
                      value={newsContent}
                      onChange={(e) => setNewsContent(e.target.value)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded text-white text-[11px]"
                      rows={3}
                    />
                    <input
                      type="text"
                      placeholder="Thumbnail Image URL (or blank for default)"
                      value={newsThumbnail}
                      onChange={(e) => setNewsThumbnail(e.target.value)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded text-white font-mono"
                    />
                  </div>
                )}

                {/* WIKI INPUTS */}
                {activeAdminTab === "wiki" && (
                  <div className="space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Wiki Title"
                        value={wikiTitle}
                        onChange={(e) => setWikiTitle(e.target.value)}
                        className="p-2 bg-[#050813] border border-white/10 rounded text-white"
                        required
                      />
                      <select
                        value={wikiCategory}
                        onChange={(e) => setWikiCategory(e.target.value as any)}
                        className="p-2 bg-[#050813] border border-white/10 rounded text-white font-mono"
                      >
                        <option value="mobs" className="bg-[#070B19]">Mobs</option>
                        <option value="blocks" className="bg-[#070B19]">Blocks</option>
                        <option value="biomes" className="bg-[#070B19]">Biomes</option>
                        <option value="structures" className="bg-[#070B19]">Structures</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="One-line summary description"
                      value={wikiSummary}
                      onChange={(e) => setWikiSummary(e.target.value)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded text-white"
                      required
                    />
                    <textarea
                      placeholder="Detailed Encyclopedia description..."
                      value={wikiContent}
                      onChange={(e) => setWikiContent(e.target.value)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded text-white text-[11px]"
                      rows={2}
                    />
                    <input
                      type="text"
                      placeholder="Voxel Image URL (or leave blank)"
                      value={wikiImage}
                      onChange={(e) => setWikiImage(e.target.value)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded text-white font-mono"
                    />

                    {/* Stats Custom block */}
                    <div className="p-2 bg-black/30 rounded border border-white/5 space-y-2">
                      <span className="text-[8px] font-mono text-white/40 uppercase">Statistics parameters (e.g. Health: 50)</span>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex gap-1">
                          <input type="text" value={wikiStat1Label} onChange={(e) => setWikiStat1Label(e.target.value)} className="w-12 p-1 bg-[#050813] text-[9px] text-white border border-white/5" />
                          <input type="text" placeholder="Value 1" value={wikiStat1Value} onChange={(e) => setWikiStat1Value(e.target.value)} className="flex-1 p-1 bg-[#050813] text-[9px] text-white border border-white/5" />
                        </div>
                        <div className="flex gap-1">
                          <input type="text" value={wikiStat2Label} onChange={(e) => setWikiStat2Label(e.target.value)} className="w-12 p-1 bg-[#050813] text-[9px] text-white border border-white/5" />
                          <input type="text" placeholder="Value 2" value={wikiStat2Value} onChange={(e) => setWikiStat2Value(e.target.value)} className="flex-1 p-1 bg-[#050813] text-[9px] text-white border border-white/5" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* SUPPORTER INPUTS */}
                {activeAdminTab === "supporters" && (
                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      placeholder="Supporter Username"
                      value={supUsername}
                      onChange={(e) => setSupUsername(e.target.value)}
                      className="w-full p-2 bg-[#050813] border border-white/10 rounded text-white font-mono"
                      required
                    />
                    <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-mono text-white/70">
                      <input
                        type="checkbox"
                        checked={supIsDayOne}
                        onChange={(e) => setSupIsDayOne(e.target.checked)}
                        className="accent-minecraft-cyan"
                      />
                      <span>Is Day One Supporter?</span>
                    </label>

                    <div className="grid grid-cols-2 gap-2 pt-1 text-left">
                      <div className="space-y-1">
                        <label className="text-[9px] text-white/40 font-mono block">Contribution Tier</label>
                        <select
                          value={supContributionTier}
                          onChange={(e) => setSupContributionTier(e.target.value)}
                          className="w-full p-1.5 bg-[#050813] border border-white/10 rounded text-white text-[10px] focus:outline-none"
                        >
                          <option value="Obsidian Patron">Obsidian Patron</option>
                          <option value="Diamond Champion">Diamond Champion</option>
                          <option value="Gold Veteran">Gold Veteran</option>
                          <option value="Iron Guardian">Iron Guardian</option>
                          <option value="Redstone Sponsor">Redstone Sponsor</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] text-white/40 font-mono block">Custom Title</label>
                        <input
                          type="text"
                          placeholder="e.g. Master Builder"
                          value={supCustomTitle}
                          onChange={(e) => setSupCustomTitle(e.target.value)}
                          className="w-full p-1.5 bg-[#050813] border border-white/10 rounded text-white text-[10px]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] text-white/40 font-mono block">Backer #</label>
                        <input
                          type="number"
                          placeholder="Backer Number"
                          value={supBackerNumber}
                          onChange={(e) => setSupBackerNumber(Number(e.target.value) || 1)}
                          className="w-full p-1.5 bg-[#050813] border border-white/10 rounded text-white text-[10px] font-mono"
                          min={1}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] text-white/40 font-mono block">Favorite Block</label>
                        <input
                          type="text"
                          placeholder="e.g. Netherite Block"
                          value={supFavBlock}
                          onChange={(e) => setSupFavBlock(e.target.value)}
                          className="w-full p-1.5 bg-[#050813] border border-white/10 rounded text-white text-[10px]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Form submissions button row */}
                <div className="flex justify-end gap-2 pt-1">
                  {editItemId && (
                    <button
                      type="button"
                      onClick={clearForm}
                      className="px-2 py-1 bg-white/5 text-[9px] font-mono text-white/60 rounded"
                    >
                      CLEAR EDIT
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-3.5 py-1 bg-minecraft-cyan text-minecraft-dark font-extrabold text-[9px] font-mono uppercase rounded cursor-pointer"
                  >
                    {editItemId ? "Apply Changes" : "Create Item"}
                  </button>
                </div>
              </form>

              {/* LIST AND DELETE RECORDS TRAILER */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-wide block">Current Active Records</span>
                
                <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 border border-white/5 p-1.5 rounded bg-[#050813]">
                  {activeAdminTab === "announcements" && announcements.map(a => (
                    <div key={a.id} className="flex justify-between items-center p-1.5 bg-white/2 hover:bg-white/5 rounded text-[10px]">
                      <span className="truncate max-w-[150px] font-medium text-white/90">{a.title}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => loadEditModel(a, "announcements")} className="text-minecraft-cyan px-1.5 py-0.5 rounded hover:bg-minecraft-blue/10 font-mono text-[9px]">EDIT</button>
                        <button onClick={() => handleDeleteItem(a.id, "announcements")} className="text-rose-400 p-0.5 rounded hover:bg-rose-500/10"><Trash className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))}

                  {activeAdminTab === "news" && news.map(n => (
                    <div key={n.id} className="flex justify-between items-center p-1.5 bg-white/2 hover:bg-white/5 rounded text-[10px]">
                      <span className="truncate max-w-[150px] font-medium text-white/90">{n.title}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => loadEditModel(n, "news")} className="text-minecraft-cyan px-1.5 py-0.5 rounded hover:bg-minecraft-blue/10 font-mono text-[9px]">EDIT</button>
                        <button onClick={() => handleDeleteItem(n.id, "news")} className="text-rose-400 p-0.5 rounded hover:bg-rose-500/10"><Trash className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))}

                  {activeAdminTab === "wiki" && wiki.map(w => (
                    <div key={w.id} className="flex justify-between items-center p-1.5 bg-white/2 hover:bg-white/5 rounded text-[10px]">
                      <span className="truncate max-w-[150px] font-mono text-white/80">{w.title}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => loadEditModel(w, "wiki")} className="text-minecraft-cyan px-1.5 py-0.5 rounded hover:bg-minecraft-blue/10 font-mono text-[9px]">EDIT</button>
                        <button onClick={() => handleDeleteItem(w.id, "wiki")} className="text-rose-400 p-0.5 rounded hover:bg-rose-500/10"><Trash className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))}

                  {activeAdminTab === "supporters" && supporters.map(s => (
                    <div key={s.id} className="flex justify-between items-center p-1.5 bg-white/2 hover:bg-white/5 rounded text-[10px] font-mono">
                      <span className="truncate max-w-[150px] text-white/80">{s.username}</span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button onClick={() => loadEditModel(s, "supporters")} className="text-minecraft-cyan px-1.5 py-0.5 rounded hover:bg-minecraft-blue/10 text-[9px]">EDIT</button>
                        <button onClick={() => handleDeleteItem(s.id, "supporters")} className="text-rose-400 p-0.5 rounded hover:bg-rose-500/10"><Trash className="w-3 h-3" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* Passcode Entry Modal Container (Standard inline backdrop) */}
      <AnimatePresence>
        {showPasscodeModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0d1630] border-2 border-minecraft-cyan/40 rounded-2xl p-5 w-full max-w-xs text-center space-y-4 shadow-2xl mc-border-blocky"
            >
              <div className="w-10 h-10 rounded-full bg-minecraft-blue flex items-center justify-center mx-auto text-minecraft-cyan">
                <Lock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white font-mono uppercase">Admin Verification</h4>
                <p className="text-[10px] text-slate-400">Enter secure credentials to unlock administrator access.</p>
              </div>

              <form onSubmit={handleUnlockAdmin} className="space-y-3 text-left">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-slate-400 block pl-1">Admin Username</label>
                  <input
                    type="text"
                    placeholder="Username"
                    value={adminUsernameInput}
                    onChange={(e) => { setAdminUsernameInput(e.target.value); setPasscodeError(""); }}
                    className="w-full px-3 py-1.5 bg-[#050813] text-xs text-white rounded-lg border border-white/10 focus:outline-none focus:border-sky-500/50"
                    autoFocus
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase text-slate-400 block pl-1">Secret Passphrase</label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={passcodeInput}
                    onChange={(e) => { setPasscodeInput(e.target.value); setPasscodeError(""); }}
                    className="w-full px-3 py-1.5 bg-[#050813] text-xs text-white rounded-lg border border-white/10 focus:outline-none focus:border-sky-500/50"
                  />
                </div>
                
                {passcodeError && (
                  <span className="text-[9px] text-rose-400 font-mono block text-center">{passcodeError}</span>
                )}

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowPasscodeModal(false); setPasscodeInput(""); setAdminUsernameInput(""); setPasscodeError(""); }}
                    className="flex-1 py-1.5 bg-white/5 text-[11px] font-bold rounded-lg text-white/60 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-1.5 bg-sky-500 hover:bg-sky-400 text-slate-950 text-[11px] font-extrabold rounded-lg cursor-pointer transition-colors"
                  >
                    Unlocks
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Coming Soon Features Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Future Pipeline</h3>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Feature 1 */}
          <div className="p-3 bg-minecraft-deep/40 rounded-xl border border-white/5 text-left space-y-1 relative group">
            <span className="text-[8px] font-mono text-white/30 uppercase">Mod Hub Integration</span>
            <h4 className="text-[11px] font-bold text-white tracking-wide">Universal Mod Hub</h4>
            <p className="text-[9px] text-minecraft-cyan font-mono leading-relaxed mt-1">Coming in a future update.</p>
          </div>

          {/* Feature 2 */}
          <div className="p-3 bg-minecraft-deep/40 rounded-xl border border-white/5 text-left space-y-1 relative">
            <span className="text-[8px] font-mono text-white/30 uppercase">User Accounts</span>
            <h4 className="text-[11px] font-bold text-white tracking-wide">Real Cloud Profiles</h4>
            <p className="text-[9px] text-minecraft-cyan font-mono leading-relaxed mt-1">Coming in a future update.</p>
          </div>

          {/* Feature 3 */}
          <div className="p-3 bg-minecraft-deep/40 rounded-xl border border-white/5 text-left space-y-1 relative">
            <span className="text-[8px] font-mono text-white/30 uppercase">Messaging Engine</span>
            <h4 className="text-[11px] font-bold text-white tracking-wide">Real-time Chat & PM</h4>
            <p className="text-[9px] text-minecraft-cyan font-mono leading-relaxed mt-1">Coming in a future update.</p>
          </div>

          {/* Feature 4 */}
          <div className="p-3 bg-minecraft-deep/40 rounded-xl border border-white/5 text-left space-y-1 relative">
            <span className="text-[8px] font-mono text-white/30 uppercase">Moderator Panel</span>
            <h4 className="text-[11px] font-bold text-white tracking-wide">Mod-Logs Engine</h4>
            <p className="text-[9px] text-minecraft-cyan font-mono leading-relaxed mt-1">Coming in a future update.</p>
          </div>

          {/* Feature 5 */}
          <div className="p-3 bg-minecraft-deep/40 rounded-xl border border-white/5 text-left space-y-1 col-span-2 flex items-center justify-between">
            <div>
              <span className="text-[8px] font-mono text-white/30 uppercase">Asset Uploads</span>
              <h4 className="text-[11px] font-bold text-white tracking-wide">Direct Schematic/Map Upload System</h4>
            </div>
            <p className="text-[9px] text-minecraft-cyan font-mono leading-relaxed">Coming in a future update.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
