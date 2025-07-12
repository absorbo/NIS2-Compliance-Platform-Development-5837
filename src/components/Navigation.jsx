import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';
import { useAppStore } from '../store/appStore';

const { FiHome, FiClipboard, FiMap, FiShield, FiSettings, FiMenu, FiX, FiLogOut, FiUser } = FiIcons;

const Navigation = () => {
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen, user, logout, companyProfile } = useAppStore();

  const navItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/assessment', icon: FiClipboard, label: 'Assessment' },
    { path: '/roadmap', icon: FiMap, label: 'Roadmap' },
    { path: '/compliance', icon: FiShield, label: 'Compliance' },
    { path: '/settings', icon: FiSettings, label: 'Settings' }
  ];

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      await logout();
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white shadow-sm z-50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiShield} className="w-6 h-6 text-primary-600" />
            <span className="font-bold text-gray-900">NIS2 GRC</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <SafeIcon icon={sidebarOpen ? FiX : FiMenu} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-4">
              <SafeIcon icon={FiShield} className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="font-bold text-xl text-gray-900">NIS2 GRC</h1>
                <p className="text-sm text-gray-500">Compliance Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {companyProfile?.companyName || 'No company'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiLogOut} className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="lg:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-40"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 pt-20 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <SafeIcon icon={FiShield} className="w-8 h-8 text-primary-600" />
              <div>
                <h1 className="font-bold text-xl text-gray-900">NIS2 GRC</h1>
                <p className="text-sm text-gray-500">Compliance Platform</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <SafeIcon icon={item.icon} className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </nav>

          {/* User Profile */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.user_metadata?.first_name} {user?.user_metadata?.last_name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {companyProfile?.companyName || 'No company'}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiLogOut} className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navigation;