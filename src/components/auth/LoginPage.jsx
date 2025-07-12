import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { getSupabase } from '../../lib/supabase';
import { useAppStore } from '../../store/appStore';

const { FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff, FiShield } = FiIcons;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    companyName: '',
    jobTitle: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const { setUser } = useAppStore();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });

      if (error) throw error;

      setUser(data.user);
      setMessage({ type: 'success', text: 'Login successful!' });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            company_name: formData.companyName,
            job_title: formData.jobTitle
          }
        }
      });

      if (error) throw error;

      if (data.user && !data.session) {
        setMessage({ 
          type: 'success', 
          text: 'Account created! Please check your email to verify your account.' 
        });
      } else if (data.session) {
        setUser(data.user);
        setMessage({ type: 'success', text: 'Account created and logged in successfully!' });
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.resetPasswordForEmail(formData.email);

      if (error) throw error;

      setMessage({ 
        type: 'success', 
        text: 'Password reset email sent! Check your inbox.' 
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8"
      >
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <SafeIcon icon={FiShield} className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            NIS2 GRC Platform
          </h1>
          <p className="text-gray-600">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {/* Toggle between Login/Signup */}
        <div className="flex mb-6">
          <button
            onClick={() => {
              setIsLogin(true);
              setError(null);
              setMessage(null);
            }}
            className={`flex-1 py-2 px-4 text-center rounded-l-lg transition-colors ${
              isLogin 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              setError(null);
              setMessage(null);
            }}
            className={`flex-1 py-2 px-4 text-center rounded-r-lg transition-colors ${
              !isLogin 
                ? 'bg-primary-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={isLogin ? handleLogin : handleSignup} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required={!isLogin}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required={!isLogin}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required={!isLogin}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job title *
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required={!isLogin}
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address *
            </label>
            <div className="relative">
              <SafeIcon icon={FiMail} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <div className="relative">
              <SafeIcon icon={FiLock} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm password *
              </label>
              <div className="relative">
                <SafeIcon icon={FiLock} className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required={!isLogin}
                />
              </div>
            </div>
          )}

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-600 mt-0.5" />
                <span className="text-sm text-red-800">{error}</span>
              </div>
            </div>
          )}

          {message && (
            <div className={`border rounded-lg p-4 ${
              message.type === 'success' 
                ? 'bg-green-50 border-green-200' 
                : 'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-start space-x-2">
                <SafeIcon 
                  icon={FiAlertCircle} 
                  className={`w-5 h-5 mt-0.5 ${
                    message.type === 'success' ? 'text-green-600' : 'text-blue-600'
                  }`} 
                />
                <span className={`text-sm ${
                  message.type === 'success' ? 'text-green-800' : 'text-blue-800'
                }`}>
                  {message.text}
                </span>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-medium transition-colors ${
              loading ? 'opacity-75 cursor-not-allowed' : 'hover:bg-primary-700'
            }`}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </button>

          {/* Forgot Password */}
          {isLogin && (
            <div className="text-center">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                Forgot your password?
              </button>
            </div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;