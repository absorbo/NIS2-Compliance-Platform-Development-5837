import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/appStore';
import { getSupabase } from '../../lib/supabase';

const AuthGuard = ({ children }) => {
  const { user, setUser } = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    const supabase = getSupabase();

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      } else {
        navigate('/auth/login');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
          navigate('/auth/login');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!user) {
    return null;
  }

  return children;
};

export default AuthGuard;