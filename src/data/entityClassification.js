// NIS2 Entity Classification - Based on Official EU Directive 2022/2555
// Reference: https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32022L2555

export const entityClassification = {
  // Essential Entities - Annex I of NIS2
  essential: {
    name: "Essential Entity",
    description: "Organizations subject to stricter requirements under NIS2",
    sectors: [
      {
        sector: "Energy",
        subsectors: [
          "Electricity",
          "District heating and cooling",
          "Oil",
          "Gas",
          "Hydrogen"
        ],
        examples: [
          "Electricity generation companies",
          "Electricity suppliers",
          "Distribution system operators",
          "Oil transmission pipelines",
          "Natural gas suppliers"
        ]
      },
      {
        sector: "Transport",
        subsectors: [
          "Air",
          "Rail",
          "Water",
          "Road"
        ],
        examples: [
          "Air carriers",
          "Airport managing bodies",
          "Traffic management control operators",
          "Infrastructure managers of rails",
          "Maritime companies",
          "Inland waterway transport companies"
        ]
      },
      {
        sector: "Banking",
        subsectors: [
          "Credit institutions"
        ],
        examples: [
          "Banks",
          "Credit unions",
          "Financial holding companies"
        ]
      },
      {
        sector: "Financial market infrastructures",
        subsectors: [
          "Trading venues",
          "Central counterparties (CCPs)"
        ],
        examples: [
          "Stock exchanges",
          "Multilateral trading facilities",
          "CCPs established in EU"
        ]
      },
      {
        sector: "Health",
        subsectors: [
          "Healthcare providers",
          "EU reference laboratories",
          "Research and development entities for medicinal products",
          "Medical device manufacturers"
        ],
        examples: [
          "Hospitals",
          "Private clinics",
          "Pharmaceutical companies",
          "Medical device companies"
        ]
      },
      {
        sector: "Drinking water",
        subsectors: [
          "Suppliers and distributors of water intended for human consumption"
        ],
        examples: [
          "Municipal water suppliers",
          "Water treatment facilities",
          "Water distribution companies"
        ]
      },
      {
        sector: "Waste water",
        subsectors: [
          "Waste water collection, disposal or treatment service providers"
        ],
        examples: [
          "Wastewater treatment plants",
          "Sewage system operators"
        ]
      },
      {
        sector: "Digital infrastructure",
        subsectors: [
          "Internet Exchange Point providers",
          "DNS service providers",
          "TLD name registries",
          "Cloud computing service providers",
          "Data center service providers",
          "Content delivery networks",
          "Trust service providers",
          "Public electronic communications networks",
          "Public electronic communications services"
        ],
        examples: [
          "Cloud service providers",
          "Data centers",
          "Internet service providers",
          "Domain registrars"
        ]
      },
      {
        sector: "ICT service management",
        subsectors: [
          "Managed service providers",
          "Managed security service providers"
        ],
        examples: [
          "IT service providers",
          "Cybersecurity service providers"
        ]
      },
      {
        sector: "Public administration",
        subsectors: [
          "Public administration entities of central governments",
          "Public administration entities of regions"
        ],
        examples: [
          "Government ministries",
          "Regional authorities",
          "Government agencies"
        ],
        specialRule: "Applies only to entities with 50+ employees or serving 5%+ of population"
      },
      {
        sector: "Space",
        subsectors: [
          "Operators of ground-based infrastructure",
          "Space-based infrastructure operators"
        ],
        examples: [
          "Satellite control centers",
          "Space data providers",
          "Ground station operators"
        ]
      }
    ]
  },

  // Important Entities - Annex II of NIS2
  important: {
    name: "Important Entity",
    description: "Organizations subject to baseline requirements under NIS2",
    sectors: [
      {
        sector: "Postal and courier services",
        subsectors: [
          "Postal service providers",
          "Express or courier delivery service providers"
        ],
        examples: [
          "Postal operators",
          "Parcel delivery companies"
        ]
      },
      {
        sector: "Waste management",
        subsectors: [
          "Waste management operations"
        ],
        examples: [
          "Waste collection companies",
          "Waste processing facilities",
          "Waste disposal companies"
        ]
      },
      {
        sector: "Chemicals",
        subsectors: [
          "Manufacturing, production and distribution of substances and mixtures",
          "Manufacturing of articles"
        ],
        examples: [
          "Chemical manufacturers",
          "Chemical distributors",
          "Chemical product manufacturers"
        ]
      },
      {
        sector: "Food",
        subsectors: [
          "Food production, processing and distribution"
        ],
        examples: [
          "Food manufacturers",
          "Food distributors",
          "Large food retailers"
        ]
      },
      {
        sector: "Manufacturing",
        subsectors: [
          "Medical devices and in vitro diagnostic medical devices",
          "Computer, electronic and optical products",
          "Electrical equipment",
          "Machinery and equipment",
          "Motor vehicles, trailers and semi-trailers",
          "Transport equipment"
        ],
        examples: [
          "Medical device manufacturers",
          "Electronics manufacturers",
          "Automotive manufacturers",
          "Industrial equipment manufacturers"
        ]
      },
      {
        sector: "Digital providers",
        subsectors: [
          "Online marketplace providers",
          "Online search engine providers",
          "Social networking service platform providers"
        ],
        examples: [
          "E-commerce platforms",
          "Search engines",
          "Social media platforms"
        ],
        specialRule: "Micro and small enterprises are excluded"
      },
      {
        sector: "Research",
        subsectors: [
          "Research organizations"
        ],
        examples: [
          "Research institutions",
          "R&D departments",
          "Scientific research centers"
        ]
      }
    ]
  },

  // Size thresholds
  sizeThresholds: {
    micro: {
      employees: "< 10",
      revenue: "≤ €2 million"
    },
    small: {
      employees: "< 50",
      revenue: "≤ €10 million"
    },
    medium: {
      employees: "< 250",
      revenue: "≤ €50 million"
    },
    large: {
      employees: "≥ 250",
      revenue: "> €50 million"
    }
  },

  // Special exclusions
  exclusions: [
    "Micro and small enterprises (except in specific sectors)",
    "Entities covered by sector-specific regulations with equivalent cybersecurity requirements",
    "Public administration entities serving fewer than 5,000 persons or employing fewer than 50 people",
    "Diplomatic and consular missions",
    "Individual entrepreneurs in certain sectors"
  ],

  // Entity determination logic
  determineEntityType: (sector, size, isPublicAdmin = false, populationServed = 0) => {
    // Public administration special case
    if (sector === "Public administration") {
      if (size.employees >= 50 || populationServed >= 5) {
        return "essential";
      } else {
        return "excluded";
      }
    }
    
    // Digital providers special case
    if (sector === "Digital providers" && (size.category === "micro" || size.category === "small")) {
      return "excluded";
    }
    
    // Essential sectors
    const essentialSectors = [
      "Energy", "Transport", "Banking", "Financial market infrastructures",
      "Health", "Drinking water", "Waste water", "Digital infrastructure",
      "ICT service management", "Public administration", "Space"
    ];
    
    // Important sectors
    const importantSectors = [
      "Postal and courier services", "Waste management", "Chemicals",
      "Food", "Manufacturing", "Digital providers", "Research"
    ];
    
    if (essentialSectors.includes(sector)) {
      return "essential";
    } else if (importantSectors.includes(sector)) {
      return "important";
    } else {
      return "not covered";
    }
  }
};

// Entity size determination
export const determineEntitySize = (employees, revenue) => {
  if (employees < 10 && revenue <= 2) {
    return {
      category: "micro",
      description: "Micro enterprise",
      employees: employees,
      revenue: revenue
    };
  } else if (employees < 50 && revenue <= 10) {
    return {
      category: "small",
      description: "Small enterprise",
      employees: employees,
      revenue: revenue
    };
  } else if (employees < 250 && revenue <= 50) {
    return {
      category: "medium",
      description: "Medium enterprise",
      employees: employees,
      revenue: revenue
    };
  } else {
    return {
      category: "large",
      description: "Large enterprise",
      employees: employees,
      revenue: revenue
    };
  }
};

// NIS2 requirements differ based on entity type
export const entityRequirements = {
  essential: {
    riskManagement: "Comprehensive risk management measures required",
    incidentReporting: "Must report significant incidents within 24 hours",
    complianceOversight: "Subject to proactive supervision",
    penalties: "Higher administrative fines (up to €10M or 2% of global turnover)",
    auditRequirements: "Regular independent security audits required"
  },
  important: {
    riskManagement: "Basic risk management measures required",
    incidentReporting: "Must report significant incidents within 24 hours",
    complianceOversight: "Subject to reactive supervision (after incidents)",
    penalties: "Lower administrative fines",
    auditRequirements: "Self-certification may be sufficient"
  }
};