import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Roadmap from './pages/Roadmap';
import ComplianceOverview from './pages/ComplianceOverview';
import Settings from './pages/Settings';
import OnboardingFlow from './pages/OnboardingFlow';
import LoginPage from './components/auth/LoginPage';
import { useAppStore } from './store/appStore';
import { getSupabase } from './lib/supabase';
import './App.css';

function App() {
  const { user, isOnboarded, setUser } = useAppStore();

  useEffect(() => {
    const supabase = getSupabase();

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser]);

  // Show login page if user is not authenticated
  if (!user) {
    return <LoginPage />;
  }

  // Show onboarding if user is authenticated but not onboarded
  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  // Show main application
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <main className="pt-16 lg:pt-0 lg:pl-64">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/compliance" element={<ComplianceOverview />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </motion.div>
        </main>
      </div>
    </Router>
  );
}

export default App;