import React from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@mui/material/styles';
import { MemoryRouter } from 'react-router-dom';
import { theme } from '../design-system/theme/theme';
import { LocaleProvider } from '../contexts/LocaleContext';
import { SnackbarProvider } from '../contexts/SnackbarContext';
import { AuthProvider } from '../contexts/AuthContext';
import { HotelProvider } from '../contexts/HotelContext';
import { HotelAuthProvider } from '../hotels/auth/HotelAuthContext';
import '../i18n';

function AllProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HotelAuthProvider>
          <HotelProvider>
            <LocaleProvider>
              <ThemeProvider theme={theme}>
                <SnackbarProvider>
                  <MemoryRouter>{children}</MemoryRouter>
                </SnackbarProvider>
              </ThemeProvider>
            </LocaleProvider>
          </HotelProvider>
        </HotelAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: AllProviders, ...options });
}
