import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { formatDistanceToNow } from 'date-fns';

const { FiCheckCircle, FiUpload, FiAlertTriangle, FiClock } = FiIcons;

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'completion',
      title: 'Completed: Network Monitoring Setup',
      description: 'Deployed continuous monitoring solution',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: FiCheckCircle,
      color: 'success'
    },
    {
      id: 2,
      type: 'upload',
      title: 'Evidence Uploaded',
      description: 'Incident response policy document',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      icon: FiUpload,
      color: 'primary'
    },
    {
      id: 3,
      type: 'alert',
      title: 'Compliance Gap Identified',
      description: 'Risk assessment process needs review',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: FiAlertTriangle,
      color: 'warning'
    },
    {
      id: 4,
      type: 'reminder',
      title: 'Upcoming Deadline',
      description: 'Vendor security assessment due',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: FiClock,
      color: 'danger'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-start space-x-3"
          >
            <div className={`p-2 rounded-lg ${
              activity.color === 'success' ? 'bg-success-100' :
              activity.color === 'primary' ? 'bg-primary-100' :
              activity.color === 'warning' ? 'bg-warning-100' :
              'bg-danger-100'
            }`}>
              <SafeIcon 
                icon={activity.icon} 
                className={`w-4 h-4 ${
                  activity.color === 'success' ? 'text-success-600' :
                  activity.color === 'primary' ? 'text-primary-600' :
                  activity.color === 'warning' ? 'text-warning-600' :
                  'text-danger-600'
                }`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {activity.title}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {activity.description}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;