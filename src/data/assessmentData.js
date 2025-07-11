// Enhanced assessment questions with AI-driven contextual guidance
export const assessmentQuestions = [
  {
    id: 'governance-1',
    category: 'Governance',
    title: 'Does your organization have a designated cybersecurity governance structure?',
    description: 'This includes having clear roles, responsibilities, and reporting lines for cybersecurity matters at the executive level.',
    businessContext: 'Strong governance ensures cybersecurity is treated as a business priority with appropriate oversight and accountability.',
    aiGuidance: {
      explanation: 'This question helps evaluate your organization\'s leadership commitment to cybersecurity. A formal structure demonstrates strategic prioritization of security.',
      examples: [
        'Board-level cybersecurity committee',
        'CISO reporting to CEO/Board',
        'Regular security updates to executive team'
      ]
    },
    evidenceRequirements: [
      {
        type: 'document',
        description: 'Organizational chart showing security reporting lines',
        format: ['pdf', 'png', 'jpg'],
        required: true
      },
      {
        type: 'document',
        description: 'Security governance policy document',
        format: ['pdf', 'doc', 'docx'],
        required: true
      }
    ],
    options: [
      {
        value: 'yes-formal',
        label: 'Yes, we have a formal cybersecurity governance structure with clear roles and responsibilities',
        weight: 1.0
      },
      {
        value: 'yes-informal',
        label: 'Yes, but it\'s more informal and not well-documented',
        weight: 0.6
      },
      {
        value: 'partial',
        label: 'Partially - we have some governance elements but they\'re not comprehensive',
        weight: 0.3
      },
      {
        value: 'no',
        label: 'No, we don\'t have a structured approach to cybersecurity governance',
        weight: 0.0
      }
    ],
    controls: ['NIS2-1.1', 'NIS2-1.2'],
    riskLevel: 'high',
    implementationEffort: 'medium'
  },
  {
    id: 'risk-management-1',
    category: 'Risk Management',
    title: 'Does your organization conduct regular cybersecurity risk assessments?',
    description: 'This involves systematically identifying, analyzing, and evaluating cybersecurity risks to your business operations.',
    businessContext: 'Regular risk assessments help identify vulnerabilities before they become security incidents that could impact business continuity.',
    aiGuidance: {
      explanation: 'Risk assessments are fundamental to understanding your organization\'s security posture and making informed decisions about security investments.',
      examples: [
        'Annual comprehensive risk assessments',
        'Quarterly risk reviews for critical systems',
        'Risk assessment after major system changes'
      ]
    },
    evidenceRequirements: [
      {
        type: 'document',
        description: 'Most recent risk assessment report',
        format: ['pdf', 'doc', 'docx'],
        required: true
      },
      {
        type: 'document',
        description: 'Risk assessment methodology document',
        format: ['pdf', 'doc', 'docx'],
        required: false
      }
    ],
    options: [
      {
        value: 'yes-regular',
        label: 'Yes, we conduct comprehensive risk assessments at least annually',
        weight: 1.0
      },
      {
        value: 'yes-irregular',
        label: 'Yes, but not on a regular schedule',
        weight: 0.6
      },
      {
        value: 'basic',
        label: 'We do basic risk identification but not formal assessments',
        weight: 0.3
      },
      {
        value: 'no',
        label: 'No, we don\'t conduct formal risk assessments',
        weight: 0.0
      }
    ],
    controls: ['NIS2-2.1', 'NIS2-2.2'],
    riskLevel: 'high',
    implementationEffort: 'high'
  },
  {
    id: 'incident-response-1',
    category: 'Incident Response',
    title: 'Does your organization have a documented incident response plan?',
    description: 'This includes procedures for detecting, responding to, and recovering from cybersecurity incidents.',
    businessContext: 'A well-defined incident response plan minimizes business disruption and reduces recovery time when security incidents occur.',
    aiGuidance: {
      explanation: 'Incident response plans are critical for minimizing the impact of security breaches and ensuring business continuity.',
      examples: [
        'Documented incident response procedures',
        'Incident response team roles and responsibilities',
        'Communication protocols during incidents'
      ]
    },
    evidenceRequirements: [
      {
        type: 'document',
        description: 'Incident response plan document',
        format: ['pdf', 'doc', 'docx'],
        required: true
      },
      {
        type: 'document',
        description: 'Incident response team contact list',
        format: ['pdf', 'doc', 'docx'],
        required: false
      }
    ],
    options: [
      {
        value: 'yes-tested',
        label: 'Yes, we have a documented plan that is regularly tested and updated',
        weight: 1.0
      },
      {
        value: 'yes-basic',
        label: 'Yes, we have a basic plan but it\'s not regularly tested',
        weight: 0.6
      },
      {
        value: 'informal',
        label: 'We have informal procedures but no documented plan',
        weight: 0.3
      },
      {
        value: 'no',
        label: 'No, we don\'t have an incident response plan',
        weight: 0.0
      }
    ],
    controls: ['NIS2-3.1', 'NIS2-3.2'],
    riskLevel: 'high',
    implementationEffort: 'medium'
  }
];

export const assessmentCategories = [
  {
    id: 'governance',
    name: 'Governance',
    description: 'Leadership and organizational structure',
    weight: 0.25,
    order: 1
  },
  {
    id: 'risk-management',
    name: 'Risk Management',
    description: 'Risk identification and assessment',
    weight: 0.20,
    order: 2
  },
  {
    id: 'incident-response',
    name: 'Incident Response',
    description: 'Incident detection and response capabilities',
    weight: 0.20,
    order: 3
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Security',
    description: 'Vendor and supplier security management',
    weight: 0.15,
    order: 4
  },
  {
    id: 'business-continuity',
    name: 'Business Continuity',
    description: 'Business continuity and disaster recovery',
    weight: 0.20,
    order: 5
  }
];

export const evidenceTypes = [
  {
    id: 'policy',
    name: 'Policy Document',
    description: 'Formal organizational policies and procedures',
    formats: ['pdf', 'doc', 'docx'],
    validationRules: ['must-be-signed', 'must-be-dated']
  },
  {
    id: 'technical',
    name: 'Technical Documentation',
    description: 'System configurations, architecture diagrams, security controls',
    formats: ['pdf', 'png', 'jpg', 'vsdx'],
    validationRules: ['must-be-current']
  },
  {
    id: 'certificate',
    name: 'Certificate',
    description: 'Security certifications and audit reports',
    formats: ['pdf'],
    validationRules: ['must-be-current', 'must-be-signed']
  }
];