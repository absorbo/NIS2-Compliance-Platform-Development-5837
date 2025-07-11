export const euCountries = [
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'BG', name: 'Bulgaria' },
  { code: 'HR', name: 'Croatia' },
  { code: 'CY', name: 'Cyprus' },
  { code: 'CZ', name: 'Czech Republic' },
  { code: 'DK', name: 'Denmark' },
  { code: 'EE', name: 'Estonia' },
  { code: 'FI', name: 'Finland' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'GR', name: 'Greece' },
  { code: 'HU', name: 'Hungary' },
  { code: 'IE', name: 'Ireland' },
  { code: 'IT', name: 'Italy' },
  { code: 'LV', name: 'Latvia' },
  { code: 'LT', name: 'Lithuania' },
  { code: 'LU', name: 'Luxembourg' },
  { code: 'MT', name: 'Malta' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'PL', name: 'Poland' },
  { code: 'PT', name: 'Portugal' },
  { code: 'RO', name: 'Romania' },
  { code: 'SK', name: 'Slovakia' },
  { code: 'SI', name: 'Slovenia' },
  { code: 'ES', name: 'Spain' },
  { code: 'SE', name: 'Sweden' }
];

// Priority for action items and recommendations
export const priorityLevels = [
  { value: 'high', label: 'High', color: 'danger' },
  { value: 'medium', label: 'Medium', color: 'warning' },
  { value: 'low', label: 'Low', color: 'success' }
];

// Status options for roadmap items
export const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'gray' },
  { value: 'in-progress', label: 'In Progress', color: 'primary' },
  { value: 'completed', label: 'Completed', color: 'success' },
  { value: 'overdue', label: 'Overdue', color: 'danger' }
];

// Compliance maturity levels
export const maturityLevels = [
  { value: 'initial', label: 'Initial', description: 'Ad-hoc processes with no formal documentation', color: 'danger' },
  { value: 'defined', label: 'Defined', description: 'Processes are documented but not fully implemented', color: 'warning' },
  { value: 'managed', label: 'Managed', description: 'Processes are documented and consistently followed', color: 'primary' },
  { value: 'optimized', label: 'Optimized', description: 'Processes are continuously improved and optimized', color: 'success' }
];

// Evidence types
export const evidenceTypes = [
  { value: 'document', label: 'Document', formats: ['pdf', 'doc', 'docx'] },
  { value: 'image', label: 'Image', formats: ['jpg', 'jpeg', 'png'] },
  { value: 'spreadsheet', label: 'Spreadsheet', formats: ['xls', 'xlsx', 'csv'] },
  { value: 'code', label: 'Code/Configuration', formats: ['txt', 'json', 'yaml', 'xml'] }
];

// NIS2 implementation deadlines
export const implementationDeadlines = {
  essential: '2024-10-17', // 12 months after transposition
  important: '2025-01-17'  // 15 months after transposition
};

// NIS2 roles
export const organizationRoles = [
  { value: 'ciso', label: 'CISO / Security Officer' },
  { value: 'cio', label: 'CIO / IT Director' },
  { value: 'compliance', label: 'Compliance Officer' },
  { value: 'risk', label: 'Risk Manager' },
  { value: 'legal', label: 'Legal Counsel' },
  { value: 'executive', label: 'Executive / Board Member' },
  { value: 'other', label: 'Other' }
];