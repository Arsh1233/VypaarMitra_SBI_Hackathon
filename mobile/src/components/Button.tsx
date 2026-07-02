import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, TextStyle, ViewStyle } from 'react-native';
import { theme } from './theme';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  style,
  disabled,
  ...props
}) => {
  const getButtonStyles = (): ViewStyle => {
    let backgroundColor = theme.colors.primary.main;
    let borderColor = 'transparent';
    let borderWidth = 0;

    if (variant === 'secondary') {
      backgroundColor = '#FFFFFF';
      borderColor = theme.colors.primary.container;
      borderWidth = 1;
    } else if (variant === 'outline') {
      backgroundColor = 'transparent';
      borderColor = theme.colors.neutral.outline;
      borderWidth = 1;
    } else if (variant === 'danger') {
      backgroundColor = theme.colors.secondary.main;
    }

    if (disabled) {
      backgroundColor = theme.colors.neutral.text_secondary;
      borderColor = 'transparent';
    }

    let paddingVertical = theme.spacing.md;
    let paddingHorizontal = theme.spacing.lg;
    let borderRadius = theme.radius.md;
    let height = 56;

    if (size === 'sm') {
      paddingVertical = theme.spacing.sm;
      paddingHorizontal = theme.spacing.md;
      borderRadius = theme.radius.sm;
      height = 40;
    } else if (size === 'lg') {
      paddingVertical = theme.spacing.lg;
      paddingHorizontal = theme.spacing.xl;
      borderRadius = theme.radius.lg;
      height = 64;
    }

    return {
      backgroundColor,
      borderColor,
      borderWidth,
      paddingVertical,
      paddingHorizontal,
      borderRadius,
      height,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: fullWidth ? 'stretch' : 'auto',
      opacity: disabled ? 0.7 : 1,
      ...(style as object),
    };
  };

  const getTextStyles = (): TextStyle => {
    let color = '#FFFFFF';
    if (variant === 'outline') {
      color = theme.colors.neutral.text_primary;
    } else if (variant === 'secondary') {
      color = theme.colors.primary.container;
    }
    
    if (disabled) {
      color = theme.colors.surface.main;
    }
    
    let fontSize = theme.typography.BodyMD.fontSize;
    if (size === 'sm') fontSize = theme.typography.BodySM.fontSize;
    if (size === 'lg') fontSize = theme.typography.BodyLG.fontSize;

    return {
      color,
      fontSize,
      fontWeight: 'bold',
    };
  };

  return (
    <TouchableOpacity 
      style={getButtonStyles()} 
      disabled={disabled} 
      activeOpacity={0.8}
      {...props}
    >
      <Text style={getTextStyles()}>{children}</Text>
    </TouchableOpacity>
  );
};
