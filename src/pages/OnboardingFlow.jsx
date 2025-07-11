import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import { euCountries, industrySectors, companySizes } from '../data/constants';
import { entityClassification, determineEntitySize } from '../data/entityClassification';

const { 
  FiArrowRight, 
  FiArrowLeft, 
  FiCheck, 
  FiBuilding, 
  FiGlobe, 
  FiUsers, 
  FiShield, 
  FiAlertTriangle, 
  FiDollarSign,
  FiInfo,
  FiCheckCircle
} = FiIcons;

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    industry: '',
    subsector: '',
    size: '',
    employees: '',
    revenue: '',
    criticalInfrastructure: null,
    entityType: null,
    populationServed: ''
  });

  const { completeOnboarding } = useAppStore();

  const steps = [
    {
      title: 'Welcome to NIS2 GRC',
      subtitle: 'Let\'s get your organization set up for NIS2 compliance',
      component: WelcomeStep
    },
    {
      title: 'Company Information',
      subtitle: 'Tell us about your organization',
      component: CompanyInfoStep
    },
    {
      title: 'Country Selection',
      subtitle: 'Select your primary country of operation',
      component: CountryStep
    },
    {
      title: 'Industry Classification',
      subtitle: 'Help us understand your sector',
      component: IndustryStep
    },
    {
      title: 'Organization Size',
      subtitle: 'This determines your NIS2 classification',
      component: SizeStep
    },
    {
      title: 'Entity Classification',
      subtitle: 'Your NIS2 entity type determines your obligations',
      component: ClassificationStep
    },
    {
      title: 'Setup Complete',
      subtitle: 'You\'re ready to begin your NIS2 compliance journey',
      component: CompletionStep
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding(formData, formData.country);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return true;
      case 1: return formData.companyName.trim() !== '';
      case 2: return formData.country !== '';
      case 3: return formData.industry !== '';
      case 4: return formData.employees !== '' && formData.revenue !== '';
      case 5: return true; // Entity classification is determined automatically
      case 6: return true;
      default: return false;
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-sm text-gray-600">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Main Content */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {steps[currentStep].title}
            </h1>
            <p className="text-gray-600">
              {steps[currentStep].subtitle}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <CurrentStepComponent formData={formData} setFormData={setFormData} />
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
                canProceed()
                  ? 'bg-primary-600 text-white hover:bg-primary-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
              <SafeIcon icon={currentStep === steps.length - 1 ? FiCheck : FiArrowRight} className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Step Components
const WelcomeStep = () => (
  <div className="text-center py-8">
    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <SafeIcon icon={FiIcons.FiShield} className="w-10 h-10 text-primary-600" />
    </div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
      Streamline Your NIS2 Compliance
    </h2>
    <p className="text-gray-600 max-w-md mx-auto">
      Our platform will guide you through the NIS2 compliance process, creating a personalized roadmap tailored to your organization's needs and classification under the directive.
    </p>
  </div>
);

const CompanyInfoStep = ({ formData, setFormData }) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Company Name *
      </label>
      <div className="relative">
        <SafeIcon icon={FiBuilding} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Enter your company name"
        />
      </div>
    </div>
  </div>
);

const CountryStep = ({ formData, setFormData }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Primary Country of Operation *
    </label>
    <div className="relative">
      <SafeIcon icon={FiGlobe} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
      <select
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
      >
        <option value="">Select your country</option>
        {euCountries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
    <p className="text-sm text-gray-500 mt-2">
      This determines which national NIS2 transposition applies to your organization.
    </p>
  </div>
);

const IndustryStep = ({ formData, setFormData }) => {
  // Combine all sectors from essential and important categories
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
  
  // Get available subsectors for the selected industry
  const getSubsectors = (sector) => {
    const essentialSector = entityClassification.essential.sectors.find(s => s.sector === sector);
    const importantSector = entityClassification.important.sectors.find(s => s.sector === sector);
    const selectedSector = essentialSector || importantSector;
    
    return selectedSector?.subsectors || [];
  };
  
  const subsectors = getSubsectors(formData.industry);

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industry Sector *
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
          <option value="">Select your industry</option>
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
            Industry Subsector
          </label>
          <select
            value={formData.subsector}
            onChange={(e) => setFormData({ ...formData, subsector: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Select your subsector</option>
            {subsectors.map((subsector) => (
              <option key={subsector} value={subsector}>
                {subsector}
              </option>
            ))}
          </select>
        </div>
      )}
      
      {formData.industry && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <p className="text-sm text-blue-800">
                {allSectors.find(s => s.value === formData.industry)?.type === 'essential'
                  ? 'This sector is typically classified as an Essential Entity under NIS2, subject to more comprehensive requirements.'
                  : 'This sector is typically classified as an Important Entity under NIS2, subject to baseline requirements.'}
              </p>
              {formData.industry === 'Digital providers' && (
                <p className="text-sm text-blue-800 mt-2">
                  <strong>Note:</strong> Micro and small enterprises in this sector are excluded from NIS2 requirements.
                </p>
              )}
              {formData.industry === 'Public administration' && (
                <p className="text-sm text-blue-800 mt-2">
                  <strong>Note:</strong> Public administration entities are only in scope if they serve 5% or more of the national population or have 50+ employees.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SizeStep = ({ formData, setFormData }) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Number of Employees *
      </label>
      <div className="relative">
        <SafeIcon icon={FiUsers} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="number"
          value={formData.employees}
          onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g., 100"
          min="1"
          required
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        NIS2 classification depends partly on your organization's size
      </p>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Annual Revenue (€ millions) *
      </label>
      <div className="relative">
        <SafeIcon icon={FiDollarSign} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <input
          type="number"
          value={formData.revenue}
          onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g., 15"
          min="0"
          step="0.1"
          required
        />
      </div>
    </div>

    {formData.industry === 'Public administration' && (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Population Served (% of national population) *
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
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          For public administration, NIS2 applies if you serve 5% or more of the national population
        </p>
      </div>
    )}

    <div className="mt-4 grid grid-cols-2 gap-4">
      <div className="p-3 border border-gray-200 rounded-lg">
        <h5 className="text-sm font-medium text-gray-900 mb-1">Micro Entity</h5>
        <p className="text-xs text-gray-600">Fewer than 10 employees</p>
        <p className="text-xs text-gray-600">Annual revenue ≤ €2 million</p>
      </div>
      <div className="p-3 border border-gray-200 rounded-lg">
        <h5 className="text-sm font-medium text-gray-900 mb-1">Small Entity</h5>
        <p className="text-xs text-gray-600">Fewer than 50 employees</p>
        <p className="text-xs text-gray-600">Annual revenue ≤ €10 million</p>
      </div>
    </div>
  </div>
);

const ClassificationStep = ({ formData, setFormData }) => {
  // Determine entity size and type
  const employees = Number(formData.employees);
  const revenue = Number(formData.revenue);
  const size = determineEntitySize(employees, revenue);
  
  // Handle special cases
  const isPublicAdmin = formData.industry === 'Public administration';
  const population = isPublicAdmin ? Number(formData.populationServed) : 0;
  
  // Determine entity type
  const entityType = entityClassification.determineEntityType(
    formData.industry, 
    size, 
    isPublicAdmin,
    population
  );

  // Update form data with entity type
  React.useEffect(() => {
    setFormData({
      ...formData,
      entityType,
      entitySize: size
    });
  }, []);

  return (
    <div className="space-y-6">
      <div className={`p-5 border rounded-lg ${
        entityType === 'essential' 
          ? 'bg-primary-50 border-primary-200' 
          : entityType === 'important' 
            ? 'bg-warning-50 border-warning-200'
            : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-full ${
            entityType === 'essential' 
              ? 'bg-primary-100' 
              : entityType === 'important' 
                ? 'bg-warning-100'
                : 'bg-gray-100'
          }`}>
            <SafeIcon 
              icon={
                entityType === 'essential' || entityType === 'important'
                  ? FiCheckCircle 
                  : FiAlertTriangle
              } 
              className={`w-5 h-5 ${
                entityType === 'essential' 
                  ? 'text-primary-600' 
                  : entityType === 'important' 
                    ? 'text-warning-600'
                    : 'text-gray-600'
              }`} 
            />
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-1">
              {entityType === 'essential' 
                ? 'Essential Entity' 
                : entityType === 'important' 
                  ? 'Important Entity'
                  : entityType === 'excluded'
                    ? 'Excluded from NIS2'
                    : 'Not covered by NIS2'}
            </h4>
            
            <p className="text-sm mb-3">
              {entityType === 'essential' 
                ? 'Your organization is classified as an Essential Entity under NIS2, subject to comprehensive requirements.' 
                : entityType === 'important' 
                  ? 'Your organization is classified as an Important Entity under NIS2, subject to baseline requirements.'
                  : entityType === 'excluded'
                    ? 'Based on your inputs, your organization appears to be excluded from NIS2 requirements.'
                    : 'Your organization does not appear to be covered by the NIS2 Directive.'}
            </p>

            <div className="flex items-center space-x-2 text-sm">
              <span className="px-2 py-1 bg-gray-100 rounded text-gray-800">
                {size.description}
              </span>
              <span className="text-gray-600">
                {employees} employees, €{revenue}M revenue
              </span>
            </div>
          </div>
        </div>

        {/* Requirements based on classification */}
        {(entityType === 'essential' || entityType === 'important') && (
          <div className="mt-5 pt-5 border-t border-gray-200">
            <h5 className="font-medium mb-3">Key Requirements</h5>
            <ul className="space-y-2">
              {entityType === 'essential' ? (
                <>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiShield} className="w-4 h-4 text-primary-500 mt-0.5" />
                    <span className="text-sm">Comprehensive risk management measures required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiShield} className="w-4 h-4 text-primary-500 mt-0.5" />
                    <span className="text-sm">Proactive supervision and regular audits</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiShield} className="w-4 h-4 text-primary-500 mt-0.5" />
                    <span className="text-sm">Higher penalties for non-compliance (up to €10M or 2% of turnover)</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiShield} className="w-4 h-4 text-warning-500 mt-0.5" />
                    <span className="text-sm">Basic risk management measures required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiShield} className="w-4 h-4 text-warning-500 mt-0.5" />
                    <span className="text-sm">Reactive supervision (after incidents)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <SafeIcon icon={FiShield} className="w-4 h-4 text-warning-500 mt-0.5" />
                    <span className="text-sm">Lower penalties for non-compliance</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}

        {/* Exclusion explanation if applicable */}
        {entityType === 'excluded' && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-start space-x-2">
              <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h5 className="font-medium mb-1">Why you may be excluded</h5>
                <p className="text-sm">
                  NIS2 typically excludes micro and small enterprises (fewer than 50 employees and annual turnover under €10 million) 
                  unless they are in specific sectors or meet certain criteria. Public administration entities are only included 
                  if they serve 5% or more of the national population or have 50+ employees.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-blue-900 mb-1">Important Note</h5>
            <p className="text-sm text-blue-800">
              This classification is based on the information you provided and the criteria in the NIS2 Directive. 
              The final determination of your organization's status should be made in consultation with legal experts 
              and the relevant national authorities in {formData.country || 'your country'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompletionStep = ({ formData }) => (
  <div className="text-center py-8">
    <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <SafeIcon icon={FiCheck} className="w-10 h-10 text-success-600" />
    </div>
    
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
      Setup Complete!
    </h2>
    
    <p className="text-gray-600 max-w-md mx-auto mb-6">
      Your organization profile has been created. You can now begin your NIS2 compliance assessment and generate your personalized roadmap.
    </p>

    {formData.entityType && (
      <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
        formData.entityType === 'essential' 
          ? 'bg-primary-100 text-primary-800' 
          : formData.entityType === 'important' 
            ? 'bg-warning-100 text-warning-800'
            : 'bg-gray-100 text-gray-800'
      }`}>
        <SafeIcon 
          icon={
            formData.entityType === 'essential' || formData.entityType === 'important'
              ? FiCheckCircle 
              : FiInfo
          } 
          className="w-4 h-4 mr-2" 
        />
        {formData.entityType === 'essential' 
          ? 'Essential Entity' 
          : formData.entityType === 'important' 
            ? 'Important Entity'
            : 'Not covered by NIS2'}
      </div>
    )}
  </div>
);

export default OnboardingFlow;