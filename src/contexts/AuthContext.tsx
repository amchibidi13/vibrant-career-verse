
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

type AuthContextType = {
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function getSession() {
      setIsLoading(true);
      
      try {
        // Get session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        setSession(session);
        
        if (session?.user) {
          setUser(session.user);
          
          // Check if user is admin
          const { data: adminData, error: adminError } = await supabase.rpc('is_admin');
          if (adminError) throw adminError;
          
          setIsAdmin(adminData || false);
        }
      } catch (error: any) {
        console.error('Error checking authentication:', error.message);
      } finally {
        setIsLoading(false);
      }
      
      // Set up auth state change listener
      const { data: { subscription } } = await supabase.auth.onAuthStateChange(
        async (_event, session) => {
          setSession(session);
          setUser(session?.user || null);
          
          if (session?.user) {
            // Check if user is admin
            const { data: adminData, error: adminError } = await supabase.rpc('is_admin');
            if (!adminError) {
              setIsAdmin(adminData || false);
            }
          } else {
            setIsAdmin(false);
          }
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    }
    
    getSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Signed in successfully');
    } catch (error: any) {
      toast.error(`Error signing in: ${error.message}`);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully');
    } catch (error: any) {
      toast.error(`Error signing out: ${error.message}`);
      throw error;
    }
  };

  const value = {
    session,
    isLoading,
    isAdmin,
    signIn,
    signOut,
    user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
