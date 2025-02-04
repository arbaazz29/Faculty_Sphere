import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: prompt('Enter your email:') || '',
        password: prompt('Enter your password:') || '',
      });
      
      if (error) throw error;
      toast.success('Signed in successfully!');
    } catch (error) {
      toast.error('Failed to sign in');
      console.error('Sign in error:', error);
    }
  };

  const signUp = async () => {
    try {
      const email = prompt('Enter your email:');
      const password = prompt('Enter your password:');
      
      if (!email || !password) return;

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      toast.success('Account created successfully! You can now sign in.');
    } catch (error) {
      toast.error('Failed to create account');
      console.error('Sign up error:', error);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success('Signed out successfully!');
    } catch (error) {
      toast.error('Failed to sign out');
      console.error('Sign out error:', error);
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };
};