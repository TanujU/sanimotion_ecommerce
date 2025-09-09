"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, User, UserProfile } from './supabase';
import { Session } from '@supabase/supabase-js';
import { sessionManager } from './session-manager';
import { SupabaseAuthSecurity, validatePassword, validateEmail } from './security/supabase-security';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, phoneNumber: string) => Promise<{ error: any; success?: boolean; message?: string }>;
  signIn: (email: string, password: string) => Promise<{ error: any; success?: boolean; message?: string }>;
  signOut: () => Promise<{ error: any; success?: boolean; message?: string }>;
  updateUser: (updates: Partial<User>) => Promise<{ error: any }>;
  updatePassword: (newPassword: string, currentPassword?: string) => Promise<{ error: any; success?: boolean; message?: string }>;
  resetPassword: (email: string) => Promise<{ error: any; success?: boolean; message?: string }>;
  getSessionInfo: () => any;
  validatePassword: (password: string) => { isValid: boolean; errors: string[] };
  validateEmail: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Get initial session with comprehensive error handling and timeout
    const initializeAuth = async () => {
      try {
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Auth initialization timeout')), 5000)
        );
        
        const sessionPromise = supabase.auth.getSession();
        const { data: { session }, error } = await Promise.race([sessionPromise, timeoutPromise]) as any;
        
        if (!mounted) return;
        
        if (error) {
          // Handle specific refresh token errors gracefully
          if (error.message.includes('Invalid Refresh Token') || 
              error.message.includes('Refresh Token Not Found')) {
            console.log('Clearing invalid session (non-blocking)');
            await supabase.auth.signOut();
            setSession(null);
            setUser(null);
            setLoading(false);
            return;
          }
          console.log('Session retrieval error (non-blocking):', error.message);
          setLoading(false);
          return;
        }

        setSession(session);
        if (session?.user) {
          await fetchUserProfile(session.user.id);
          // Initialize session manager for authenticated user
          sessionManager.ensureInitialized();
          sessionManager.setOnLogoutCallback(() => {
            setUser(null);
            setSession(null);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      } catch (error) {
        if (!mounted) return;
        console.log('Auth initialization error (non-blocking):', error);
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes with comprehensive error handling
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      
      try {
        console.log('Auth state change:', event, session?.user?.id);
        
        setSession(session);
        
        if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
          setUser(null);
          setLoading(false);
        } else if (event === 'SIGNED_IN' && session?.user) {
          // Use setTimeout to avoid async in callback
          setTimeout(() => {
            if (mounted) {
              fetchUserProfile(session.user.id);
              // Initialize session manager for newly signed in user
              sessionManager.ensureInitialized();
              sessionManager.setOnLogoutCallback(() => {
                setUser(null);
                setSession(null);
                setLoading(false);
              });
            }
          }, 0);
        } else if (event === 'PASSWORD_RECOVERY') {
          // Handle password recovery
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
        }
      } catch (error) {
        if (!mounted) return;
        console.log('Auth state change error (non-blocking):', error);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      // Get user profile from user_profiles table
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) {
        console.log('Error fetching user profile (non-blocking):', profileError.message);
        // If profile doesn't exist, create a minimal user object
        const { data: authUser } = await supabase.auth.getUser();
        if (authUser?.user) {
          const user: User = {
            id: authUser.user.id,
            email: authUser.user.email || '',
            profile: undefined
          };
          setUser(user);
        }
        setLoading(false);
        return;
      }

      // Get auth user data
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      
      if (authError || !authUser.user) {
        console.log('Error fetching auth user (non-blocking):', authError?.message);
        setLoading(false);
        return;
      }

      // Combine auth user with profile
      const user: User = {
        id: authUser.user.id,
        email: authUser.user.email || '',
        profile: profile
      };

      setUser(user);
    } catch (error) {
      console.log('Error fetching user profile (non-blocking):', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string, phoneNumber: string) => {
    try {
      // Use secure sign up with validation
      const result = await SupabaseAuthSecurity.secureSignUp(
        email,
        password,
        {
          name,
          phone_number: phoneNumber,
        }
      );

      if (result.success && result.user) {
        console.log('User created successfully:', result.user.id);
        // Profile will be created automatically by the database trigger
      }

      return {
        error: result.success ? null : new Error(result.error),
        success: result.success,
        message: result.message,
      };
    } catch (error) {
      return { 
        error,
        success: false,
        message: 'An unexpected error occurred during sign up'
      };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Use secure sign in with rate limiting
      const result = await SupabaseAuthSecurity.secureSignIn(email, password);

      if (result.success && result.user) {
        // Handle successful login in database
        try {
          await supabase.rpc('handle_successful_login', { p_user_id: result.user.id });
        } catch (dbError) {
          console.error('Error updating login stats:', dbError);
        }
      }

      return {
        error: result.success ? null : new Error(result.error),
        success: result.success,
        message: result.message,
      };
    } catch (error) {
      return { 
        error,
        success: false,
        message: 'An unexpected error occurred during sign in'
      };
    }
  };

  const signOut = async () => {
    try {
      const result = await SupabaseAuthSecurity.secureSignOut();
      
      // Clear local state
      setUser(null);
      setSession(null);
      
      return {
        error: result.success ? null : new Error(result.error),
        success: result.success,
        message: result.message,
      };
    } catch (error) {
      return { 
        error,
        success: false,
        message: 'An unexpected error occurred during sign out'
      };
    }
  };

  const updatePassword = async (newPassword: string, currentPassword?: string) => {
    try {
      const result = await SupabaseAuthSecurity.updatePassword(newPassword, currentPassword);
      
      return {
        error: result.success ? null : new Error(result.error),
        success: result.success,
        message: result.message,
      };
    } catch (error) {
      return { 
        error,
        success: false,
        message: 'An unexpected error occurred while updating password'
      };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const result = await SupabaseAuthSecurity.securePasswordReset(email);
      
      return {
        error: result.success ? null : new Error(result.error),
        success: result.success,
        message: result.message,
      };
    } catch (error) {
      return { 
        error,
        success: false,
        message: 'An unexpected error occurred while resetting password'
      };
    }
  };

  const getSessionInfo = () => {
    return sessionManager.getSessionInfo();
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return { error: new Error('No user logged in') };

    try {
      // Update user profile
      if (updates.profile) {
        const { error } = await supabase
          .from('user_profiles')
          .update({
            ...updates.profile,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id);

        if (error) {
          return { error };
        }
      }

      // Update local user state
      setUser({ ...user, ...updates });
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    updateUser,
    updatePassword,
    resetPassword,
    getSessionInfo,
    validatePassword,
    validateEmail,
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
