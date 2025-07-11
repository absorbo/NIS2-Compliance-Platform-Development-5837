import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import RoadmapItem from '../components/RoadmapItem';
import RoadmapFilters from '../components/RoadmapFilters';
import RoadmapProgress from '../components/RoadmapProgress';

const { FiMap, FiFilter, FiPlus, FiDownload } = FiIcons;

const Roadmap = () => {
  const { roadmapItems, updateRoadmapItem } = useAppStore();
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    assignee: 'all'
  });

  // Mock roadmap data if empty
  const mockRoadmapItems = roadmapItems.length > 0 ? roadmapItems : [
    {
      id: 1,
      title: 'Implement Incident Response Plan',
      description: 'Develop and document formal incident response procedures',
      priority: 'high',
      status: 'in-progress',
      assignee: 'Security Team',
      dueDate: '2024-03-15',
      estimatedHours: 40,
      controls: ['NIS2-7.1', 'NIS2-7.2'],
      progress: 30
    },
    {
      id: 2,
      title: 'Conduct Risk Assessment',
      description: 'Perform comprehensive cybersecurity risk assessment',
      priority: 'high',
      status: 'pending',
      assignee: 'Risk Manager',
      dueDate: '2024-02-28',
      estimatedHours: 60,
      controls: ['NIS2-5.1', 'NIS2-5.2'],
      progress: 0
    },
    {
      id: 3,
      title: 'Update Vendor Security Requirements',
      description: 'Enhance supply chain security assessments',
      priority: 'medium',
      status: 'pending',
      assignee: 'Procurement Team',
      dueDate: '2024-04-01',
      estimatedHours: 24,
      controls: ['NIS2-6.3'],
      progress: 0
    },
    {
      id: 4,
      title: 'Deploy Network Monitoring Solution',
      description: 'Implement continuous network monitoring capabilities',
      priority: 'high',
      status: 'completed',
      assignee: 'IT Team',
      dueDate: '2024-01-31',
      estimatedHours: 80,
      controls: ['NIS2-4.1', 'NIS2-4.2'],
      progress: 100
    }
  ];

  const filteredItems = mockRoadmapItems.filter(item => {
    if (filters.status !== 'all' && item.status !== filters.status) return false;
    if (filters.priority !== 'all' && item.priority !== filters.priority) return false;
    if (filters.assignee !== 'all' && item.assignee !== filters.assignee) return false;
    return true;
  });

  const handleItemUpdate = (itemId, updates) => {
    updateRoadmapItem(itemId, updates);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Compliance Roadmap
            </h1>
            <p className="text-gray-600">
              AI-generated action plan prioritized by risk and business impact
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <SafeIcon icon={FiDownload} className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              <SafeIcon icon={FiPlus} className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <RoadmapProgress items={mockRoadmapItems} />
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <RoadmapFilters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {/* Roadmap Items */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="space-y-4"
      >
        {filteredItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <RoadmapItem 
              item={item} 
              onUpdate={(updates) => handleItemUpdate(item.id, updates)}
            />
          </motion.div>
        ))}
      </motion.div>

      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <SafeIcon icon={FiMap} className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items match your filters</h3>
          <p className="text-gray-600">Try adjusting your filters to see more roadmap items.</p>
        </motion.div>
      )}
    </div>
  );
};

export default Roadmap;