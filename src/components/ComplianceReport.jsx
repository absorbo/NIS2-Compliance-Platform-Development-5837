import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import { format } from 'date-fns';

const { FiDownload, FiPrinter, FiShare2, FiFileText, FiCalendar, FiUser } = FiIcons;

const ComplianceReport = () => {
  const { companyProfile, selectedCountry, complianceScore } = useAppStore();

  const reportSections = [
    {
      title: 'Executive Summary',
      description: 'High-level overview of compliance status and key findings',
      status: 'ready'
    },
    {
      title: 'Compliance Assessment Results',
      description: 'Detailed analysis of NIS2 control coverage and gaps',
      status: 'ready'
    },
    {
      title: 'Risk Analysis',
      description: 'Business risk assessment and impact evaluation',
      status: 'ready'
    },
    {
      title: 'Remediation Roadmap',
      description: 'Prioritized action plan for achieving compliance',
      status: 'ready'
    },
    {
      title: 'Evidence Documentation',
      description: 'Supporting documentation and evidence references',
      status: 'pending'
    }
  ];

  const reportMetrics = [
    { label: 'Overall Compliance Score', value: `${complianceScore}%`, color: 'primary' },
    { label: 'Controls Assessed', value: '35', color: 'success' },
    { label: 'Critical Gaps', value: '3', color: 'danger' },
    { label: 'Action Items', value: '12', color: 'warning' }
  ];

  return (
    <div className="space-y-6">
      {/* Report Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              NIS2 Compliance Report
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiUser} className="w-4 h-4" />
                <span>{companyProfile?.companyName || 'Organization'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                <span>Generated on {format(new Date(), 'MMM d, yyyy')}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiShare2} className="w-4 h-4" />
              <span>Share</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiPrinter} className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Report Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reportMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-4 bg-gray-50 rounded-lg"
            >
              <div className={`text-2xl font-bold mb-1 ${
                metric.color === 'primary' ? 'text-primary-600' :
                metric.color === 'success' ? 'text-success-600' :
                metric.color === 'danger' ? 'text-danger-600' :
                'text-warning-600'
              }`}>
                {metric.value}
              </div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Report Sections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Sections</h3>
        <div className="space-y-3">
          {reportSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiFileText} className="w-5 h-5 text-gray-400" />
                <div>
                  <h4 className="font-medium text-gray-900">{section.title}</h4>
                  <p className="text-sm text-gray-600">{section.description}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                section.status === 'ready' 
                  ? 'bg-success-100 text-success-800' 
                  : 'bg-warning-100 text-warning-800'
              }`}>
                {section.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Report Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Executive Summary Preview</h3>
        <div className="prose max-w-none">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Assessment Overview</h4>
            <p className="text-gray-700 mb-4">
              This report presents the results of a comprehensive NIS2 compliance assessment 
              conducted for {companyProfile?.companyName || 'your organization'} in {selectedCountry || 'the selected country'}. 
              The assessment evaluated {reportMetrics[1].value} controls across key cybersecurity domains.
            </p>
            
            <h4 className="font-semibold text-gray-900 mb-3">Key Findings</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Overall compliance score of {complianceScore}% indicates good progress toward NIS2 compliance</li>
              <li>{reportMetrics[2].value} critical gaps require immediate attention</li>
              <li>Strongest performance in governance and risk management domains</li>
              <li>Incident response capabilities need significant improvement</li>
            </ul>

            <h4 className="font-semibold text-gray-900 mb-3 mt-4">Recommendations</h4>
            <p className="text-gray-700">
              Priority should be given to developing formal incident response procedures and 
              enhancing supply chain security measures. The accompanying roadmap provides 
              detailed action items with timelines and resource requirements.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComplianceReport;