import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiAlertTriangle, FiArrowRight, FiTarget, FiClock } = FiIcons;

const ComplianceGaps = () => {
  const gaps = [
    {
      id: 1,
      control: 'NIS2-3.1',
      title: 'Incident Response Plan',
      description: 'Missing formal incident response procedures and documentation',
      severity: 'high',
      impact: 'High business risk during security incidents',
      recommendation: 'Develop comprehensive incident response plan with clear roles and procedures',
      estimatedEffort: '40 hours',
      priority: 1
    },
    {
      id: 2,
      control: 'NIS2-2.2',
      title: 'Risk Treatment',
      description: 'Risk treatment processes are not consistently applied across the organization',
      severity: 'medium',
      impact: 'Inconsistent risk mitigation may leave vulnerabilities unaddressed',
      recommendation: 'Implement standardized risk treatment procedures and regular reviews',
      estimatedEffort: '60 hours',
      priority: 2
    },
    {
      id: 3,
      control: 'NIS2-4.2',
      title: 'Vendor Management',
      description: 'Vendor security assessments are not comprehensive or regularly updated',
      severity: 'medium',
      impact: 'Supply chain vulnerabilities may impact business operations',
      recommendation: 'Enhance vendor security assessment process and implement regular reviews',
      estimatedEffort: '32 hours',
      priority: 3
    },
    {
      id: 4,
      control: 'NIS2-3.2',
      title: 'Incident Reporting',
      description: 'Incident reporting procedures do not meet NIS2 requirements',
      severity: 'low',
      impact: 'Regulatory compliance issues and potential penalties',
      recommendation: 'Update incident reporting procedures to align with NIS2 requirements',
      estimatedEffort: '16 hours',
      priority: 4
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'gray';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Gap Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-danger-600 mb-1">1</div>
            <div className="text-sm text-gray-600">High Severity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-600 mb-1">2</div>
            <div className="text-sm text-gray-600">Medium Severity</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600 mb-1">1</div>
            <div className="text-sm text-gray-600">Low Severity</div>
          </div>
        </div>
      </motion.div>

      {/* Gap Details */}
      <div className="space-y-4">
        {gaps.map((gap, index) => {
          const severityColor = getSeverityColor(gap.severity);
          
          return (
            <motion.div
              key={gap.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-l-gray-200 hover:border-l-primary-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    severityColor === 'danger' ? 'bg-danger-100' :
                    severityColor === 'warning' ? 'bg-warning-100' :
                    'bg-success-100'
                  }`}>
                    <SafeIcon 
                      icon={FiAlertTriangle} 
                      className={`w-4 h-4 ${
                        severityColor === 'danger' ? 'text-danger-600' :
                        severityColor === 'warning' ? 'text-warning-600' :
                        'text-success-600'
                      }`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{gap.title}</h4>
                    <p className="text-sm text-gray-600">{gap.control}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    severityColor === 'danger' ? 'bg-danger-100 text-danger-800' :
                    severityColor === 'warning' ? 'bg-warning-100 text-warning-800' :
                    'bg-success-100 text-success-800'
                  }`}>
                    {gap.severity} severity
                  </span>
                  <span className="text-sm text-gray-500">Priority #{gap.priority}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Description</h5>
                  <p className="text-gray-600">{gap.description}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Business Impact</h5>
                  <p className="text-gray-600">{gap.impact}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-1">Recommendation</h5>
                  <p className="text-gray-600">{gap.recommendation}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <SafeIcon icon={FiClock} className="w-4 h-4" />
                      <span>{gap.estimatedEffort}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <SafeIcon icon={FiTarget} className="w-4 h-4" />
                      <span>Priority {gap.priority}</span>
                    </div>
                  </div>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <span>Add to Roadmap</span>
                    <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ComplianceGaps;