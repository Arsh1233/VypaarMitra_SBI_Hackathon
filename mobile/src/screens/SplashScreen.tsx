import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { theme } from '../components/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

export const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { pendingOnboarding, setOffline } = useOnboardingStore();
  const scale = useRef(new Animated.Value(1)).current;
  const opacity1 = useRef(new Animated.Value(0)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;
  const opacity3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, { toValue: 1.05, duration: 1000, useNativeDriver: true }),
        Animated.timing(scale, { toValue: 1.0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    // Loading dots animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity1, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(opacity2, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(opacity3, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(opacity1, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.timing(opacity2, { toValue: 0, duration: 0, useNativeDriver: true }),
        Animated.timing(opacity3, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();

    // Check session
    const timer = setTimeout(() => {
      // simulate network check
      setOffline(false);
      if (pendingOnboarding) {
        navigation.replace('ResumeOnboarding');
      } else {
        navigation.replace('Welcome');
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, { transform: [{ scale }] }]}>
        <View style={styles.placeholderLogo} />
        <Text style={styles.title}>Vyapaar Mitra</Text>
      </Animated.View>
      
      <View style={styles.dotsContainer}>
        <Animated.View style={[styles.dot, { opacity: opacity1 }]} />
        <Animated.View style={[styles.dot, { opacity: opacity2 }]} />
        <Animated.View style={[styles.dot, { opacity: opacity3 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  placeholderLogo: {
    width: 80,
    height: 80,
    backgroundColor: '#FFF',
    borderRadius: 40,
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.DisplayXL,
    color: '#FFF',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
});
