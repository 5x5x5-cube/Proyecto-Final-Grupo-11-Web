import { Box, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Text from '@/design-system/components/Text';
import { palette } from '@/design-system/theme/palette';

interface Props {
  visible: boolean;
}

export default function ProcessingOverlay({ visible }: Props) {
  const { t } = useTranslation('travelers');

  if (!visible) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
      }}
    >
      <CircularProgress size={48} sx={{ color: palette.primary }} />
      <Text textVariant="panelTitle" sx={{ color: palette.onSurface }}>
        {t('payment.processing')}
      </Text>
      <Text textVariant="caption" sx={{ color: palette.onSurfaceVariant }}>
        {t('payment.processingSubtext')}
      </Text>
    </Box>
  );
}
