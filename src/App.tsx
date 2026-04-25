import './i18n';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { theme } from './design-system/theme/theme';
import { router } from './router';
import { LocaleProvider } from './contexts/LocaleContext';
import { SnackbarProvider } from './contexts/SnackbarContext';
import { AuthProvider } from './contexts/AuthContext';
import { HotelProvider } from './contexts/HotelContext';
import { HotelAuthProvider } from './hotels/auth/HotelAuthContext';
import { queryClient } from './api/queryClient';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HotelAuthProvider>
          <HotelProvider>
            <LocaleProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider>
                  <RouterProvider router={router} />
                </SnackbarProvider>
              </ThemeProvider>
            </LocaleProvider>
          </HotelProvider>
        </HotelAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
