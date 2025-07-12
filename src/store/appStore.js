import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSupabase } from '../lib/supabase';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // User and authentication
      user: null,
      isOnboarded: false,
      
      // Company profile and classification
      companyProfile: null,
      selectedCountry: null,
      
      // Assessment state
      assessmentAnswers: {},
      currentQuestionIndex: 0,
      assessmentProgress: 0,
      totalQuestions: 15,
      evidenceFiles: {},
      
      // Compliance metrics
      complianceScore: 0,
      complianceGaps: [],
      
      // Roadmap
      roadmapItems: [],
      
      // UI state
      sidebarOpen: false,
      
      // Actions
      setUser: (user) => set({ user }),
      
      setCompanyProfile: (profile) => set({ companyProfile: profile }),
      
      setSelectedCountry: (country) => set({ selectedCountry: country }),
      
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
      
      setAssessmentAnswers: (answers) => {
        set({ assessmentAnswers: answers });
        // Recalculate progress and compliance score
        const totalQuestions = get().totalQuestions;
        const answeredQuestions = Object.keys(answers).length;
        const progress = Math.round((answeredQuestions / totalQuestions) * 100);
        set({ assessmentProgress: progress });
        get().calculateComplianceScore();
      },
      
      updateAssessmentAnswer: async (questionId, answer) => {
        const currentAnswers = get().assessmentAnswers;
        const user = get().user;

        // Update local state
        const newAnswers = { ...currentAnswers, [questionId]: answer };
        set({ assessmentAnswers: newAnswers });

        // Calculate progress
        const totalQuestions = get().totalQuestions;
        const answeredQuestions = Object.keys(newAnswers).length;
        const progress = Math.round((answeredQuestions / totalQuestions) * 100);
        set({ assessmentProgress: progress });

        // Save to Supabase if user is logged in
        if (user) {
          try {
            const supabase = getSupabase();
            await supabase
              .from('assessment_answers')
              .upsert({
                user_id: user.id,
                question_id: questionId,
                answer: answer,
                updated_at: new Date().toISOString()
              });
          } catch (error) {
            console.error('Failed to save answer:', error);
          }
        }

        // Calculate compliance score
        get().calculateComplianceScore();
      },

      calculateComplianceScore: () => {
        const answers = Object.values(get().assessmentAnswers);
        if (answers.length === 0) {
          set({ complianceScore: 0 });
          return;
        }

        const totalScore = answers.reduce((sum, answer) => sum + (answer.score || 0), 0);
        const averageScore = Math.round(totalScore / answers.length);
        set({ complianceScore: averageScore });
      },

      resetAssessment: async () => {
        const user = get().user;

        // Reset local state
        set({
          assessmentAnswers: {},
          assessmentProgress: 0,
          currentQuestionIndex: 0,
          complianceScore: 0,
          complianceGaps: [],
          evidenceFiles: {}
        });

        // Clear data from Supabase if user is logged in
        if (user) {
          try {
            const supabase = getSupabase();
            await supabase
              .from('assessment_answers')
              .delete()
              .eq('user_id', user.id);
          } catch (error) {
            console.error('Failed to reset assessment:', error);
            throw error;
          }
        }
      },

      updateRoadmapItem: (itemId, updates) => {
        const items = get().roadmapItems;
        const updatedItems = items.map(item => 
          item.id === itemId ? { ...item, ...updates } : item
        );
        set({ roadmapItems: updatedItems });
      },

      completeOnboarding: (profileData, country) => {
        set({
          isOnboarded: true,
          companyProfile: profileData,
          selectedCountry: country
        });
      },

      logout: async () => {
        try {
          const supabase = getSupabase();
          await supabase.auth.signOut();
        } catch (error) {
          console.error('Logout error:', error);
        }

        // Clear all user data
        set({
          user: null,
          isOnboarded: false,
          companyProfile: null,
          assessmentAnswers: {},
          assessmentProgress: 0,
          currentQuestionIndex: 0,
          complianceScore: 0,
          complianceGaps: [],
          roadmapItems: [],
          evidenceFiles: {}
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