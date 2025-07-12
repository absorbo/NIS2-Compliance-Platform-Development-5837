import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import { useAppStore } from '../store/appStore';
import { getSupabase } from '../lib/supabase';
import { entityClassification } from '../data/entityClassification';
import { euCountries } from '../data/constants';
import EntityClassificationTool from '../components/EntityClassificationTool';

const { FiSettings, FiUser, FiShield, FiSave, FiRefreshCw, FiTrash2, FiAlertTriangle, FiCheckCircle, FiLock } = FiIcons;

export default function Settings() {
  const { 
    user, 
    companyProfile, 
    setCompanyProfile, 
    resetAssessment, 
    assessmentAnswers,
    logout 
  } = useAppStore();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    companyName: companyProfile?.companyName || '',
    industry: companyProfile?.industry || '',
    country: companyProfile?.country || '',
    size: companyProfile?.size || '',
    entityType: companyProfile?.entityType || '',
    firstName: user?.user_metadata?.first_name || '',
    lastName: user?.user_metadata?.last_name || '',
    email: user?.email || '',
    jobTitle: user?.user_metadata?.job_title || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: FiUser },
    { id: 'entity', label: 'Entity Classification', icon: FiShield },
    { id: 'assessment', label: 'Assessment Management', icon: FiSettings },
    { id: 'security', label: 'Security Settings', icon: FiLock },
  ];

  useEffect(() => {
    if (user && companyProfile) {
      setFormData({
        companyName: companyProfile.companyName || '',
        industry: companyProfile.industry || '',
        country: companyProfile.country || '',
        size: companyProfile.size || '',
        entityType: companyProfile.entityType || '',
        firstName: user.user_metadata?.first_name || '',
        lastName: user.user_metadata?.last_name || '',
        email: user.email || '',
        jobTitle: user.user_metadata?.job_title || '',
      });
    }
  }, [user, companyProfile]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      const supabase = getSupabase();

      // Update user metadata
      const { error: userError } = await supabase.auth.updateUser({
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          job_title: formData.jobTitle,
        }
      });

      if (userError) throw userError;

      // Update company profile in store
      const updatedProfile = {
        companyName: formData.companyName,
        industry: formData.industry,
        country: formData.country,
        size: formData.size,
        entityType: formData.entityType,
      };

      setCompanyProfile(updatedProfile);
      showMessage('success', 'Profile updated successfully');
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showMessage('error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const supabase = getSupabase();
      
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      showMessage('success', 'Password updated successfully');
    } catch (error) {
      showMessage('error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetSpecificQuestion = async (questionId) => {
    if (!window.confirm(`Are you sure you want to reset the answer for this question? This cannot be undone.`)) {
      return;
    }

    try {
      const supabase = getSupabase();
      
      // Remove from Supabase if user is logged in
      if (user) {
        const { error } = await supabase
          .from('assessment_answers')
          .delete()
          .eq('user_id', user.id)
          .eq('question_id', questionId);

        if (error) throw error;
      }

      // Remove from local store
      const currentAnswers = { ...assessmentAnswers };
      delete currentAnswers[questionId];
      
      // Update store (you'll need to add this method to your store)
      useAppStore.getState().setAssessmentAnswers(currentAnswers);

      showMessage('success', 'Question reset successfully');
    } catch (error) {
      showMessage('error', 'Failed to reset question: ' + error.message);
    }
  };

  const handleResetAllAssessment = async () => {
    if (!window.confirm('Are you sure you want to reset your entire assessment? This will delete all your answers and cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      await resetAssessment();
      showMessage('success', 'Assessment reset successfully');
    } catch (error) {
      showMessage('error', 'Failed to reset assessment: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmText = 'DELETE';
    const userInput = window.prompt(
      `This will permanently delete your account and all data. This action cannot be undone.\n\nType "${confirmText}" to confirm:`
    );

    if (userInput !== confirmText) {
      return;
    }

    try {
      setLoading(true);
      const supabase = getSupabase();

      // Delete user data first
      const { error: dataError } = await supabase
        .from('assessment_answers')
        .delete()
        .eq('user_id', user.id);

      if (dataError) console.warn('Error deleting assessment data:', dataError);

      // Sign out and clear local data
      await logout();
      showMessage('success', 'Account deleted successfully');
    } catch (error) {
      showMessage('error', 'Failed to delete account: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const answeredQuestions = Object.keys(assessmentAnswers);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">
          Manage your account, assessment, and compliance settings
        </p>
      </motion.div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select country</option>
                      {euCountries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry
                    </label>
                    <select
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select industry</option>
                      {[...entityClassification.sectors.essential, ...entityClassification.sectors.important].map((sector) => (
                        <option key={sector.name} value={sector.name}>
                          {sector.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Entity Type
                    </label>
                    <input
                      type="text"
                      value={formData.entityType}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                      placeholder="Determined by classification tool"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-75"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </motion.div>
          )}

          {/* Entity Classification */}
          {activeTab === 'entity' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <EntityClassificationTool />
            </motion.div>
          )}

          {/* Assessment Management */}
          {activeTab === 'assessment' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Assessment Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{answeredQuestions.length}</div>
                    <div className="text-sm text-blue-800">Questions Answered</div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {Math.round((answeredQuestions.length / 15) * 100)}%
                    </div>
                    <div className="text-sm text-green-800">Completion Rate</div>
                  </div>
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">
                      {Object.values(assessmentAnswers).filter(a => a.evidence?.length > 0).length}
                    </div>
                    <div className="text-sm text-purple-800">With Evidence</div>
                  </div>
                </div>
              </div>

              {/* Individual Question Management */}
              {answeredQuestions.length > 0 && (
                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">Individual Question Management</h4>
                  <div className="space-y-3">
                    {answeredQuestions.map((questionId) => {
                      const answer = assessmentAnswers[questionId];
                      return (
                        <div key={questionId} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">{questionId}</div>
                            <div className="text-sm text-gray-600">
                              Answer: {answer.answer} • Score: {answer.score}
                              {answer.evidence?.length > 0 && ` • ${answer.evidence.length} evidence files`}
                            </div>
                          </div>
                          <button
                            onClick={() => handleResetSpecificQuestion(questionId)}
                            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 rounded"
                          >
                            Reset
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Assessment Actions */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h4 className="text-md font-medium text-gray-900 mb-4">Assessment Actions</h4>
                <div className="space-y-4">
                  <button
                    onClick={handleResetAllAssessment}
                    disabled={loading}
                    className="flex items-center space-x-2 px-4 py-2 border border-warning-300 text-warning-600 rounded-lg hover:bg-warning-50 transition-colors w-full disabled:opacity-75"
                  >
                    <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                    <span>Reset Entire Assessment</span>
                  </button>
                  
                  <div className="text-sm text-gray-600">
                    This will delete all your assessment answers and evidence. This action cannot be undone.
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <button
                    onClick={handleChangePassword}
                    disabled={loading || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-75"
                  >
                    <SafeIcon icon={FiLock} className="w-4 h-4" />
                    <span>Update Password</span>
                  </button>
                </div>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <h4 className="text-md font-medium text-red-900 mb-4 flex items-center space-x-2">
                  <SafeIcon icon={FiAlertTriangle} className="w-5 h-5" />
                  <span>Danger Zone</span>
                </h4>
                <div className="space-y-4">
                  <p className="text-sm text-red-800">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-75"
                  >
                    <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                    <span>Delete Account</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-lg border ${
                message.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <div className="flex items-center space-x-2">
                <SafeIcon 
                  icon={message.type === 'success' ? FiCheckCircle : FiAlertTriangle} 
                  className="w-5 h-5" 
                />
                <span>{message.text}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}