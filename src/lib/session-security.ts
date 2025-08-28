"use client";

import { SessionData, SessionConfig } from "./types";

// Session configuration
export const SESSION_CONFIG: SessionConfig = {
  defaultExpiration: 24 * 60 * 60 * 1000, // 24 hours
  rememberMeExpiration: 30 * 24 * 60 * 60 * 1000, // 30 days
  inactivityTimeout: 2 * 60 * 60 * 1000, // 2 hours
  warningBeforeExpiry: 5 * 60 * 1000, // 5 minutes
};

// Storage keys
export const STORAGE_KEYS = {
  SESSION: 'tailadmin_session',
  LAST_ACTIVITY: 'tailadmin_last_activity',
  SESSION_FINGERPRINT: 'tailadmin_fingerprint',
} as const;

// Generate a simple browser fingerprint for session security
export function generateFingerprint(): string {
  if (typeof window === 'undefined') return '';
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Session fingerprint', 2, 2);
  }
  
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    canvas.toDataURL(),
  ].join('|');
  
  return btoa(fingerprint).slice(0, 32);
}

// Simple encryption/decryption for session data
export function encryptSessionData(data: SessionData): string {
  try {
    const jsonString = JSON.stringify(data);
    return btoa(jsonString);
  } catch (error) {
    console.error('Error encrypting session data:', error);
    return '';
  }
}

export function decryptSessionData(encryptedData: string): SessionData | null {
  try {
    const jsonString = atob(encryptedData);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decrypting session data:', error);
    return null;
  }
}

// Generate a secure session token
export function generateSessionToken(): string {
  const timestamp = Date.now().toString();
  const randomBytes = Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  
  return btoa(`${timestamp}-${randomBytes}`).replace(/[+/=]/g, '');
}

// Validate session fingerprint
export function validateFingerprint(sessionFingerprint: string): boolean {
  const currentFingerprint = generateFingerprint();
  return sessionFingerprint === currentFingerprint;
}

// Check if session is expired
export function isSessionExpired(session: SessionData): boolean {
  return Date.now() > session.expiresAt;
}

// Check if session is about to expire
export function isSessionNearExpiry(session: SessionData): boolean {
  const timeUntilExpiry = session.expiresAt - Date.now();
  return timeUntilExpiry <= SESSION_CONFIG.warningBeforeExpiry && timeUntilExpiry > 0;
}

// Update last activity timestamp
export function updateLastActivity(): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
  }
}

// Check if user has been inactive too long
export function isInactive(): boolean {
  if (typeof window === 'undefined') return false;
  
  const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
  if (!lastActivity) return true;
  
  const timeSinceActivity = Date.now() - parseInt(lastActivity);
  return timeSinceActivity > SESSION_CONFIG.inactivityTimeout;
}

// Clean up expired sessions
export function cleanupExpiredSessions(): void {
  if (typeof window === 'undefined') return;
  
  const sessionData = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (sessionData) {
    const session = decryptSessionData(sessionData);
    if (session && isSessionExpired(session)) {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
      localStorage.removeItem(STORAGE_KEYS.LAST_ACTIVITY);
      localStorage.removeItem(STORAGE_KEYS.SESSION_FINGERPRINT);
    }
  }
}

// Session event listeners for activity tracking
export function setupActivityTracking(): (() => void) | void {
  if (typeof window === 'undefined') return;
  
  const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
  
  const updateActivity = () => {
    updateLastActivity();
  };
  
  events.forEach(event => {
    document.addEventListener(event, updateActivity, { passive: true });
  });
  
  // Cleanup function
  return () => {
    events.forEach(event => {
      document.removeEventListener(event, updateActivity);
    });
  };
}

// Handle page visibility change
export function setupVisibilityTracking(): void {
  if (typeof window === 'undefined') return;
  
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      updateLastActivity();
      cleanupExpiredSessions();
    }
  });
}
