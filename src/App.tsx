import React, { useState, useEffect } from "react";
import { Home, Users, Newspaper, BookOpen, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import DeviceFrame from "./components/DeviceFrame";
import HomeTab from "./components/HomeTab";
import CommunityTab from "./components/CommunityTab";
import NewsTab from "./components/NewsTab";
import WikiTab from "./components/WikiTab";
import ProfileTab from "./components/ProfileTab";
import SupportersWall from "./components/SupportersWall";
import IntroLoadingScreen from "./components/IntroLoadingScreen";
import { LocalDataService, NewsArticle, WikiEntry } from "./services/dataService";

// Offline Companion Kit Components import
import CreatorHub from "./components/CreatorHub";
import ContentRoadmap from "./components/ContentRoadmap";
import UpdateCenter from "./components/UpdateCenter";
import MinecraftTools from "./components/MinecraftTools";
import SeedVault from "./components/SeedVault";
import BuildShowcaseTab from "./components/BuildShowcaseTab";
import CommunityFeedback from "./components/CommunityFeedback";
import DownloadCenter from "./components/DownloadCenter";
import SettingsPage from "./components/SettingsPage";
import AboutPage from "./components/AboutPage";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState(0); // 0: Home, 1: Community, 2: News, 3: Wiki, 4: Profile
  const [isSupportersWallOpen, setIsSupportersWallOpen] = useState(false);
  const [selectedNewsArticle, setSelectedNewsArticle] = useState<NewsArticle | null>(null);
  const [selectedWikiEntry, setSelectedWikiEntry] = useState<WikiEntry | null>(null);
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null);
  
  // A simple reload key to force-refresh local states when Admin mode updates items
  const [dataReloadKey, setDataReloadKey] = useState(0);

  // Theme support: slate (default), deepnight (neon purple), light (light mode)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("strayzil_theme") || "slate";
  });

  // Global Admin Mode State
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(() => {
    return localStorage.getItem("strayzil_admin_unlocked") === "true";
  });

  useEffect(() => {
    localStorage.setItem("strayzil_admin_unlocked", isAdminUnlocked ? "true" : "false");
  }, [isAdminUnlocked]);

  useEffect(() => {
    document.documentElement.classList.remove("theme-slate", "theme-deepnight", "theme-light");
    document.documentElement.classList.add(`theme-${theme}`);
    localStorage.setItem("strayzil_theme", theme);
  }, [theme]);

  // Initialize the database on first run
  useEffect(() => {
    LocalDataService.initialize();
  }, []);

  const handleReloadData = () => {
    setDataReloadKey((prev) => prev + 1);
  };

  // Helper to safely navigate to news and auto-open details
  const handleSelectNewsFromOutside = (article: NewsArticle) => {
    setSelectedNewsArticle(article);
    setActiveTab(2); // Switch to News Tab
    setIsSupportersWallOpen(false);
  };

  // Helper to safely navigate to wiki and auto-open details
  const handleSelectWikiFromOutside = (entry: WikiEntry) => {
    setSelectedWikiEntry(entry);
    setActiveTab(3); // Switch to Wiki Tab
    setIsSupportersWallOpen(false);
  };

  return (
    <DeviceFrame>
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-minecraft-dark">
        
        {/* Intro Loading Splash overlay */}
        <AnimatePresence>
          {showIntro && (
            <motion.div
              key="intro-screen"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 z-50"
            >
              <IntroLoadingScreen onFinished={() => setShowIntro(false)} activeTheme={theme} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Persistent Administrative System Overlay */}
        {isAdminUnlocked && !showIntro && (
          <div className="bg-gradient-to-r from-red-600 via-amber-500 to-red-600 text-slate-950 px-3 py-1 text-[9px] font-mono font-extrabold uppercase tracking-widest text-center flex items-center justify-between gap-1.5 shrink-0 z-40 select-none shadow-md">
            <span className="flex items-center gap-1">🛡️ STRAYZIL SYSTEM ADMIN MODE ACTIVE</span>
            <button 
              onClick={() => {
                if (confirm("Deactivate and leave System Admin Mode?")) {
                  setIsAdminUnlocked(false);
                  handleReloadData();
                }
              }}
              className="px-2 py-0.5 bg-slate-950 text-amber-400 rounded text-[8px] font-mono font-bold hover:bg-slate-900 cursor-pointer active:scale-95 transition-transform"
            >
              DISCONNECT
            </button>
          </div>
        )}
        
        {/* Dynamic Page Content Renderer */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {activeSubPage ? (
              <motion.div
                key={`subpage-${activeSubPage}-${dataReloadKey}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col overflow-hidden h-full"
              >
                {activeSubPage === "creator" && <CreatorHub onBack={() => setActiveSubPage(null)} />}
                {activeSubPage === "roadmap" && <ContentRoadmap onBack={() => setActiveSubPage(null)} isAdminUnlocked={isAdminUnlocked} />}
                {activeSubPage === "updates" && <UpdateCenter onBack={() => setActiveSubPage(null)} isAdminUnlocked={isAdminUnlocked} />}
                {activeSubPage === "tools" && <MinecraftTools onBack={() => setActiveSubPage(null)} />}
                {activeSubPage === "seeds" && <SeedVault onBack={() => { setActiveSubPage(null); handleReloadData(); }} isAdminUnlocked={isAdminUnlocked} />}
                {activeSubPage === "builds" && <BuildShowcaseTab onBack={() => { setActiveSubPage(null); handleReloadData(); }} isAdminUnlocked={isAdminUnlocked} />}
                {activeSubPage === "feedback" && <CommunityFeedback onBack={() => setActiveSubPage(null)} />}
                {activeSubPage === "downloads" && <DownloadCenter onBack={() => setActiveSubPage(null)} />}
                {activeSubPage === "settings" && <SettingsPage onBack={() => { setActiveSubPage(null); handleReloadData(); }} activeTheme={theme} onThemeChange={setTheme} />}
                {activeSubPage === "about" && <AboutPage onBack={() => setActiveSubPage(null)} />}
              </motion.div>
            ) : isSupportersWallOpen ? (
              <motion.div
                key={`supporters-wall-${dataReloadKey}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex-1 flex flex-col overflow-hidden h-full"
              >
                <SupportersWall onBack={() => setIsSupportersWallOpen(false)} isAdminUnlocked={isAdminUnlocked} />
              </motion.div>
            ) : (
              <motion.div
                key={`tab-${activeTab}-${dataReloadKey}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
                className="flex-1 flex flex-col overflow-hidden h-full"
              >
                {activeTab === 0 && (
                  <HomeTab
                    onNavigateToTab={(idx) => {
                      setActiveTab(idx);
                      setSelectedNewsArticle(null);
                      setSelectedWikiEntry(null);
                    }}
                    onSelectNews={handleSelectNewsFromOutside}
                    onSelectWiki={handleSelectWikiFromOutside}
                    onOpenSupportersWall={() => setIsSupportersWallOpen(true)}
                    onOpenSubPage={(page) => setActiveSubPage(page)}
                  />
                )}

                {activeTab === 1 && (
                  <CommunityTab />
                )}

                {activeTab === 2 && (
                  <NewsTab
                    selectedArticle={selectedNewsArticle}
                    onSelectArticle={setSelectedNewsArticle}
                    isAdminUnlocked={isAdminUnlocked}
                  />
                )}

                {activeTab === 3 && (
                  <WikiTab
                    selectedWiki={selectedWikiEntry}
                    onSelectWiki={setSelectedWikiEntry}
                    isAdminUnlocked={isAdminUnlocked}
                  />
                )}

                {activeTab === 4 && (
                  <ProfileTab
                    onReloadData={handleReloadData}
                    activeTheme={theme}
                    onThemeChange={setTheme}
                    isAdminUnlocked={isAdminUnlocked}
                    setIsAdminUnlocked={setIsAdminUnlocked}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Floating Bottom Glass Navigation Bar */}
        {!isSupportersWallOpen && !showIntro && !activeSubPage && (
          <div className="absolute bottom-4 left-4 right-4 h-16 rounded-2xl mc-glass backdrop-blur-xl flex items-center justify-around px-2 border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-40">
            {/* Nav Button 0: Home */}
            <button
              onClick={() => {
                setActiveTab(0);
                setIsSupportersWallOpen(false);
              }}
              className={`flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === 0 ? "text-minecraft-cyan scale-110" : "text-white/40 hover:text-white/70"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className="text-[8px] font-mono font-bold tracking-wider">Home</span>
              {activeTab === 0 && <span className="w-1 h-1 bg-minecraft-cyan rounded-full"></span>}
            </button>

            {/* Nav Button 1: Community */}
            <button
              onClick={() => {
                setActiveTab(1);
                setIsSupportersWallOpen(false);
              }}
              className={`flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === 1 ? "text-minecraft-cyan scale-110" : "text-white/40 hover:text-white/70"
              }`}
            >
              <Users className="w-5 h-5" />
              <span className="text-[8px] font-mono font-bold tracking-wider">Hub</span>
              {activeTab === 1 && <span className="w-1 h-1 bg-minecraft-cyan rounded-full"></span>}
            </button>

            {/* Nav Button 2: News */}
            <button
              onClick={() => {
                setActiveTab(2);
                setSelectedNewsArticle(null); // Reset detail view when tab clicked
                setIsSupportersWallOpen(false);
              }}
              className={`flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === 2 ? "text-minecraft-cyan scale-110" : "text-white/40 hover:text-white/70"
              }`}
            >
              <Newspaper className="w-5 h-5" />
              <span className="text-[8px] font-mono font-bold tracking-wider">News</span>
              {activeTab === 2 && <span className="w-1 h-1 bg-minecraft-cyan rounded-full"></span>}
            </button>

            {/* Nav Button 3: Wiki */}
            <button
              onClick={() => {
                setActiveTab(3);
                setSelectedWikiEntry(null); // Reset detail view when tab clicked
                setIsSupportersWallOpen(false);
              }}
              className={`flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === 3 ? "text-minecraft-cyan scale-110" : "text-white/40 hover:text-white/70"
              }`}
            >
              <BookOpen className="w-5 h-5" />
              <span className="text-[8px] font-mono font-bold tracking-wider">Wiki</span>
              {activeTab === 3 && <span className="w-1 h-1 bg-minecraft-cyan rounded-full"></span>}
            </button>

            {/* Nav Button 4: Profile */}
            <button
              onClick={() => {
                setActiveTab(4);
                setIsSupportersWallOpen(false);
              }}
              className={`flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-xl transition-all duration-300 cursor-pointer ${
                activeTab === 4 ? "text-minecraft-cyan scale-110" : "text-white/40 hover:text-white/70"
              }`}
            >
              <User className="w-5 h-5" />
              <span className="text-[8px] font-mono font-bold tracking-wider">Profile</span>
              {activeTab === 4 && <span className="w-1 h-1 bg-minecraft-cyan rounded-full"></span>}
            </button>
          </div>
        )}

      </div>
    </DeviceFrame>
  );
}
