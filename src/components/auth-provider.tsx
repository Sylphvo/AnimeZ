"use client";

import { ReactNode, useEffect, useState, useCallback } from "react";
import { AuthContext, AuthUser, authService } from "@/lib/auth";
import { SessionData } from "@/lib/types";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(0);
  const [isSessionNearExpiry, setIsSessionNearExpiry] = useState(false);

  // Update session state
  const updateSessionState = useCallback(() => {
    const currentSession = authService.getSession();
    const currentUser = authService.getCurrentUser();
    const timeRemaining = authService.getSessionTimeRemaining();
    const nearExpiry = authService.isSessionNearExpiry();

    setSession(currentSession);
    setUser(currentUser);
    setSessionTimeRemaining(timeRemaining);
    setIsSessionNearExpiry(nearExpiry);
  }, []);

  useEffect(() => {
    // Initialize session management
    const cleanup = authService.initializeSessionManagement();
    
    // Check if user is already authenticated on app load
    updateSessionState();
    setIsLoading(false);

    // Set up periodic session state updates
    const sessionUpdateInterval = setInterval(updateSessionState, 30000); // Update every 30 seconds

    // Cleanup function
    return () => {
      if (cleanup) cleanup();
      clearInterval(sessionUpdateInterval);
    };
  }, [updateSessionState]);

  const login = async (email: string, password: string, rememberMe?: boolean): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await authService.login(email, password, rememberMe);
      if (result.success && result.user && result.session) {
        setUser(result.user);
        setSession(result.session);
        updateSessionState();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await authService.signup(userData);
      if (result.success) {
        // Don't auto-login after signup, redirect to login page
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setSession(null);
    setSessionTimeRemaining(0);
    setIsSessionNearExpiry(false);
  };

  const refreshSession = () => {
    const refreshedSession = authService.refreshSession();
    if (refreshedSession) {
      setSession(refreshedSession);
      updateSessionState();
    }
  };

  const extendSession = () => {
    // Same as refresh for now, but could be different logic
    refreshSession();
  };

  const value = {
    user,
    //isAuthenticated: !!user && !!session,
    isAuthenticated: true,
    isLoading,
    session,
    sessionTimeRemaining,
    isSessionNearExpiry,
    login,
    logout,
    signup,
    refreshSession,
    extendSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
