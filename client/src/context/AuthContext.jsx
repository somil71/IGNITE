import { createContext, useState, useEffect, useCallback } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/react';
import api from '@/services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { isLoaded: clerkLoaded, isSignedIn, user: clerkUser } = useUser();
  const { signOut } = useClerkAuth();
  
  const [igniteUser, setIgniteUser] = useState(null);
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSignedIn || !clerkUser) {
      setIgniteUser(null);
      setIsProfileComplete(false);
      if (clerkLoaded) setLoading(false);
      return;
    }

    // Fetch MongoDB profile via GET /api/auth/me
    api.get('/auth/me')
      .then(({ data }) => {
        setIgniteUser(data.user);
        setIsProfileComplete(data.user.isProfileComplete);
      })
      .catch(() => setIgniteUser(null))
      .finally(() => setLoading(false));
  }, [clerkLoaded, isSignedIn, clerkUser]);

  const refreshUser = useCallback(async () => {
    if (!isSignedIn) return;
    try {
      const { data } = await api.get('/auth/me');
      setIgniteUser(data.user);
      setIsProfileComplete(data.user.isProfileComplete);
    } catch (err) {
      console.error('Failed to sync profile', err);
    }
  }, [isSignedIn]);

  const value = {
    user: igniteUser || (clerkUser ? { name: clerkUser.fullName, email: clerkUser.primaryEmailAddress?.emailAddress } : null),
    loading: !clerkLoaded || loading,
    isAuthenticated: isSignedIn,
    isAdmin: igniteUser?.role === 'admin',
    isProfileComplete,
    setIsProfileComplete,
    logout: signOut,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext };
