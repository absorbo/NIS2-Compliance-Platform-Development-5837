import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import ComplianceScoreCard from '../components/ComplianceScoreCard';
import QuickActions from '../components/QuickActions';
import RecentActivity from '../components/RecentActivity';
import ComplianceChart from '../components/ComplianceChart';
import EntityClassificationTool from '../components/EntityClassificationTool';

const { FiTrendingUp, FiAlertTriangle, FiCheckCircle, FiClock } = FiIcons;

const Dashboard = () => {
  const { 
    companyProfile,
    complianceScore,
    assessmentProgress,
    roadmapItems
  } = useAppStore();
  
  // Get real stats based on actual state
  const stats = [
    {
      title: 'Compliance Score',
      value: `${complianceScore}%`,
      icon: FiTrendingUp,
      color: complianceScore >= 80 ? 'success' : complianceScore >= 60 ? 'warning' : 'danger',
      trend: useAppStore.getState().assessmentAnswers.length > 0 ? '+' : '',
      description: 'based on assessment'
    },
    {
      title: 'Assessment Progress',
      value: `${assessmentProgress}%`,
      icon: FiCheckCircle,
      color: 'primary',
      trend: assessmentProgress > 0 ? '+' : '',
      description: 'completion rate'
    },
    {
      title: 'Open Action Items',
      value: roadmapItems.filter(item => item.status !== 'completed').length || 0,
      icon: FiClock,
      color: 'warning',
      trend: '',
      description: 'pending resolution'
    },
    {
      title: 'Entity Type',
      value: companyProfile?.entityType 
        ? companyProfile.entityType.charAt(0).toUpperCase() + companyProfile.entityType.slice(1) 
        : 'Unknown',
      icon: FiAlertTriangle,
      color: companyProfile?.entityType === 'essential' ? 'primary' : 
             companyProfile?.entityType === 'important' ? 'warning' : 'gray',
      trend: '',
      description: 'NIS2 classification'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {companyProfile?.companyName || 'Organization'}
          </h1>
          <p className="text-gray-600">
            Here's your NIS2 compliance overview and recent activity
          </p>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${
                stat.color === 'success' ? 'bg-success-100' :
                stat.color === 'warning' ? 'bg-warning-100' :
                stat.color === 'danger' ? 'bg-danger-100' :
                'bg-primary-100'
              }`}>
                <SafeIcon
                  icon={stat.icon}
                  className={`w-6 h-6 ${
                    stat.color === 'success' ? 'text-success-600' :
                    stat.color === 'warning' ? 'text-warning-600' :
                    stat.color === 'danger' ? 'text-danger-600' :
                    'text-primary-600'
                  }`}
                />
              </div>
              {stat.trend && (
                <span className={`text-sm font-medium ${
                  stat.trend.startsWith('+') ? 'text-success-600' : 'text-danger-600'
                }`}>
                  {stat.trend}
                </span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
            <p className="text-xs text-gray-400 mt-1">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Entity Classification Tool (if not yet classified) */}
      {(!companyProfile?.entityType || companyProfile.entityType === 'unknown') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <EntityClassificationTool />
        </motion.div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Compliance Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ComplianceScoreCard />
          </motion.div>

          {/* Compliance Trend Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ComplianceChart />
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <QuickActions />
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <RecentActivity />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;