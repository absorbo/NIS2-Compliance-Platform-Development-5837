// NIS2 Entity Classification - Based on Official EU Directive 2022/2555
// Reference: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022L2555

// Helper functions that will be exported separately
const determineSize = (employees, revenue, countryRules = {}) => {
  const thresholds = {
    micro: { maxEmployees: 10, maxRevenue: 2 },
    small: { maxEmployees: 50, maxRevenue: 10 },
    medium: { maxEmployees: 250, maxRevenue: 50 }
  };
  
  // Apply country-specific overrides if available
  if (countryRules.sizeThresholds) {
    Object.entries(countryRules.sizeThresholds).forEach(([size, criteria]) => {
      if (thresholds[size]) {
        thresholds[size] = { ...thresholds[size], ...criteria };
      }
    });
  }

  if (employees < thresholds.micro.maxEmployees && revenue <= thresholds.micro.maxRevenue) return "micro";
  if (employees < thresholds.small.maxEmployees && revenue <= thresholds.small.maxRevenue) return "small";
  if (employees < thresholds.medium.maxEmployees && revenue <= thresholds.medium.maxRevenue) return "medium";
  return "large";
};

const classifyPublicAdmin = (employees, populationServed) => {
  if (employees >= 50 || populationServed >= 5) {
    return {
      type: "essential",
      reason: "Public administration meeting size/population criteria",
      requirements: getRequirements("essential", "public-admin")
    };
  }
  return {
    type: "excluded",
    reason: "Public administration below thresholds",
    requirements: []
  };
};

const isMandatoryInclusion = (sector, subsector, countryRules = {}) => {
  const mandatorySectors = [
    "trust service providers",
    "top-level domain name registries",
    "DNS service providers"
  ];

  return mandatorySectors.includes(sector) || 
         (countryRules.mandatorySectors || []).includes(sector);
};

const isSizeExempt = (size, sector, countryRules = {}) => {
  // Check if the sector is exempt from size-based exclusion
  const sectorExemptions = [
    "trust service providers",
    "top-level domain name registries",
    "DNS service providers"
  ];
  
  // Add country-specific exemptions if available
  const allExemptions = [
    ...sectorExemptions,
    ...(countryRules.sizeExemptSectors || [])
  ];
  
  return allExemptions.includes(sector);
};

const classifyBySector = (sector, subsector, size, country) => {
  // Get country-specific rules
  const countryRules = entityClassification.countryRules[country] || {};
  
  // Essential sectors
  const essentialSectors = entityClassification.sectors.essential.map(s => s.name);
  if (essentialSectors.includes(sector)) {
    if ((size === "micro" || size === "small") && !isSizeExempt(size, sector, countryRules)) {
      return {
        type: "excluded",
        reason: "Micro/small enterprise in essential sector",
        requirements: []
      };
    }
    return {
      type: "essential",
      reason: `Essential sector: ${sector}`,
      requirements: getRequirements("essential", country)
    };
  }

  // Important sectors
  const importantSectors = entityClassification.sectors.important.map(s => s.name);
  if (importantSectors.includes(sector)) {
    if ((size === "micro" || size === "small") && !isSizeExempt(size, sector, countryRules)) {
      return {
        type: "excluded",
        reason: "Micro/small enterprise in important sector",
        requirements: []
      };
    }
    return {
      type: "important",
      reason: `Important sector: ${sector}`,
      requirements: getRequirements("important", country)
    };
  }

  return {
    type: "not-covered",
    reason: "Sector not covered by NIS2",
    requirements: []
  };
};

const getRequirements = (type, context) => {
  const baseRequirements = {
    essential: {
      riskManagement: "Comprehensive risk management measures",
      incidentReporting: "24-hour incident reporting",
      auditFrequency: "Annual external audit",
      penalties: "Up to €10M or 2% of turnover"
    },
    important: {
      riskManagement: "Basic risk management measures",
      incidentReporting: "72-hour incident reporting",
      auditFrequency: "Bi-annual self-assessment",
      penalties: "Up to €7M or 1.4% of turnover"
    }
  };

  return {
    ...baseRequirements[type],
    countrySpecific: getCountrySpecificRequirements(context),
    sectorSpecific: getSectorSpecificRequirements(context)
  };
};

const getCountrySpecificRequirements = (country) => {
  // Implementation would fetch country-specific requirements
  return [];
};

const getSectorSpecificRequirements = (sector) => {
  // Implementation would fetch sector-specific requirements
  return [];
};

export const entityClassification = {
  // Size thresholds with detailed criteria
  sizeThresholds: {
    micro: {
      employees: "< 10",
      revenue: "≤ €2 million",
      exemptions: ["providers of public electronic communications networks", "providers of electronic communications services"]
    },
    small: {
      employees: "< 50",
      revenue: "≤ €10 million",
      exemptions: ["trust service providers", "top-level domain name registries", "DNS service providers"]
    },
    medium: {
      employees: "< 250",
      revenue: "≤ €50 million",
      applicability: "Subject to full NIS2 requirements if in scope"
    },
    large: {
      employees: "≥ 250",
      revenue: "> €50 million",
      applicability: "Subject to full NIS2 requirements if in scope"
    }
  },

  // Comprehensive sector classification
  sectors: {
    essential: [
      {
        name: "Energy",
        subsectors: ["Electricity", "District heating/cooling", "Oil", "Gas", "Hydrogen"],
        specialRequirements: {
          crossBorder: true,
          criticalInfrastructure: true,
          exemptions: "None"
        }
      },
      {
        name: "Transport",
        subsectors: ["Air", "Rail", "Water", "Road"],
        specialRequirements: {
          crossBorder: true,
          criticalInfrastructure: true,
          sizeExemption: false
        }
      },
      {
        name: "Banking",
        subsectors: ["Credit institutions"],
        specialRequirements: {
          crossBorder: true,
          criticalInfrastructure: true,
          sizeExemption: false
        }
      },
      {
        name: "Financial market infrastructures",
        subsectors: ["Trading venues", "Central counterparties"],
        specialRequirements: {
          crossBorder: true,
          criticalInfrastructure: true,
          sizeExemption: false
        }
      },
      {
        name: "Health",
        subsectors: ["Healthcare providers", "EU reference laboratories", "Research entities"],
        specialRequirements: {
          criticalInfrastructure: true,
          sizeExemption: false
        }
      },
      {
        name: "Drinking water",
        subsectors: ["Drinking water suppliers"],
        specialRequirements: {
          criticalInfrastructure: true,
          sizeExemption: false
        }
      },
      {
        name: "Waste water",
        subsectors: ["Waste water service providers"],
        specialRequirements: {
          criticalInfrastructure: true,
          sizeExemption: false
        }
      },
      {
        name: "Digital infrastructure",
        subsectors: ["Internet exchange points", "DNS providers", "TLD registries", "Cloud providers", "Data centers", "CDN providers"],
        specialRequirements: {
          crossBorder: true,
          criticalInfrastructure: true,
          sizeExemption: false
        }
      },
      {
        name: "ICT service management",
        subsectors: ["Managed service providers", "Managed security service providers"],
        specialRequirements: {
          crossBorder: true,
          sizeExemption: false
        }
      },
      {
        name: "Public administration",
        subsectors: ["Government entities", "Regional authorities"],
        specialRequirements: {
          populationThreshold: 5,
          employeeThreshold: 50
        }
      },
      {
        name: "Space",
        subsectors: ["Space-based infrastructure operators"],
        specialRequirements: {
          crossBorder: true,
          criticalInfrastructure: true,
          sizeExemption: false
        }
      }
    ],
    important: [
      {
        name: "Postal services",
        subsectors: ["Postal service providers", "Courier services"],
        specialRequirements: {
          crossBorder: true,
          sizeExemption: true
        }
      },
      {
        name: "Waste management",
        subsectors: ["Waste management operators"],
        specialRequirements: {
          sizeExemption: true
        }
      },
      {
        name: "Chemicals",
        subsectors: ["Chemical manufacturers", "Chemical distributors"],
        specialRequirements: {
          criticalInfrastructure: true,
          sizeExemption: true
        }
      },
      {
        name: "Food",
        subsectors: ["Food producers", "Food distributors"],
        specialRequirements: {
          sizeExemption: true
        }
      },
      {
        name: "Manufacturing",
        subsectors: ["Medical devices", "Electronics", "Machinery", "Vehicles"],
        specialRequirements: {
          criticality: "high",
          sizeExemption: true
        }
      },
      {
        name: "Digital providers",
        subsectors: ["Online marketplaces", "Online search engines", "Social networking platforms"],
        specialRequirements: {
          crossBorder: true,
          sizeExemption: true
        }
      },
      {
        name: "Research",
        subsectors: ["Research organizations"],
        specialRequirements: {
          sizeExemption: true
        }
      }
    ]
  },

  // Country-specific transposition rules
  countryRules: {
    "AT": {
      transpositionStatus: "In Progress",
      specificRequirements: []
    },
    "BE": {
      transpositionStatus: "In Progress",
      specificRequirements: ["Critical infrastructure identification", "Cross-border notification"]
    },
    "BG": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "CY": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "CZ": {
      transpositionStatus: "In Progress",
      specificRequirements: []
    },
    "DE": {
      transpositionStatus: "In Progress",
      additionalSectors: ["Chemical industry"],
      sizeThresholds: { micro: { maxRevenue: 2.5 } },
      specificRequirements: ["IT-Sicherheitskatalog", "Critical infrastructure protection"],
      sizeExemptSectors: ["Healthcare providers"]
    },
    "DK": {
      transpositionStatus: "In Progress",
      specificRequirements: []
    },
    "EE": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "ES": {
      transpositionStatus: "In Progress",
      specificRequirements: ["Critical operator registration"]
    },
    "FI": {
      transpositionStatus: "In Progress",
      specificRequirements: []
    },
    "FR": {
      transpositionStatus: "In Progress",
      additionalSectors: ["Space"],
      specificRequirements: ["OIV status consideration", "Security certification"]
    },
    "GR": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "HR": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "HU": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "IE": {
      transpositionStatus: "In Progress",
      specificRequirements: []
    },
    "IT": {
      transpositionStatus: "In Progress",
      specificRequirements: ["National cybersecurity perimeter"]
    },
    "LT": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "LU": {
      transpositionStatus: "In Progress",
      specificRequirements: []
    },
    "LV": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "MT": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "NL": {
      transpositionStatus: "In Progress",
      specificRequirements: ["Critical infrastructure designation"]
    },
    "PL": {
      transpositionStatus: "In Progress",
      specificRequirements: []
    },
    "PT": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "RO": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "SE": {
      transpositionStatus: "In Progress",
      specificRequirements: []
    },
    "SI": {
      transpositionStatus: "Pending",
      specificRequirements: []
    },
    "SK": {
      transpositionStatus: "Pending",
      specificRequirements: []
    }
  },

  // Classification determination logic
  determineEntityType: (params) => {
    const {
      sector,
      subsector,
      employees,
      revenue,
      country,
      crossBorder,
      criticalServices,
      populationServed
    } = params;

    // Get country-specific rules
    const countrySpecificRules = entityClassification.countryRules[country] || {};

    // Determine size category
    const size = determineSize(employees, revenue, countrySpecificRules);

    // Special case: Public Administration
    if (sector === "Public Administration") {
      return classifyPublicAdmin(employees, populationServed);
    }

    // Check for mandatory inclusion criteria
    if (isMandatoryInclusion(sector, subsector, countrySpecificRules)) {
      return {
        type: "essential",
        reason: "Mandatory inclusion based on sector",
        requirements: getRequirements("essential", country)
      };
    }

    // Cross-border service provision
    if (crossBorder && !isSizeExempt(size, sector, countrySpecificRules)) {
      return {
        type: "essential",
        reason: "Cross-border service provider",
        requirements: getRequirements("essential", country)
      };
    }

    // Critical services
    if (criticalServices && !isSizeExempt(size, sector, countrySpecificRules)) {
      return {
        type: "essential",
        reason: "Critical service provider",
        requirements: getRequirements("essential", country)
      };
    }

    // Standard sector-based classification
    return classifyBySector(sector, subsector, size, country);
  }
};

// Export the determineSize function separately so it can be imported directly
export const determineEntitySize = determineSize;

// Validation functions
export const validateClassification = (params) => {
  const errors = {};
  
  // Country validation
  if (!params.country) {
    errors.country = "Country selection is required";
  } else if (!entityClassification.countryRules[params.country]) {
    errors.country = "Selected country not yet supported";
  }

  // Sector validation
  if (!params.sector) {
    errors.sector = "Sector selection is required";
  } else {
    const essentialSectors = entityClassification.sectors.essential.map(s => s.name);
    const importantSectors = entityClassification.sectors.important.map(s => s.name);
    const allSectors = [...essentialSectors, ...importantSectors];
    
    if (!allSectors.includes(params.sector)) {
      errors.sector = "Selected sector is not recognized in NIS2";
    } else {
      const sectorInfo = [...entityClassification.sectors.essential, 
                          ...entityClassification.sectors.important]
                          .find(s => s.name === params.sector);
      
      if (sectorInfo && sectorInfo.subsectors.length > 0 && !params.subsector) {
        errors.subsector = "Subsector selection is required";
      }
    }
  }

  // Size validation
  if (!params.employees || params.employees < 0) {
    errors.employees = "Valid number of employees required";
  }
  if (!params.revenue || params.revenue < 0) {
    errors.revenue = "Valid annual revenue required";
  }

  // Special case validations
  if (params.sector === "Public Administration" && !params.populationServed) {
    errors.populationServed = "Population served percentage required";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Export helper functions
export const helpers = {
  isCriticalInfrastructure: (sector, subsector, country) => {
    const sectorInfo = [...entityClassification.sectors.essential, 
                        ...entityClassification.sectors.important]
                        .find(s => s.name === sector);
    
    return sectorInfo?.specialRequirements?.criticalInfrastructure === true;
  },
  
  getCrossBorderRequirements: (sector, country) => {
    const countryRules = entityClassification.countryRules[country] || {};
    const sectorInfo = [...entityClassification.sectors.essential, 
                        ...entityClassification.sectors.important]
                        .find(s => s.name === sector);
    
    if (sectorInfo?.specialRequirements?.crossBorder) {
      return {
        required: true,
        additionalRequirements: countryRules.specificRequirements?.filter(req => 
          req.toLowerCase().includes("cross-border") || 
          req.toLowerCase().includes("cross border")
        ) || []
      };
    }
    
    return { required: false };
  },
  
  getSectorSpecificExemptions: (sector, country) => {
    const countryRules = entityClassification.countryRules[country] || {};
    return {
      sizeExempt: countryRules.sizeExemptSectors?.includes(sector) || false,
      otherExemptions: []
    };
  }
};