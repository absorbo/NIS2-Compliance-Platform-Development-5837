import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/appStore';

const ComplianceChart = () => {
  const { assessmentAnswers } = useAppStore();
  const [data, setData] = useState([]);
  
  // Generate realistic compliance data based on actual assessment answers
  useEffect(() => {
    // Get all answers and sort by timestamp
    const answers = Object.values(assessmentAnswers)
      .filter(answer => answer.timestamp)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      
    if (answers.length === 0) {
      // If no assessment data yet, show sample placeholder data
      setData([
        { month: 'Jan', score: 0 },
        { month: 'Feb', score: 0 },
        { month: 'Mar', score: 0 },
        { month: 'Apr', score: 0 },
        { month: 'May', score: 0 },
        { month: 'Current', score: 0 }
      ]);
      return;
    }
    
    // Group answers by month
    const answersByMonth = {};
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    answers.forEach(answer => {
      const date = new Date(answer.timestamp);
      const monthKey = months[date.getMonth()];
      
      if (!answersByMonth[monthKey]) {
        answersByMonth[monthKey] = [];
      }
      
      answersByMonth[monthKey].push(answer);
    });
    
    // Calculate average score for each month
    const chartData = Object.entries(answersByMonth).map(([month, monthAnswers]) => {
      const totalScore = monthAnswers.reduce((sum, answer) => sum + (answer.score || 0), 0);
      const averageScore = Math.round(totalScore / monthAnswers.length);
      
      return {
        month,
        score: averageScore
      };
    });
    
    // Add current month if not already included
    const currentMonth = months[new Date().getMonth()];
    if (!chartData.some(item => item.month === currentMonth)) {
      // Calculate overall average score
      const totalScore = answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
      const overallScore = Math.round(totalScore / answers.length);
      
      chartData.push({
        month: 'Current',
        score: overallScore
      });
    }
    
    // Sort by month
    const monthOrder = {};
    months.forEach((month, index) => {
      monthOrder[month] = index;
    });
    
    chartData.sort((a, b) => {
      if (a.month === 'Current') return 1;
      if (b.month === 'Current') return -1;
      return monthOrder[a.month] - monthOrder[b.month];
    });
    
    setData(chartData);
  }, [assessmentAnswers]);
  
  // Calculate improvement if possible
  const calculateImprovement = () => {
    if (data.length < 2) return { total: 0, recent: 0 };
    
    const firstScore = data[0].score;
    const currentScore = data[data.length - 1].score;
    const totalImprovement = currentScore - firstScore;
    
    let recentImprovement = 0;
    if (data.length >= 3) {
      const previousScore = data[data.length - 2].score;
      recentImprovement = currentScore - previousScore;
    }
    
    return {
      total: totalImprovement,
      recent: recentImprovement
    };
  };
  
  const improvement = calculateImprovement();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Compliance Trend</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Compliance Score</span>
          </div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{improvement.total >= 0 ? '+' : ''}{improvement.total}%</div>
          <div className="text-sm text-gray-600">Total Change</div>
        </div>
        <div className="text-center">
          <div className={`text-2xl font-bold ${improvement.recent > 0 ? 'text-success-600' : improvement.recent < 0 ? 'text-danger-600' : 'text-gray-600'}`}>
            {improvement.recent > 0 ? '+' : ''}{improvement.recent}%
          </div>
          <div className="text-sm text-gray-600">Last Change</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-600">
            {data.length > 0 ? data[data.length - 1].score : 0}%
          </div>
          <div className="text-sm text-gray-600">Current Score</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ComplianceChart;