import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';
import supabase from '../lib/supabase';
import { entityClassification } from '../data/entityClassification';
import EntityClassificationTool from '../components/EntityClassificationTool';

const { FiSettings, FiUser, FiShield, FiSave, FiRefreshCw, FiTrash2 } = FiIcons;

export default function Settings() {
  const { user, companyProfile, setCompanyProfile, resetAssessment } = useAppStore();
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
  });

  const tabs = [
    { id: 'profile', label: 'Profile Settings', icon: FiUser },
    { id: 'entity', label: 'Entity Classification', icon: FiShield },
    { id: 'assessment', label: 'Assessment Settings', icon: FiSettings },
  ];

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      // Update user metadata
      const { error: userError } = await supabase.auth.updateUser({
        data: {
          first_name: formData.firstName,
          last_name: formData.lastName,
        }
      });

      if (userError) throw userError;

      // Update company profile
      const { error: profileError } = await supabase
        .from('company_profiles')
        .upsert({
          user_id: user.id,
          company_name: formData.companyName,
          industry: formData.industry,
          country: formData.country,
          size: formData.size,
          entity_type: formData.entityType,
        });

      if (profileError) throw profileError;

      setCompanyProfile(formData);
      setMessage({ type: 'success', text: 'Settings updated successfully' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleResetAssessment = async () => {
    if (window.confirm('Are you sure you want to reset your assessment? This cannot be undone.')) {
      try {
        // Reset assessment in Supabase
        const { error } = await supabase
          .from('assessment_answers')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;

        // Reset local state
        resetAssessment();
        setMessage({ type: 'success', text: 'Assessment reset successfully' });
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to reset assessment: ' + error.message });
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Delete user data from Supabase
        const { error: dataError } = await supabase
          .from('users')
          .delete()
          .eq('id', user.id);

        if (dataError) throw dataError;

        // Delete auth user
        const { error: authError } = await supabase.auth.admin.deleteUser(user.id);
        if (authError) throw authError;

        // Sign out
        await supabase.auth.signOut();
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to delete account: ' + error.message });
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
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
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
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
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          )}

          {activeTab === 'entity' && <EntityClassificationTool />}

          {activeTab === 'assessment' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Assessment Management
                </h3>
                <div className="space-y-4">
                  <button
                    onClick={handleResetAssessment}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors w-full"
                  >
                    <SafeIcon icon={FiRefreshCw} className="w-4 h-4 text-warning-500" />
                    <span>Reset Assessment</span>
                  </button>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <button
                      onClick={handleDeleteAccount}
                      className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors w-full"
                    >
                      <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {message && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                message.type === 'success'
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}