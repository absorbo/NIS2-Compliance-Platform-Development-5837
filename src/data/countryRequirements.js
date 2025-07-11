// Country-specific NIS2 transposition requirements
export const countryRequirements = {
  'BE': {
    name: 'Belgium',
    authority: 'Centre for Cybersecurity Belgium (CCB)',
    transpositionStatus: 'In Progress',
    deadline: '2024-10-17',
    specificRequirements: [
      {
        area: 'Incident Reporting',
        requirement: 'Report to CCB within 24 hours for early warning',
        details: 'Use CCB incident reporting portal',
        contact: 'incident@ccb.belgium.be'
      },
      {
        area: 'Registration',
        requirement: 'Register with competent authority',
        details: 'Essential entities must register with relevant sector authority',
        contact: 'registration@ccb.belgium.be'
      },
      {
        area: 'Penalties',
        requirement: 'Administrative fines up to €10 million or 2% of annual turnover',
        details: 'For essential entities - higher penalties than important entities',
        contact: 'enforcement@ccb.belgium.be'
      }
    ],
    resources: [
      {
        title: 'CCB NIS2 Guidance',
        url: 'https://ccb.belgium.be/nis2',
        type: 'Official Guidance'
      },
      {
        title: 'Belgian Cybersecurity Strategy',
        url: 'https://ccb.belgium.be/strategy',
        type: 'National Strategy'
      }
    ]
  },
  'DE': {
    name: 'Germany',
    authority: 'Federal Office for Information Security (BSI)',
    transpositionStatus: 'In Progress',
    deadline: '2024-10-17',
    specificRequirements: [
      {
        area: 'Incident Reporting',
        requirement: 'Report to BSI within 24 hours',
        details: 'Use BSI incident reporting system',
        contact: 'cert@bsi.bund.de'
      },
      {
        area: 'IT Security Catalog',
        requirement: 'Implement BSI IT Security Catalog measures',
        details: 'Additional requirements beyond NIS2 minimum',
        contact: 'kritis@bsi.bund.de'
      }
    ],
    resources: [
      {
        title: 'BSI NIS2 Implementation Guide',
        url: 'https://bsi.bund.de/nis2',
        type: 'Official Guidance'
      }
    ]
  },
  // Add more countries...
};

// Sector-specific requirements
export const sectorRequirements = {
  'energy': {
    name: 'Energy',
    type: 'essential',
    specificControls: [
      {
        control: 'NIS2-20.1',
        addition: 'Risk assessment must include operational technology (OT) systems',
        rationale: 'Energy infrastructure relies heavily on OT systems'
      },
      {
        control: 'NIS2-20.2',
        addition: 'Incident response must coordinate with grid operators',
        rationale: 'Energy incidents can have cascading effects'
      }
    ],
    regulatoryBodies: [
      'Energy regulators',
      'Grid operators',
      'National cybersecurity authorities'
    ]
  },
  // Add more sectors...
};