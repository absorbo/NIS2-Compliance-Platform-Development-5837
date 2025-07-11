// Complete NIS2 Directive Controls - Based on Official EU Documentation
export const nis2Controls = [
  // Article 20 - Cybersecurity Risk Management Measures
  {
    id: 'NIS2-20.1',
    article: 'Article 20',
    title: 'Cybersecurity Policies',
    description: 'Policies on cybersecurity risk analysis and information system security',
    category: 'Risk Management',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Cybersecurity risk analysis policies',
      'Information system security policies',
      'Regular policy review and updates',
      'Board-level approval of cybersecurity policies'
    ],
    evidence: [
      'Cybersecurity policy document',
      'Risk analysis procedures',
      'Board meeting minutes approving policies',
      'Policy review and update records'
    ]
  },
  {
    id: 'NIS2-20.2',
    article: 'Article 20',
    title: 'Incident Handling',
    description: 'Incident handling procedures and business continuity management',
    category: 'Incident Response',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Incident detection procedures',
      'Incident response procedures',
      'Business continuity plans',
      'Crisis management procedures',
      'Regular testing of incident response'
    ],
    evidence: [
      'Incident response plan',
      'Business continuity plan',
      'Incident response test results',
      'Crisis management procedures'
    ]
  },
  {
    id: 'NIS2-20.3',
    article: 'Article 20',
    title: 'Supply Chain Security',
    description: 'Supply chain security including security-related aspects of relationships with suppliers',
    category: 'Supply Chain',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Supplier security assessment procedures',
      'Security requirements in supplier contracts',
      'Supply chain risk assessment',
      'Vendor security monitoring'
    ],
    evidence: [
      'Supplier security assessment reports',
      'Supplier contracts with security clauses',
      'Supply chain risk register',
      'Vendor security monitoring reports'
    ]
  },
  {
    id: 'NIS2-20.4',
    article: 'Article 20',
    title: 'Security in Network and Information Systems Acquisition',
    description: 'Security measures for acquisition, development and maintenance of systems',
    category: 'System Security',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Secure development lifecycle',
      'Security requirements in procurement',
      'System security testing',
      'Vulnerability management'
    ],
    evidence: [
      'Secure development procedures',
      'Procurement security requirements',
      'Security testing reports',
      'Vulnerability scan results'
    ]
  },
  {
    id: 'NIS2-20.5',
    article: 'Article 20',
    title: 'Security of Network and Information Systems',
    description: 'Measures for network and information system security',
    category: 'Technical Security',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Network security controls',
      'Access control systems',
      'Security monitoring',
      'Encryption implementation'
    ],
    evidence: [
      'Network security architecture',
      'Access control policies',
      'Security monitoring logs',
      'Encryption implementation guide'
    ]
  },
  {
    id: 'NIS2-20.6',
    article: 'Article 20',
    title: 'Policies and Procedures for Human Resources Security',
    description: 'Human resources security policies and procedures',
    category: 'Human Resources',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Security awareness training',
      'Background checks for critical roles',
      'Access management procedures',
      'Incident reporting training'
    ],
    evidence: [
      'Security training records',
      'Background check procedures',
      'Access management policies',
      'Training materials'
    ]
  },
  {
    id: 'NIS2-20.7',
    article: 'Article 20',
    title: 'Use of Cryptography and Encryption',
    description: 'Appropriate use of cryptography and encryption',
    category: 'Cryptography',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Cryptographic standards',
      'Key management procedures',
      'Data encryption policies',
      'Cryptographic control implementation'
    ],
    evidence: [
      'Cryptographic policy',
      'Key management procedures',
      'Encryption implementation',
      'Cryptographic control audit'
    ]
  },
  // Article 21 - Cybersecurity Incident Reporting
  {
    id: 'NIS2-21.1',
    article: 'Article 21',
    title: 'Early Warning Notification',
    description: 'Early warning notification of significant cybersecurity incidents',
    category: 'Incident Reporting',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Incident classification procedures',
      'Early warning notification within 24 hours',
      'Incident impact assessment',
      'Communication with authorities'
    ],
    evidence: [
      'Incident classification matrix',
      'Notification procedures',
      'Historical incident reports',
      'Authority communication records'
    ]
  },
  {
    id: 'NIS2-21.2',
    article: 'Article 21',
    title: 'Incident Notification',
    description: 'Detailed incident notification without undue delay',
    category: 'Incident Reporting',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Detailed incident reporting within 72 hours',
      'Root cause analysis',
      'Impact assessment',
      'Remediation measures'
    ],
    evidence: [
      'Incident report template',
      'Root cause analysis procedures',
      'Impact assessment methodology',
      'Remediation tracking'
    ]
  },
  {
    id: 'NIS2-21.3',
    article: 'Article 21',
    title: 'Final Report',
    description: 'Final report on incident handling and lessons learned',
    category: 'Incident Reporting',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Final incident report within one month',
      'Lessons learned documentation',
      'Improvement recommendations',
      'Follow-up actions'
    ],
    evidence: [
      'Final incident reports',
      'Lessons learned register',
      'Improvement action plans',
      'Follow-up tracking'
    ]
  },
  // Article 22 - Supervision and Enforcement
  {
    id: 'NIS2-22.1',
    article: 'Article 22',
    title: 'Compliance Monitoring',
    description: 'Compliance monitoring and assessment procedures',
    category: 'Compliance',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Self-assessment procedures',
      'Compliance monitoring',
      'Internal audit program',
      'Management review'
    ],
    evidence: [
      'Self-assessment reports',
      'Compliance monitoring reports',
      'Internal audit reports',
      'Management review records'
    ]
  },
  // Article 23 - Penalties
  {
    id: 'NIS2-23.1',
    article: 'Article 23',
    title: 'Penalty Awareness',
    description: 'Understanding of penalties and enforcement measures',
    category: 'Compliance',
    mandatory: true,
    applicability: ['essential', 'important'],
    requirements: [
      'Penalty framework understanding',
      'Compliance risk assessment',
      'Legal compliance procedures',
      'Regulatory change management'
    ],
    evidence: [
      'Legal compliance assessment',
      'Penalty framework documentation',
      'Regulatory monitoring procedures',
      'Change management records'
    ]
  }
];

// Control Categories
export const controlCategories = [
  {
    id: 'risk-management',
    name: 'Risk Management',
    description: 'Cybersecurity risk analysis and management',
    weight: 0.20,
    icon: 'FiShield'
  },
  {
    id: 'incident-response',
    name: 'Incident Response',
    description: 'Incident handling and business continuity',
    weight: 0.20,
    icon: 'FiAlertTriangle'
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Security',
    description: 'Supplier and vendor security management',
    weight: 0.15,
    icon: 'FiTruck'
  },
  {
    id: 'system-security',
    name: 'System Security',
    description: 'Network and information system security',
    weight: 0.15,
    icon: 'FiServer'
  },
  {
    id: 'technical-security',
    name: 'Technical Security',
    description: 'Technical security controls and measures',
    weight: 0.10,
    icon: 'FiLock'
  },
  {
    id: 'human-resources',
    name: 'Human Resources Security',
    description: 'Personnel security and awareness',
    weight: 0.10,
    icon: 'FiUsers'
  },
  {
    id: 'cryptography',
    name: 'Cryptography',
    description: 'Cryptographic controls and encryption',
    weight: 0.05,
    icon: 'FiKey'
  },
  {
    id: 'incident-reporting',
    name: 'Incident Reporting',
    description: 'Regulatory incident reporting requirements',
    weight: 0.05,
    icon: 'FiFileText'
  }
];

// Entity Types according to NIS2
export const entityTypes = [
  {
    type: 'essential',
    name: 'Essential Entities',
    description: 'Entities providing essential services',
    sectors: [
      'Energy',
      'Transport',
      'Banking',
      'Financial market infrastructures',
      'Health',
      'Drinking water',
      'Waste water',
      'Digital infrastructure',
      'ICT service management',
      'Public administration',
      'Space'
    ]
  },
  {
    type: 'important',
    name: 'Important Entities',
    description: 'Entities providing important services',
    sectors: [
      'Postal and courier services',
      'Waste management',
      'Manufacture, production and distribution of chemicals',
      'Production, processing and distribution of food',
      'Manufacturing',
      'Digital service providers',
      'Research organizations'
    ]
  }
];