import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { theme } from '../components/theme';
import { Button } from '../components/Button';
import { useOnboardingStore } from '../store/useOnboardingStore';

const LANGUAGES = ['English', 'हिन्दी', 'ગુજરાતી', 'தமிழ்'];

export const WelcomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { language, setLanguage, setPendingOnboarding } = useOnboardingStore();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleStart = () => {
    setPendingOnboarding(true);
    navigation.navigate('Conversation');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={{fontSize: 24}}>☰</Text>
          <Text style={styles.logoText}>Vyapaar Mitra</Text>
        </View>
        <Text style={{fontSize: 24}}>🌐</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.languageSection, { opacity: fadeAnim }]}>
          <Text style={styles.sectionLabel}>SELECT PREFERRED LANGUAGE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.langScroll}>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity 
                key={lang} 
                style={[styles.langChip, language === lang && styles.langChipActive]}
                onPress={() => setLanguage(lang)}
              >
                <Text style={[styles.langText, language === lang && styles.langTextActive]}>{lang}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>

        <Animated.View style={[styles.heroSection, { opacity: fadeAnim }]} >
          <View style={styles.imageContainer}>
            {/* Placeholder for the 3D isometric illustration */}
            <View style={styles.imagePlaceholder}>
              <Text style={{fontSize: 60}}>💼</Text>
            </View>
            
            <View style={styles.floatingCard}>
              <View style={styles.floatingIconContainer}>
                <Text style={{fontSize: 20}}>📈</Text>
              </View>
              <View>
                <Text style={styles.floatingLabel}>Business Growth</Text>
                <Text style={styles.floatingValue}>+24.8%</Text>
              </View>
            </View>
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Grow Your Business With Ease</Text>
            <Text style={styles.heroSubtitle}>Your dedicated companion for digital banking, payments, and MSME growth services.</Text>
          </View>
        </Animated.View>

        <Animated.View style={[styles.valueProps, { opacity: fadeAnim }]}>
          <View style={styles.propCard}>
            <Text style={{fontSize: 24, marginBottom: 8}}>🛡️</Text>
            <Text style={styles.propTitle}>Secure Banking</Text>
            <Text style={styles.propSub}>RBI Regulated</Text>
          </View>
          <View style={[styles.propCard, styles.propCardHighlight]}>
            <Text style={{fontSize: 24, marginBottom: 8}}>💸</Text>
            <Text style={[styles.propTitle, {color: theme.colors.tertiary.container}]}>Instant Payouts</Text>
            <Text style={styles.propSub}>24/7 Processing</Text>
          </View>
        </Animated.View>
      </ScrollView>

      <View style={styles.footer}>
        <Button fullWidth variant="primary" onPress={handleStart}>
          Start Now →
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.main,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    height: 64,
    paddingTop: 20,
    backgroundColor: theme.colors.surface.containerLowest,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral.outline_variant,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    ...theme.typography.HeadingMD,
    color: theme.colors.primary.main,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  languageSection: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface.containerLowest,
  },
  sectionLabel: {
    ...theme.typography.LabelMD,
    color: theme.colors.neutral.text_secondary,
    marginBottom: theme.spacing.xs,
  },
  langScroll: {
    gap: theme.spacing.xs,
    paddingBottom: 4,
  },
  langChip: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: theme.radius.full,
    borderWidth: 2,
    borderColor: theme.colors.neutral.outline,
  },
  langChipActive: {
    backgroundColor: theme.colors.primary.main,
    borderColor: theme.colors.primary.main,
  },
  langText: {
    ...theme.typography.BodySM,
    color: theme.colors.neutral.text_secondary,
  },
  langTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  heroSection: {
    alignItems: 'center',
    padding: theme.spacing.md,
    paddingVertical: theme.spacing.lg,
  },
  imageContainer: {
    width: '100%',
    maxWidth: 320,
    aspectRatio: 1,
    marginBottom: theme.spacing.lg,
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: theme.colors.surface.containerLow,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: theme.colors.neutral.outline_variant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingCard: {
    position: 'absolute',
    bottom: -16,
    right: -16,
    backgroundColor: '#FFF',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...theme.shadows.md,
  },
  floatingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.tertiary.fixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingLabel: {
    fontSize: 10,
    color: theme.colors.neutral.text_secondary,
  },
  floatingValue: {
    fontWeight: 'bold',
    color: theme.colors.primary.main,
  },
  heroTextContainer: {
    maxWidth: 320,
    alignItems: 'center',
  },
  heroTitle: {
    ...theme.typography.DisplayLG,
    color: theme.colors.primary.main,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  heroSubtitle: {
    ...theme.typography.BodyMD,
    color: theme.colors.neutral.text_secondary,
    textAlign: 'center',
  },
  valueProps: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.lg,
  },
  propCard: {
    flex: 1,
    backgroundColor: theme.colors.surface.container,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
  },
  propCardHighlight: {
    backgroundColor: 'rgba(0, 71, 37, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(115, 219, 151, 0.2)',
  },
  propTitle: {
    ...theme.typography.HeadingSM,
    color: theme.colors.primary.main,
    lineHeight: 24,
  },
  propSub: {
    fontSize: 10,
    color: theme.colors.neutral.text_secondary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface.containerLowest,
    borderTopWidth: 1,
    borderTopColor: theme.colors.neutral.outline_variant,
    ...theme.shadows.sm,
  }
});
