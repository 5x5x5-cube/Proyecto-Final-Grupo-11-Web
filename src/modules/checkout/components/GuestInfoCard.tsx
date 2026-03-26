import { Box, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useTranslation } from 'react-i18next';
import SectionCard from '../../../design-system/components/SectionCard';
import { palette } from '../../../design-system/theme/palette';
import { GuestInfo } from '../types';

interface Props {
  guest: GuestInfo;
}

export default function GuestInfoCard({ guest }: Props) {
  const { t } = useTranslation('travelers');

  return (
    <SectionCard
      icon={<PersonIcon sx={{ color: palette.primary, fontSize: 20 }} />}
      title={t('cart.guest.title')}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px 16px',
          backgroundColor: '#fff',
          border: `1px solid ${palette.outlineVariant}`,
          borderRadius: '12px',
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: palette.secondaryContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 600,
            color: palette.primary,
            flexShrink: 0,
          }}
        >
          {guest.initials}
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: palette.onSurface }}>
            {guest.name}
          </Typography>
          <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
            {guest.email} · {guest.phone}
          </Typography>
        </Box>
      </Box>
    </SectionCard>
  );
}
