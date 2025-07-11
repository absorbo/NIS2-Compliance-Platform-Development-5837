import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiClipboard, FiMap, FiShield, FiUpload, FiArrowRight } = FiIcons;

const QuickActions = () => {
  const actions = [
    {
      title: 'Continue Assessment',
      description: 'Complete your NIS2 compliance evaluation',
      icon: FiClipboard,
      link: '/assessment',
      color: 'primary'
    },
    {
      title: 'View Roadmap',
      description: 'Check your compliance action plan',
      icon: FiMap,
      link: '/roadmap',
      color: 'success'
    },
    {
      title: 'Upload Evidence',
      description: 'Submit supporting documentation',
      icon: FiUpload,
      link: '/assessment',
      color: 'warning'
    },
    {
      title: 'Compliance Report',
      description: 'Generate detailed compliance report',
      icon: FiShield,
      link: '/compliance',
      color: 'danger'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link
              to={action.link}
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <div className={`p-3 rounded-lg mr-4 ${
                action.color === 'primary' ? 'bg-primary-100' :
                action.color === 'success' ? 'bg-success-100' :
                action.color === 'warning' ? 'bg-warning-100' :
                'bg-danger-100'
              }`}>
                <SafeIcon 
                  icon={action.icon} 
                  className={`w-5 h-5 ${
                    action.color === 'primary' ? 'text-primary-600' :
                    action.color === 'success' ? 'text-success-600' :
                    action.color === 'warning' ? 'text-warning-600' :
                    'text-danger-600'
                  }`}
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 group-hover:text-gray-700">
                  {action.title}
                </h4>
                <p className="text-sm text-gray-600">{action.description}</p>
              </div>
              <SafeIcon 
                icon={FiArrowRight} 
                className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" 
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;