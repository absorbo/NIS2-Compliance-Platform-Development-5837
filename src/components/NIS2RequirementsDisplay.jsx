import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShield, FiAlertTriangle, FiClock, FiCheck } = FiIcons;

const NIS2RequirementsDisplay = ({ entityType }) => {
  const requirements = {
    essential: [
      {
        category: 'Risk Management',
        details: [
          'Comprehensive risk analysis policies',
          'Regular risk assessments',
          'Supply chain security measures',
          'Incident handling procedures',
          'Business continuity management',
          'Security of network and information systems',
          'Policies for human resources security',
          'Data protection measures'
        ],
        deadline: '17 October 2024',
        penalties: 'Up to €10M or 2% of global turnover'
      },
      {
        category: 'Incident Reporting',
        details: [
          'Report significant incidents within 24 hours',
          'Initial assessment within 24 hours',
          'Detailed report within 72 hours',
          'Final report within one month'
        ],
        deadline: 'Immediate upon detection',
        penalties: 'Severe penalties for non-reporting'
      },
      {
        category: 'Auditing & Compliance',
        details: [
          'Regular independent security audits',
          'Continuous compliance monitoring',
          'Documentation of security measures',
          'Proactive supervision by authorities'
        ],
        deadline: 'Annual',
        penalties: 'Subject to regular audits'
      }
    ],
    important: [
      {
        category: 'Risk Management',
        details: [
          'Basic risk analysis policies',
          'Periodic risk assessments',
          'Basic supply chain security',
          'Incident response procedures',
          'Business continuity planning',
          'Network security measures'
        ],
        deadline: '17 January 2025',
        penalties: 'Up to €7M or 1.4% of global turnover'
      },
      {
        category: 'Incident Reporting',
        details: [
          'Report significant incidents within 24 hours',
          'Initial assessment within 36 hours',
          'Detailed report within 72 hours'
        ],
        deadline: 'Immediate upon detection',
        penalties: 'Penalties for non-reporting'
      },
      {
        category: 'Auditing & Compliance',
        details: [
          'Self-assessment of security measures',
          'Basic compliance monitoring',
          'Documentation of measures',
          'Reactive supervision'
        ],
        deadline: 'Bi-annual',
        penalties: 'Subject to incident-based audits'
      }
    ]
  };

  const applicableRequirements = requirements[entityType] || [];

  if (!entityType || !['essential', 'important'].includes(entityType)) {
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <SafeIcon icon={FiAlertTriangle} className="w-5 h-5" />
          <span>Please determine your entity classification first.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className={`p-4 rounded-lg ${
        entityType === 'essential' ? 'bg-blue-50' : 'bg-yellow-50'
      }`}>
        <div className="flex items-center space-x-2">
          <SafeIcon icon={FiShield} className={`w-5 h-5 ${
            entityType === 'essential' ? 'text-blue-600' : 'text-yellow-600'
          }`} />
          <h2 className="text-lg font-semibold">
            {entityType === 'essential' ? 'Essential Entity Requirements' : 'Important Entity Requirements'}
          </h2>
        </div>
      </div>

      {applicableRequirements.map((section, index) => (
        <motion.div
          key={section.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-medium mb-4">{section.category}</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
              <ul className="space-y-2">
                {section.details.map((detail, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 mt-1" />
                    <span className="text-sm text-gray-600">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">Deadline: {section.deadline}</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiAlertTriangle} className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-600">{section.penalties}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NIS2RequirementsDisplay;