// Enhanced with AI guidance and evidence collection
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';

const { FiInfo, FiUpload, FiCheck, FiX } = FiIcons;

// File validation utility
const validateFileType = (file, requirements) => {
  if (!file || !requirements) return false;
  
  const fileExtension = file.name.split('.').pop().toLowerCase();
  const maxSize = 10 * 1024 * 1024; // 10MB max
  
  // Check file size
  if (file.size > maxSize) {
    return false;
  }
  
  // Check if any requirement accepts this file type
  return requirements.some(req => 
    req.format && req.format.includes(fileExtension)
  );
};

const AssessmentQuestion = ({ question }) => {
  const { assessmentAnswers, updateAssessmentAnswer } = useAppStore();
  const [selectedAnswer, setSelectedAnswer] = useState(
    assessmentAnswers[question.id]?.answer || ''
  );
  const [evidence, setEvidence] = useState(
    assessmentAnswers[question.id]?.evidence || []
  );
  const [showAiGuidance, setShowAiGuidance] = useState(false);

  const handleAnswerChange = (value) => {
    setSelectedAnswer(value);
    updateAssessmentAnswer(question.id, {
      answer: value,
      evidence: evidence,
      timestamp: new Date().toISOString()
    });
  };

  const handleEvidenceUpload = async (files) => {
    // Handle evidence upload and validation
    const newEvidence = [...evidence];
    for (const file of files) {
      // Validate file type and size
      if (validateFileType(file, question.evidenceRequirements)) {
        newEvidence.push({
          name: file.name,
          type: file.type,
          size: file.size,
          uploadDate: new Date().toISOString()
        });
      }
    }
    setEvidence(newEvidence);
    updateAssessmentAnswer(question.id, {
      answer: selectedAnswer,
      evidence: newEvidence,
      timestamp: new Date().toISOString()
    });
  };

  return (
    <div className="space-y-6">
      {/* Question Header with AI Context */}
      <div>
        <div className="flex items-center space-x-2 mb-2">
          <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
            {question.category}
          </span>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <SafeIcon icon={FiInfo} className="w-4 h-4" />
            <span>Controls: {question.controls.join(', ')}</span>
          </div>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          {question.title}
        </h2>
        <p className="text-gray-600 mb-4">{question.description}</p>
        
        {/* AI Guidance Toggle */}
        <button
          onClick={() => setShowAiGuidance(!showAiGuidance)}
          className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          <SafeIcon icon={FiInfo} className="w-4 h-4" />
          <span>{showAiGuidance ? 'Hide' : 'Show'} AI Guidance</span>
        </button>
      </div>

      {/* AI Guidance */}
      <motion.div
        initial={false}
        animate={{ height: showAiGuidance ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        {showAiGuidance && question.aiGuidance && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">AI Guidance</h4>
            <p className="text-blue-800 mb-3">{question.aiGuidance.explanation}</p>
            {question.aiGuidance.examples && (
              <ul className="list-disc list-inside text-blue-800">
                {question.aiGuidance.examples.map((example, index) => (
                  <li key={index}>{example}</li>
                ))}
              </ul>
            )}
          </div>
        )}
      </motion.div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <motion.label
            key={option.value}
            className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
              selectedAnswer === option.value
                ? 'border-primary-500 bg-primary-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={selectedAnswer === option.value}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="mt-1 w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
            />
            <div className="flex-1">
              <span className="font-medium text-gray-900">{option.label}</span>
            </div>
          </motion.label>
        ))}
      </div>

      {/* Evidence Collection */}
      {selectedAnswer && question.evidenceRequirements && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="border-t pt-6"
        >
          <h3 className="font-medium text-gray-900 mb-4">Required Evidence</h3>
          <div className="space-y-4">
            {question.evidenceRequirements.map((req, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-2">
                  {req.description}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Accepted formats: {req.format.join(', ')}
                </p>
                <input
                  type="file"
                  accept={req.format.map((f) => `.${f}`).join(',')}
                  onChange={(e) => handleEvidenceUpload(e.target.files)}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
              </div>
            ))}
          </div>
          
          {/* Uploaded Evidence Display */}
          {evidence.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Uploaded Evidence</h4>
              <div className="space-y-2">
                {evidence.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                    <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-500">
                      ({Math.round(file.size / 1024)}KB)
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AssessmentQuestion;