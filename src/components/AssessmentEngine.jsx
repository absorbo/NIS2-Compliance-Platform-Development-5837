import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import { assessmentQuestions, questionCategories } from '../data/assessmentQuestions';
import AssessmentProgress from './AssessmentProgress';
import EvidenceUpload from './EvidenceUpload';

const { FiArrowRight, FiArrowLeft, FiCheckCircle, FiInfo, FiFileText, FiAlertCircle } = FiIcons;

const AssessmentEngine = () => {
  const { 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    assessmentAnswers, 
    updateAssessmentAnswer,
    selectedCountry,
    companyProfile 
  } = useAppStore();

  const [showEvidence, setShowEvidence] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const totalQuestions = assessmentQuestions.length;
  const currentAnswer = assessmentAnswers[currentQuestion?.id];

  const handleAnswerChange = (value, option) => {
    const answerData = {
      questionId: currentQuestion.id,
      answer: value,
      score: option.score,
      maturityLevel: option.maturityLevel,
      timestamp: new Date().toISOString(),
      evidence: currentAnswer?.evidence || []
    };

    updateAssessmentAnswer(currentQuestion.id, answerData);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowEvidence(false);
      setShowGuidance(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowEvidence(false);
      setShowGuidance(false);
    }
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  if (!currentQuestion) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress */}
      <AssessmentProgress 
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        progress={progress}
      />

      {/* Question Card */}
      <motion.div
        className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8">
          {/* Question Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                  {currentQuestion.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                  {currentQuestion.controlId}
                </span>
              </div>
              <div className="text-sm text-gray-500">
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              {currentQuestion.title}
            </h2>
            
            <p className="text-gray-600 mb-4">
              {currentQuestion.description}
            </p>

            {/* Legal Basis */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-start space-x-2">
                <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Legal Basis</h4>
                  <p className="text-blue-800 text-sm">{currentQuestion.legalBasis}</p>
                </div>
              </div>
            </div>

            {/* Business Context */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <SafeIcon icon={FiCheckCircle} className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 mb-1">Business Context</h4>
                  <p className="text-green-800 text-sm">{currentQuestion.businessContext}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option) => (
              <motion.label
                key={option.value}
                className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  currentAnswer?.answer === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value={option.value}
                  checked={currentAnswer?.answer === option.value}
                  onChange={() => handleAnswerChange(option.value, option)}
                  className="mt-1 w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{option.label}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        option.maturityLevel === 'Optimized' ? 'bg-success-100 text-success-800' :
                        option.maturityLevel === 'Managed' ? 'bg-primary-100 text-primary-800' :
                        option.maturityLevel === 'Defined' ? 'bg-warning-100 text-warning-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {option.maturityLevel}
                      </span>
                      <span className="text-sm text-gray-500">
                        {option.score} points
                      </span>
                    </div>
                  </div>
                </div>
              </motion.label>
            ))}
          </div>

          {/* Evidence Requirements */}
          {currentAnswer?.answer && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className="border-t pt-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Evidence Requirements</h3>
                <button
                  onClick={() => setShowEvidence(!showEvidence)}
                  className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700"
                >
                  <SafeIcon icon={FiFileText} className="w-4 h-4" />
                  <span>{showEvidence ? 'Hide' : 'Show'} Evidence Upload</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {currentQuestion.evidenceRequirements.map((req, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <SafeIcon 
                        icon={req.type === 'mandatory' ? FiAlertCircle : FiInfo} 
                        className={`w-4 h-4 ${req.type === 'mandatory' ? 'text-red-500' : 'text-blue-500'}`}
                      />
                      <span className={`text-sm font-medium ${
                        req.type === 'mandatory' ? 'text-red-700' : 'text-blue-700'
                      }`}>
                        {req.type === 'mandatory' ? 'Required' : 'Optional'}
                      </span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2">{req.description}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Accepted formats: {req.formats.join(', ')}
                    </p>
                    {req.examples && (
                      <p className="text-xs text-gray-500">
                        Examples: {req.examples.join(', ')}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {showEvidence && (
                <EvidenceUpload 
                  questionId={currentQuestion.id}
                  requirements={currentQuestion.evidenceRequirements}
                />
              )}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            currentQuestionIndex === 0
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <div className="text-sm text-gray-500">
          {currentAnswer ? 'Answer recorded' : 'Please select an answer'}
        </div>

        <button
          onClick={handleNext}
          disabled={!currentAnswer || currentQuestionIndex === totalQuestions - 1}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            currentAnswer && currentQuestionIndex < totalQuestions - 1
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>Next</span>
          <SafeIcon icon={FiArrowRight} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default AssessmentEngine;