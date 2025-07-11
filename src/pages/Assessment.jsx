import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import { assessmentQuestions } from '../data/assessmentData';
import AssessmentQuestion from '../components/AssessmentQuestion';
import AssessmentProgress from '../components/AssessmentProgress';

const { FiCheckCircle, FiArrowRight, FiArrowLeft, FiUpload } = FiIcons;

const Assessment = () => {
  const { 
    currentQuestionIndex, 
    setCurrentQuestionIndex, 
    assessmentAnswers, 
    assessmentProgress,
    setAssessmentProgress 
  } = useAppStore();

  const [showResults, setShowResults] = useState(false);
  const currentQuestion = assessmentQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessmentQuestions.length - 1;
  const totalQuestions = assessmentQuestions.length;

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResults(true);
      setAssessmentProgress(100);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAssessmentProgress(((currentQuestionIndex + 2) / totalQuestions) * 100);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAssessmentProgress(((currentQuestionIndex) / totalQuestions) * 100);
    }
  };

  const hasAnswer = assessmentAnswers[currentQuestion?.id];

  if (showResults) {
    return <AssessmentResults />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            NIS2 Compliance Assessment
          </h1>
          <p className="text-gray-600">
            Answer business-focused questions to evaluate your organization's compliance posture
          </p>
        </motion.div>
      </div>

      {/* Progress */}
      <AssessmentProgress 
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={totalQuestions}
        progress={assessmentProgress}
      />

      {/* Question Card */}
      <motion.div
        className="bg-white rounded-xl shadow-sm p-8 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AssessmentQuestion question={currentQuestion} />
          </motion.div>
        </AnimatePresence>
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
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>

        <button
          onClick={handleNext}
          disabled={!hasAnswer}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all ${
            hasAnswer
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>{isLastQuestion ? 'Complete Assessment' : 'Next'}</span>
          <SafeIcon icon={isLastQuestion ? FiCheckCircle : FiArrowRight} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const AssessmentResults = () => {
  const { assessmentAnswers, setComplianceScore, setComplianceGaps } = useAppStore();

  // Simulate AI analysis
  const analysisResults = {
    overallScore: 72,
    gaps: [
      { area: 'Incident Response', severity: 'high', description: 'Missing formal incident response procedures' },
      { area: 'Risk Management', severity: 'medium', description: 'Risk assessment process needs improvement' },
      { area: 'Supply Chain Security', severity: 'low', description: 'Vendor security assessments could be enhanced' }
    ]
  };

  React.useEffect(() => {
    setComplianceScore(analysisResults.overallScore);
    setComplianceGaps(analysisResults.gaps);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SafeIcon icon={FiCheckCircle} className="w-10 h-10 text-success-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Assessment Complete!
        </h1>
        <p className="text-gray-600">
          Your AI-powered compliance analysis is ready
        </p>
      </motion.div>

      {/* Results Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Compliance Score</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {analysisResults.overallScore}%
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${analysisResults.overallScore}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Good progress towards compliance</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Identified Gaps</h3>
          <div className="space-y-3">
            {analysisResults.gaps.map((gap, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{gap.area}</p>
                  <p className="text-sm text-gray-600">{gap.description}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  gap.severity === 'high' ? 'bg-danger-100 text-danger-800' :
                  gap.severity === 'medium' ? 'bg-warning-100 text-warning-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {gap.severity}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <button className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors">
          Generate Compliance Roadmap
        </button>
      </motion.div>
    </div>
  );
};

export default Assessment;