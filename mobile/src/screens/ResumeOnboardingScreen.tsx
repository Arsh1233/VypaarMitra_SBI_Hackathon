import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useOnboardingStore } from '../store/useOnboardingStore';

export const ResumeOnboardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { clearState } = useOnboardingStore();
  
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Resume Onboarding Screen Placeholder</Text>
      <Button title="Resume" onPress={() => navigation.navigate('Conversation', {})} />
      <Button title="Start Fresh" onPress={() => {
        clearState();
        navigation.navigate('Welcome');
      }} />
    </View>
  );
};
