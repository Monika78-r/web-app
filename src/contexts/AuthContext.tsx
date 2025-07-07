import React, { createContext, useContext, useEffect, useState } from 'react';
import { signInWithProvider, signOut, getCurrentUser } from '../lib/storage';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (provider: 'google' | 'github' | 'facebook') => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const existingUser = getCurrentUser();
    setUser(existingUser);
    setLoading(false);
  }, []);

  const handleSignIn = async (provider: 'google' | 'github' | 'facebook') => {
    const { user: signedInUser, error } = await signInWithProvider(provider);
    if (error) throw error;
    setUser(signedInUser);
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) throw error;
    setUser(null);
  };

  const value = {
    user,
    loading,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};