import { Box, Typography } from '@mui/material';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { useTranslation } from 'react-i18next';
import { palette } from '../../design-system/theme/palette';

export default function OfflineBanner() {
  const { t } = useTranslation('common');

  return (
    <Box
      sx={{
        background: palette.warningContainer,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        px: '16px',
        py: '8px',
      }}
    >
      <WifiOffIcon sx={{ fontSize: 16, color: palette.warning }} />
      <Typography sx={{ fontSize: 12, fontWeight: 500, color: palette.warning }}>
        {t('offline.banner')}
      </Typography>
    </Box>
  );
}
