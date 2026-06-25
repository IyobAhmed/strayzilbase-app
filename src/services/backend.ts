/**
 * StrayzilBase - Render Backend Communication Scaffolding (v0.1)
 * This is prepared for future backend deployment on Render.
 * It contains helper methods to make HTTP requests once the API is live.
 */

export class RenderBackendService {
  private static getApiBaseUrl(): string {
    // Falls back to local development URL or the production Render URL
    return (import.meta as any).env.VITE_RENDER_BACKEND_URL || "http://localhost:5000/api";
  }

  /**
   * Safe fetch helper that handles responses and parses JSON.
   */
  static async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.getApiBaseUrl()}${endpoint}`;
    
    // Check if live backend URL exists, otherwise warn and fail gracefully or use mock data
    if (!(import.meta as any).env.VITE_RENDER_BACKEND_URL) {
      console.warn(`[RenderBackendService] VITE_RENDER_BACKEND_URL not set. Emulating '${endpoint}' locally.`);
      throw new Error("Backend not connected yet. Running in offline/localStorage mode.");
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json() as T;
    } catch (error) {
      console.error(`[RenderBackendService] Failed to fetch ${url}:`, error);
      throw error;
    }
  }

  static getRenderSetupGuide() {
    return {
      hostPlatform: "Render (render.com)",
      serviceType: "Web Service",
      buildScript: "npm run build",
      startScript: "node dist/server.cjs",
      envVariablesRequired: [
        "MONGODB_URI (Your database connection string)",
        "RESEND_API_KEY (For sending email verifications)",
        "JWT_SECRET (For secure user authentication)"
      ]
    };
  }
}
