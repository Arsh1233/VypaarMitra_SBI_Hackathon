import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { ConversationScreen } from '../screens/ConversationScreen';
import { DocumentUploadScreen } from '../screens/DocumentUploadScreen';
import { VerificationProgressScreen } from '../screens/VerificationProgressScreen';
import { ProductRecommendationScreen } from '../screens/ProductRecommendationScreen';
import { AccountActiveScreen } from '../screens/AccountActiveScreen';
import { VideoKYCScreen } from '../screens/VideoKYCScreen';
import { ManualReviewScreen } from '../screens/ManualReviewScreen';
import { ResumeOnboardingScreen } from '../screens/ResumeOnboardingScreen';
import { TabNavigator } from './TabNavigator';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Conversation: { language?: string };
  DocumentUpload: undefined;
  VerificationProgress: undefined;
  ProductRecommendation: undefined;
  AccountActive: undefined;
  VideoKYC: undefined;
  ManualReview: undefined;
  ResumeOnboarding: undefined;
  MainTabs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: true }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Conversation" component={ConversationScreen} />
      <Stack.Screen name="DocumentUpload" component={DocumentUploadScreen} />
      <Stack.Screen name="VerificationProgress" component={VerificationProgressScreen} />
      <Stack.Screen name="ProductRecommendation" component={ProductRecommendationScreen} />
      <Stack.Screen name="AccountActive" component={AccountActiveScreen} />
      <Stack.Screen name="VideoKYC" component={VideoKYCScreen} />
      <Stack.Screen name="ManualReview" component={ManualReviewScreen} />
      <Stack.Screen name="ResumeOnboarding" component={ResumeOnboardingScreen} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};
