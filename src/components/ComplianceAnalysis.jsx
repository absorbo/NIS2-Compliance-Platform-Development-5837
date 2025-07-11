import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import { assessmentQuestions, questionCategories } from '../data/assessmentQuestions';
import { nis2Controls } from '../data/nis2Controls';

const { FiShield, FiAlertTriangle, FiCheckCircle, FiTrendingUp, FiTarget } = FiIcons;

const ComplianceAnalysis = () => {
  const { assessmentAnswers, selectedCountry } = useAppStore();

  const analysis = useMemo(() => {
    const answers = Object.values(assessmentAnswers);
    const totalQuestions = assessmentQuestions.length;
    const answeredQuestions = answers.length;
    
    if (answeredQuestions === 0) {
      return {
        overallScore: 0,
        categoryScores: {},
        maturityDistribution: {},
        completionRate: 0,
        criticalGaps: [],
        recommendations: []
      };
    }

    // Calculate overall score
    const totalScore = answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
    const overallScore = Math.round(totalScore / answeredQuestions);

    // Calculate category scores
    const categoryScores = {};
    questionCategories.forEach(category => {
      const categoryAnswers = answers.filter(answer => {
        const question = assessmentQuestions.find(q => q.id === answer.questionId);
        return question && category.questions.includes(question.id);
      });
      
      if (categoryAnswers.length > 0) {
        const categoryTotal = categoryAnswers.reduce((sum, answer) => sum + (answer.score || 0), 0);
        categoryScores[category.id] = Math.round(categoryTotal / categoryAnswers.length);
      } else {
        categoryScores[category.id] = 0;
      }
    });

    // Calculate maturity distribution
    const maturityDistribution = {};
    answers.forEach(answer => {
      const level = answer.maturityLevel || 'Initial';
      maturityDistribution[level] = (maturityDistribution[level] || 0) + 1;
    });

    // Identify critical gaps
    const criticalGaps = answers
      .filter(answer => answer.score < 50)
      .map(answer => {
        const question = assessmentQuestions.find(q => q.id === answer.questionId);
        return {
          questionId: answer.questionId,
          title: question?.title || 'Unknown',
          category: question?.category || 'Unknown',
          currentScore: answer.score,
          maturityLevel: answer.maturityLevel,
          controlId: question?.controlId
        };
      });

    // Generate recommendations
    const recommendations = generateRecommendations(categoryScores, criticalGaps);

    return {
      overallScore,
      categoryScores,
      maturityDistribution,
      completionRate: Math.round((answeredQuestions / totalQuestions) * 100),
      criticalGaps,
      recommendations
    };
  }, [assessmentAnswers]);

  const generateRecommendations = (categoryScores, criticalGaps) => {
    const recommendations = [];

    // Priority recommendations based on lowest scoring categories
    const sortedCategories = Object.entries(categoryScores)
      .sort(([,a], [,b]) => a - b)
      .slice(0, 3);

    sortedCategories.forEach(([categoryId, score]) => {
      const category = questionCategories.find(c => c.id === categoryId);
      if (category && score < 75) {
        recommendations.push({
          priority: score < 50 ? 'High' : 'Medium',
          category: category.name,
          title: `Improve ${category.name}`,
          description: `Current score: ${score}%. Focus on implementing comprehensive ${category.name.toLowerCase()} measures.`,
          effort: 'High',
          timeline: '3-6 months'
        });
      }
    });

    // Specific recommendations for critical gaps
    criticalGaps.forEach(gap => {
      const control = nis2Controls.find(c => c.id === gap.controlId);
      if (control) {
        recommendations.push({
          priority: 'Critical',
          category: gap.category,
          title: `Address ${gap.title}`,
          description: `Implement ${control.title} to meet NIS2 requirements.`,
          effort: 'Medium',
          timeline: '1-3 months'
        });
      }
    });

    return recommendations.slice(0, 10); // Limit to top 10 recommendations
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'danger';
  };

  const getMaturityColor = (level) => {
    switch (level) {
      case 'Optimized': return 'success';
      case 'Managed': return 'primary';
      case 'Defined': return 'warning';
      default: return 'danger';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Overall Compliance Score</h3>
          <SafeIcon icon={FiShield} className="w-6 h-6 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`text-4xl font-bold mb-2 ${
              getScoreColor(analysis.overallScore) === 'success' ? 'text-success-600' :
              getScoreColor(analysis.overallScore) === 'warning' ? 'text-warning-600' :
              'text-danger-600'
            }`}>
              {analysis.overallScore}%
            </div>
            <p className="text-sm text-gray-600">Overall Score</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">
              {analysis.completionRate}%
            </div>
            <p className="text-sm text-gray-600">Assessment Complete</p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl font-bold text-danger-600 mb-2">
              {analysis.criticalGaps.length}
            </div>
            <p className="text-sm text-gray-600">Critical Gaps</p>
          </div>
        </div>
      </motion.div>

      {/* Category Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Category Analysis</h3>
        
        <div className="space-y-4">
          {questionCategories.map((category) => {
            const score = analysis.categoryScores[category.id] || 0;
            const color = getScoreColor(score);
            
            return (
              <div key={category.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{category.name}</h4>
                    <span className="text-sm font-medium text-gray-600">{score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        color === 'success' ? 'bg-success-500' :
                        color === 'warning' ? 'bg-warning-500' :
                        'bg-danger-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Maturity Distribution */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Maturity Distribution</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Initial', 'Defined', 'Managed', 'Optimized'].map((level) => {
            const count = analysis.maturityDistribution[level] || 0;
            const color = getMaturityColor(level);
            
            return (
              <div key={level} className="text-center">
                <div className={`text-2xl font-bold mb-1 ${
                  color === 'success' ? 'text-success-600' :
                  color === 'primary' ? 'text-primary-600' :
                  color === 'warning' ? 'text-warning-600' :
                  'text-danger-600'
                }`}>
                  {count}
                </div>
                <div className="text-sm text-gray-600">{level}</div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Critical Gaps */}
      {analysis.criticalGaps.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Critical Gaps</h3>
          
          <div className="space-y-4">
            {analysis.criticalGaps.map((gap, index) => (
              <div key={gap.questionId} className="flex items-center space-x-4 p-4 border border-red-200 rounded-lg bg-red-50">
                <SafeIcon icon={FiAlertTriangle} className="w-5 h-5 text-red-600" />
                <div className="flex-1">
                  <h4 className="font-medium text-red-900">{gap.title}</h4>
                  <p className="text-sm text-red-700">{gap.category} • Current score: {gap.currentScore}%</p>
                </div>
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded">
                  {gap.controlId}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recommendations</h3>
        
        <div className="space-y-4">
          {analysis.recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium text-gray-900">{rec.title}</h4>
                  <p className="text-sm text-gray-600">{rec.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  rec.priority === 'Critical' ? 'bg-red-100 text-red-800' :
                  rec.priority === 'High' ? 'bg-orange-100 text-orange-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {rec.priority}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Effort: {rec.effort}</span>
                <span>Timeline: {rec.timeline}</span>
                <span>Category: {rec.category}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ComplianceAnalysis;