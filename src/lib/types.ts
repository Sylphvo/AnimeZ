export interface User {
  id: string;
  fullName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: Date;
  email: string;
  phoneNumber: string;
  username: string;
  passwordHash: string;
  accountCreatedDate: Date;
  lastLoginDate: Date;
  personalSettings: {
    language: string;
    theme: 'light' | 'dark';
    notifications: boolean;
    privacy: 'public' | 'private';
  };
  profession: string;
  company: string;
  position: string;
  wallet: {
    banks: BankAccount[];
    mainWallet: {
      balance: number;
      currency: string;
    };
    temporaryWallet: {
      balance: number;
      currency: string;
    };
    totalBalance: number;
    currency: string;
  };
  physicalInfo: {
    weight: number; // kg
    height: number; // cm
  };
  mealPreferences: {
    breakfast: string;
    lunch: string;
    afternoon: string;
    dinner: string;
  };
  healthStats: {
    bmi: number;
    bloodPressure: {
      systolic: number;
      diastolic: number;
    };
    heartRate: number;
    lastCheckup: Date;
    healthScore: number; // 0-100
  };
  attendance: {
    date: Date;
    checkInTime: Date | null;
    checkOutTime: Date | null;
    status: 'present' | 'absent' | 'late' | 'half-day';
  }[];
  tasks: {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'low' | 'medium' | 'high';
    status: 'pending' | 'in-progress' | 'completed';
    category: string;
  }[];
  skills: string[];
  other: string;
  animePreferences: {
    favoriteAnimeSeries: string;
    favoriteCharacter: string;
    preferredGenres: string[];
    animeWatchingHabits: string;
  };
  status: 'active' | 'inactive' | 'suspended';
}

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  balance: number;
  currency: string;
  isDefault: boolean;
}

export interface UserFormData {
  fullName: string;
  gender: 'male' | 'female' | 'other';
  dateOfBirth: string;
  email: string;
  phoneNumber: string;
  username: string;
  password: string;
  profession: string;
  company: string;
  position: string;
  banks: BankAccount[];
  weight: number;
  height: number;
  breakfast: string;
  lunch: string;
  afternoon: string;
  dinner: string;
  skills: string[];
  other: string;
  language: string;
  theme: 'light' | 'dark';
  notifications: boolean;
  privacy: 'public' | 'private';
  walletBalance: number;
  walletCurrency: string;
  favoriteAnimeSeries: string;
  favoriteCharacter: string;
  preferredGenres: string[];
  animeWatchingHabits: string;
}

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: Date;
  checkInTime: Date | null;
  checkOutTime: Date | null;
  status: 'present' | 'absent' | 'late' | 'half-day';
  notes?: string;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthStats {
  userId: string;
  bmi: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  heartRate: number;
  lastCheckup: Date;
  healthScore: number;
  notes?: string;
}

// Auth-specific user interface for sessions
export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

// Session Management Types
export interface SessionData {
  user: AuthUser;
  token: string;
  expiresAt: number;
  loginTime: number;
  rememberMe: boolean;
  fingerprint: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  session: SessionData | null;
  isLoading: boolean;
}

export interface SessionConfig {
  defaultExpiration: number; // in milliseconds
  rememberMeExpiration: number; // in milliseconds
  inactivityTimeout: number; // in milliseconds
  warningBeforeExpiry: number; // in milliseconds
}

// Product Management Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  isActive: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}
