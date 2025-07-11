import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import { euCountries, industrySectors, companySizes } from '../data/constants';

const { FiArrowRight, FiArrowLeft, FiCheck, FiBuilding, FiGlobe, FiUsers } = FiIcons;

const OnboardingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    industry: '',
    size: '',
    criticalInfrastructure: null
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
      case 3: return formData.industry !== '' && formData.size !== '';
      case 4: return true;
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
      Our AI-powered platform will guide you through the NIS2 compliance process, 
      creating a personalized roadmap tailored to your organization's needs.
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

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Is your organization considered critical infrastructure?
      </label>
      <div className="space-y-2">
        {[
          { value: true, label: 'Yes, we are critical infrastructure' },
          { value: false, label: 'No, we are not critical infrastructure' },
          { value: null, label: 'I\'m not sure' }
        ].map((option) => (
          <label key={String(option.value)} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              checked={formData.criticalInfrastructure === option.value}
              onChange={() => setFormData({ ...formData, criticalInfrastructure: option.value })}
              className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
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

const IndustryStep = ({ formData, setFormData }) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Industry Sector *
      </label>
      <select
        value={formData.industry}
        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        <option value="">Select your industry</option>
        {industrySectors.map((sector) => (
          <option key={sector.value} value={sector.value}>
            {sector.label}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Company Size *
      </label>
      <div className="relative">
        <SafeIcon icon={FiUsers} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
        <select
          value={formData.size}
          onChange={(e) => setFormData({ ...formData, size: e.target.value })}
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
        >
          <option value="">Select company size</option>
          {companySizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  </div>
);

const CompletionStep = () => (
  <div className="text-center py-8">
    <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-6">
      <SafeIcon icon={FiCheck} className="w-10 h-10 text-success-600" />
    </div>
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
      Setup Complete!
    </h2>
    <p className="text-gray-600 max-w-md mx-auto">
      Your organization profile has been created. You can now begin your NIS2 compliance 
      assessment and generate your personalized roadmap.
    </p>
  </div>
);

export default OnboardingFlow;