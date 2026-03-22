import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import { theme } from './design-system/theme/theme';
import { router } from './router';
import { LocaleProvider } from './contexts/LocaleContext';

export default function App() {
  return (
    <LocaleProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </LocaleProvider>
  );
}
