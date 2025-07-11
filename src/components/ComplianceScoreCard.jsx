import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';

const { FiTrendingUp, FiTarget, FiCheckCircle, FiAlertTriangle } = FiIcons;

const ComplianceScoreCard = () => {
  const { complianceScore } = useAppStore();

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  const getScoreText = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Improvement';
  };

  const scoreColor = getScoreColor(complianceScore);
  const scoreText = getScoreText(complianceScore);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Compliance Score</h3>
        <SafeIcon icon={FiTarget} className="w-5 h-5 text-gray-400" />
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {complianceScore}%
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            scoreColor === 'success' ? 'bg-success-100 text-success-800' :
            scoreColor === 'warning' ? 'bg-warning-100 text-warning-800' :
            'bg-danger-100 text-danger-800'
          }`}>
            <SafeIcon 
              icon={scoreColor === 'success' ? FiCheckCircle : FiAlertTriangle} 
              className="w-4 h-4 mr-1" 
            />
            {scoreText}
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center text-success-600 text-sm font-medium mb-1">
            <SafeIcon icon={FiTrendingUp} className="w-4 h-4 mr-1" />
            +12%
          </div>
          <div className="text-xs text-gray-500">vs last month</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{complianceScore}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full ${
              scoreColor === 'success' ? 'bg-success-500' :
              scoreColor === 'warning' ? 'bg-warning-500' :
              'bg-danger-500'
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${complianceScore}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>

      {/* Action Items */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Controls Covered</span>
          <span className="font-medium text-gray-900">24/35</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Critical Gaps</span>
          <span className="font-medium text-danger-600">3</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Next Review</span>
          <span className="font-medium text-gray-900">March 2024</span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceScoreCard;