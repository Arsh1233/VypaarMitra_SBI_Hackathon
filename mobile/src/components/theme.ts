export const theme = {
  colors: {
    primary: {
      main: '#002653',
      container: '#1a3c6e',
      onContainer: '#8aa8e0',
      fixed: '#d7e3ff',
      fixedDim: '#abc7ff',
    },
    secondary: {
      main: '#bb0014',
      container: '#e51d24',
      onContainer: '#fffbff',
      fixed: '#ffdad6',
    },
    tertiary: {
      main: '#002e16',
      container: '#004725',
      onContainer: '#53bb7b',
      fixed: '#8ff8b2',
    },
    surface: {
      main: '#f9f9ff',
      dim: '#d3daea',
      bright: '#f9f9ff',
      containerLowest: '#ffffff',
      containerLow: '#f0f3ff',
      container: '#e7eefe',
      containerHigh: '#e2e8f8',
      containerHighest: '#dce2f3',
      variant: '#dce2f3',
    },
    neutral: {
      text_primary: '#151c27',
      text_secondary: '#43474f',
      outline: '#747780',
      outline_variant: '#c4c6d0',
      background: '#f9f9ff',
    },
    semantic: {
      error: '#ba1a1a',
      errorContainer: '#ffdad6',
      success: '#008248',
      warning: '#F59E0B',
    }
  },
  typography: {
    DisplayLG: {
      fontFamily: 'sans-serif',
      fontSize: 30,
      fontWeight: '700' as const,
      letterSpacing: -0.6,
    },
    DisplayXL: {
      fontFamily: 'sans-serif',
      fontSize: 36,
      fontWeight: '700' as const,
      letterSpacing: -0.72,
    },
    HeadingMD: {
      fontFamily: 'sans-serif',
      fontSize: 24,
      fontWeight: '600' as const,
      letterSpacing: -0.24,
    },
    HeadingSM: {
      fontFamily: 'sans-serif',
      fontSize: 20,
      fontWeight: '600' as const,
    },
    BodyLG: {
      fontFamily: 'sans-serif',
      fontSize: 18,
      fontWeight: '400' as const,
    },
    BodyMD: {
      fontFamily: 'sans-serif',
      fontSize: 16,
      fontWeight: '400' as const,
    },
    BodySM: {
      fontFamily: 'sans-serif',
      fontSize: 14,
      fontWeight: '400' as const,
    },
    LabelMD: {
      fontFamily: 'sans-serif',
      fontSize: 12,
      fontWeight: '600' as const,
      letterSpacing: 0.6,
    },
    Caption: {
      fontFamily: 'sans-serif',
      fontSize: 11,
      fontWeight: '400' as const,
    },
  },
  spacing: {
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#1A3C6E',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#1A3C6E',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.08,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: '#1A3C6E',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8,
    }
  }
};
