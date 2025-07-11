import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { format } from 'date-fns';

const { FiChevronDown, FiChevronUp, FiUser, FiCalendar, FiClock, FiTag } = FiIcons;

const RoadmapItem = ({ item, onUpdate }) => {
  const [expanded, setExpanded] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'gray';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'primary';
      case 'overdue': return 'danger';
      default: return 'gray';
    }
  };

  const handleStatusChange = (newStatus) => {
    onUpdate({ status: newStatus });
  };

  const handleProgressChange = (newProgress) => {
    onUpdate({ progress: newProgress });
  };

  const priorityColor = getPriorityColor(item.priority);
  const statusColor = getStatusColor(item.status);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
      whileHover={{ shadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                priorityColor === 'danger' ? 'bg-danger-100 text-danger-800' :
                priorityColor === 'warning' ? 'bg-warning-100 text-warning-800' :
                'bg-success-100 text-success-800'
              }`}>
                {item.priority} priority
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                statusColor === 'success' ? 'bg-success-100 text-success-800' :
                statusColor === 'primary' ? 'bg-primary-100 text-primary-800' :
                statusColor === 'danger' ? 'bg-danger-100 text-danger-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {item.status.replace('-', ' ')}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-4">
              {item.description}
            </p>
            
            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{item.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    item.progress === 100 ? 'bg-success-500' : 'bg-primary-500'
                  }`}
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <SafeIcon 
              icon={expanded ? FiChevronUp : FiChevronDown} 
              className="w-5 h-5 text-gray-400" 
            />
          </button>
        </div>

        {/* Quick Info */}
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiUser} className="w-4 h-4" />
            <span>{item.assignee}</span>
          </div>
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiCalendar} className="w-4 h-4" />
            <span>{format(new Date(item.dueDate), 'MMM d, yyyy')}</span>
          </div>
          <div className="flex items-center space-x-1">
            <SafeIcon icon={FiClock} className="w-4 h-4" />
            <span>{item.estimatedHours}h</span>
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t border-gray-200 p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Controls */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Related Controls</h4>
              <div className="flex flex-wrap gap-2">
                {item.controls.map((control) => (
                  <span
                    key={control}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                  >
                    {control}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Actions</h4>
              <div className="space-y-2">
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Progress: {item.progress}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={item.progress}
                    onChange={(e) => handleProgressChange(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RoadmapItem;