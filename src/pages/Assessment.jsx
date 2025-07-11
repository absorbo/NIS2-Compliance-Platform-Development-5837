import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import { assessmentQuestions } from '../data/assessmentQuestions';
import AssessmentEngine from '../components/AssessmentEngine';
import ComplianceAnalysis from '../components/ComplianceAnalysis';

const { FiClipboard, FiBarChart, FiFileText } = FiIcons;

const Assessment = () => {
  const { assessmentAnswers, selectedCountry, companyProfile } = useAppStore();
  const [activeTab, setActiveTab] = useState('assessment');

  const answeredQuestions = Object.keys(assessmentAnswers).length;
  const totalQuestions = assessmentQuestions.length;
  const completionRate = Math.round((answeredQuestions / totalQuestions) * 100);

  const tabs = [
    { id: 'assessment', label: 'Assessment', icon: FiClipboard },
    { id: 'analysis', label: 'Analysis', icon: FiBarChart },
    { id: 'report', label: 'Report', icon: FiFileText }
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
            NIS2 Compliance Assessment
          </h1>
          <p className="text-gray-600">
            Comprehensive evaluation of your cybersecurity measures against NIS2 requirements
          </p>
          
          {/* Assessment Status */}
          <div className="mt-4 flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-sm text-gray-600">
                {answeredQuestions} of {totalQuestions} questions completed ({completionRate}%)
              </span>
            </div>
            {selectedCountry && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Country: {selectedCountry}
                </span>
              </div>
            )}
            {companyProfile?.industry && (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">
                  Sector: {companyProfile.industry}
                </span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
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
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'assessment' && <AssessmentEngine />}
        {activeTab === 'analysis' && <ComplianceAnalysis />}
        {activeTab === 'report' && <AssessmentReport />}
      </motion.div>
    </div>
  );
};

const AssessmentReport = () => {
  const { assessmentAnswers, selectedCountry, companyProfile } = useAppStore();
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Assessment Report</h3>
      
      <div className="prose max-w-none">
        <div className="mb-6">
          <h4 className="text-base font-medium text-gray-900 mb-3">Executive Summary</h4>
          <p className="text-gray-700">
            This report presents the NIS2 compliance assessment results for{' '}
            {companyProfile?.companyName || 'your organization'} conducted using the official
            NIS2 Directive requirements. The assessment evaluates cybersecurity measures
            across all mandatory control areas.
          </p>
        </div>

        <div className="mb-6">
          <h4 className="text-base font-medium text-gray-900 mb-3">Assessment Scope</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Risk Management (Article 20.1.a)</li>
            <li>Incident Response (Article 20.1.b)</li>
            <li>Supply Chain Security (Article 20.1.c)</li>
            <li>System Security (Article 20.1.d-e)</li>
            <li>Human Resources Security (Article 20.1.f)</li>
            <li>Cryptography (Article 20.1.g)</li>
            <li>Incident Reporting (Article 21)</li>
            <li>Compliance Monitoring (Article 22)</li>
          </ul>
        </div>

        <div className="mb-6">
          <h4 className="text-base font-medium text-gray-900 mb-3">Key Findings</h4>
          <p className="text-gray-700">
            Based on the assessment responses, detailed analysis has been provided
            in the Analysis tab. All findings are based on the official NIS2 Directive
            requirements and current regulatory guidance.
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h5 className="font-medium text-blue-900 mb-2">Next Steps</h5>
          <ol className="list-decimal list-inside space-y-1 text-blue-800 text-sm">
            <li>Review the detailed analysis and recommendations</li>
            <li>Prioritize actions based on critical gaps identified</li>
            <li>Develop an implementation roadmap</li>
            <li>Begin addressing high-priority items immediately</li>
            <li>Schedule regular compliance reviews</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Assessment;