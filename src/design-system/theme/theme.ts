import { createTheme } from '@mui/material/styles';
import { palette } from './palette';

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.primary,
      contrastText: palette.onPrimary,
      light: palette.primaryContainer,
    },
    secondary: { main: palette.secondary, light: palette.secondaryContainer },
    error: { main: palette.error, light: palette.errorContainer },
    success: { main: palette.success, light: palette.successContainer },
    warning: { main: palette.warning, light: palette.warningContainer },
    background: { default: palette.background, paper: palette.surface },
    text: { primary: palette.onSurface, secondary: palette.onSurfaceVariant },
    divider: palette.outlineVariant,
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 100,
          textTransform: 'none' as const,
          fontWeight: 500,
          letterSpacing: '0.1px',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 100 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 16 },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 28 },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*, *::before, *::after': {
          boxSizing: 'border-box',
          margin: 0,
          padding: 0,
        },
        body: {
          fontFamily: "'Roboto', sans-serif",
          width: '100%',
          minHeight: '100vh',
          background: palette.background,
        },
      },
    },
  },
});
