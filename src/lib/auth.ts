"use client";

import { createContext, useContext } from "react";
import { SessionData, AuthUser } from "./types";

// Re-export AuthUser for convenience
export type { AuthUser };
import {
  generateSessionToken,
  generateFingerprint,
  encryptSessionData,
  decryptSessionData,
  isSessionExpired,
  isSessionNearExpiry,
  isInactive,
  updateLastActivity,
  cleanupExpiredSessions,
  setupActivityTracking,
  setupVisibilityTracking,
  STORAGE_KEYS,
  SESSION_CONFIG,
} from "./session-security";

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  session: SessionData | null;
  sessionTimeRemaining: number;
  isSessionNearExpiry: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<boolean>;
  logout: () => void;
  signup: (userData: any) => Promise<boolean>;
  refreshSession: () => void;
  extendSession: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Enhanced authentication service with session management
export const authService = {
  // Save session to localStorage with encryption
  saveSession: (user: AuthUser, rememberMe: boolean = false): SessionData => {
    const now = Date.now();
    const expirationTime = rememberMe 
      ? SESSION_CONFIG.rememberMeExpiration 
      : SESSION_CONFIG.defaultExpiration;
    
    const sessionData: SessionData = {
      user,
      token: generateSessionToken(),
      expiresAt: now + expirationTime,
      loginTime: now,
      rememberMe,
      fingerprint: generateFingerprint(),
    };

    const encryptedSession = encryptSessionData(sessionData);
    localStorage.setItem(STORAGE_KEYS.SESSION, encryptedSession);
    localStorage.setItem(STORAGE_KEYS.SESSION_FINGERPRINT, sessionData.fingerprint);
    updateLastActivity();

    return sessionData;
  },

  // Get current session from localStorage
  getSession: (): SessionData | null => {
    if (typeof window === "undefined") return null;

    try {
      const encryptedSession = localStorage.getItem(STORAGE_KEYS.SESSION);
      if (!encryptedSession) return null;

      const session = decryptSessionData(encryptedSession);
      if (!session) return null;

      // Validate session
      if (isSessionExpired(session)) {
        authService.clearSession();
        return null;
      }

      // Check for inactivity
      if (isInactive()) {
        authService.clearSession();
        return null;
      }

      // Validate fingerprint for security
      const storedFingerprint = localStorage.getItem(STORAGE_KEYS.SESSION_FINGERPRINT);
      if (storedFingerprint !== session.fingerprint) {
        authService.clearSession();
        return null;
      }

      return session;
    } catch (error) {
      console.error("Error retrieving session:", error);
      authService.clearSession();
      return null;
    }
  },

  // Clear session data
  clearSession: (): void => {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    localStorage.removeItem(STORAGE_KEYS.LAST_ACTIVITY);
    localStorage.removeItem(STORAGE_KEYS.SESSION_FINGERPRINT);
    
    // Also clear legacy auth data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
  },

  // Check if session is valid
  isSessionValid: (): boolean => {
    const session = authService.getSession();
    return session !== null;
  },

  // Refresh session (extend expiration)
  refreshSession: (): SessionData | null => {
    const currentSession = authService.getSession();
    if (!currentSession) return null;

    const now = Date.now();
    const expirationTime = currentSession.rememberMe 
      ? SESSION_CONFIG.rememberMeExpiration 
      : SESSION_CONFIG.defaultExpiration;

    const refreshedSession: SessionData = {
      ...currentSession,
      expiresAt: now + expirationTime,
      token: generateSessionToken(), // Generate new token for security
    };

    const encryptedSession = encryptSessionData(refreshedSession);
    localStorage.setItem(STORAGE_KEYS.SESSION, encryptedSession);
    updateLastActivity();

    return refreshedSession;
  },

  // Login with session management
  login: async (email: string, password: string, rememberMe: boolean = false): Promise<{ success: boolean; user?: AuthUser; session?: SessionData }> => {
    // Mock login - in real app, this would call your API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password) {
      const user: AuthUser = {
        id: "1",
        email: email,
        name: email === "admin@tailadmin.com" ? "Musharof" : "User",
        avatar: "/placeholder-avatar.jpg"
      };
      
      const session = authService.saveSession(user, rememberMe);
      
      return { success: true, user, session };
    }
    
    return { success: false };
  },

  // Signup (unchanged but updated for consistency)
  signup: async (userData: any): Promise<{ success: boolean; user?: AuthUser }> => {
    // Mock signup - in real app, this would call your API
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user: AuthUser = {
      id: Date.now().toString(),
      email: userData.email,
      name: userData.fullName,
    };
    
    // In real app, you wouldn't store password in localStorage
    localStorage.setItem("registeredUser", JSON.stringify(user));
    
    return { success: true, user };
  },

  // Logout with proper session cleanup
  logout: () => {
    authService.clearSession();
  },

  // Get current user from session
  getCurrentUser: (): AuthUser | null => {
    const session = authService.getSession();
    return session?.user || null;
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return authService.isSessionValid();
  },

  // Get session time remaining in milliseconds
  getSessionTimeRemaining: (): number => {
    const session = authService.getSession();
    if (!session) return 0;
    
    const remaining = session.expiresAt - Date.now();
    return Math.max(0, remaining);
  },

  // Check if session is near expiry
  isSessionNearExpiry: (): boolean => {
    const session = authService.getSession();
    if (!session) return false;
    
    return isSessionNearExpiry(session);
  },

  // Initialize session management
  initializeSessionManagement: (): (() => void) | void => {
    if (typeof window === "undefined") return;

    // Clean up any expired sessions on initialization
    cleanupExpiredSessions();

    // Set up activity tracking
    const cleanupActivity = setupActivityTracking();
    
    // Set up visibility tracking
    setupVisibilityTracking();

    // Set up periodic session validation
    const sessionCheckInterval = setInterval(() => {
      const session = authService.getSession();
      if (session && isSessionExpired(session)) {
        authService.clearSession();
        // Trigger a page reload or redirect to login
        window.location.href = '/login';
      }
    }, 60000); // Check every minute

    // Return cleanup function
    return () => {
      if (cleanupActivity) cleanupActivity();
      clearInterval(sessionCheckInterval);
    };
  }
};
