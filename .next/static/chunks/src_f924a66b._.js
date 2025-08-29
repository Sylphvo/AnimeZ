(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/lib/session-security.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "SESSION_CONFIG": (()=>SESSION_CONFIG),
    "STORAGE_KEYS": (()=>STORAGE_KEYS),
    "cleanupExpiredSessions": (()=>cleanupExpiredSessions),
    "decryptSessionData": (()=>decryptSessionData),
    "encryptSessionData": (()=>encryptSessionData),
    "generateFingerprint": (()=>generateFingerprint),
    "generateSessionToken": (()=>generateSessionToken),
    "isInactive": (()=>isInactive),
    "isSessionExpired": (()=>isSessionExpired),
    "isSessionNearExpiry": (()=>isSessionNearExpiry),
    "setupActivityTracking": (()=>setupActivityTracking),
    "setupVisibilityTracking": (()=>setupVisibilityTracking),
    "updateLastActivity": (()=>updateLastActivity),
    "validateFingerprint": (()=>validateFingerprint)
});
"use client";
const SESSION_CONFIG = {
    defaultExpiration: 24 * 60 * 60 * 1000,
    rememberMeExpiration: 30 * 24 * 60 * 60 * 1000,
    inactivityTimeout: 2 * 60 * 60 * 1000,
    warningBeforeExpiry: 5 * 60 * 1000
};
const STORAGE_KEYS = {
    SESSION: 'tailadmin_session',
    LAST_ACTIVITY: 'tailadmin_last_activity',
    SESSION_FINGERPRINT: 'tailadmin_fingerprint'
};
function generateFingerprint() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
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
        canvas.toDataURL()
    ].join('|');
    return btoa(fingerprint).slice(0, 32);
}
function encryptSessionData(data) {
    try {
        const jsonString = JSON.stringify(data);
        return btoa(jsonString);
    } catch (error) {
        console.error('Error encrypting session data:', error);
        return '';
    }
}
function decryptSessionData(encryptedData) {
    try {
        const jsonString = atob(encryptedData);
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('Error decrypting session data:', error);
        return null;
    }
}
function generateSessionToken() {
    const timestamp = Date.now().toString();
    const randomBytes = Array.from(crypto.getRandomValues(new Uint8Array(16))).map((b)=>b.toString(16).padStart(2, '0')).join('');
    return btoa(`${timestamp}-${randomBytes}`).replace(/[+/=]/g, '');
}
function validateFingerprint(sessionFingerprint) {
    const currentFingerprint = generateFingerprint();
    return sessionFingerprint === currentFingerprint;
}
function isSessionExpired(session) {
    return Date.now() > session.expiresAt;
}
function isSessionNearExpiry(session) {
    const timeUntilExpiry = session.expiresAt - Date.now();
    return timeUntilExpiry <= SESSION_CONFIG.warningBeforeExpiry && timeUntilExpiry > 0;
}
function updateLastActivity() {
    if ("TURBOPACK compile-time truthy", 1) {
        localStorage.setItem(STORAGE_KEYS.LAST_ACTIVITY, Date.now().toString());
    }
}
function isInactive() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const lastActivity = localStorage.getItem(STORAGE_KEYS.LAST_ACTIVITY);
    if (!lastActivity) return true;
    const timeSinceActivity = Date.now() - parseInt(lastActivity);
    return timeSinceActivity > SESSION_CONFIG.inactivityTimeout;
}
function cleanupExpiredSessions() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
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
function setupActivityTracking() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    const events = [
        'mousedown',
        'mousemove',
        'keypress',
        'scroll',
        'touchstart',
        'click'
    ];
    const updateActivity = ()=>{
        updateLastActivity();
    };
    events.forEach((event)=>{
        document.addEventListener(event, updateActivity, {
            passive: true
        });
    });
    // Cleanup function
    return ()=>{
        events.forEach((event)=>{
            document.removeEventListener(event, updateActivity);
        });
    };
}
function setupVisibilityTracking() {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    document.addEventListener('visibilitychange', ()=>{
        if (!document.hidden) {
            updateLastActivity();
            cleanupExpiredSessions();
        }
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/auth.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthContext": (()=>AuthContext),
    "authService": (()=>authService),
    "useAuth": (()=>useAuth)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/session-security.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function useAuth() {
    _s();
    console.log(AuthContext);
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
_s(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const authService = {
    // Save session to localStorage with encryption
    saveSession: (user, rememberMe = false)=>{
        const now = Date.now();
        const expirationTime = rememberMe ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SESSION_CONFIG"].rememberMeExpiration : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SESSION_CONFIG"].defaultExpiration;
        const sessionData = {
            user,
            token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateSessionToken"])(),
            expiresAt: now + expirationTime,
            loginTime: now,
            rememberMe,
            fingerprint: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateFingerprint"])()
        };
        const encryptedSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encryptSessionData"])(sessionData);
        localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SESSION, encryptedSession);
        localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SESSION_FINGERPRINT, sessionData.fingerprint);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateLastActivity"])();
        return sessionData;
    },
    // Get current session from localStorage
    getSession: ()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        try {
            const encryptedSession = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SESSION);
            if (!encryptedSession) return null;
            const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["decryptSessionData"])(encryptedSession);
            if (!session) return null;
            // Validate session
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSessionExpired"])(session)) {
                authService.clearSession();
                return null;
            }
            // Check for inactivity
            if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isInactive"])()) {
                authService.clearSession();
                return null;
            }
            // Validate fingerprint for security
            const storedFingerprint = localStorage.getItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SESSION_FINGERPRINT);
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
    clearSession: ()=>{
        localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SESSION);
        localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].LAST_ACTIVITY);
        localStorage.removeItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SESSION_FINGERPRINT);
        // Also clear legacy auth data
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
    },
    // Check if session is valid
    isSessionValid: ()=>{
        const session = authService.getSession();
        return session !== null;
    },
    // Refresh session (extend expiration)
    refreshSession: ()=>{
        const currentSession = authService.getSession();
        if (!currentSession) return null;
        const now = Date.now();
        const expirationTime = currentSession.rememberMe ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SESSION_CONFIG"].rememberMeExpiration : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SESSION_CONFIG"].defaultExpiration;
        const refreshedSession = {
            ...currentSession,
            expiresAt: now + expirationTime,
            token: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["generateSessionToken"])()
        };
        const encryptedSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["encryptSessionData"])(refreshedSession);
        localStorage.setItem(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STORAGE_KEYS"].SESSION, encryptedSession);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["updateLastActivity"])();
        return refreshedSession;
    },
    // Login with session management
    login: async (email, password, rememberMe = false)=>{
        // Mock login - in real app, this would call your API
        await new Promise((resolve)=>setTimeout(resolve, 1000));
        if (email && password) {
            const user = {
                id: "1",
                email: email,
                name: email === "admin@tailadmin.com" ? "Musharof" : "User",
                avatar: "/placeholder-avatar.jpg"
            };
            const session = authService.saveSession(user, rememberMe);
            return {
                success: true,
                user,
                session
            };
        }
        return {
            success: false
        };
    },
    // Signup (unchanged but updated for consistency)
    signup: async (userData)=>{
        // Mock signup - in real app, this would call your API
        await new Promise((resolve)=>setTimeout(resolve, 1500));
        const user = {
            id: Date.now().toString(),
            email: userData.email,
            name: userData.fullName
        };
        // In real app, you wouldn't store password in localStorage
        localStorage.setItem("registeredUser", JSON.stringify(user));
        return {
            success: true,
            user
        };
    },
    // Logout with proper session cleanup
    logout: ()=>{
        authService.clearSession();
    },
    // Get current user from session
    getCurrentUser: ()=>{
        const session = authService.getSession();
        return session?.user || null;
    },
    // Check if user is authenticated
    isAuthenticated: ()=>{
        return authService.isSessionValid();
    },
    // Get session time remaining in milliseconds
    getSessionTimeRemaining: ()=>{
        const session = authService.getSession();
        if (!session) return 0;
        const remaining = session.expiresAt - Date.now();
        return Math.max(0, remaining);
    },
    // Check if session is near expiry
    isSessionNearExpiry: ()=>{
        const session = authService.getSession();
        if (!session) return false;
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSessionNearExpiry"])(session);
    },
    // Initialize session management
    initializeSessionManagement: ()=>{
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Clean up any expired sessions on initialization
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cleanupExpiredSessions"])();
        // Set up activity tracking
        const cleanupActivity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupActivityTracking"])();
        // Set up visibility tracking
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setupVisibilityTracking"])();
        // Set up periodic session validation
        const sessionCheckInterval = setInterval(()=>{
            const session = authService.getSession();
            if (session && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$session$2d$security$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isSessionExpired"])(session)) {
                authService.clearSession();
                // Trigger a page reload or redirect to login
                window.location.href = '/login';
            }
        }, 60000); // Check every minute
        // Return cleanup function
        return ()=>{
            if (cleanupActivity) cleanupActivity();
            clearInterval(sessionCheckInterval);
        };
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/auth-provider.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AuthProvider": (()=>AuthProvider)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [sessionTimeRemaining, setSessionTimeRemaining] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isSessionNearExpiry, setIsSessionNearExpiry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Update session state
    const updateSessionState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[updateSessionState]": ()=>{
            const currentSession = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getSession();
            const currentUser = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getCurrentUser();
            const timeRemaining = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getSessionTimeRemaining();
            const nearExpiry = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].isSessionNearExpiry();
            setSession(currentSession);
            setUser(currentUser);
            setSessionTimeRemaining(timeRemaining);
            setIsSessionNearExpiry(nearExpiry);
        }
    }["AuthProvider.useCallback[updateSessionState]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Initialize session management
            const cleanup = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].initializeSessionManagement();
            // Check if user is already authenticated on app load
            updateSessionState();
            setIsLoading(false);
            // Set up periodic session state updates
            const sessionUpdateInterval = setInterval(updateSessionState, 30000); // Update every 30 seconds
            // Cleanup function
            return ({
                "AuthProvider.useEffect": ()=>{
                    if (cleanup) cleanup();
                    clearInterval(sessionUpdateInterval);
                }
            })["AuthProvider.useEffect"];
        }
    }["AuthProvider.useEffect"], [
        updateSessionState
    ]);
    const login = async (email, password, rememberMe)=>{
        setIsLoading(true);
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].login(email, password, rememberMe);
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
        } finally{
            setIsLoading(false);
        }
    };
    const signup = async (userData)=>{
        setIsLoading(true);
        try {
            const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].signup(userData);
            if (result.success) {
                // Don't auto-login after signup, redirect to login page
                return true;
            }
            return false;
        } catch (error) {
            console.error("Signup error:", error);
            return false;
        } finally{
            setIsLoading(false);
        }
    };
    const logout = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].logout();
        setUser(null);
        setSession(null);
        setSessionTimeRemaining(0);
        setIsSessionNearExpiry(false);
    };
    const refreshSession = ()=>{
        const refreshedSession = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].refreshSession();
        if (refreshedSession) {
            setSession(refreshedSession);
            updateSessionState();
        }
    };
    const extendSession = ()=>{
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
        extendSession
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthContext"].Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/auth-provider.tsx",
        lineNumber: 122,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "e7TFw9ismj/f7gLJ1ybZYBlcQns=");
_c = AuthProvider;
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_f924a66b._.js.map