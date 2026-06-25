/**
 * StrayzilBase - Authentication Service Scaffolding (v0.1)
 * This is prepared for future backend integration (e.g., JWT, OAuth, or Firebase Auth).
 * Currently, it uses local storage to manage a temporary demo profile session.
 */

export interface UserProfile {
  username: string;
  badge: string;
  joinDate: string;
  isMedalOfHonour: boolean;
  isSupporter: boolean;
  avatarUrl: string;
}

const DEFAULT_PROFILE: UserProfile = {
  username: "Steve_Strayzil",
  badge: "Elder Guardian",
  joinDate: "2026-06-01",
  isMedalOfHonour: true,
  isSupporter: true,
  avatarUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=150&auto=format&fit=crop&q=80" // Minecraft style avatar
};

export class AuthService {
  /**
   * Mock signup/login prepared for your MongoDB/Render backend.
   */
  static async login(password: string, username?: string): Promise<boolean> {
    // Hidden Admin local credentials validation is handled through Admin mode.
    // In the future, this will hit your Render backend endpoint /api/auth/login
    console.warn("[AuthService] login() will be connected to Render backend.");
    if (username) {
      return username.trim() === "StrayzilAdmin" && password === "Thelongestpass@admin123history";
    }
    return password === "Thelongestpass@admin123history";
  }

  static getProfile(): UserProfile {
    const profile = localStorage.getItem("strayzil_profile");
    if (!profile) {
      localStorage.setItem("strayzil_profile", JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    try {
      return JSON.parse(profile);
    } catch {
      return DEFAULT_PROFILE;
    }
  }

  static updateProfile(updated: Partial<UserProfile>): UserProfile {
    const current = this.getProfile();
    const next = { ...current, ...updated };
    localStorage.setItem("strayzil_profile", JSON.stringify(next));
    return next;
  }

  static logout(): void {
    console.warn("[AuthService] logout() triggered. Local storage profile kept for demo continuity.");
  }
}
