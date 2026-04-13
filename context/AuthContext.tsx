'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type Role = 'ADMIN' | 'USER' | 'DELIVERY_PARTNER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  status: string;
  addresses?: { id: string; address: string }[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check localStorage for mock session on load
    const storedUser = localStorage.getItem('zomabir_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('zomabir_user', JSON.stringify(userData));
    localStorage.setItem('zomabir_token', token);

    // Redirect based on role
    if (userData.role === 'ADMIN') {
      router.push('/admin');
    } else if (userData.role === 'DELIVERY_PARTNER') {
      router.push('/partner');
    } else {
      router.push('/');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('zomabir_user');
    localStorage.removeItem('zomabir_token');
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
