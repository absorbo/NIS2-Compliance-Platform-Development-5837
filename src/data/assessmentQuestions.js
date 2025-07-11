// Comprehensive NIS2 Assessment Questions - Based on Official Controls
import { nis2Controls } from './nis2Controls.js';

export const assessmentQuestions = [
  // Risk Management Questions
  {
    id: 'risk-mgmt-policies',
    controlId: 'NIS2-20.1',
    category: 'Risk Management',
    title: 'Cybersecurity Risk Analysis Policies',
    description: 'Does your organization have documented cybersecurity risk analysis policies that are approved by senior management?',
    businessContext: 'Risk analysis policies provide the foundation for systematic identification and assessment of cybersecurity risks across your organization.',
    legalBasis: 'Article 20(1)(a) of the NIS2 Directive requires policies on cybersecurity risk analysis.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We have comprehensive, board-approved cybersecurity risk analysis policies that are regularly reviewed',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We have documented policies approved by senior management, but they may need updates',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We have some risk analysis procedures but they are not formally documented as policies',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not have documented cybersecurity risk analysis policies',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Cybersecurity risk analysis policy document',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Risk Management Policy', 'Cybersecurity Risk Framework']
      },
      {
        type: 'mandatory',
        description: 'Board or senior management approval documentation',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Board meeting minutes', 'Management approval memo']
      },
      {
        type: 'optional',
        description: 'Policy review and update records',
        formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
        examples: ['Policy review log', 'Update tracking document']
      }
    ]
  },
  {
    id: 'risk-assessment-process',
    controlId: 'NIS2-20.1',
    category: 'Risk Management',
    title: 'Regular Risk Assessment Process',
    description: 'Does your organization conduct regular, systematic cybersecurity risk assessments of your network and information systems?',
    businessContext: 'Regular risk assessments help identify vulnerabilities and threats before they can impact your business operations.',
    legalBasis: 'Article 20(1)(a) requires systematic risk analysis to identify cybersecurity risks.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We conduct comprehensive risk assessments at least annually with formal methodology',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We conduct risk assessments regularly but may lack some formal procedures',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We conduct ad-hoc risk assessments but not on a regular schedule',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not conduct formal cybersecurity risk assessments',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Most recent risk assessment report',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Annual Risk Assessment Report', 'Risk Register']
      },
      {
        type: 'mandatory',
        description: 'Risk assessment methodology or procedures',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Risk Assessment Methodology', 'Risk Analysis Procedures']
      },
      {
        type: 'optional',
        description: 'Historical risk assessment reports',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Previous year assessments', 'Quarterly risk updates']
      }
    ]
  },
  // Incident Response Questions
  {
    id: 'incident-response-plan',
    controlId: 'NIS2-20.2',
    category: 'Incident Response',
    title: 'Incident Response Plan',
    description: 'Does your organization have a documented incident response plan that covers detection, response, and recovery procedures?',
    businessContext: 'A comprehensive incident response plan minimizes business disruption and ensures quick recovery from cybersecurity incidents.',
    legalBasis: 'Article 20(1)(b) requires incident handling procedures.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We have a comprehensive, tested incident response plan with clear procedures and roles',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We have an incident response plan but it may need updates or more testing',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We have basic incident response procedures but they are not comprehensive',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not have a documented incident response plan',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Incident response plan document',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Incident Response Plan', 'Cyber Incident Procedures']
      },
      {
        type: 'mandatory',
        description: 'Incident response team structure and contact information',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['CSIRT Team Structure', 'Emergency Contact List']
      },
      {
        type: 'optional',
        description: 'Incident response test results or exercises',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Tabletop exercise results', 'Incident simulation reports']
      }
    ]
  },
  {
    id: 'business-continuity',
    controlId: 'NIS2-20.2',
    category: 'Incident Response',
    title: 'Business Continuity Management',
    description: 'Does your organization have business continuity plans that address cybersecurity incidents and their impact on operations?',
    businessContext: 'Business continuity plans ensure your organization can maintain critical operations during and after cybersecurity incidents.',
    legalBasis: 'Article 20(1)(b) requires business continuity management.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We have comprehensive business continuity plans that specifically address cybersecurity incidents',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We have business continuity plans but they may not fully address cybersecurity scenarios',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We have basic business continuity procedures but they are not comprehensive',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not have business continuity plans',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Business continuity plan document',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Business Continuity Plan', 'Disaster Recovery Plan']
      },
      {
        type: 'optional',
        description: 'Business impact analysis',
        formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
        examples: ['Business Impact Analysis', 'Critical Process Mapping']
      },
      {
        type: 'optional',
        description: 'Business continuity test results',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['DR Test Results', 'Continuity Exercise Report']
      }
    ]
  },
  // Supply Chain Security Questions
  {
    id: 'supplier-security-assessment',
    controlId: 'NIS2-20.3',
    category: 'Supply Chain',
    title: 'Supplier Security Assessment',
    description: 'Does your organization assess the cybersecurity risks of suppliers and vendors that have access to your systems or data?',
    businessContext: 'Supplier security assessments help identify and mitigate risks from third-party relationships that could impact your operations.',
    legalBasis: 'Article 20(1)(c) requires supply chain security measures.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We systematically assess cybersecurity risks of all relevant suppliers with formal procedures',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We assess most suppliers but may lack systematic procedures for all categories',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We assess some critical suppliers but not comprehensively',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not formally assess supplier cybersecurity risks',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Supplier security assessment procedures',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Vendor Risk Assessment Procedure', 'Third-Party Security Evaluation']
      },
      {
        type: 'mandatory',
        description: 'Sample supplier security assessments',
        formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
        examples: ['Vendor Security Assessment Report', 'Supplier Risk Evaluation']
      },
      {
        type: 'optional',
        description: 'Supplier security requirements or contracts',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Vendor Security Requirements', 'Service Level Agreements']
      }
    ]
  },
  {
    id: 'supply-chain-monitoring',
    controlId: 'NIS2-20.3',
    category: 'Supply Chain',
    title: 'Supply Chain Monitoring',
    description: 'Does your organization monitor the ongoing cybersecurity posture of critical suppliers and vendors?',
    businessContext: 'Continuous monitoring of supplier security helps detect changes in risk levels and ensures ongoing compliance.',
    legalBasis: 'Article 20(1)(c) requires ongoing supply chain security management.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We continuously monitor critical suppliers with formal procedures and regular reviews',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We monitor most critical suppliers but may lack systematic ongoing procedures',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We have some monitoring of suppliers but it is not comprehensive',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not monitor supplier cybersecurity posture after initial assessment',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Supplier monitoring procedures',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Vendor Monitoring Procedure', 'Third-Party Review Process']
      },
      {
        type: 'optional',
        description: 'Supplier monitoring reports',
        formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
        examples: ['Quarterly Vendor Review', 'Supplier Risk Dashboard']
      },
      {
        type: 'optional',
        description: 'Supplier incident or issue reports',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Vendor Incident Report', 'Supply Chain Risk Event']
      }
    ]
  },
  // System Security Questions
  {
    id: 'secure-development',
    controlId: 'NIS2-20.4',
    category: 'System Security',
    title: 'Secure Development and Procurement',
    description: 'Does your organization follow secure development practices and include security requirements in system procurement?',
    businessContext: 'Secure development and procurement practices ensure that security is built into systems from the beginning.',
    legalBasis: 'Article 20(1)(d) requires security in acquisition, development and maintenance of systems.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We follow comprehensive secure development lifecycle and procurement security requirements',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We have secure development practices but may not cover all aspects systematically',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We have some secure development practices but they are not comprehensive',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not follow formal secure development or procurement practices',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Secure development lifecycle documentation',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['SDLC Security Procedures', 'Secure Coding Standards']
      },
      {
        type: 'mandatory',
        description: 'Security requirements for procurement',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Procurement Security Requirements', 'RFP Security Template']
      },
      {
        type: 'optional',
        description: 'Security testing or code review results',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Security Test Results', 'Code Review Report']
      }
    ]
  },
  {
    id: 'vulnerability-management',
    controlId: 'NIS2-20.4',
    category: 'System Security',
    title: 'Vulnerability Management',
    description: 'Does your organization have a systematic approach to identifying, assessing, and remediating vulnerabilities in your systems?',
    businessContext: 'Vulnerability management helps identify and fix security weaknesses before they can be exploited by attackers.',
    legalBasis: 'Article 20(1)(d) requires measures for system security including vulnerability management.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We have comprehensive vulnerability management with regular scanning and timely remediation',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We have vulnerability management but may lack some systematic procedures',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We have basic vulnerability scanning but remediation is not systematic',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not have a formal vulnerability management process',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Vulnerability management procedures',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Vulnerability Management Process', 'Patch Management Procedure']
      },
      {
        type: 'mandatory',
        description: 'Recent vulnerability scan results',
        formats: ['pdf', 'doc', 'docx', 'xml'],
        examples: ['Vulnerability Scan Report', 'Security Assessment Results']
      },
      {
        type: 'optional',
        description: 'Vulnerability remediation tracking',
        formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
        examples: ['Remediation Tracking Log', 'Patch Management Dashboard']
      }
    ]
  },
  // Technical Security Questions
  {
    id: 'network-security',
    controlId: 'NIS2-20.5',
    category: 'Technical Security',
    title: 'Network Security Controls',
    description: 'Does your organization implement appropriate network security controls including firewalls, intrusion detection, and network segmentation?',
    businessContext: 'Network security controls protect your systems from unauthorized access and help detect malicious activity.',
    legalBasis: 'Article 20(1)(e) requires measures for network and information system security.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We have comprehensive network security controls with monitoring and regular updates',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We have most network security controls but may need enhancements',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We have basic network security controls but they are not comprehensive',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not have adequate network security controls',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Network security architecture documentation',
        formats: ['pdf', 'doc', 'docx', 'vsd', 'png'],
        examples: ['Network Architecture Diagram', 'Security Zone Documentation']
      },
      {
        type: 'mandatory',
        description: 'Network security control configuration',
        formats: ['pdf', 'doc', 'docx', 'txt'],
        examples: ['Firewall Configuration', 'IDS/IPS Settings']
      },
      {
        type: 'optional',
        description: 'Network security monitoring reports',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Security Monitoring Report', 'Network Traffic Analysis']
      }
    ]
  },
  {
    id: 'access-control',
    controlId: 'NIS2-20.5',
    category: 'Technical Security',
    title: 'Access Control Systems',
    description: 'Does your organization implement proper access control systems including user authentication, authorization, and access monitoring?',
    businessContext: 'Access control systems ensure that only authorized users can access your systems and data.',
    legalBasis: 'Article 20(1)(e) requires access control as part of system security measures.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We have comprehensive access control with multi-factor authentication and regular access reviews',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We have good access control but may lack some advanced features',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We have basic access control but it may not be comprehensive',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not have adequate access control systems',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Access control policy and procedures',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Access Control Policy', 'User Access Procedures']
      },
      {
        type: 'mandatory',
        description: 'User access review reports',
        formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
        examples: ['Access Review Report', 'User Account Audit']
      },
      {
        type: 'optional',
        description: 'Access control system configuration',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Identity Management Configuration', 'Authentication Settings']
      }
    ]
  },
  // Human Resources Security Questions
  {
    id: 'security-awareness',
    controlId: 'NIS2-20.6',
    category: 'Human Resources',
    title: 'Security Awareness Training',
    description: 'Does your organization provide regular cybersecurity awareness training to all employees?',
    businessContext: 'Security awareness training helps employees recognize and respond appropriately to cybersecurity threats.',
    legalBasis: 'Article 20(1)(f) requires human resources security policies including awareness training.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We provide comprehensive, regular security awareness training to all employees',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We provide security awareness training but may not cover all employees or topics',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We provide some security awareness training but it is not comprehensive',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not provide regular security awareness training',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Security awareness training program documentation',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Security Training Program', 'Awareness Training Plan']
      },
      {
        type: 'mandatory',
        description: 'Training completion records',
        formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
        examples: ['Training Completion Report', 'Employee Training Records']
      },
      {
        type: 'optional',
        description: 'Training materials or content',
        formats: ['pdf', 'doc', 'docx', 'ppt', 'pptx'],
        examples: ['Training Slides', 'Security Awareness Materials']
      }
    ]
  },
  {
    id: 'personnel-security',
    controlId: 'NIS2-20.6',
    category: 'Human Resources',
    title: 'Personnel Security Screening',
    description: 'Does your organization conduct appropriate background checks and security screening for employees in sensitive positions?',
    businessContext: 'Personnel security screening helps ensure that employees in critical roles are trustworthy and suitable for their positions.',
    legalBasis: 'Article 20(1)(f) requires human resources security policies and procedures.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We conduct comprehensive background checks for all employees in sensitive positions',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We conduct background checks but may not cover all relevant positions',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We conduct some background checks but not systematically',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not conduct background checks for security-sensitive positions',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Personnel security screening procedures',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Background Check Procedure', 'Personnel Security Policy']
      },
      {
        type: 'optional',
        description: 'Position risk classification',
        formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
        examples: ['Position Risk Assessment', 'Role Classification Matrix']
      },
      {
        type: 'optional',
        description: 'Screening completion records (anonymized)',
        formats: ['pdf', 'doc', 'docx', 'xls', 'xlsx'],
        examples: ['Screening Completion Report', 'Background Check Log']
      }
    ]
  },
  // Cryptography Questions
  {
    id: 'cryptographic-controls',
    controlId: 'NIS2-20.7',
    category: 'Cryptography',
    title: 'Cryptographic Controls',
    description: 'Does your organization implement appropriate cryptographic controls for data protection including encryption and key management?',
    businessContext: 'Cryptographic controls protect sensitive data from unauthorized access and ensure data integrity.',
    legalBasis: 'Article 20(1)(g) requires the use of cryptography and encryption.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We implement comprehensive cryptographic controls with proper key management',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We implement cryptographic controls but may need enhancements in some areas',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We use some encryption but it is not comprehensive',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not implement adequate cryptographic controls',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Cryptographic policy and standards',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Cryptographic Policy', 'Encryption Standards']
      },
      {
        type: 'mandatory',
        description: 'Key management procedures',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Key Management Procedure', 'Cryptographic Key Lifecycle']
      },
      {
        type: 'optional',
        description: 'Encryption implementation documentation',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Encryption Implementation Guide', 'Data Classification and Encryption']
      }
    ]
  },
  // Incident Reporting Questions
  {
    id: 'incident-classification',
    controlId: 'NIS2-21.1',
    category: 'Incident Reporting',
    title: 'Incident Classification and Reporting',
    description: 'Does your organization have procedures for classifying cybersecurity incidents and reporting significant incidents to authorities?',
    businessContext: 'Proper incident classification and reporting ensures compliance with regulatory requirements and helps improve sector-wide security.',
    legalBasis: 'Article 21 requires incident reporting including early warning within 24 hours.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We have comprehensive incident classification and reporting procedures that meet NIS2 requirements',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We have incident classification and reporting procedures but they may need updates for NIS2',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We have basic incident reporting but it may not meet all NIS2 requirements',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not have procedures for incident classification and regulatory reporting',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Incident classification procedures',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Incident Classification Matrix', 'Incident Severity Definitions']
      },
      {
        type: 'mandatory',
        description: 'Incident reporting procedures',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Regulatory Reporting Procedure', 'Incident Notification Process']
      },
      {
        type: 'optional',
        description: 'Historical incident reports (anonymized)',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Sample Incident Report', 'Incident Reporting Log']
      }
    ]
  },
  // Compliance Questions
  {
    id: 'compliance-monitoring',
    controlId: 'NIS2-22.1',
    category: 'Compliance',
    title: 'Compliance Monitoring and Assessment',
    description: 'Does your organization have procedures for monitoring and assessing compliance with cybersecurity requirements?',
    businessContext: 'Compliance monitoring ensures that your cybersecurity measures remain effective and meet regulatory requirements.',
    legalBasis: 'Article 22 addresses supervision and enforcement including compliance monitoring.',
    options: [
      {
        value: 'fully-compliant',
        label: 'We have comprehensive compliance monitoring with regular assessments and management review',
        score: 100,
        maturityLevel: 'Optimized'
      },
      {
        value: 'largely-compliant',
        label: 'We have compliance monitoring but it may not be comprehensive',
        score: 75,
        maturityLevel: 'Managed'
      },
      {
        value: 'partially-compliant',
        label: 'We have some compliance monitoring but it is not systematic',
        score: 50,
        maturityLevel: 'Defined'
      },
      {
        value: 'non-compliant',
        label: 'We do not have formal compliance monitoring procedures',
        score: 0,
        maturityLevel: 'Initial'
      }
    ],
    evidenceRequirements: [
      {
        type: 'mandatory',
        description: 'Compliance monitoring procedures',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Compliance Monitoring Process', 'Self-Assessment Procedure']
      },
      {
        type: 'mandatory',
        description: 'Recent compliance assessment reports',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Compliance Assessment Report', 'Internal Audit Report']
      },
      {
        type: 'optional',
        description: 'Management review of compliance',
        formats: ['pdf', 'doc', 'docx'],
        examples: ['Management Review Minutes', 'Compliance Status Report']
      }
    ]
  }
];

// Question categories for organization
export const questionCategories = [
  {
    id: 'risk-management',
    name: 'Risk Management',
    description: 'Cybersecurity risk analysis and management policies',
    questions: ['risk-mgmt-policies', 'risk-assessment-process'],
    weight: 0.20
  },
  {
    id: 'incident-response',
    name: 'Incident Response',
    description: 'Incident handling and business continuity management',
    questions: ['incident-response-plan', 'business-continuity'],
    weight: 0.20
  },
  {
    id: 'supply-chain',
    name: 'Supply Chain Security',
    description: 'Security measures for suppliers and vendors',
    questions: ['supplier-security-assessment', 'supply-chain-monitoring'],
    weight: 0.15
  },
  {
    id: 'system-security',
    name: 'System Security',
    description: 'Security in system acquisition, development and maintenance',
    questions: ['secure-development', 'vulnerability-management'],
    weight: 0.15
  },
  {
    id: 'technical-security',
    name: 'Technical Security',
    description: 'Network and information system security measures',
    questions: ['network-security', 'access-control'],
    weight: 0.10
  },
  {
    id: 'human-resources',
    name: 'Human Resources Security',
    description: 'Personnel security policies and procedures',
    questions: ['security-awareness', 'personnel-security'],
    weight: 0.10
  },
  {
    id: 'cryptography',
    name: 'Cryptography',
    description: 'Cryptographic controls and encryption',
    questions: ['cryptographic-controls'],
    weight: 0.05
  },
  {
    id: 'incident-reporting',
    name: 'Incident Reporting',
    description: 'Incident classification and regulatory reporting',
    questions: ['incident-classification'],
    weight: 0.03
  },
  {
    id: 'compliance',
    name: 'Compliance',
    description: 'Compliance monitoring and assessment',
    questions: ['compliance-monitoring'],
    weight: 0.02
  }
];

// Maturity levels for assessment
export const maturityLevels = [
  {
    level: 'Initial',
    score: 0,
    description: 'Ad-hoc processes, no formal procedures',
    color: 'danger'
  },
  {
    level: 'Defined',
    score: 50,
    description: 'Basic processes defined but not consistently implemented',
    color: 'warning'
  },
  {
    level: 'Managed',
    score: 75,
    description: 'Processes implemented and monitored',
    color: 'primary'
  },
  {
    level: 'Optimized',
    score: 100,
    description: 'Processes optimized and continuously improved',
    color: 'success'
  }
];