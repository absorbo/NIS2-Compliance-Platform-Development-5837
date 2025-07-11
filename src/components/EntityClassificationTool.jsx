import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { countryRequirements } from '../data/countryRequirements';
import { entityClassification, determineEntitySize } from '../data/entityClassification';

const { FiHelpCircle, FiCheckCircle, FiAlertCircle, FiInfo } = FiIcons;

const EntityClassificationTool = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    country: '',
    sector: '',
    subsector: '',
    employees: '',
    revenue: '',
    populationServed: '',
    criticalServices: false,
    crossBorder: false,
  });
  const [classification, setClassification] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Validation rules for each step
  const stepValidation = {
    1: (data) => {
      const errors = {};
      if (!data.country) errors.country = 'Country selection is required';
      return errors;
    },
    2: (data) => {
      const errors = {};
      if (!data.sector) errors.sector = 'Sector selection is required';
      if (data.sector && !data.subsector && getSubsectors(data.sector).length > 0) {
        errors.subsector = 'Subsector selection is required';
      }
      return errors;
    },
    3: (data) => {
      const errors = {};
      if (!data.employees) errors.employees = 'Number of employees is required';
      if (!data.revenue) errors.revenue = 'Annual revenue is required';
      if (data.sector === 'Public Administration' && !data.populationServed) {
        errors.populationServed = 'Population served is required for public administration';
      }
      return errors;
    }
  };

  // Get subsectors for a specific sector
  const getSubsectors = (sector) => {
    const sectorInfo = [...entityClassification.sectors.essential, ...entityClassification.sectors.important]
                        .find(s => s.name === sector);
    return sectorInfo?.subsectors || [];
  };

  // Determine entity classification
  const determineEntityType = () => {
    return entityClassification.determineEntityType({
      sector: formData.sector,
      subsector: formData.subsector,
      employees: Number(formData.employees),
      revenue: Number(formData.revenue),
      country: formData.country,
      populationServed: formData.sector === 'Public Administration' ? Number(formData.populationServed) : undefined,
      criticalServices: formData.criticalServices,
      crossBorder: formData.crossBorder
    });
  };

  // Proceed to next step
  const handleNext = () => {
    const errors = stepValidation[step](formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      if (step === 3) {
        // Final step - perform classification
        const result = determineEntityType();
        setClassification(result);
      } else {
        setStep(step + 1);
      }
    }
  };

  // Go back to previous step
  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      // Reset dependent fields when parent field changes
      ...(field === 'sector' ? { subsector: '' } : {}),
      ...(field === 'country' ? { classification: null } : {})
    }));
  };

  // Render current step content
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Country Selection</h3>
            <p className="text-sm text-gray-600 mb-4">
              Select your country to determine applicable NIS2 requirements.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country *
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                  validationErrors.country ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select your country</option>
                {Object.entries(entityClassification.countryRules).map(([code, country]) => (
                  <option key={code} value={code}>
                    {code} - {country.transpositionStatus === 'In Progress' ? '(In Progress)' : ''}
                  </option>
                ))}
              </select>
              {validationErrors.country && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.country}</p>
              )}
            </div>
            
            {formData.country && entityClassification.countryRules[formData.country] && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start space-x-2">
                  <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Country Information</h4>
                    <p className="text-sm text-blue-800">
                      Transposition Status: {entityClassification.countryRules[formData.country].transpositionStatus}
                    </p>
                    {entityClassification.countryRules[formData.country].specificRequirements?.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-blue-800">Specific Requirements:</p>
                        <ul className="list-disc list-inside text-sm text-blue-800 mt-1">
                          {entityClassification.countryRules[formData.country].specificRequirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Sector Information</h3>
            <p className="text-sm text-gray-600 mb-4">
              NIS2 applies to specific sectors. Select your organization's sector.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sector *
              </label>
              <select
                value={formData.sector}
                onChange={(e) => handleChange('sector', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                  validationErrors.sector ? 'border-red-300' : 'border-gray-300'
                }`}
              >
                <option value="">Select your sector</option>
                <optgroup label="Essential Entities (Annex I)">
                  {entityClassification.sectors.essential.map((sector) => (
                    <option key={sector.name} value={sector.name}>
                      {sector.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Important Entities (Annex II)">
                  {entityClassification.sectors.important.map((sector) => (
                    <option key={sector.name} value={sector.name}>
                      {sector.name}
                    </option>
                  ))}
                </optgroup>
              </select>
              {validationErrors.sector && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.sector}</p>
              )}
            </div>
            
            {formData.sector && getSubsectors(formData.sector).length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subsector *
                </label>
                <select
                  value={formData.subsector}
                  onChange={(e) => handleChange('subsector', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    validationErrors.subsector ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a subsector</option>
                  {getSubsectors(formData.sector).map((subsector) => (
                    <option key={subsector} value={subsector}>
                      {subsector}
                    </option>
                  ))}
                </select>
                {validationErrors.subsector && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.subsector}</p>
                )}
              </div>
            )}
            
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="crossBorder"
                checked={formData.crossBorder}
                onChange={(e) => handleChange('crossBorder', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="crossBorder" className="ml-2 block text-sm text-gray-700">
                This organization provides services across EU member states
              </label>
            </div>
            
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="criticalServices"
                checked={formData.criticalServices}
                onChange={(e) => handleChange('criticalServices', e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="criticalServices" className="ml-2 block text-sm text-gray-700">
                This organization provides critical services or infrastructure
              </label>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Organization Size</h3>
            <p className="text-sm text-gray-600 mb-4">
              Size criteria are important for determining NIS2 applicability.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Employees *
              </label>
              <input
                type="number"
                value={formData.employees}
                onChange={(e) => handleChange('employees', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                  validationErrors.employees ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., 100"
                min="1"
              />
              {validationErrors.employees && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.employees}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Revenue (€ millions) *
              </label>
              <input
                type="number"
                value={formData.revenue}
                onChange={(e) => handleChange('revenue', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                  validationErrors.revenue ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., 15"
                min="0"
                step="0.1"
              />
              {validationErrors.revenue && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.revenue}</p>
              )}
            </div>
            
            {formData.sector === 'Public Administration' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Population Served (% of national population) *
                </label>
                <input
                  type="number"
                  value={formData.populationServed}
                  onChange={(e) => handleChange('populationServed', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${
                    validationErrors.populationServed ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 4.5"
                  min="0"
                  max="100"
                  step="0.1"
                />
                {validationErrors.populationServed && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.populationServed}</p>
                )}
                <p className="mt-1 text-xs text-gray-500">
                  Public administration entities are in scope if they serve 5% or more of the population or have 50+ employees
                </p>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  // Render classification result
  const renderClassificationResult = () => {
    if (!classification) return null;

    return (
      <div className={`p-5 border rounded-lg ${
        classification.type === 'essential' ? 'bg-primary-50 border-primary-200' :
        classification.type === 'important' ? 'bg-warning-50 border-warning-200' :
        'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-full ${
            classification.type === 'essential' ? 'bg-primary-100' :
            classification.type === 'important' ? 'bg-warning-100' :
            'bg-gray-100'
          }`}>
            <SafeIcon
              icon={classification.type === 'essential' || classification.type === 'important' ? FiCheckCircle : FiAlertCircle}
              className={`w-5 h-5 ${
                classification.type === 'essential' ? 'text-primary-600' :
                classification.type === 'important' ? 'text-warning-600' :
                'text-gray-600'
              }`}
            />
          </div>
          <div>
            <h4 className="text-lg font-medium mb-1">
              {classification.type === 'essential' ? 'Essential Entity' :
               classification.type === 'important' ? 'Important Entity' :
               classification.type === 'excluded' ? 'Excluded from NIS2' :
               'Not covered by NIS2'}
            </h4>
            <p className="text-sm mb-3">
              {classification.reason}
            </p>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="px-2 py-1 bg-gray-100 rounded text-gray-800">
                {determineEntitySize(Number(formData.employees), Number(formData.revenue))} organization
              </span>
              <span className="text-gray-600">
                {formData.employees} employees, €{formData.revenue}M revenue
              </span>
            </div>
          </div>
        </div>

        {/* Requirements based on classification */}
        {(classification.type === 'essential' || classification.type === 'important') && (
          <div className="mt-5 pt-5 border-t border-gray-200">
            <h5 className="font-medium mb-3">Key Requirements</h5>
            <ul className="space-y-2">
              {classification.type === 'essential' ? (
                <>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-primary-500 mt-0.5" />
                    <span className="text-sm">Comprehensive risk management measures required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-primary-500 mt-0.5" />
                    <span className="text-sm">24-hour incident reporting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-primary-500 mt-0.5" />
                    <span className="text-sm">Annual external security audits</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-primary-500 mt-0.5" />
                    <span className="text-sm">Higher penalties for non-compliance (up to €10M or 2% of turnover)</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-warning-500 mt-0.5" />
                    <span className="text-sm">Basic risk management measures required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-warning-500 mt-0.5" />
                    <span className="text-sm">72-hour incident reporting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-warning-500 mt-0.5" />
                    <span className="text-sm">Bi-annual self-assessment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiCheckCircle} className="w-4 h-4 text-warning-500 mt-0.5" />
                    <span className="text-sm">Lower penalties for non-compliance (up to €7M or 1.4% of turnover)</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
        
        {/* Country-specific requirements */}
        {(classification.type === 'essential' || classification.type === 'important') && 
         formData.country && 
         entityClassification.countryRules[formData.country]?.specificRequirements?.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h5 className="font-medium mb-2">Country-Specific Requirements</h5>
            <ul className="space-y-1">
              {entityClassification.countryRules[formData.country].specificRequirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <SafeIcon icon={FiInfo} className="w-4 h-4 text-blue-500 mt-0.5" />
                  <span className="text-sm">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Exclusion explanation if applicable */}
        {classification.type === 'excluded' && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-start space-x-2">
              <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h5 className="font-medium mb-1">Why you are excluded</h5>
                <p className="text-sm">
                  {classification.reason}. NIS2 typically excludes micro and small enterprises (fewer than 50 employees and annual turnover under €10 million) unless they are in specific sectors or meet certain criteria.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">NIS2 Entity Classification Tool</h2>
      
      {!classification ? (
        <>
          {/* Step indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step === stepNumber ? 'bg-primary-600 text-white' : 
                    step > stepNumber ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}>
                    {step > stepNumber ? (
                      <SafeIcon icon={FiCheckCircle} className="w-6 h-6" />
                    ) : (
                      stepNumber
                    )}
                  </div>
                  <span className={`text-xs mt-2 ${
                    step === stepNumber ? 'text-primary-600 font-medium' : 'text-gray-500'
                  }`}>
                    {stepNumber === 1 ? 'Country' : 
                     stepNumber === 2 ? 'Sector' : 'Size'}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 w-full h-1 bg-gray-200 rounded"></div>
              <div 
                className="absolute top-0 left-0 h-1 bg-primary-600 rounded transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Step content */}
          <div className="mb-8">
            {renderStepContent()}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={step === 1}
              className={`px-4 py-2 rounded-lg transition-colors ${
                step === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              {step === 3 ? 'Determine Classification' : 'Next'}
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Classification result */}
          <div className="mb-6">
            {renderClassificationResult()}
          </div>
          
          {/* Disclaimer */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h5 className="font-medium text-blue-900 mb-1">Important Note</h5>
                <p className="text-sm text-blue-800">
                  This classification is based on the information you provided and the criteria in the NIS2 Directive. The final determination of your organization's status should be made in consultation with legal experts and the relevant national authorities.
                </p>
              </div>
            </div>
          </div>
          
          {/* Reset button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                setClassification(null);
                setStep(1);
                setValidationErrors({});
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start Over
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EntityClassificationTool;