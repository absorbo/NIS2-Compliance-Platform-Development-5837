import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import ComplianceMatrix from '../components/ComplianceMatrix';
import ComplianceGaps from '../components/ComplianceGaps';
import ComplianceReport from '../components/ComplianceReport';

const { FiShield, FiDownload, FiEye, FiAlertCircle } = FiIcons;

const ComplianceOverview = () => {
  const { complianceScore, complianceGaps, selectedCountry } = useAppStore();
  const [activeTab, setActiveTab] = useState('matrix');

  const tabs = [
    { id: 'matrix', label: 'Control Matrix', icon: FiShield },
    { id: 'gaps', label: 'Gap Analysis', icon: FiAlertCircle },
    { id: 'report', label: 'Compliance Report', icon: FiEye }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Compliance Overview
            </h1>
            <p className="text-gray-600">
              Detailed view of your NIS2 compliance status and control coverage
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <div className="text-sm text-gray-600">
              Country: <span className="font-medium">{selectedCountry || 'Not selected'}</span>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Compliance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6 mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {complianceScore}%
            </div>
            <p className="text-sm text-gray-600">Overall Compliance</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success-600 mb-2">
              24
            </div>
            <p className="text-sm text-gray-600">Controls Covered</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning-600 mb-2">
              8
            </div>
            <p className="text-sm text-gray-600">Partially Covered</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-danger-600 mb-2">
              3
            </div>
            <p className="text-sm text-gray-600">Not Covered</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'matrix' && <ComplianceMatrix />}
        {activeTab === 'gaps' && <ComplianceGaps />}
        {activeTab === 'report' && <ComplianceReport />}
      </motion.div>
    </div>
  );
};

export default ComplianceOverview;