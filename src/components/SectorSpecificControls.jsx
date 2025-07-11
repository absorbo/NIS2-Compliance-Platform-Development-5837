import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiShield, FiCheck, FiAlertCircle } = FiIcons;

const SectorSpecificControls = ({ sector, entityType }) => {
  // Comprehensive sector-specific controls based on NIS2
  const sectorControls = {
    'Energy': {
      controls: [
        {
          id: 'EN-1',
          name: 'OT Security',
          description: 'Security measures for operational technology systems',
          requirements: [
            'Network segmentation between IT and OT',
            'Industrial protocol security',
            'SCADA system protection',
            'Real-time monitoring of OT networks'
          ],
          criticality: 'high'
        },
        {
          id: 'EN-2',
          name: 'Grid Resilience',
          description: 'Measures to ensure power grid resilience',
          requirements: [
            'Backup power systems',
            'Grid stability monitoring',
            'Emergency response procedures',
            'Critical infrastructure protection'
          ],
          criticality: 'high'
        }
      ]
    },
    'Transport': {
      controls: [
        {
          id: 'TR-1',
          name: 'Traffic Management Security',
          description: 'Security measures for traffic management systems',
          requirements: [
            'Traffic control system protection',
            'Emergency override capabilities',
            'Backup communication systems',
            'Real-time monitoring'
          ],
          criticality: 'high'
        },
        {
          id: 'TR-2',
          name: 'Passenger Safety Systems',
          description: 'Security of passenger safety and information systems',
          requirements: [
            'Passenger information system security',
            'Emergency communication systems',
            'Access control systems',
            'CCTV system protection'
          ],
          criticality: 'high'
        }
      ]
    },
    'Banking': {
      controls: [
        {
          id: 'BK-1',
          name: 'Payment Systems Security',
          description: 'Security measures for payment processing systems',
          requirements: [
            'Payment gateway security',
            'Transaction monitoring',
            'Fraud detection systems',
            'Financial data protection'
          ],
          criticality: 'high'
        },
        {
          id: 'BK-2',
          name: 'Customer Data Protection',
          description: 'Enhanced protection for customer financial data',
          requirements: [
            'Customer data encryption',
            'Access control systems',
            'Data loss prevention',
            'Privacy controls'
          ],
          criticality: 'high'
        }
      ]
    },
    'Health': {
      controls: [
        {
          id: 'HC-1',
          name: 'Medical Device Security',
          description: 'Security measures for medical devices and equipment',
          requirements: [
            'Medical device network isolation',
            'Device authentication',
            'Firmware security',
            'Remote access controls'
          ],
          criticality: 'high'
        },
        {
          id: 'HC-2',
          name: 'Patient Data Security',
          description: 'Protection of patient health information',
          requirements: [
            'Health record encryption',
            'Access logging and monitoring',
            'Data sharing controls',
            'Privacy compliance measures'
          ],
          criticality: 'high'
        }
      ]
    },
    'Digital Infrastructure': {
      controls: [
        {
          id: 'DI-1',
          name: 'Cloud Service Security',
          description: 'Security measures for cloud service providers',
          requirements: [
            'Multi-tenant isolation',
            'Data residency controls',
            'Service availability measures',
            'Cloud infrastructure security'
          ],
          criticality: 'high'
        },
        {
          id: 'DI-2',
          name: 'Network Infrastructure Security',
          description: 'Security of core network infrastructure',
          requirements: [
            'DDoS protection',
            'BGP security',
            'DNS security',
            'Network monitoring'
          ],
          criticality: 'high'
        }
      ]
    }
  };

  if (!sector || !sectorControls[sector]) {
    return (
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-center space-x-2 text-gray-600">
          <SafeIcon icon={FiAlertCircle} className="w-5 h-5" />
          <span>Please select a valid sector to view specific controls.</span>
        </div>
      </div>
    );
  }

  const { controls } = sectorControls[sector];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-6">
          <SafeIcon icon={FiShield} className="w-6 h-6 text-primary-600" />
          <h2 className="text-xl font-semibold">
            {sector} Sector Controls
          </h2>
        </div>

        <div className="space-y-6">
          {controls.map((control, index) => (
            <motion.div
              key={control.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium">{control.name}</h3>
                  <p className="text-sm text-gray-600">{control.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  control.criticality === 'high'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {control.criticality} criticality
                </span>
              </div>

              <div className="space-y-2">
                {control.requirements.map((req, i) => (
                  <div key={i} className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500 mt-1" />
                    <span className="text-sm text-gray-600">{req}</span>
                  </div>
                ))}
              </div>

              {entityType === 'essential' && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-2 text-sm text-blue-600">
                    <SafeIcon icon={FiAlertCircle} className="w-4 h-4" />
                    <span>Enhanced monitoring required for Essential entities</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectorSpecificControls;