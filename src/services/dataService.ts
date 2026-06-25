/**
 * StrayzilBase - Local Data Service (v0.1)
 * This service manages all app content dynamically. It reads and writes to localStorage.
 * When a backend is connected later, these methods can easily be replaced with fetch() requests to MongoDB/Render.
 */

export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: "alert" | "update" | "event";
}

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  thumbnail: string;
  date: string;
  author: string;
  location?: string;
  likes: number;
  commentsCount: number;
  comments: Comment[];
  likedByUser?: boolean;
}

export interface WikiEntry {
  id: string;
  title: string;
  category: "mobs" | "blocks" | "biomes" | "structures";
  summary: string;
  content: string;
  image: string;
  stats: Record<string, string>;
}

export interface Supporter {
  id: string;
  username: string;
  dateAdded: string;
  isDayOne: boolean;
  contributionTier?: string;
  customTitle?: string;
  backerNumber?: number;
  favBlock?: string;
}

export interface Comment {
  author: string;
  content: string;
  date: string;
}

export interface CommunityPost {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  image?: string;
  likes: number;
  commentsCount: number;
  comments: Comment[];
  date: string;
  likedByUser?: boolean;
}

export interface Seed {
  id: string;
  name: string;
  seedNumber: string;
  description: string;
  coordinates: string;
  imagePlaceholder?: string;
  category?: string;
}

export interface BuildShowcase {
  id: string;
  title: string;
  category: "Houses" | "Castles" | "Farms" | "Redstone" | "Cities";
  description: string;
  image: string;
  builder: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  category: "Coming Soon Features" | "Website Progress" | "App Updates" | "Community Goals";
  description: string;
  status: "planned" | "in-progress" | "completed";
  targetDate: string;
}

export interface UpdateLog {
  id: string;
  version: string;
  date: string;
  newFeatures: string[];
  bugFixes: string[];
  type: "major" | "minor" | "patch";
}

// Default Data Seeds
const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "StrayzilBase Version 0.1 Launch!",
    content: "Welcome to StrayzilBase, your ultimate Minecraft community portal! Explore our wiki database, read up-to-date news, connect on the community hub, or configure your supporter status. You can unlock the hidden Admin Panel on the Profile page using your secure private credentials keyphrase to customize all content!",
    date: "2026-06-23",
    category: "update"
  },
  {
    id: "ann-2",
    title: "Upcoming Community Mod Hub Integration",
    content: "We are partnering with verified creators to build an integrated Mod Hub. Soon you will be able to browse, download, and review your favorite custom Minecraft mods directly within StrayzilBase!",
    date: "2026-06-22",
    category: "event"
  },
  {
    id: "ann-3",
    title: "Call for Wiki Creators",
    content: "Our Minecraft Wiki is now open for local database submissions! If you spot a missing Block, Mob, or Structure, toggle Admin Panel under your profile to publish it instantly to the app.",
    date: "2026-06-20",
    category: "alert"
  }
];

const DEFAULT_NEWS: NewsArticle[] = [
  {
    id: "news-1",
    title: "Minecraft Pale Garden Update: The Creaking Awakens!",
    summary: "Introducing the spooky desaturated biome, the Creaking Heart mechanic, and gorgeous Pale Oak wood sets in the latest release.",
    content: "Unveiled at Minecraft Live, the Pale Garden drops players into an eerie, desaturated, haunting forest. By day, it is quiet and ghostly, but at night, the Creaking mob awakens! The Creaking cannot be damaged directly with standard weapons; instead, players must locate and destroy the Creaking Heart block concealed in the canopy of the surrounding Pale Oak trees. This drop also adds beautiful pale-colored wood blocks, hanging moss, and scary soundscapes perfect for gothic builds.",
    thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
    date: "2026-06-23",
    author: "Vu Bui",
    location: "Stockholm, Sweden",
    likes: 342,
    commentsCount: 3,
    comments: [
      { author: "Steve_Strayzil", content: "That Creaking mob is actually terrifying. You can't look away or it sneaks up on you!", date: "2 hours ago" },
      { author: "RedstonePulse", content: "The Pale Oak wood is going to look so good in castle builds!", date: "1 hour ago" },
      { author: "DiamondHoarder", content: "Can we farm Creaking Hearts? I need to build a defense wall with them.", date: "30 mins ago" }
    ]
  },
  {
    id: "news-2",
    title: "Bundles of Bravery Live: Hardcore Mode & Inventory Saver",
    summary: "Manage your complex inventories effortlessly with Bundles, and test your ultimate skills in Bedrock Hardcore Mode.",
    content: "The Bundles of Bravery game drop has officially arrived for both Java and Bedrock editions! The update features Bundles—crafted with leather and string—allowing players to group multiple item types in a single inventory slot to optimize mining trips. Bedrock players can also challenge themselves with the official Hardcore Mode, where dying is permanent and the stakes are higher than ever.",
    thumbnail: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=80",
    date: "2026-06-18",
    author: "Agnes Larsson",
    location: "Redmond, WA",
    likes: 215,
    commentsCount: 2,
    comments: [
      { author: "Notch_Appreciator", content: "Finally, Bundles are here after years of prototypes! My inventory is clean.", date: "3 days ago" },
      { author: "Minecr_Addict", content: "Bedrock hardcore is so intense. Already lost my first 100-day world to a phantom.", date: "2 days ago" }
    ]
  },
  {
    id: "news-3",
    title: "A Behind-the-Scenes Look at the Upcoming 'A Minecraft Movie'",
    summary: "Director insights, real set design showcases, and cast previews of the blocky live-action cinematic adventure.",
    content: "Warner Bros. and Mojang have revealed exclusive production imagery and footage from the official Minecraft live-action adaptation set for theaters in April 2025. Starring Jack Black as Steve and Jason Momoa as his quirky companion, the film combines real-life physical set pieces with state-of-the-art voxel graphics to capture the scale of the Overworld. Directors noted they wanted a tangible, handmade feel to the blocky structures.",
    thumbnail: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=500&auto=format&fit=crop&q=80",
    date: "2026-06-15",
    author: "Hollywood Correspondent",
    location: "Los Angeles, CA",
    likes: 184,
    commentsCount: 2,
    comments: [
      { author: "AlexTheExplorer", content: "Jack Black saying 'I... am STEVE' lives rent-free in my head.", date: "1 week ago" },
      { author: "Strayzil_Builder_Pro", content: "The pink sheep looks a bit cursed but I am absolutely watching this on day one!", date: "5 days ago" }
    ]
  },
  {
    id: "news-4",
    title: "Minecraft Championships (MCC) Kickoff Series Announced",
    summary: "Top creators prepare for a revamped competitive season. Here are the team rosters, game selections, and schedule.",
    content: "The legendary MCC tournament series returns with a brand new championship layout. Teams of four will compete in standard high-skill mini-games including Parkour Warrior, Sands of Time, and To Get To The Other Side, leading to the ultimate Dodgebolt finale. Broadcast starts this Saturday with live predictions enabled for all viewers.",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80",
    date: "2026-06-12",
    author: "Esports Lead",
    location: "London, UK",
    likes: 106,
    commentsCount: 1,
    comments: [
      { author: "Redstone_God", content: "Rooting for the Cyan Coyotes this season! Sands of time will be epic.", date: "10 days ago" }
    ]
  }
];

const DEFAULT_WIKI: WikiEntry[] = [
  {
    id: "wiki-1",
    title: "The Warden",
    category: "mobs",
    summary: "A terrifying, blind mini-boss spawning inside the Deep Dark biome.",
    content: "The Warden is a high-health blind mob summoned by Sculk Shriekers. It identifies targets via sensory sniffing and detecting block/player vibrations. It possesses an extremely high melee attack strength and a piercing Sonic Boom projectile that passes through obstacles and ignores shields.",
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=80",
    stats: {
      "Health": "500 HP (250 Hearts)",
      "Melee Damage": "30 to 45 (Easy to Hard)",
      "Vibe Response": "Vibrations & Smells",
      "Spawns In": "Deep Dark / Ancient City"
    }
  },
  {
    id: "wiki-2",
    title: "Cherry Grove",
    category: "biomes",
    summary: "A mountain meadow biome blanketed with pink cherry blossom trees.",
    content: "Cherry Groves spawn in moderate-elevation mountain tiers. The biome is instantly recognizable by its falling pink petal particles, bright pink grass color, and exclusive cherry wood trunks. Friendly mobs like pigs and sheep spawn here in high frequencies.",
    image: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?w=500&auto=format&fit=crop&q=80",
    stats: {
      "Temperature": "Warm (0.5)",
      "Flora": "Cherry Sapling, Pink Petals",
      "Wood Color": "Pale Pink / Deep Red",
      "Rarity": "Uncommon Meadow"
    }
  },
  {
    id: "wiki-3",
    title: "Copper Bulb",
    category: "blocks",
    summary: "A light-emitting metal block that oxidizes and dims over time.",
    content: "The Copper Bulb is a light source crafted from copper blocks, blaze rods, and redstone dust. Like other copper variants, it oxidizes through four stages, and its light output decreases as it oxidizes. Players can scrape it with an Axe to clean it, or apply Honeycomb to wax and lock its current state.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
    stats: {
      "Blast Resistance": "6.0",
      "Max Light Level": "15 (Clean Stage)",
      "Oxidation States": "4 States",
      "Tool Required": "Any Pickaxe"
    }
  },
  {
    id: "wiki-4",
    title: "Trial Chambers",
    category: "structures",
    summary: "A sprawling underground dungeon built of tuff and copper blocks.",
    content: "Trial Chambers are large underground dungeons that feature procedurally generated rooms designed to test players in combat. Chambers contain spawners that scale depending on party size, reward vaults, and key triggers for the Breeze boss fight.",
    image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=80",
    stats: {
      "Spawn Heights": "Y = 0 to Y = -20",
      "Primary Inhabitants": "Breeze, Bogged, Husks",
      "Loot Sources": "Trial Spawners & Vaults",
      "Key Rewards": "Trial Keys, Heavy Core"
    }
  }
];

const DEFAULT_SUPPORTERS: Supporter[] = [
  { id: "sup-1", username: "Notch_Appreciator", dateAdded: "2026-06-01", isDayOne: true, contributionTier: "Obsidian Patron", customTitle: "Original Notch Fan", backerNumber: 1, favBlock: "Golden Apple" },
  { id: "sup-2", username: "Strayzil_Builder_Pro", dateAdded: "2026-06-04", isDayOne: true, contributionTier: "Diamond Champion", customTitle: "Master Architect", backerNumber: 2, favBlock: "Prismarine Brick" },
  { id: "sup-3", username: "AlexTheExplorer", dateAdded: "2026-06-10", isDayOne: true, contributionTier: "Gold Veteran", customTitle: "Cartographer Extraordinaire", backerNumber: 3, favBlock: "Pale Oak Log" },
  { id: "sup-4", username: "Minecr_Addict", dateAdded: "2026-06-15", isDayOne: false, contributionTier: "Iron Guardian", customTitle: "Creeper Hunter", backerNumber: 4, favBlock: "TNT" },
  { id: "sup-5", username: "RedstonePulse", dateAdded: "2026-06-18", isDayOne: true, contributionTier: "Obsidian Patron", customTitle: "Piston Master", backerNumber: 5, favBlock: "Observer" },
  { id: "sup-6", username: "DiamondHoarder", dateAdded: "2026-06-22", isDayOne: false, contributionTier: "Iron Guardian", customTitle: "Treasure Raider", backerNumber: 6, favBlock: "Diamond Block" }
];

const DEFAULT_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: "post-1",
    author: "MiningPro_24",
    authorAvatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100&auto=format&fit=crop&q=80",
    content: "Just mined my first Ancient Debris at coordinate Y=-15! 💎 It took nearly three hours of beds blasting but the Netherite upgrade is finally ours! Let's go!",
    likes: 42,
    commentsCount: 3,
    comments: [
      { author: "Steve_Strayzil", content: "Huge win! Netherite gear is a gamechanger.", date: "1 hour ago" },
      { author: "AlexTheExplorer", content: "Make sure you don't burn it in lava... oh wait, it floats! 🔥", date: "45 mins ago" }
    ],
    date: "2 hours ago",
    likedByUser: false
  },
  {
    id: "post-2",
    author: "Redstone_God",
    authorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    content: "Crafted a 100% efficient sugarcane farm using observer tick-updates and water-stream hopper collection! Should I write a step-by-step Wiki guide for StrayzilBase? Comment below!",
    likes: 89,
    commentsCount: 2,
    comments: [
      { author: "Strayzil_Builder_Pro", content: "Absolutely. Redstone tutorials are highly requested!", date: "2 hours ago" }
    ],
    date: "4 hours ago",
    likedByUser: true
  }
];

const DEFAULT_SEEDS: Seed[] = [
  {
    id: "seed-1",
    name: "Double Woodland Mansion Village",
    seedNumber: "-459039203922901",
    description: "An unbelievable spawn that places you in a small spruce village right between two fully intact Woodland Mansions! Perfect for starting a custom raid base or raiding high-tier loot immediately.",
    coordinates: "X: 120, Y: 72, Z: -250",
    category: "Survival"
  },
  {
    id: "seed-2",
    name: "Intact Ruined Portal Lake",
    seedNumber: "88392019322049",
    description: "Spawn near a perfectly circular mountain lake. Submerged exactly in the center is a completely built Ruined Portal that only requires a single piece of Obsidian to ignite. Beautiful scenic build site.",
    coordinates: "X: -540, Y: 64, Z: 980",
    category: "Village"
  },
  {
    id: "seed-3",
    name: "Cherry Blossom Mountain Hollow",
    seedNumber: "29013920119",
    description: "A spectacular meadow valley entirely enclosed by a towering ring of pink Cherry Grove mountain ridges. Spawns with multiple active waterfall streams and an open cave entrance cascading to diamond levels.",
    coordinates: "X: 12, Y: 110, Z: 45",
    category: "Scenic"
  }
];

const DEFAULT_BUILDS: BuildShowcase[] = [
  {
    id: "build-1",
    title: "Gothic Obsidian Keep",
    category: "Castles",
    description: "A majestic dark keep built of crying obsidian, deepslate tiles, and polished basalt. It has a custom drawbridge and active lava defensive canals controlled by simple tripwires.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=500&auto=format&fit=crop&q=80",
    builder: "Strayzil_Builder_Pro"
  },
  {
    id: "build-2",
    title: "Silent 0-Tick Sugarcane Factory",
    category: "Redstone",
    description: "A completely silent sugarcane harvester that utilizes hopper minecarts and fast observer updates to gather 1,200 sugarcanes per hour in a highly compact 5x5 area.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80",
    builder: "Redstone_God"
  },
  {
    id: "build-3",
    title: "Rustic Pale Oak Villa",
    category: "Houses",
    description: "Cozy survival home crafted entirely from Pale Oak planks, stripped logs, and mossy cobblestone. Includes a dynamic chimney smoker and an integrated crop basement.",
    image: "https://images.unsplash.com/photo-1522441815192-d9f04eb0615c?w=500&auto=format&fit=crop&q=80",
    builder: "AlexTheExplorer"
  }
];

const DEFAULT_ROADMAP: RoadmapItem[] = [
  {
    id: "road-1",
    title: "AI Build Architect Integration",
    category: "Coming Soon Features",
    description: "Leverage server-side Gemini intelligence to generate voxel structural templates, block pallets, and step-by-step assembly guides based on prompt requests.",
    status: "planned",
    targetDate: "Q3 2026"
  },
  {
    id: "road-2",
    title: "Launch official strayzil.com web domain",
    category: "Website Progress",
    description: "Replace our temporary app hosting with a robust custom domain, featuring cloud MongoDB storage, public builder profiles, and real-time multiplayer chatrooms.",
    status: "in-progress",
    targetDate: "July 2026"
  },
  {
    id: "road-3",
    title: "Minecraft Skin & Asset Explorer",
    category: "App Updates",
    description: "Browse curated community textures, custom armor trims, player skins, and dynamic 3D asset previews directly from within the StrayzilBase application.",
    status: "planned",
    targetDate: "Q4 2026"
  },
  {
    id: "road-4",
    title: "Grow to 1,000 Registered Builders",
    category: "Community Goals",
    description: "Rally the Minecraft community to reach 1,000 registered users, and host weekly design contests with featured spots in the hall of fame.",
    status: "in-progress",
    targetDate: "August 2026"
  }
];

const DEFAULT_UPDATES: UpdateLog[] = [
  {
    id: "update-1",
    version: "v0.1.0-beta",
    date: "2026-06-24",
    type: "major",
    newFeatures: [
      "StrayzilBase Companion Portal officially released!",
      "Added interactive Minecraft Offline Tools (XP Calculator, Ore Distribution, Potion Recipes, Enchantment Guide, Crafting Reference, Mob Viewer, Food Comparison).",
      "Added curated Seed Vault and Build Showcase galleries.",
      "Added founding Supporters Wall with detailed search and premium badges.",
      "Added localized Profile custom achievement systems and about page."
    ],
    bugFixes: [
      "Fixed light mode text readability on dark buttons.",
      "Resolved HMR websocket connection notifications.",
      "Optimized scrolling speed in long wiki pages."
    ]
  }
];

export class LocalDataService {
  // Initialize Local Storage
  static initialize(): void {
    if (!localStorage.getItem("strayzil_announcements")) {
      localStorage.setItem("strayzil_announcements", JSON.stringify(DEFAULT_ANNOUNCEMENTS));
    }
    const existingNews = localStorage.getItem("strayzil_news");
    if (!existingNews || !existingNews.includes("Pale Garden")) {
      localStorage.setItem("strayzil_news", JSON.stringify(DEFAULT_NEWS));
    }
    if (!localStorage.getItem("strayzil_wiki")) {
      localStorage.setItem("strayzil_wiki", JSON.stringify(DEFAULT_WIKI));
    }
    if (!localStorage.getItem("strayzil_supporters")) {
      localStorage.setItem("strayzil_supporters", JSON.stringify(DEFAULT_SUPPORTERS));
    }
    if (!localStorage.getItem("strayzil_posts")) {
      localStorage.setItem("strayzil_posts", JSON.stringify(DEFAULT_COMMUNITY_POSTS));
    }
    if (!localStorage.getItem("strayzil_seeds")) {
      localStorage.setItem("strayzil_seeds", JSON.stringify(DEFAULT_SEEDS));
    }
    if (!localStorage.getItem("strayzil_builds")) {
      localStorage.setItem("strayzil_builds", JSON.stringify(DEFAULT_BUILDS));
    }
    if (!localStorage.getItem("strayzil_roadmap")) {
      localStorage.setItem("strayzil_roadmap", JSON.stringify(DEFAULT_ROADMAP));
    }
    if (!localStorage.getItem("strayzil_updates")) {
      localStorage.setItem("strayzil_updates", JSON.stringify(DEFAULT_UPDATES));
    }
  }

  // ANNOUNCEMENTS
  static getAnnouncements(): Announcement[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("strayzil_announcements") || "[]");
  }

  static saveAnnouncements(announcements: Announcement[]): void {
    localStorage.setItem("strayzil_announcements", JSON.stringify(announcements));
  }

  static addAnnouncement(ann: Omit<Announcement, "id" | "date">): Announcement {
    const list = this.getAnnouncements();
    const newAnn: Announcement = {
      ...ann,
      id: "ann-" + Date.now(),
      date: new Date().toISOString().split("T")[0]
    };
    list.unshift(newAnn);
    this.saveAnnouncements(list);
    return newAnn;
  }

  static updateAnnouncement(id: string, updated: Partial<Announcement>): void {
    const list = this.getAnnouncements();
    const idx = list.findIndex(a => a.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updated };
      this.saveAnnouncements(list);
    }
  }

  static deleteAnnouncement(id: string): void {
    const list = this.getAnnouncements().filter(a => a.id !== id);
    this.saveAnnouncements(list);
  }

  // NEWS ARTICLES
  static getNews(): NewsArticle[] {
    this.initialize();
    const raw = localStorage.getItem("strayzil_news");
    let news: NewsArticle[] = [];
    try {
      news = JSON.parse(raw || "[]");
    } catch (e) {
      news = DEFAULT_NEWS;
    }
    // Retrofit legacy data
    let updated = false;
    news = news.map(article => {
      let needsUpdate = false;
      if (article.likes === undefined) { article.likes = Math.floor(Math.random() * 50) + 12; needsUpdate = true; }
      if (article.likedByUser === undefined) { article.likedByUser = false; needsUpdate = true; }
      if (!article.comments) { article.comments = []; needsUpdate = true; }
      if (article.commentsCount === undefined) { article.commentsCount = article.comments.length; needsUpdate = true; }
      if (!article.location) { article.location = "Mojang Studios"; needsUpdate = true; }
      if (needsUpdate) { updated = true; }
      return article;
    });
    if (updated) {
      this.saveNews(news);
    }
    return news;
  }

  static saveNews(news: NewsArticle[]): void {
    localStorage.setItem("strayzil_news", JSON.stringify(news));
  }

  static addNews(article: Omit<NewsArticle, "id" | "date" | "likes" | "commentsCount" | "comments" | "likedByUser"> & { likes?: number; commentsCount?: number; comments?: Comment[]; location?: string }): NewsArticle {
    const list = this.getNews();
    const newArt: NewsArticle = {
      location: "Mojang Studios",
      likes: 0,
      commentsCount: 0,
      comments: [],
      likedByUser: false,
      ...article,
      id: "news-" + Date.now(),
      date: new Date().toISOString().split("T")[0]
    } as NewsArticle;
    list.unshift(newArt);
    this.saveNews(list);
    return newArt;
  }

  static updateNews(id: string, updated: Partial<NewsArticle>): void {
    const list = this.getNews();
    const idx = list.findIndex(n => n.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updated };
      this.saveNews(list);
    }
  }

  static deleteNews(id: string): void {
    const list = this.getNews().filter(n => n.id !== id);
    this.saveNews(list);
  }

  static likeNews(id: string): void {
    const list = this.getNews();
    const idx = list.findIndex(n => n.id === id);
    if (idx !== -1) {
      const article = list[idx];
      if (article.likedByUser) {
        article.likes = Math.max(0, article.likes - 1);
        article.likedByUser = false;
      } else {
        article.likes += 1;
        article.likedByUser = true;
      }
      this.saveNews(list);
    }
  }

  static addNewsComment(id: string, author: string, content: string): void {
    const list = this.getNews();
    const idx = list.findIndex(n => n.id === id);
    if (idx !== -1) {
      const article = list[idx];
      if (!article.comments) {
        article.comments = [];
      }
      article.comments.push({
        author,
        content,
        date: "Just now"
      });
      article.commentsCount = article.comments.length;
      this.saveNews(list);
    }
  }

  // WIKI ENTRIES
  static getWiki(): WikiEntry[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("strayzil_wiki") || "[]");
  }

  static saveWiki(wiki: WikiEntry[]): void {
    localStorage.setItem("strayzil_wiki", JSON.stringify(wiki));
  }

  static addWiki(entry: Omit<WikiEntry, "id">): WikiEntry {
    const list = this.getWiki();
    const newEntry: WikiEntry = {
      ...entry,
      id: "wiki-" + Date.now()
    };
    list.push(newEntry);
    this.saveWiki(list);
    return newEntry;
  }

  static updateWiki(id: string, updated: Partial<WikiEntry>): void {
    const list = this.getWiki();
    const idx = list.findIndex(w => w.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updated };
      this.saveWiki(list);
    }
  }

  static deleteWiki(id: string): void {
    const list = this.getWiki().filter(w => w.id !== id);
    this.saveWiki(list);
  }

  // SUPPORTERS
  static getSupporters(): Supporter[] {
    this.initialize();
    const raw = localStorage.getItem("strayzil_supporters");
    let list: Supporter[] = [];
    try {
      list = JSON.parse(raw || "[]");
    } catch {
      list = [];
    }
    
    let updated = false;
    list = list.map((sup, idx) => {
      let needsChange = false;
      if (!sup.contributionTier) {
        sup.contributionTier = sup.isDayOne ? "Obsidian Patron" : "Iron Guardian";
        needsChange = true;
      }
      if (!sup.customTitle) {
        sup.customTitle = "Pioneer Explorer";
        needsChange = true;
      }
      if (sup.backerNumber === undefined || sup.backerNumber === null) {
        sup.backerNumber = idx + 1;
        needsChange = true;
      }
      if (!sup.favBlock) {
        sup.favBlock = "Redstone Dust";
        needsChange = true;
      }
      if (needsChange) {
        updated = true;
      }
      return sup;
    });

    if (updated && list.length > 0) {
      this.saveSupporters(list);
    }
    return list;
  }

  static saveSupporters(supporters: Supporter[]): void {
    localStorage.setItem("strayzil_supporters", JSON.stringify(supporters));
  }

  static addSupporter(sup: Omit<Supporter, "id" | "dateAdded">): Supporter {
    const list = this.getSupporters();
    const newSup: Supporter = {
      ...sup,
      id: "sup-" + Date.now(),
      dateAdded: new Date().toISOString().split("T")[0]
    };
    list.unshift(newSup);
    this.saveSupporters(list);
    return newSup;
  }

  static updateSupporter(id: string, updated: Partial<Supporter>): void {
    const list = this.getSupporters();
    const idx = list.findIndex(s => s.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updated };
      this.saveSupporters(list);
    }
  }

  static deleteSupporter(id: string): void {
    const list = this.getSupporters().filter(s => s.id !== id);
    this.saveSupporters(list);
  }

  // COMMUNITY POSTS
  static getPosts(): CommunityPost[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("strayzil_posts") || "[]");
  }

  static savePosts(posts: CommunityPost[]): void {
    localStorage.setItem("strayzil_posts", JSON.stringify(posts));
  }

  static addPost(author: string, avatar: string, content: string): CommunityPost {
    const list = this.getPosts();
    const newPost: CommunityPost = {
      id: "post-" + Date.now(),
      author,
      authorAvatar: avatar,
      content,
      likes: 0,
      commentsCount: 0,
      comments: [],
      date: "Just now",
      likedByUser: false
    };
    list.unshift(newPost);
    this.savePosts(list);
    return newPost;
  }

  static likePost(id: string): void {
    const list = this.getPosts();
    const idx = list.findIndex(p => p.id === id);
    if (idx !== -1) {
      const post = list[idx];
      if (post.likedByUser) {
        post.likes = Math.max(0, post.likes - 1);
        post.likedByUser = false;
      } else {
        post.likes += 1;
        post.likedByUser = true;
      }
      this.savePosts(list);
    }
  }

  static addComment(id: string, author: string, content: string): void {
    const list = this.getPosts();
    const idx = list.findIndex(p => p.id === id);
    if (idx !== -1) {
      const post = list[idx];
      post.comments.push({
        author,
        content,
        date: "Just now"
      });
      post.commentsCount = post.comments.length;
      this.savePosts(list);
    }
  }

  // SEED VAULT
  static getSeeds(): Seed[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("strayzil_seeds") || "[]");
  }

  static saveSeeds(seeds: Seed[]): void {
    localStorage.setItem("strayzil_seeds", JSON.stringify(seeds));
  }

  static addSeed(seed: Omit<Seed, "id">): Seed {
    const list = this.getSeeds();
    const newSeed: Seed = {
      ...seed,
      id: "seed-" + Date.now()
    };
    list.unshift(newSeed);
    this.saveSeeds(list);
    return newSeed;
  }

  static updateSeed(id: string, updated: Partial<Seed>): void {
    const list = this.getSeeds();
    const idx = list.findIndex(s => s.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updated };
      this.saveSeeds(list);
    }
  }

  static deleteSeed(id: string): void {
    const list = this.getSeeds().filter(s => s.id !== id);
    this.saveSeeds(list);
  }

  // BUILD SHOWCASE
  static getBuilds(): BuildShowcase[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("strayzil_builds") || "[]");
  }

  static saveBuilds(builds: BuildShowcase[]): void {
    localStorage.setItem("strayzil_builds", JSON.stringify(builds));
  }

  static addBuild(build: Omit<BuildShowcase, "id">): BuildShowcase {
    const list = this.getBuilds();
    const newBuild: BuildShowcase = {
      ...build,
      id: "build-" + Date.now()
    };
    list.unshift(newBuild);
    this.saveBuilds(list);
    return newBuild;
  }

  static updateBuild(id: string, updated: Partial<BuildShowcase>): void {
    const list = this.getBuilds();
    const idx = list.findIndex(b => b.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updated };
      this.saveBuilds(list);
    }
  }

  static deleteBuild(id: string): void {
    const list = this.getBuilds().filter(b => b.id !== id);
    this.saveBuilds(list);
  }

  // ROADMAP
  static getRoadmap(): RoadmapItem[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("strayzil_roadmap") || "[]");
  }

  static saveRoadmap(roadmap: RoadmapItem[]): void {
    localStorage.setItem("strayzil_roadmap", JSON.stringify(roadmap));
  }

  static addRoadmap(item: Omit<RoadmapItem, "id">): RoadmapItem {
    const list = this.getRoadmap();
    const newItem: RoadmapItem = {
      ...item,
      id: "road-" + Date.now()
    };
    list.unshift(newItem);
    this.saveRoadmap(list);
    return newItem;
  }

  static updateRoadmap(id: string, updated: Partial<RoadmapItem>): void {
    const list = this.getRoadmap();
    const idx = list.findIndex(r => r.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updated };
      this.saveRoadmap(list);
    }
  }

  static deleteRoadmap(id: string): void {
    const list = this.getRoadmap().filter(r => r.id !== id);
    this.saveRoadmap(list);
  }

  // UPDATE LOGS
  static getUpdates(): UpdateLog[] {
    this.initialize();
    return JSON.parse(localStorage.getItem("strayzil_updates") || "[]");
  }

  static saveUpdates(updates: UpdateLog[]): void {
    localStorage.setItem("strayzil_updates", JSON.stringify(updates));
  }

  static addUpdate(up: Omit<UpdateLog, "id">): UpdateLog {
    const list = this.getUpdates();
    const newUp: UpdateLog = {
      ...up,
      id: "update-" + Date.now()
    };
    list.unshift(newUp);
    this.saveUpdates(list);
    return newUp;
  }

  static updateUpdate(id: string, updated: Partial<UpdateLog>): void {
    const list = this.getUpdates();
    const idx = list.findIndex(u => u.id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...updated };
      this.saveUpdates(list);
    }
  }

  static deleteUpdate(id: string): void {
    const list = this.getUpdates().filter(u => u.id !== id);
    this.saveUpdates(list);
  }
}
