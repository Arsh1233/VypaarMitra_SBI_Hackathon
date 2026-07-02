import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';
import { theme } from './theme';

interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onDismiss?: () => void;
  visible: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  duration = 3000,
  onDismiss,
  visible,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-20)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();

      if (duration > 0) {
        const timer = setTimeout(() => {
          hideToast();
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      hideToast();
    }
  }, [visible]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: -20,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onDismiss) onDismiss();
    });
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return theme.colors.semantic.success;
      case 'error':
        return theme.colors.semantic.error;
      case 'warning':
        return theme.colors.semantic.warning;
      case 'info':
      default:
        return theme.colors.primary.main;
    }
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: getBackgroundColor(),
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    padding: theme.spacing.md,
    borderRadius: theme.radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    ...theme.shadows.lg,
  },
  text: {
    ...theme.typography.BodyMD,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
