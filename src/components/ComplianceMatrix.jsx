import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle, FiAlertTriangle, FiX, FiInfo } = FiIcons;

const ComplianceMatrix = () => {
  const controls = [
    { id: 'NIS2-1.1', name: 'Governance Structure', category: 'Governance', status: 'covered', coverage: 100 },
    { id: 'NIS2-1.2', name: 'Risk Management Policy', category: 'Governance', status: 'partial', coverage: 75 },
    { id: 'NIS2-2.1', name: 'Risk Assessment', category: 'Risk Management', status: 'covered', coverage: 90 },
    { id: 'NIS2-2.2', name: 'Risk Treatment', category: 'Risk Management', status: 'partial', coverage: 60 },
    { id: 'NIS2-3.1', name: 'Incident Response Plan', category: 'Incident Response', status: 'not-covered', coverage: 0 },
    { id: 'NIS2-3.2', name: 'Incident Reporting', category: 'Incident Response', status: 'partial', coverage: 40 },
    { id: 'NIS2-4.1', name: 'Supply Chain Security', category: 'Supply Chain', status: 'covered', coverage: 85 },
    { id: 'NIS2-4.2', name: 'Vendor Management', category: 'Supply Chain', status: 'partial', coverage: 55 },
    { id: 'NIS2-5.1', name: 'Business Continuity', category: 'Business Continuity', status: 'covered', coverage: 95 },
    { id: 'NIS2-5.2', name: 'Disaster Recovery', category: 'Business Continuity', status: 'partial', coverage: 70 }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'covered': return FiCheckCircle;
      case 'partial': return FiAlertTriangle;
      case 'not-covered': return FiX;
      default: return FiInfo;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'covered': return 'success';
      case 'partial': return 'warning';
      case 'not-covered': return 'danger';
      default: return 'gray';
    }
  };

  const categories = [...new Set(controls.map(control => control.category))];

  return (
    <div className="space-y-6">
      {categories.map((category, categoryIndex) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{category}</h3>
          
          <div className="space-y-3">
            {controls.filter(control => control.category === category).map((control, index) => {
              const statusColor = getStatusColor(control.status);
              const StatusIcon = getStatusIcon(control.status);
              
              return (
                <motion.div
                  key={control.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      statusColor === 'success' ? 'bg-success-100' :
                      statusColor === 'warning' ? 'bg-warning-100' :
                      statusColor === 'danger' ? 'bg-danger-100' :
                      'bg-gray-100'
                    }`}>
                      <SafeIcon 
                        icon={StatusIcon} 
                        className={`w-4 h-4 ${
                          statusColor === 'success' ? 'text-success-600' :
                          statusColor === 'warning' ? 'text-warning-600' :
                          statusColor === 'danger' ? 'text-danger-600' :
                          'text-gray-600'
                        }`}
                      />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{control.name}</div>
                      <div className="text-sm text-gray-600">{control.id}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{control.coverage}%</div>
                      <div className="text-xs text-gray-500">Coverage</div>
                    </div>
                    <div className="w-24">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            statusColor === 'success' ? 'bg-success-500' :
                            statusColor === 'warning' ? 'bg-warning-500' :
                            statusColor === 'danger' ? 'bg-danger-500' :
                            'bg-gray-500'
                          }`}
                          style={{ width: `${control.coverage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ComplianceMatrix;