import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Box, CircularProgress, Typography } from '@mui/material';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';
import CartPageSkeleton from './CartPage.skeleton';
import { useCart } from '@/api/hooks/useCart';
import { useSnackbar } from '@/contexts/SnackbarContext';
import HotelSummaryCard from '@/modules/checkout/components/HotelSummaryCard/HotelSummaryCard';
import GuestInfoCard from '@/modules/checkout/components/GuestInfoCard/GuestInfoCard';
import CancellationPolicyCard from '@/modules/checkout/components/CancellationPolicyCard/CancellationPolicyCard';
import CartSidebar from '@/modules/checkout/components/CartSidebar/CartSidebar';
import type { GuestInfo } from '@/modules/checkout/types';
import { CardList } from './CartPage.styles';
import { palette } from '@/design-system/theme/palette';

export default function CartPage() {
  const { data: cart, isLoading, isPlaceholderData, error } = useCart();
  const navigate = useNavigate();
  const { showError } = useSnackbar();
  const { t } = useTranslation('travelers');

  // Handle 410 Gone — hold has already expired on the server
  useEffect(() => {
    if (!error) return;
    const status = (error as { status?: number })?.status;
    if (status === 410) {
      showError(t('cart.errors.holdExpired', 'Tu reserva temporal ha expirado'));
      navigate('/');
    } else if (status === 409) {
      showError(t('cart.errors.roomUnavailable', 'Habitación no disponible. Intenta de nuevo.'));
      navigate('/');
    }
  }, [error, navigate, showError, t]);

  const handleContinueToPayment = () => {
    navigate('/checkout/payment', { state: { cartId: cart?.id } });
  };

  const handleHoldExpired = () => {
    showError(t('cart.errors.holdExpired', 'Tu reserva temporal ha expirado'));
    navigate('/');
  };

  // No cart data at all (no localStorage and no server response yet)
  if (isLoading && !cart) return <CartPageSkeleton />;

  // Error with no data to show
  if (error && !cart) return <CartPageSkeleton />;

  if (!cart) return <CartPageSkeleton />;

  // TODO: from auth context
  const guest: GuestInfo = {
    name: 'Carlos Martinez',
    email: 'carlos.martinez@email.com',
    phone: '+57 310 000 0000',
    initials: 'CM',
  };

  // isPlaceholderData = true when showing localStorage data while server loads
  const isSyncing = isPlaceholderData;

  return (
    <CheckoutLayout
      currentStep={2}
      sidebar={
        <CartSidebar
          cart={cart}
          onContinue={handleContinueToPayment}
          onHoldExpired={handleHoldExpired}
        />
      }
    >
      <CardList>
        {isSyncing && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              backgroundColor: palette.secondaryContainer,
              borderRadius: '8px',
              mb: '4px',
            }}
          >
            <CircularProgress size={14} thickness={5} sx={{ color: palette.primary }} />
            <Typography sx={{ fontSize: 13, color: palette.primary }}>
              {t('cart.syncing', 'Sincronizando...')}
            </Typography>
          </Box>
        )}
        <HotelSummaryCard cart={cart} />
        <GuestInfoCard guest={guest} />
        <CancellationPolicyCard />
      </CardList>
    </CheckoutLayout>
  );
}
