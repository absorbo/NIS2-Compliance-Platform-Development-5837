import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import Roadmap from './pages/Roadmap';
import ComplianceOverview from './pages/ComplianceOverview';
import Settings from './pages/Settings';
import OnboardingFlow from './pages/OnboardingFlow';
import { useAppStore } from './store/appStore';
import './App.css';

function App() {
  const { isOnboarded } = useAppStore();

  if (!isOnboarded) {
    return <OnboardingFlow />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Navigation />
        <main className="pt-16">
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