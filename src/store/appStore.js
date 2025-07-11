import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // Enhanced state management
      isOnboarded: false,
      companyProfile: null,
      selectedCountry: null,
      
      // Assessment state
      assessmentProgress: 0,
      assessmentAnswers: {},
      currentQuestionIndex: 0,
      evidenceFiles: {},
      
      // Compliance tracking
      complianceScore: 0,
      complianceGaps: [],
      controlCoverage: {
        covered: [],
        partial: [],
        uncovered: []
      },
      
      // Roadmap management
      roadmapItems: [],
      
      // UI state
      sidebarOpen: false,
      
      // Enhanced actions
      setCompanyProfile: (profile) => set({ companyProfile: profile }),
      
      updateCompanyProfile: (updates) => {
        const currentProfile = get().companyProfile || {};
        set({ companyProfile: { ...currentProfile, ...updates } });
      },
      
      setSelectedCountry: (country) => set({ selectedCountry: country }),
      
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      
      setAssessmentProgress: (progress) => set({ assessmentProgress: progress }),
      
      setComplianceScore: (score) => set({ complianceScore: score }),
      
      setComplianceGaps: (gaps) => set({ complianceGaps: gaps }),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      // Assessment handling
      updateAssessmentAnswer: (questionId, answer) => {
        const currentAnswers = get().assessmentAnswers;
        
        // Update answers
        set({ 
          assessmentAnswers: { 
            ...currentAnswers, 
            [questionId]: answer 
          }
        });
        
        // Calculate progress
        const totalQuestions = get().totalQuestions || 1;
        const answeredQuestions = Object.keys(get().assessmentAnswers).length;
        const progress = Math.round((answeredQuestions / totalQuestions) * 100);
        
        set({ assessmentProgress: progress });
        
        // Calculate compliance score
        get().calculateComplianceScore();
      },
      
      // Calculate compliance score based on answers
      calculateComplianceScore: () => {
        const answers = Object.values(get().assessmentAnswers);
        
        if (answers.length === 0) {
          set({ complianceScore: 0 });
          return;
        }
        
        // Calculate average score
        const totalScore = answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
        const averageScore = Math.round(totalScore / answers.length);
        
        set({ complianceScore: averageScore });
        
        // Identify gaps
        const gaps = answers
          .filter(answer => answer.score < 50)
          .map(answer => ({
            questionId: answer.questionId,
            score: answer.score,
            maturityLevel: answer.maturityLevel
          }));
        
        set({ complianceGaps: gaps });
      },
      
      // Roadmap management
      updateRoadmapItem: (itemId, updates) => {
        const currentItems = get().roadmapItems;
        set({
          roadmapItems: currentItems.map(item => 
            item.id === itemId ? { ...item, ...updates } : item
          )
        });
      },
      
      // Onboarding
      completeOnboarding: (profile, country) => {
        set({
          isOnboarded: true,
          companyProfile: profile,
          selectedCountry: country
        });
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