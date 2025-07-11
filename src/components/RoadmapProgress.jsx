import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle, FiClock, FiAlertTriangle, FiTarget } = FiIcons;

const RoadmapProgress = ({ items }) => {
  const completedItems = items.filter(item => item.status === 'completed');
  const inProgressItems = items.filter(item => item.status === 'in-progress');
  const overdueItems = items.filter(item => item.status === 'overdue');
  const pendingItems = items.filter(item => item.status === 'pending');

  const overallProgress = items.length > 0 ? 
    Math.round((completedItems.length / items.length) * 100) : 0;

  const stats = [
    {
      title: 'Completed',
      value: completedItems.length,
      total: items.length,
      icon: FiCheckCircle,
      color: 'success'
    },
    {
      title: 'In Progress',
      value: inProgressItems.length,
      total: items.length,
      icon: FiClock,
      color: 'primary'
    },
    {
      title: 'Overdue',
      value: overdueItems.length,
      total: items.length,
      icon: FiAlertTriangle,
      color: 'danger'
    },
    {
      title: 'Pending',
      value: pendingItems.length,
      total: items.length,
      icon: FiTarget,
      color: 'warning'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Roadmap Progress</h3>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary-600">{overallProgress}%</div>
          <div className="text-sm text-gray-600">Overall Progress</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-primary-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`p-3 rounded-lg mb-2 inline-block ${
              stat.color === 'success' ? 'bg-success-100' :
              stat.color === 'primary' ? 'bg-primary-100' :
              stat.color === 'danger' ? 'bg-danger-100' :
              'bg-warning-100'
            }`}>
              <SafeIcon 
                icon={stat.icon} 
                className={`w-6 h-6 ${
                  stat.color === 'success' ? 'text-success-600' :
                  stat.color === 'primary' ? 'text-primary-600' :
                  stat.color === 'danger' ? 'text-danger-600' :
                  'text-warning-600'
                }`}
              />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.title}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapProgress;