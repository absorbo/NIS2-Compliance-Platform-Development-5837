import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAppStore } from '../store/appStore';

const { FiUpload, FiFile, FiCheck, FiX, FiAlertCircle } = FiIcons;

const EvidenceUpload = ({ questionId, requirements }) => {
  const { assessmentAnswers, updateAssessmentAnswer } = useAppStore();
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});

  const currentAnswer = assessmentAnswers[questionId];
  const uploadedFiles = currentAnswer?.evidence || [];

  const validateFile = (file, requirement) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedFormats = requirement.formats;
    const fileExtension = file.name.split('.').pop().toLowerCase();

    if (file.size > maxSize) {
      return { valid: false, error: 'File size exceeds 10MB limit' };
    }

    if (!allowedFormats.includes(fileExtension)) {
      return { valid: false, error: `File format not supported. Allowed: ${allowedFormats.join(', ')}` };
    }

    return { valid: true };
  };

  const handleFileUpload = async (files, requirementIndex) => {
    const requirement = requirements[requirementIndex];
    const newFiles = [];

    for (const file of files) {
      const validation = validateFile(file, requirement);
      
      if (validation.valid) {
        // In a real application, you would upload to a server here
        // For now, we'll simulate the upload
        setUploadStatus(prev => ({ ...prev, [file.name]: 'uploading' }));
        
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const fileData = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          requirementIndex,
          requirementType: requirement.type,
          uploadDate: new Date().toISOString(),
          status: 'uploaded'
        };

        newFiles.push(fileData);
        setUploadStatus(prev => ({ ...prev, [file.name]: 'success' }));
      } else {
        setUploadStatus(prev => ({ ...prev, [file.name]: 'error' }));
        console.error(`File ${file.name}: ${validation.error}`);
      }
    }

    if (newFiles.length > 0) {
      const updatedEvidence = [...uploadedFiles, ...newFiles];
      updateAssessmentAnswer(questionId, {
        ...currentAnswer,
        evidence: updatedEvidence
      });
    }
  };

  const handleDrop = (e, requirementIndex) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files, requirementIndex);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeFile = (fileId) => {
    const updatedEvidence = uploadedFiles.filter(file => file.id !== fileId);
    updateAssessmentAnswer(questionId, {
      ...currentAnswer,
      evidence: updatedEvidence
    });
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'pdf':
        return FiFile;
      case 'doc':
      case 'docx':
        return FiFile;
      case 'xls':
      case 'xlsx':
        return FiFile;
      default:
        return FiFile;
    }
  };

  return (
    <div className="space-y-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Upload Evidence</h4>
      
      {requirements.map((requirement, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <SafeIcon 
              icon={requirement.type === 'mandatory' ? FiAlertCircle : FiCheck} 
              className={`w-4 h-4 ${requirement.type === 'mandatory' ? 'text-red-500' : 'text-green-500'}`}
            />
            <h5 className="font-medium text-gray-900">{requirement.description}</h5>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">
            Accepted formats: {requirement.formats.join(', ')}
          </p>

          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive 
                ? 'border-primary-400 bg-primary-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={(e) => handleDrop(e, index)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <SafeIcon icon={FiUpload} className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop files here, or{' '}
              <label className="text-primary-600 hover:text-primary-700 cursor-pointer">
                browse
                <input
                  type="file"
                  multiple
                  accept={requirement.formats.map(f => `.${f}`).join(',')}
                  onChange={(e) => handleFileUpload(Array.from(e.target.files), index)}
                  className="hidden"
                />
              </label>
            </p>
            <p className="text-xs text-gray-500">
              Maximum file size: 10MB
            </p>
          </div>

          {/* Uploaded Files for this Requirement */}
          {uploadedFiles.filter(file => file.requirementIndex === index).length > 0 && (
            <div className="mt-4">
              <h6 className="text-sm font-medium text-gray-900 mb-2">Uploaded Files</h6>
              <div className="space-y-2">
                {uploadedFiles
                  .filter(file => file.requirementIndex === index)
                  .map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <SafeIcon 
                          icon={getFileIcon(file.name)} 
                          className="w-5 h-5 text-gray-500" 
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {Math.round(file.size / 1024)} KB • {new Date(file.uploadDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <SafeIcon icon={FiCheck} className="w-4 h-4 text-green-500" />
                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <SafeIcon icon={FiX} className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Upload Summary */}
      {uploadedFiles.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600" />
            <h5 className="font-medium text-green-900">Evidence Summary</h5>
          </div>
          <p className="text-sm text-green-800 mt-1">
            {uploadedFiles.length} file{uploadedFiles.length !== 1 ? 's' : ''} uploaded successfully
          </p>
        </div>
      )}
    </div>
  );
};

export default EvidenceUpload;