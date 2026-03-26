import { Box } from '@mui/material';
import { useLocale } from '@/contexts/LocaleContext';
import type { Language } from '@/contexts/LocaleContext';
import { palette } from '../theme/palette';

const languages: Language[] = ['ES', 'EN'];

export default function LanguagePill() {
  const { language, setLanguage } = useLocale();

  return (
    <Box
      sx={{
        display: 'flex',
        borderRadius: '100px',
        border: `1px solid ${palette.outlineVariant}`,
        overflow: 'hidden',
      }}
    >
      {languages.map(lang => (
        <Box
          key={lang}
          onClick={() => setLanguage(lang)}
          sx={{
            px: '12px',
            py: '6px',
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            backgroundColor: lang === language ? palette.primary : 'transparent',
            color: lang === language ? palette.onPrimary : palette.onSurfaceVariant,
            transition: 'all 0.15s ease',
          }}
        >
          {lang}
        </Box>
      ))}
    </Box>
  );
}
