import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: number;
}

export interface CollectedData {
  businessName: string;
  pan: string;
  gst: string | null;
  address: string;
  businessType: 'proprietorship' | 'partnership' | 'company' | null;
  consentGiven: boolean;
  selectedProducts: string[];
}

export interface OnboardingStore {
  sessionId: string;
  stepIndex: number; // 0 to 6
  language: string;
  collectedData: CollectedData;
  messages: ChatMessage[];
  pendingOnboarding: boolean;
  isOffline: boolean;
  accountTier: 'none' | 'limited' | 'full' | 'manual_review';
  setMessage: (message: ChatMessage) => void;
  updateCollectedData: (data: Partial<CollectedData>) => void;
  setStepIndex: (index: number) => void;
  setLanguage: (lang: string) => void;
  setPendingOnboarding: (pending: boolean) => void;
  setOffline: (offline: boolean) => void;
  setAccountTier: (tier: 'none' | 'limited' | 'full' | 'manual_review') => void;
  resumeState: () => void;
  clearState: () => void;
}

const initialData: CollectedData = {
  businessName: '',
  pan: '',
  gst: null,
  address: '',
  businessType: null,
  consentGiven: false,
  selectedProducts: ['current_account'],
};

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      sessionId: Math.random().toString(36).substring(7),
      stepIndex: 0,
      language: 'English',
      collectedData: initialData,
      messages: [],
      pendingOnboarding: false,
      isOffline: false,
      accountTier: 'none',

      setMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
      updateCollectedData: (data) => set((state) => ({ collectedData: { ...state.collectedData, ...data } })),
      setStepIndex: (index) => set({ stepIndex: index }),
      setLanguage: (lang) => set({ language: lang }),
      setPendingOnboarding: (pending) => set({ pendingOnboarding: pending }),
      setOffline: (offline) => set({ isOffline: offline }),
      setAccountTier: (tier) => set({ accountTier: tier }),
      
      resumeState: () => set({ pendingOnboarding: true }),
      clearState: () => set({
        sessionId: Math.random().toString(36).substring(7),
        stepIndex: 0,
        collectedData: initialData,
        messages: [],
        pendingOnboarding: false,
      })
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
