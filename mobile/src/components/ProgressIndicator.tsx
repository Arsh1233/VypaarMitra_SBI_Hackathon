import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from './theme';

interface ProgressProps {
  steps: number;
  currentStep: number;
  variant?: 'bar' | 'dots' | 'circles';
}

export const ProgressIndicator: React.FC<ProgressProps> = ({
  steps,
  currentStep,
  variant = 'bar',
}) => {
  if (variant === 'bar') {
    return (
      <View style={styles.container}>
        <Text style={styles.stepText}>Step {currentStep} of {steps}</Text>
        <View style={styles.barContainer}>
          {Array.from({ length: steps }).map((_, index) => {
            const isCompleted = index + 1 < currentStep;
            const isActive = index + 1 === currentStep;
            return (
              <View
                key={index}
                style={[
                  styles.barSegment,
                  isCompleted && styles.barCompleted,
                  isActive && styles.barActive,
                  !isCompleted && !isActive && styles.barPending,
                ]}
              />
            );
          })}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Unsupported variant for now</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.neutral.card,
  },
  stepText: {
    ...theme.typography.BodySM,
    color: theme.colors.neutral.text_secondary,
    marginBottom: theme.spacing.xs,
  },
  barContainer: {
    flexDirection: 'row',
    height: 4,
    gap: 4,
  },
  barSegment: {
    flex: 1,
    borderRadius: 2,
  },
  barCompleted: {
    backgroundColor: theme.colors.semantic.success,
  },
  barActive: {
    backgroundColor: theme.colors.primary.main,
  },
  barPending: {
    backgroundColor: '#E5E7EB',
  },
});
