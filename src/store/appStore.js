import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getSupabase } from '../lib/supabase';

export const useAppStore = create(
  persist(
    (set, get) => ({
      // ... other state remains the same ...

      updateAssessmentAnswer: async (questionId, answer) => {
        const currentAnswers = get().assessmentAnswers;
        const user = get().user;

        // Update local state
        set({ assessmentAnswers: { ...currentAnswers, [questionId]: answer } });

        // Calculate progress
        const totalQuestions = get().totalQuestions || 1;
        const answeredQuestions = Object.keys(get().assessmentAnswers).length;
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
          }
        }
      },

      logout: async () => {
        const supabase = getSupabase();
        await supabase.auth.signOut();
        set({
          user: null,
          companyProfile: null,
          assessmentAnswers: {},
          assessmentProgress: 0,
          currentQuestionIndex: 0,
          complianceScore: 0,
          complianceGaps: [],
          roadmapItems: []
        });
      }

      // ... rest of the store remains the same ...
    }),
    {
      name: 'nis2-grc-storage',
      partialize: (state) => ({
        companyProfile: state.companyProfile,
        assessmentAnswers: state.assessmentAnswers,
        roadmapItems: state.roadmapItems,
        evidenceFiles: state.evidenceFiles
      })
    }
  )
);