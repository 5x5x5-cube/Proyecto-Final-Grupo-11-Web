import { Box, Typography, Button, CircularProgress } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import { palette } from '@/design-system/theme/palette';
import type { CartPriceBreakdown } from '../types';

interface Props {
  priceBreakdown: CartPriceBreakdown;
  isPending: boolean;
  onContinue: () => void;
}

export default function CartSidebar({ priceBreakdown, isPending, onContinue }: Props) {
  const { t } = useTranslation('travelers');
  const { formatPrice } = useLocale();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <Typography sx={{ fontSize: 18, fontWeight: 700, color: palette.onSurface }}>
        {t('cart.sidebar.title')}
      </Typography>

      {/* Price breakdown */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
            {`${formatPrice(priceBreakdown.pricePerNight)} x ${priceBreakdown.nights} ${t('cart.sidebar.nightsLabel')}`}
          </Typography>
          <Typography sx={{ fontSize: 14, color: palette.onSurface }}>
            {formatPrice(priceBreakdown.basePrice)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
            {t('cart.sidebar.vat')}
          </Typography>
          <Typography sx={{ fontSize: 14, color: palette.onSurface }}>
            {formatPrice(priceBreakdown.vat)}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 14, color: palette.onSurfaceVariant }}>
            {t('cart.sidebar.serviceFee')}
          </Typography>
          <Typography sx={{ fontSize: 14, color: palette.onSurface }}>
            {formatPrice(priceBreakdown.serviceFee)}
          </Typography>
        </Box>
        <Box sx={{ height: 1, backgroundColor: palette.outlineVariant }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface }}>
            {t('cart.sidebar.totalToPay')}
          </Typography>
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: palette.primary }}>
            {formatPrice(priceBreakdown.totalPrice)}
          </Typography>
        </Box>
      </Box>

      {/* Continue button */}
      <Button
        variant="contained"
        disableElevation
        fullWidth
        onClick={onContinue}
        disabled={isPending}
        sx={{
          height: 52,
          backgroundColor: palette.primary,
          borderRadius: '100px',
          fontFamily: "'Roboto', sans-serif",
          fontSize: 16,
          fontWeight: 600,
          color: '#fff',
          textTransform: 'none',
          '&:hover': { backgroundColor: palette.primary },
        }}
      >
        {isPending ? (
          <CircularProgress size={24} sx={{ color: '#fff' }} />
        ) : (
          t('cart.sidebar.continueToPayment')
        )}
      </Button>

      {/* Secure note */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
        <LockIcon sx={{ fontSize: 15, color: palette.primary }} />
        <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
          {t('cart.sidebar.securePayment')}
        </Typography>
      </Box>
    </Box>
  );
}
