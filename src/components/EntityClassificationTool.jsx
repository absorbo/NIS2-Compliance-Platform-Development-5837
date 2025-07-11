import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { countryRequirements } from '../data/countryRequirements';

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

  // Enhanced classification logic
  const determineEntityType = () => {
    const {
      sector,
      subsector,
      employees,
      revenue,
      populationServed,
      criticalServices,
      crossBorder,
      country
    } = formData;

    const numEmployees = Number(employees);
    const annualRevenue = Number(revenue);
    const isMicroOrSmall = numEmployees < 50 && annualRevenue <= 10;

    // Get country-specific requirements
    const countryReqs = countryRequirements[country];

    // Special cases based on country transposition
    if (countryReqs?.specificRequirements) {
      // Apply country-specific classification rules
      // This would be expanded based on each country's specific transposition
    }

    // Public Administration special case
    if (sector === 'Public Administration') {
      if (numEmployees >= 50 || Number(populationServed) >= 5) {
        return {
          type: 'essential',
          reason: 'Public administration entity meeting size or population criteria',
          requirements: countryReqs?.specificRequirements || []
        };
      }
      return {
        type: 'excluded',
        reason: 'Public administration entity below threshold',
        requirements: []
      };
    }

    // Cross-border services consideration
    if (crossBorder && !isMicroOrSmall) {
      return {
        type: 'essential',
        reason: 'Provider of cross-border services',
        requirements: countryReqs?.specificRequirements || []
      };
    }

    // Critical services consideration
    if (criticalServices && !isMicroOrSmall) {
      return {
        type: 'essential',
        reason: 'Provider of critical services',
        requirements: countryReqs?.specificRequirements || []
      };
    }

    // Sector-based classification
    const sectorClassification = classifyBySector(sector, subsector, isMicroOrSmall);
    if (sectorClassification) {
      return {
        ...sectorClassification,
        requirements: countryReqs?.specificRequirements || []
      };
    }

    return {
      type: 'not-covered',
      reason: 'Organization does not meet NIS2 criteria',
      requirements: []
    };
  };

  // Helper function for sector-based classification
  const classifyBySector = (sector, subsector, isMicroOrSmall) => {
    // Essential sectors
    if (essentialSectors.includes(sector)) {
      if (isMicroOrSmall && !isExemptFromSizeRule(sector, subsector)) {
        return {
          type: 'excluded',
          reason: 'Micro/small enterprise in essential sector'
        };
      }
      return {
        type: 'essential',
        reason: `Essential sector: ${sector}`
      };
    }

    // Important sectors
    if (importantSectors.includes(sector)) {
      if (isMicroOrSmall && !isExemptFromSizeRule(sector, subsector)) {
        return {
          type: 'excluded',
          reason: 'Micro/small enterprise in important sector'
        };
      }
      return {
        type: 'important',
        reason: `Important sector: ${sector}`
      };
    }

    return null;
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

  // ... rest of the component implementation with enhanced UI ...
};

export default EntityClassificationTool;