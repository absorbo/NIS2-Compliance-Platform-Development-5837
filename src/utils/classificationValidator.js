// Comprehensive validation utility for NIS2 classification
import { entityClassification } from '../data/entityClassification';
import { countryRequirements } from '../data/countryRequirements';

export class ClassificationValidator {
  constructor(data) {
    this.data = data;
    this.errors = [];
    this.warnings = [];
  }

  validate() {
    this.validateBasicRequirements()
        .validateSectorRequirements()
        .validateSizeRequirements()
        .validateCountrySpecificRules()
        .validateSpecialCases();

    return {
      isValid: this.errors.length === 0,
      errors: this.errors,
      warnings: this.warnings,
      classification: this.determineClassification()
    };
  }

  validateBasicRequirements() {
    const requiredFields = ['country', 'sector', 'employees', 'revenue'];
    
    requiredFields.forEach(field => {
      if (!this.data[field]) {
        this.errors.push({
          field,
          message: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
        });
      }
    });

    return this;
  }

  validateSectorRequirements() {
    const { sector, subsector } = this.data;
    
    // Check if sector exists in NIS2 scope
    const sectorInfo = this.findSectorInfo(sector);
    if (!sectorInfo) {
      this.errors.push({
        field: 'sector',
        message: 'Selected sector is not within NIS2 scope'
      });
      return this;
    }

    // Validate subsector if required
    if (sectorInfo.subsectors && sectorInfo.subsectors.length > 0) {
      if (!subsector) {
        this.errors.push({
          field: 'subsector',
          message: 'Subsector selection is required for this sector'
        });
      } else if (!sectorInfo.subsectors.includes(subsector)) {
        this.errors.push({
          field: 'subsector',
          message: 'Invalid subsector selection'
        });
      }
    }

    return this;
  }

  validateSizeRequirements() {
    const { employees, revenue, sector } = this.data;
    
    // Convert to numbers for comparison
    const numEmployees = Number(employees);
    const numRevenue = Number(revenue);

    // Basic validation
    if (isNaN(numEmployees) || numEmployees < 0) {
      this.errors.push({
        field: 'employees',
        message: 'Invalid number of employees'
      });
    }

    if (isNaN(numRevenue) || numRevenue < 0) {
      this.errors.push({
        field: 'revenue',
        message: 'Invalid annual revenue'
      });
    }

    // Size-based exemption warnings
    if (numEmployees < 50 && numRevenue <= 10) {
      if (!this.isMandatoryInclusion(sector)) {
        this.warnings.push({
          type: 'size-exemption',
          message: 'Organization may be exempt due to size unless providing essential services'
        });
      }
    }

    return this;
  }

  validateCountrySpecificRules() {
    const { country } = this.data;
    
    // Check if country has specific requirements
    const countryReqs = countryRequirements[country];
    if (!countryReqs) {
      this.warnings.push({
        type: 'country-requirements',
        message: 'Country-specific requirements not yet available'
      });
      return this;
    }

    // Validate against country-specific rules
    if (countryReqs.specificRequirements) {
      countryReqs.specificRequirements.forEach(req => {
        if (req.mandatory && !this.meetsRequirement(req)) {
          this.errors.push({
            field: req.area,
            message: `Does not meet ${country} requirement: ${req.requirement}`
          });
        }
      });
    }

    return this;
  }

  validateSpecialCases() {
    const { sector, populationServed } = this.data;

    // Public Administration special case
    if (sector === 'Public Administration') {
      if (populationServed === undefined || populationServed === '') {
        this.errors.push({
          field: 'populationServed',
          message: 'Population served is required for Public Administration'
        });
      } else {
        const numPopulation = Number(populationServed);
        if (isNaN(numPopulation) || numPopulation < 0 || numPopulation > 100) {
          this.errors.push({
            field: 'populationServed',
            message: 'Invalid population served percentage'
          });
        }
      }
    }

    return this;
  }

  determineClassification() {
    if (this.errors.length > 0) return null;

    return entityClassification.determineEntityType(this.data);
  }

  // Helper methods
  findSectorInfo(sector) {
    return [...entityClassification.sectors.essential, 
            ...entityClassification.sectors.important]
            .find(s => s.name === sector);
  }

  isMandatoryInclusion(sector) {
    return entityClassification.isMandatoryInclusion(sector);
  }

  meetsRequirement(requirement) {
    // Implementation for checking specific requirements
    return true; // Placeholder
  }
}

// Export validation function
export const validateClassificationData = (data) => {
  const validator = new ClassificationValidator(data);
  return validator.validate();
};