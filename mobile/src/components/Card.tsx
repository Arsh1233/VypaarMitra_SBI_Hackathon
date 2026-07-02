import React from 'react';
import { View, StyleSheet, ViewStyle, ViewProps } from 'react-native';
import { theme } from './theme';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'default';
  padding?: keyof typeof theme.spacing;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'lg',
  children,
  style,
  ...props
}) => {
  const getStyles = (): ViewStyle => {
    let baseStyle: ViewStyle = {
      backgroundColor: '#FFFFFF',
      borderRadius: theme.radius.md,
      padding: theme.spacing[padding],
      overflow: 'hidden',
    };

    if (variant === 'elevated') {
      baseStyle = { 
        ...baseStyle, 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderWidth: 1,
        borderColor: theme.colors.neutral.outline_variant,
        ...theme.shadows.sm 
      };
    } else if (variant === 'outlined') {
      baseStyle = {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: theme.colors.neutral.outline_variant,
      };
    }

    return {
      ...baseStyle,
      ...(style as object),
    };
  };

  return (
    <View style={getStyles()} {...props}>
      {children}
    </View>
  );
};
