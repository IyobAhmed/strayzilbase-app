import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Calculator, BookOpen, Flame, Compass, Skull, RefreshCw, Sparkles, Coffee, Box } from "lucide-react";

interface MinecraftToolsProps {
  onBack: () => void;
}

type ToolSubTab = "xp" | "enchants" | "ores" | "potions" | "mobs" | "food" | "crafting";

export default function MinecraftTools({ onBack }: MinecraftToolsProps) {
  const [activeSubTab, setActiveSubTab] = useState<ToolSubTab>("xp");

  // XP Calculator states
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  const [targetLevel, setTargetLevel] = useState<number>(30);

  // Math formula for Minecraft XP
  // Level 0-16: XP = Level^2 + 6*Level
  // Level 17-31: XP = 2.5*Level^2 - 40.5*Level + 360
  // Level 32+: XP = 4.5*Level^2 - 162.5*Level + 2220
  const getXPForLevel = (lvl: number): number => {
    if (lvl <= 16) {
      return lvl * lvl + 6 * lvl;
    } else if (lvl <= 31) {
      return Math.floor(2.5 * lvl * lvl - 40.5 * lvl + 360);
    } else {
      return Math.floor(4.5 * lvl * lvl - 162.5 * lvl + 2220);
    }
  };

  const getXPRequiredBetweenLevels = (start: number, end: number): number => {
    if (start >= end) return 0;
    const startXP = getXPForLevel(start);
    const endXP = getXPForLevel(end);
    return endXP - startXP;
  };

  const xpNeeded = getXPRequiredBetweenLevels(currentLevel, targetLevel);
  // Estimations: Mob kill gives 5 XP on average, mining a Coal Ore gives 2 XP on average, mining a Diamond Ore gives 5 XP on average.
  const mobKillsNeeded = Math.ceil(xpNeeded / 5);
  const coalNeeded = Math.ceil(xpNeeded / 2);
  const diamondNeeded = Math.ceil(xpNeeded / 5);

  // Enchantments list
  const ENCHANTS_DATA = [
    { name: "Mending", maxLvl: "I", description: "Repairs the item using experience points.", gear: "Armor, Tools, Weapons" },
    { name: "Unbreaking", maxLvl: "III", description: "Increases item durability.", gear: "Armor, Tools, Weapons" },
    { name: "Sharpness", maxLvl: "V", description: "Increases melee damage output.", gear: "Sword, Axe" },
    { name: "Fortune", maxLvl: "III", description: "Increases block drop counts (ores).", gear: "Pickaxe, Shovel, Axe" },
    { name: "Efficiency", maxLvl: "V", description: "Increases block breaking speed.", gear: "Pickaxe, Shovel, Axe, Hoe" },
    { name: "Protection", maxLvl: "IV", description: "Reduces all forms of incoming damage.", gear: "Armor" },
    { name: "Feather Falling", maxLvl: "IV", description: "Reduces fall damage.", gear: "Boots" },
    { name: "Silk Touch", maxLvl: "I", description: "Mined blocks drop themselves instead of items.", gear: "Pickaxe, Shovel, Axe" },
    { name: "Infinity", maxLvl: "I", description: "Shooting bows does not consume arrows.", gear: "Bow" }
  ];

  // Ore heights
  const ORES_DATA = [
    { name: "Diamond", optimal: "Y = -58", range: "Y = 16 to Y = -64", tip: "Mine at Y = -58. Bring fire resistance potions to stay safe from lava." },
    { name: "Coal", optimal: "Y = 95", range: "Y = 320 to Y = 0", tip: "Most abundant in mountain summits. Never spawns exposed below Y = 0." },
    { name: "Iron", optimal: "Y = 16", range: "Y = 256 to Y = -64", tip: "Look for massive iron veins in deepslate layers. Highly common around Y=16." },
    { name: "Gold", optimal: "Y = -16", range: "Y = 32 to Y = -64", tip: "Spawns far more frequently in Badlands biomes at any height." },
    { name: "Redstone", optimal: "Y = -58", range: "Y = 16 to Y = -64", tip: "Deepslate layers contain highly dense redstone veins that drop 4-5 dusts." },
    { name: "Emerald", optimal: "Y = 236", range: "Y = 320 to Y = -16", tip: "Only spawns in Mountain/Hill biomes. Increases significantly at peak levels." },
    { name: "Ancient Debris", optimal: "Y = 15", range: "Y = 119 to Y = 8", tip: "Nether deepslate levels. Best found using blast-beds or TNT mining at Y = 15." }
  ];

  // Potions recipes
  const POTIONS_DATA = [
    { name: "Healing (Instant Health II)", base: "Awkward Potion", ingredient: "Glistering Melon Slice", modifier: "Glowstone Dust", effect: "Restores 4 Hearts instantly." },
    { name: "Regeneration", base: "Awkward Potion", ingredient: "Ghast Tear", modifier: "Redstone Dust (Extends)", effect: "Restores health over 45-120 seconds." },
    { name: "Strength II", base: "Awkward Potion", ingredient: "Blaze Powder", modifier: "Glowstone Dust", effect: "Increases melee damage by +3 Hearts." },
    { name: "Fire Resistance", base: "Awkward Potion", ingredient: "Magma Cream", modifier: "Redstone Dust (Extends)", effect: "Full immunity to lava, fire, and magma blocks." },
    { name: "Invisibility", base: "Potion of Night Vision", ingredient: "Fermented Spider Eye", modifier: "Redstone Dust", effect: "Makes player body completely transparent." },
    { name: "Swiftness (Speed II)", base: "Awkward Potion", ingredient: "Sugar", modifier: "Glowstone Dust", effect: "Increases movement speed by +40%." }
  ];

  // Bestiary
  const MOBS_DATA = [
    { name: "Warden", hp: "500 (250 Hearts)", dmg: "45 (Ranged sonic boom 15)", drops: "Sculk Catalyst", spawns: "Ancient Cities (Deep Dark)" },
    { name: "Breeze", hp: "30 (15 Hearts)", dmg: "Throws wind charges", drops: "Breeze Rod", spawns: "Trial Chambers Spawners" },
    { name: "Bogged", hp: "16 (8 Hearts)", dmg: "Shoots poison arrows", drops: "Poison Arrows, Bones", spawns: "Swamps & Trial Chambers" },
    { name: "Creeper", hp: "20 (10 Hearts)", dmg: "Explosion (up to 49)", drops: "Gunpowder, Music Discs", spawns: "Overworld (Light Level 0)" },
    { name: "Enderman", hp: "40 (20 Hearts)", dmg: "7 (Hard)", drops: "Ender Pearl", spawns: "Overworld, Nether, End" },
    { name: "Zombie", hp: "20 (10 Hearts)", dmg: "4.5", drops: "Rotten Flesh, Iron Ingot", spawns: "Overworld (Light Level 0)" }
  ];

  // Food saturation
  const FOODS_DATA = [
    { name: "Golden Carrots", fill: "6 (3 Shanks)", saturation: "14.4", ratio: "High", desc: "Best food for natural healing and fast saturation restoration." },
    { name: "Cooked Porkchop", fill: "8 (4 Shanks)", saturation: "12.8", ratio: "High", desc: "Highly nutritious and very easy to mass harvest from pig farms." },
    { name: "Cooked Beef (Steak)", fill: "8 (4 Shanks)", saturation: "12.8", ratio: "High", desc: "Standard high-tier food, identical statistics to Porkchops." },
    { name: "Golden Apple", fill: "4 (2 Shanks)", saturation: "9.6", ratio: "Medium", desc: "Gives Absorption II (+2 Golden Hearts) and Regeneration II." },
    { name: "Baked Potato", fill: "5 (2.5 Shanks)", saturation: "6.0", ratio: "Medium", desc: "Decent food source, easily automated with simple water flushers." }
  ];

  // Crafting ratios
  const CRAFTING_DATA = [
    { item: "Helmet", blocks: "5 Material Items", ratio: "e.g., 5 Diamonds", layout: "n-n-n / n-empty-n / empty-empty-empty" },
    { item: "Chestplate", blocks: "8 Material Items", ratio: "e.g., 8 Diamonds", layout: "n-empty-n / n-n-n / n-n-n" },
    { item: "Leggings", blocks: "7 Material Items", ratio: "e.g., 7 Diamonds", layout: "n-n-n / n-empty-n / n-empty-n" },
    { item: "Boots", blocks: "4 Material Items", ratio: "e.g., 4 Diamonds", layout: "n-empty-n / n-empty-n / empty-empty-empty" },
    { item: "Pickaxe / Axe", blocks: "3 Materials + 2 Sticks", ratio: "e.g., 3 Diamonds + 2 Sticks", layout: "n-n-n / empty-stick-empty / empty-stick-empty" },
    { item: "Sword", blocks: "2 Materials + 1 Stick", ratio: "e.g., 2 Diamonds + 1 Stick", layout: "empty-n-empty / empty-n-empty / empty-stick-empty" }
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#070B19] select-none h-full relative overflow-hidden font-sans">
      {/* Decorative Emerald/Green Background */}
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
        <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">Minecraft Companion Kit</span>
      </div>

      {/* Sub tabs Navigation Bar */}
      <div className="bg-[#070B19]/50 border-b border-white/5 py-2 px-4 shrink-0 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth z-10 relative">
        {(["xp", "enchants", "ores", "potions", "mobs", "food", "crafting"] as ToolSubTab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveSubTab(tab)}
            className={`px-3 py-1 rounded-full text-[9px] font-mono font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-150 cursor-pointer ${
              activeSubTab === tab
                ? "bg-emerald-500 text-slate-950 shadow-[0_2px_8px_rgba(16,185,129,0.3)] font-bold"
                : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5"
            }`}
          >
            {tab === "xp" ? "XP Calc" : tab === "enchants" ? "Enchants" : tab === "ores" ? "Ores" : tab === "potions" ? "Potions" : tab === "mobs" ? "Bestiary" : tab === "food" ? "Food" : "Crafting"}
          </button>
        ))}
      </div>

      {/* Scrollable Kit Body */}
      <div className="flex-1 overflow-y-auto px-4 py-5 pb-24 z-10 relative">
        
        {/* TAB 1: XP CALCULATOR */}
        {activeSubTab === "xp" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Title card */}
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
              <Calculator className="w-8 h-8 text-emerald-400" />
              <div>
                <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Mathematical XP Calculator</h3>
                <p className="text-[10px] text-white/60 mt-0.5">Calculates precise experience points needed for enchantment quotas offline.</p>
              </div>
            </div>

            {/* Inputs Panel */}
            <div className="bg-minecraft-deep/40 border border-white/5 p-4 rounded-2xl space-y-4">
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="space-y-1.5">
                  <label className="text-[9px] text-white/40 uppercase">Current Level</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={currentLevel}
                    onChange={(e) => setCurrentLevel(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-emerald-500 text-center"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] text-white/40 uppercase">Target Level</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-emerald-500 text-center"
                  />
                </div>
              </div>

              {/* Reset button */}
              <button
                onClick={() => { setCurrentLevel(0); setTargetLevel(30); }}
                className="w-full py-1.5 border border-white/5 hover:bg-white/5 text-[9px] font-mono text-white/50 hover:text-white uppercase tracking-widest rounded-lg flex items-center justify-center gap-1 cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset to Level 0 → 30</span>
              </button>
            </div>

            {/* Mathematical Output Card */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/30 p-5 rounded-2xl space-y-3.5 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 opacity-5">
                <Calculator className="w-24 h-24 text-emerald-400" />
              </div>

              <div className="text-center space-y-1">
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">Experience Points Needed</span>
                <span className="text-3xl font-black text-white font-mono leading-none">{xpNeeded.toLocaleString()}</span>
                <span className="text-[9px] text-white/40 font-mono block">Points of raw XP</span>
              </div>

              {/* Equivalence breakdown */}
              {xpNeeded > 0 ? (
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider block text-center">Equivalent Mobs & Mining Required</span>
                  <div className="grid grid-cols-3 gap-2 font-mono text-center">
                    <div className="p-2 bg-black/10 rounded-lg">
                      <span className="text-xs text-white/40 block uppercase">Mob Kills</span>
                      <span className="text-xs text-emerald-400 font-bold block mt-0.5">⚔ {mobKillsNeeded}</span>
                    </div>
                    <div className="p-2 bg-black/10 rounded-lg">
                      <span className="text-xs text-white/40 block uppercase">Coal Ores</span>
                      <span className="text-xs text-emerald-400 font-bold block mt-0.5">⛏ {coalNeeded}</span>
                    </div>
                    <div className="p-2 bg-black/10 rounded-lg">
                      <span className="text-xs text-white/40 block uppercase">Diamond Ores</span>
                      <span className="text-xs text-emerald-400 font-bold block mt-0.5">💎 {diamondNeeded}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-3 text-[10px] text-white/30 font-mono">
                  ★ Target level is lower or equal to current level. No XP required!
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* TAB 2: ENCHANTMENTS GUIDE */}
        {activeSubTab === "enchants" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3.5"
          >
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">Enchantment Reference</span>
            </div>

            <div className="space-y-2.5">
              {ENCHANTS_DATA.map((enc) => (
                <div key={enc.name} className="p-3 bg-minecraft-deep/30 border border-white/5 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-emerald-400 font-mono">{enc.name} {enc.maxLvl}</h4>
                    <span className="text-[8px] font-mono text-white/30 uppercase">{enc.gear}</span>
                  </div>
                  <p className="text-[10px] text-white/70 leading-relaxed font-sans">{enc.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 3: ORE HEIGHTS */}
        {activeSubTab === "ores" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3.5"
          >
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
              <Compass className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">Ore Spawning Ranges (v1.21)</span>
            </div>

            <div className="space-y-2.5">
              {ORES_DATA.map((ore) => (
                <div key={ore.name} className="p-3 bg-minecraft-deep/30 border border-white/5 rounded-xl space-y-1 font-mono">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white">{ore.name}</h4>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">{ore.optimal}</span>
                  </div>
                  <div className="text-[9px] text-white/40">Range: <span className="text-white/70">{ore.range}</span></div>
                  <p className="text-[10px] text-white/60 font-sans leading-relaxed pt-1 border-t border-white/5 mt-1">💡 {ore.tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 4: POTION ALCHEMIST */}
        {activeSubTab === "potions" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3.5"
          >
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
              <Flame className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">Alchemist Recipe Viewer</span>
            </div>

            <div className="space-y-2.5">
              {POTIONS_DATA.map((pot) => (
                <div key={pot.name} className="p-3 bg-minecraft-deep/30 border border-white/5 rounded-xl space-y-1">
                  <h4 className="text-xs font-bold text-emerald-400 font-mono">🧪 Potion of {pot.name}</h4>
                  <div className="text-[9px] font-mono text-white/40 space-y-0.5">
                    <div>Base: <span className="text-white/80">{pot.base}</span></div>
                    <div>Ingredient: <span className="text-white/80">{pot.ingredient}</span></div>
                    <div>Mod: <span className="text-white/80">{pot.modifier}</span></div>
                  </div>
                  <p className="text-[10px] text-white/70 font-sans pt-1 border-t border-white/5 mt-1 leading-relaxed">💥 Effect: {pot.effect}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 5: MOB BESTIARY */}
        {activeSubTab === "mobs" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3.5"
          >
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
              <Skull className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">Mob Hostility Bestiary</span>
            </div>

            <div className="space-y-2.5 font-mono">
              {MOBS_DATA.map((mob) => (
                <div key={mob.name} className="p-3 bg-minecraft-deep/30 border border-white/5 rounded-xl space-y-1 text-xs">
                  <div className="flex items-center justify-between border-b border-white/5 pb-1 mb-1">
                    <h4 className="font-bold text-emerald-400">{mob.name}</h4>
                    <span className="text-[8px] text-white/40 uppercase">{mob.spawns}</span>
                  </div>
                  <div className="text-[10px] space-y-0.5 text-white/70">
                    <div>Health points: <span className="text-white font-semibold">{mob.hp}</span></div>
                    <div>Base damage: <span className="text-white font-semibold">{mob.dmg}</span></div>
                    <div>Rare drops: <span className="text-emerald-400 font-semibold">{mob.drops}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 6: FOOD SATURATION */}
        {activeSubTab === "food" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3.5"
          >
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
              <Coffee className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">Food & Saturation Ledger</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {FOODS_DATA.map((food) => (
                <div key={food.name} className="p-3 bg-minecraft-deep/30 border border-white/5 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white">🍎 {food.name}</h4>
                    <span className="text-[8px] text-emerald-400 uppercase font-bold bg-emerald-500/10 px-1 py-0.5 rounded border border-emerald-500/20">{food.ratio} Ratio</span>
                  </div>
                  <div className="text-[10px] text-white/60">
                    Hunger bar fill: <span className="text-white">{food.fill}</span> | Saturation: <span className="text-white">{food.saturation}</span>
                  </div>
                  <p className="text-[10px] text-white/50 font-sans pt-1 border-t border-white/5 mt-1">💡 {food.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TAB 7: CRAFTING RATIOS */}
        {activeSubTab === "crafting" && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3.5"
          >
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
              <Box className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">Crafting & Armor Proportions</span>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {CRAFTING_DATA.map((craft) => (
                <div key={craft.item} className="p-3 bg-minecraft-deep/30 border border-white/5 rounded-xl space-y-1.5">
                  <div className="flex items-center justify-between border-b border-white/5 pb-1">
                    <h4 className="font-bold text-white">{craft.item}</h4>
                    <span className="text-[10px] text-emerald-400 font-bold">{craft.blocks}</span>
                  </div>
                  <div className="text-[10px] text-white/40">Grid structure:</div>
                  <div className="p-2 bg-black/20 rounded font-mono text-[9px] text-emerald-500/80 leading-none">
                    {craft.layout}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Plaque footnote */}
        <div className="mt-4 p-3 bg-emerald-500/5 rounded-lg border border-emerald-500/10 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
          <p className="text-[9px] text-emerald-300/50 leading-relaxed font-mono">
            All tables are saved completely offline in local storage cache memory. Perfect for looking up recipes or calculating diamonds needed mid-game on secondary screens!
          </p>
        </div>
      </div>
    </div>
  );
}
