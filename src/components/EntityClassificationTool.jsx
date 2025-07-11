import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiHelpCircle, FiCheckCircle, FiAlertCircle, FiInfo } = FiIcons;

const EntityClassificationTool = () => {
  const [formData, setFormData] = useState({
    sector: '',
    employees: '',
    revenue: '',
    populationServed: '',
  });
  const [classification, setClassification] = useState(null);

  // Essential sectors according to NIS2
  const essentialSectors = [
    'Energy',
    'Transport',
    'Banking',
    'Financial Market Infrastructure',
    'Health',
    'Drinking Water',
    'Wastewater',
    'Digital Infrastructure',
    'ICT Service Management',
    'Public Administration',
    'Space'
  ];

  // Important sectors according to NIS2
  const importantSectors = [
    'Postal Services',
    'Waste Management',
    'Chemical Manufacturing',
    'Food Production',
    'Manufacturing',
    'Digital Providers',
    'Research Organizations'
  ];

  const determineEntityType = () => {
    const { sector, employees, revenue, populationServed } = formData;
    const numEmployees = Number(employees);
    const annualRevenue = Number(revenue);

    // Check if it's a micro or small enterprise
    const isMicroOrSmall = numEmployees < 50 && annualRevenue <= 10;

    // Special case for Public Administration
    if (sector === 'Public Administration') {
      if (numEmployees >= 50 || Number(populationServed) >= 5) {
        return 'essential';
      }
      return 'excluded';
    }

    // Digital Providers special case
    if (sector === 'Digital Providers' && isMicroOrSmall) {
      return 'excluded';
    }

    // Determine based on sector and size
    if (essentialSectors.includes(sector)) {
      return isMicroOrSmall ? 'excluded' : 'essential';
    }

    if (importantSectors.includes(sector)) {
      return isMicroOrSmall ? 'excluded' : 'important';
    }

    return 'not-covered';
  };

  useEffect(() => {
    if (formData.sector && formData.employees && formData.revenue) {
      const entityType = determineEntityType();
      setClassification(entityType);
    }
  }, [formData]);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-6">NIS2 Entity Classification Tool</h2>
      
      <div className="space-y-6">
        {/* Sector Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sector *
          </label>
          <select
            value={formData.sector}
            onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
          >
            <option value="">Select your sector</option>
            <optgroup label="Essential Entities (Annex I)">
              {essentialSectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </optgroup>
            <optgroup label="Important Entities (Annex II)">
              {importantSectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </optgroup>
          </select>
        </div>

        {/* Employee Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Employees *
          </label>
          <input
            type="number"
            value={formData.employees}
            onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="e.g., 100"
            min="1"
          />
        </div>

        {/* Annual Revenue */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Revenue (€ millions) *
          </label>
          <input
            type="number"
            value={formData.revenue}
            onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            placeholder="e.g., 15"
            min="0"
            step="0.1"
          />
        </div>

        {/* Population Served (only for Public Administration) */}
        {formData.sector === 'Public Administration' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Population Served (% of national population) *
            </label>
            <input
              type="number"
              value={formData.populationServed}
              onChange={(e) => setFormData({ ...formData, populationServed: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., 4.5"
              min="0"
              max="100"
              step="0.1"
            />
          </div>
        )}

        {/* Classification Result */}
        {classification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 p-5 border rounded-lg ${
              classification === 'essential'
                ? 'bg-blue-50 border-blue-200'
                : classification === 'important'
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-full ${
                classification === 'essential'
                  ? 'bg-blue-100'
                  : classification === 'important'
                  ? 'bg-yellow-100'
                  : 'bg-gray-100'
              }`}>
                <SafeIcon
                  icon={classification === 'excluded' ? FiAlertCircle : FiCheckCircle}
                  className={`w-5 h-5 ${
                    classification === 'essential'
                      ? 'text-blue-600'
                      : classification === 'important'
                      ? 'text-yellow-600'
                      : 'text-gray-600'
                  }`}
                />
              </div>
              <div>
                <h4 className="text-lg font-medium mb-1">
                  {classification === 'essential'
                    ? 'Essential Entity'
                    : classification === 'important'
                    ? 'Important Entity'
                    : 'Not covered by NIS2'}
                </h4>
                <p className="text-sm mb-3">
                  {classification === 'essential'
                    ? 'Your organization is classified as an Essential Entity under NIS2, subject to comprehensive requirements.'
                    : classification === 'important'
                    ? 'Your organization is classified as an Important Entity under NIS2, subject to baseline requirements.'
                    : 'Based on your inputs, your organization appears to be excluded from NIS2 requirements.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EntityClassificationTool;