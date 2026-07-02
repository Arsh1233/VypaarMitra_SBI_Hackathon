import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { theme } from '../components/theme';
import { Card } from '../components/Card';

const CHECKLIST = [
  { label: "Document Verification",  icon: "D" },
  { label: "MCA / ROC Check",        icon: "M" },
  { label: "KYC & Sanctions Check",  icon: "K" },
  { label: "Risk Assessment",        icon: "R" },
  { label: "Product Eligibility",    icon: "P" },
];

export const VerificationProgressScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCompletedSteps(currentStep);

      if (currentStep >= CHECKLIST.length) {
        clearInterval(interval);
        setTimeout(() => {
          navigation.navigate('ProductRecommendation');
        }, 2000);
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Almost Done!</Text>
        <Text style={styles.subtitle}>Your documents are being verified</Text>
      </View>

      <Card variant="elevated" style={styles.checklistCard}>
        {CHECKLIST.map((item, index) => {
          let statusColor = theme.colors.neutral.text_secondary;
          let statusText = 'Pending';
          let statusDot = styles.dotPending;

          if (index < completedSteps) {
            statusColor = theme.colors.semantic.success;
            statusText = 'Done';
            statusDot = styles.dotDone;
          } else if (index === completedSteps) {
            statusColor = theme.colors.primary.main;
            statusText = 'In Progress...';
            statusDot = styles.dotActive;
          }

          return (
            <View key={index} style={styles.checklistItem}>
              <View style={styles.itemLeft}>
                <View style={[styles.dot, statusDot]}>
                  <Text style={styles.dotText}>{item.icon}</Text>
                </View>
                <Text style={styles.itemTitle}>{item.label}</Text>
              </View>
              <Text style={[styles.statusText, { color: statusColor }]}>{statusText}</Text>
            </View>
          );
        })}
      </Card>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>Estimated time: 2 minutes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surface.main,
    padding: theme.spacing.lg,
    paddingTop: 60,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.HeadingMD,
    color: theme.colors.primary.main,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    ...theme.typography.BodyLG,
    color: theme.colors.neutral.text_primary,
  },
  checklistCard: {
    padding: theme.spacing.lg,
  },
  checklistItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutral.outline_variant,
    paddingBottom: theme.spacing.sm,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotPending: {
    backgroundColor: theme.colors.surface.containerHigh,
  },
  dotActive: {
    backgroundColor: theme.colors.primary.fixed,
  },
  dotDone: {
    backgroundColor: 'rgba(0, 130, 72, 0.15)',
  },
  dotText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: theme.colors.primary.main,
  },
  itemTitle: {
    ...theme.typography.BodyMD,
    color: theme.colors.neutral.text_primary,
  },
  statusText: {
    ...theme.typography.BodySM,
    fontWeight: '600',
  },
  timerContainer: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  timerText: {
    ...theme.typography.BodyMD,
    color: theme.colors.neutral.text_secondary,
    fontWeight: '600',
  }
});
