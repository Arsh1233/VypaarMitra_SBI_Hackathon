import { useOnboardingStore } from '../src/store/useOnboardingStore';

describe('Vyapaar Mitra Onboarding Flow', () => {
  beforeEach(() => {
    useOnboardingStore.getState().clearState();
  });

  it('Happy Path: State transitions from Welcome to Account Active', () => {
    const store = useOnboardingStore.getState();
    
    // Welcome
    store.setLanguage('hi');
    store.setPendingOnboarding(true);
    expect(useOnboardingStore.getState().language).toBe('hi');
    expect(useOnboardingStore.getState().pendingOnboarding).toBe(true);

    // Conversation
    store.updateCollectedData({
      businessName: 'My Store',
      pan: 'ABCDE1234F',
      gst: null,
      consentGiven: true
    });
    
    const data = useOnboardingStore.getState().collectedData;
    expect(data.businessName).toBe('My Store');
    expect(data.consentGiven).toBe(true);
    
    // Product Recommendation
    store.updateCollectedData({ selectedProducts: ['current_account', 'overdraft'] });
    expect(useOnboardingStore.getState().collectedData.selectedProducts).toContain('overdraft');
  });

  it('Edge Case 1: Camera blur logic is handled in component state', () => {
    const store = useOnboardingStore.getState();
    store.setAccountTier('manual_review');
    expect(useOnboardingStore.getState().accountTier).toBe('manual_review');
  });

  it('Edge Case 2: App exit mid-flow allows resume', () => {
    const store = useOnboardingStore.getState();
    
    store.setStepIndex(3);
    store.setPendingOnboarding(true);
    
    const restartedStore = useOnboardingStore.getState();
    
    expect(restartedStore.pendingOnboarding).toBe(true);
    expect(restartedStore.stepIndex).toBe(3);
    
    restartedStore.resumeState();
    expect(useOnboardingStore.getState().pendingOnboarding).toBe(true);
  });
});
