import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';
import CartPageSkeleton from './CartPage.skeleton';
import { useCart, useSetCart } from '@/api/hooks/useCart';
import { useHotelDetail, useHotelRooms } from '@/api/hooks/useSearch';
import { getCartSelection } from '@/modules/checkout/cartStorage';
import { useAuth } from '@/contexts/AuthContext';
import { useSnackbar } from '@/contexts/SnackbarContext';
import HotelSummaryCard from '@/modules/checkout/components/HotelSummaryCard/HotelSummaryCard';
import GuestInfoCard from '@/modules/checkout/components/GuestInfoCard/GuestInfoCard';
import CancellationPolicyCard from '@/modules/checkout/components/CancellationPolicyCard/CancellationPolicyCard';
import CartSidebar from '@/modules/checkout/components/CartSidebar/CartSidebar';
import SyncingBanner from '@/modules/checkout/components/SyncingBanner/SyncingBanner';
import { CardList } from './CartPage.styles';

export default function CartPage() {
  const { data: cart, isLoading, isPlaceholderData, error } = useCart();
  const setCart = useSetCart();
  const { data: hotelData } = useHotelDetail(cart?.hotelId ?? '');
  const { data: roomsData } = useHotelRooms(cart?.hotelId ?? '');
  const cartRoom = (roomsData as any)?.find?.((r: any) => r.id === cart?.roomId);
  const { guestInfo } = useAuth();
  const navigate = useNavigate();
  const { showError } = useSnackbar();
  const { t } = useTranslation('travelers');

  // Create cart from saved selection on mount (selection saved by PropertyDetailPage)
  useEffect(() => {
    const selection = getCartSelection();
    if (selection && !setCart.isPending) {
      setCart.mutate(selection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if ((isLoading && !cart) || (error && !cart) || !cart) return <CartPageSkeleton />;

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
        <SyncingBanner visible={isPlaceholderData} />
        <HotelSummaryCard
          cart={cart}
          hotelImageUrl={(hotelData as any)?.image_url}
          roomImageUrl={cartRoom?.images?.[0]}
        />
        <GuestInfoCard guest={guestInfo} />
        <CancellationPolicyCard checkIn={cart.checkIn} />
      </CardList>
    </CheckoutLayout>
  );
}
