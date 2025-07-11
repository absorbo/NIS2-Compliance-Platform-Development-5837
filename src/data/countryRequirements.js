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
  'FR': {
    name: 'France',
    authority: 'National Cybersecurity Agency (ANSSI)',
    transpositionStatus: 'In Progress',
    deadline: '2024-10-17',
    specificRequirements: [
      {
        area: 'Incident Reporting',
        requirement: 'Report to ANSSI within 24 hours',
        details: 'Use ANSSI incident reporting portal',
        contact: 'incident@ssi.gouv.fr'
      },
      {
        area: 'Qualification',
        requirement: 'Use ANSSI-qualified security products where required',
        details: 'Certain security products must be ANSSI-qualified',
        contact: 'qualification@ssi.gouv.fr'
      }
    ],
    resources: [
      {
        title: 'ANSSI NIS2 Guide',
        url: 'https://anssi.gouv.fr/nis2',
        type: 'Official Guidance'
      }
    ]
  },
  'NL': {
    name: 'Netherlands',
    authority: 'National Cyber Security Centre (NCSC)',
    transpositionStatus: 'In Progress',
    deadline: '2024-10-17',
    specificRequirements: [
      {
        area: 'Incident Reporting',
        requirement: 'Report to NCSC within 24 hours',
        details: 'Use NCSC incident reporting system',
        contact: 'incident@ncsc.nl'
      },
      {
        area: 'Sector Coordination',
        requirement: 'Participate in sector information sharing',
        details: 'Active participation in sector cybersecurity initiatives',
        contact: 'sector@ncsc.nl'
      }
    ],
    resources: [
      {
        title: 'NCSC NIS2 Guidance',
        url: 'https://ncsc.nl/nis2',
        type: 'Official Guidance'
      }
    ]
  },
  'IT': {
    name: 'Italy',
    authority: 'National Cybersecurity Agency (ACN)',
    transpositionStatus: 'In Progress',
    deadline: '2024-10-17',
    specificRequirements: [
      {
        area: 'Incident Reporting',
        requirement: 'Report to ACN within 24 hours',
        details: 'Use ACN incident reporting portal',
        contact: 'incident@acn.gov.it'
      },
      {
        area: 'National Perimeter',
        requirement: 'Comply with national cybersecurity perimeter rules',
        details: 'Additional requirements for critical infrastructure',
        contact: 'perimeter@acn.gov.it'
      }
    ],
    resources: [
      {
        title: 'ACN NIS2 Implementation',
        url: 'https://acn.gov.it/nis2',
        type: 'Official Guidance'
      }
    ]
  },
  'ES': {
    name: 'Spain',
    authority: 'National Cryptologic Center (CCN)',
    transpositionStatus: 'In Progress',
    deadline: '2024-10-17',
    specificRequirements: [
      {
        area: 'Incident Reporting',
        requirement: 'Report to CCN-CERT within 24 hours',
        details: 'Use CCN-CERT incident reporting system',
        contact: 'incident@ccn-cert.cni.es'
      },
      {
        area: 'ENS Compliance',
        requirement: 'Comply with National Security Scheme (ENS)',
        details: 'Additional security requirements for public sector',
        contact: 'ens@ccn.cni.es'
      }
    ],
    resources: [
      {
        title: 'CCN NIS2 Guide',
        url: 'https://ccn.cni.es/nis2',
        type: 'Official Guidance'
      }
    ]
  }
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
  'banking': {
    name: 'Banking',
    type: 'essential',
    specificControls: [
      {
        control: 'NIS2-20.7',
        addition: 'Cryptographic controls must meet banking regulatory standards',
        rationale: 'Financial data requires highest level of protection'
      },
      {
        control: 'NIS2-21.1',
        addition: 'Incident reporting must also comply with banking regulations',
        rationale: 'Dual reporting requirements for financial institutions'
      }
    ],
    regulatoryBodies: [
      'Banking regulators',
      'Financial intelligence units',
      'National cybersecurity authorities'
    ]
  },
  'health': {
    name: 'Health',
    type: 'essential',
    specificControls: [
      {
        control: 'NIS2-20.7',
        addition: 'Data protection must comply with healthcare privacy regulations',
        rationale: 'Healthcare data has special protection requirements'
      },
      {
        control: 'NIS2-20.2',
        addition: 'Business continuity must ensure patient safety',
        rationale: 'Healthcare incidents can directly impact patient care'
      }
    ],
    regulatoryBodies: [
      'Health authorities',
      'Data protection authorities',
      'National cybersecurity authorities'
    ]
  },
  'transport': {
    name: 'Transport',
    type: 'essential',
    specificControls: [
      {
        control: 'NIS2-20.1',
        addition: 'Risk assessment must include safety-critical systems',
        rationale: 'Transport systems have safety implications'
      },
      {
        control: 'NIS2-20.2',
        addition: 'Incident response must coordinate with transport authorities',
        rationale: 'Transport incidents can affect public safety'
      }
    ],
    regulatoryBodies: [
      'Transport regulators',
      'Safety authorities',
      'National cybersecurity authorities'
    ]
  },
  'digital-infrastructure': {
    name: 'Digital Infrastructure',
    type: 'essential',
    specificControls: [
      {
        control: 'NIS2-20.5',
        addition: 'Network security must ensure service availability',
        rationale: 'Digital infrastructure underpins other sectors'
      },
      {
        control: 'NIS2-20.3',
        addition: 'Supply chain security critical for infrastructure providers',
        rationale: 'Infrastructure providers have extensive supply chains'
      }
    ],
    regulatoryBodies: [
      'Telecommunications regulators',
      'Internet governance bodies',
      'National cybersecurity authorities'
    ]
  }
};