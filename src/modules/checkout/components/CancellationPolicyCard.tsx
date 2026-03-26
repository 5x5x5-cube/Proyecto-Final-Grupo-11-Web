import { Box, Typography } from '@mui/material';
import PolicyIcon from '@mui/icons-material/Policy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next';
import SectionCard from '@/design-system/components/SectionCard';
import { palette } from '@/design-system/theme/palette';

export default function CancellationPolicyCard() {
  const { t } = useTranslation('travelers');

  return (
    <SectionCard
      icon={<PolicyIcon sx={{ color: palette.primary, fontSize: 20 }} />}
      title={t('cart.cancellation.title')}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircleIcon sx={{ color: '#1A6B4F', fontSize: 18 }} />
          <Typography
            sx={{ fontSize: 13, color: palette.onSurface }}
            dangerouslySetInnerHTML={{ __html: t('cart.cancellation.free') }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <InfoIcon sx={{ color: '#F4A020', fontSize: 18 }} />
          <Typography
            sx={{ fontSize: 13, color: palette.onSurface }}
            dangerouslySetInnerHTML={{ __html: t('cart.cancellation.halfCharge') }}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CancelIcon sx={{ color: '#B5451B', fontSize: 18 }} />
          <Typography
            sx={{ fontSize: 13, color: palette.onSurface }}
            dangerouslySetInnerHTML={{ __html: t('cart.cancellation.noRefund') }}
          />
        </Box>
      </Box>
    </SectionCard>
  );
}
