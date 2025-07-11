import React from 'react';
import { motion } from 'framer-motion';

const AssessmentProgress = ({ currentQuestion, totalQuestions, progress }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Assessment Progress</h3>
        <span className="text-sm text-gray-600">
          {currentQuestion} of {totalQuestions} questions
        </span>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="bg-primary-600 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">0%</span>
          <span className="text-sm font-medium text-primary-600">{Math.round(progress)}%</span>
          <span className="text-sm text-gray-600">100%</span>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        Complete all questions to generate your personalized compliance roadmap
      </div>
    </div>
  );
};

export default AssessmentProgress;