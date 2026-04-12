import React, { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material/Alert';

interface SnackbarOptions {
  message: string;
  severity?: AlertColor;
  duration?: number;
}

interface SnackbarContextType {
  showSnackbar: (options: SnackbarOptions) => void;
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SnackbarOptions>({ message: '' });

  const showSnackbar = useCallback((opts: SnackbarOptions) => {
    setOptions(opts);
    setOpen(true);
  }, []);

  const showError = useCallback(
    (message: string) => showSnackbar({ message, severity: 'error' }),
    [showSnackbar]
  );

  const showSuccess = useCallback(
    (message: string) => showSnackbar({ message, severity: 'success' }),
    [showSnackbar]
  );

  const handleClose = useCallback((_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar, showError, showSuccess }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={options.duration ?? 5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={options.severity ?? 'info'} variant="filled">
          {options.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar(): SnackbarContextType {
  const ctx = useContext(SnackbarContext);
  if (!ctx) throw new Error('useSnackbar must be used within a SnackbarProvider');
  return ctx;
}
