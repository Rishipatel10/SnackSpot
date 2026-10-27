
import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    let mounted = true;

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    supabase.auth.getSession()
      .then(({ data, error }) => {
        if (!mounted) return;

        if (error) {
          console.error('Session error:', error.message);
        }

        setUser(data?.session?.user ?? null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Session error:', error.message);
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const register = async (email, password, name) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name || email.split('@')[0]
        }
      }
    });

    if (error) throw error;

    if (data.session) {
      setIsAuthModalOpen(false);
    }

    return data;
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    setIsAuthModalOpen(false);
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    setUser(null);
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuth = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuth,
        closeAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
