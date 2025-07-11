import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Enhanced state management
      isOnboarded: false,
      companyProfile: null,
      selectedCountry: null,
      
      // Assessment state with AI integration
      assessmentProgress: 0,
      assessmentAnswers: {},
      currentQuestionIndex: 0,
      evidenceFiles: {},
      aiAnalysis: {
        overallScore: 0,
        confidenceLevel: 0,
        recommendations: [],
        evidenceValidation: {}
      },

      // Enhanced compliance tracking
      complianceScore: 72,
      complianceGaps: [],
      controlCoverage: {
        covered: [],
        partial: [],
        uncovered: []
      },
      
      // Roadmap management
      roadmapItems: [],
      assignedTasks: {},
      taskProgress: {},
      
      // UI state
      sidebarOpen: false,
      
      // Enhanced actions
      setCompanyProfile: (profile) => set({ companyProfile: profile }),
      setSelectedCountry: (country) => set({ selectedCountry: country }),
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      setAssessmentProgress: (progress) => set({ assessmentProgress: progress }),
      setComplianceScore: (score) => set({ complianceScore: score }),
      setComplianceGaps: (gaps) => set({ complianceGaps: gaps }),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      // AI-powered assessment handling
      updateAssessmentAnswer: (questionId, answer) => {
        const currentAnswers = get().assessmentAnswers;
        
        // Update answers
        set({
          assessmentAnswers: { ...currentAnswers, [questionId]: answer }
        });
        
        // Trigger AI analysis
        get().analyzeCompliance();
      },
      
      // AI compliance analysis
      analyzeCompliance: async () => {
        const answers = get().assessmentAnswers;
        
        // Simulate AI analysis for now
        // In production, this would call the AI service
        const analysis = {
          overallScore: 72,
          confidenceLevel: 0.85,
          recommendations: [
            {
              control: 'NIS2-3.1',
              priority: 'high',
              action: 'Implement formal incident response procedures',
              effort: '40 hours'
            }
          ],
          evidenceValidation: {
            // Evidence validation results
          }
        };
        
        set({ aiAnalysis: analysis });
        get().updateComplianceScore(analysis);
      },
      
      updateComplianceScore: (analysis) => {
        set({ complianceScore: analysis.overallScore });
      },
      
      // Enhanced roadmap management
      updateRoadmapItem: (itemId, updates) => {
        const currentItems = get().roadmapItems;
        set({
          roadmapItems: currentItems.map(item =>
            item.id === itemId ? { ...item, ...updates } : item
          )
        });
      },
      
      assignTask: (taskId, userId) => {
        const currentAssignments = get().assignedTasks;
        set({
          assignedTasks: { ...currentAssignments, [taskId]: userId }
        });
      },
      
      updateTaskProgress: (taskId, progress) => {
        const currentProgress = get().taskProgress;
        set({
          taskProgress: { ...currentProgress, [taskId]: progress }
        });
      },
      
      // Enhanced onboarding
      completeOnboarding: (profile, country) => {
        set({
          isOnboarded: true,
          companyProfile: profile,
          selectedCountry: country
        });
        // Initialize country-specific requirements
        get().loadCountryRequirements(country);
      },
      
      // Country-specific requirement loading
      loadCountryRequirements: (countryCode) => {
        // This would load specific national transposition requirements
        // For now, we'll focus on Belgium
        if (countryCode === 'BE') {
          // Load Belgian CyFun requirements
          console.log('Loading Belgian CyFun requirements...');
        }
      }
    }),
    {
      name: 'nis2-grc-storage',
      partialize: (state) => ({
        isOnboarded: state.isOnboarded,
        companyProfile: state.companyProfile,
        selectedCountry: state.selectedCountry,
        assessmentAnswers: state.assessmentAnswers,
        roadmapItems: state.roadmapItems,
        evidenceFiles: state.evidenceFiles
      })
    }
  )
);