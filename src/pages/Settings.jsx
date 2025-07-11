import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import { euCountries, industrySectors, companySizes } from '../data/constants';
import EntityClassificationTool from '../components/EntityClassificationTool';
import { entityClassification } from '../data/entityClassification';

const { FiSettings, FiUser, FiGlobe, FiShield, FiSave } = FiIcons;

const Settings = () => {
  const { companyProfile, selectedCountry, setCompanyProfile, setSelectedCountry } = useAppStore();
  const [activeTab, setActiveTab] = useState('company');
  const [formData, setFormData] = useState({
    companyName: companyProfile?.companyName || '',
    country: selectedCountry || '',
    industry: companyProfile?.industry || '',
    subsector: companyProfile?.subsector || '',
    size: companyProfile?.size || '',
    employees: companyProfile?.employees || '',
    revenue: companyProfile?.revenue || '',
    populationServed: companyProfile?.populationServed || '',
    entityType: companyProfile?.entityType || null
  });

  const tabs = [
    { id: 'company', label: 'Company Profile', icon: FiUser },
    { id: 'entity', label: 'Entity Classification', icon: FiShield },
    { id: 'compliance', label: 'Compliance Settings', icon: FiShield },
    { id: 'preferences', label: 'Preferences', icon: FiSettings }
  ];

  const handleSave = () => {
    setCompanyProfile(formData);
    setSelectedCountry(formData.country);
    // Show success message
  };

  // Get all sectors from both essential and important categories
  const allSectors = [
    ...entityClassification.essential.sectors.map(s => ({ 
      value: s.sector, 
      label: s.sector,
      type: 'essential' 
    })),
    ...entityClassification.important.sectors.map(s => ({ 
      value: s.sector, 
      label: s.sector,
      type: 'important' 
    }))
  ];

  // Get subsectors for selected industry
  const getSubsectors = (industry) => {
    if (!industry) return [];
    
    const essentialSector = entityClassification.essential.sectors.find(s => s.sector === industry);
    const importantSector = entityClassification.important.sectors.find(s => s.sector === industry);
    const selectedSector = essentialSector || importantSector;
    
    return selectedSector?.subsectors || [];
  };

  const subsectors = getSubsectors(formData.industry);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Settings
          </h1>
          <p className="text-gray-600">
            Manage your organization profile and compliance preferences
          </p>
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        {activeTab === 'company' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter company name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select country</option>
                  {euCountries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    industry: e.target.value,
                    subsector: '' // Reset subsector when industry changes
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select industry</option>
                  <optgroup label="Essential Entities (Annex I)">
                    {allSectors
                      .filter(s => s.type === 'essential')
                      .map((sector) => (
                        <option key={sector.value} value={sector.value}>
                          {sector.label}
                        </option>
                      ))}
                  </optgroup>
                  <optgroup label="Important Entities (Annex II)">
                    {allSectors
                      .filter(s => s.type === 'important')
                      .map((sector) => (
                        <option key={sector.value} value={sector.value}>
                          {sector.label}
                        </option>
                      ))}
                  </optgroup>
                </select>
              </div>
              
              {subsectors.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subsector
                  </label>
                  <select
                    value={formData.subsector}
                    onChange={(e) => setFormData({ ...formData, subsector: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select subsector</option>
                    {subsectors.map((subsector) => (
                      <option key={subsector} value={subsector}>
                        {subsector}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Employees
                </label>
                <input
                  type="number"
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 100"
                  min="1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Revenue (€ millions)
                </label>
                <input
                  type="number"
                  value={formData.revenue}
                  onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 15"
                  min="0"
                  step="0.1"
                />
              </div>
              
              {formData.industry === 'Public administration' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Population Served (% of national population)
                  </label>
                  <input
                    type="number"
                    value={formData.populationServed}
                    onChange={(e) => setFormData({ ...formData, populationServed: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="e.g., 4.5"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    For public administration, NIS2 applies if you serve 5% or more of the national population
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'entity' && (
          <EntityClassificationTool />
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Automatic Assessment Updates</h4>
                  <p className="text-sm text-gray-600">Automatically update compliance status when new evidence is submitted</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-600">Receive notifications for compliance updates and deadlines</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">AI Recommendations</h4>
                  <p className="text-sm text-gray-600">Enable AI-powered suggestions for compliance improvements</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Preferences</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="de">German</option>
                  <option value="fr">French</option>
                  <option value="nl">Dutch</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="UTC">UTC</option>
                  <option value="CET">Central European Time</option>
                  <option value="GMT">Greenwich Mean Time</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Format
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;