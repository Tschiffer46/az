'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface AuthUser {
  username: string;
  role: 'az-staff' | 'club-admin';
  clubId?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const mockUsers = [
  { username: 'admin', password: 'admin123', role: 'az-staff' as const },
  { username: 'uif-admin', password: 'uif123', role: 'club-admin' as const, clubId: 'uif' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('az-auth');
      if (stored) setUser(JSON.parse(stored));
    } catch {}
  }, []);

  const login = (username: string, password: string): boolean => {
    const found = mockUsers.find((u) => u.username === username && u.password === password);
    if (found) {
      const authUser: AuthUser = { username: found.username, role: found.role, clubId: (found as { clubId?: string }).clubId };
      setUser(authUser);
      try {
        sessionStorage.setItem('az-auth', JSON.stringify(authUser));
      } catch {}
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    try {
      sessionStorage.removeItem('az-auth');
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
