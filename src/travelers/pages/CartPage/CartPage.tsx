import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';
import CartPageSkeleton from './CartPage.skeleton';
import { useCart } from '@/api/hooks/useCart';
import { useCreateBooking } from '@/api/hooks/useBookings';
import { getBookingErrorKey } from '@/api/errorMessages';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import HotelSummaryCard from '@/modules/checkout/components/HotelSummaryCard/HotelSummaryCard';
import GuestInfoCard from '@/modules/checkout/components/GuestInfoCard/GuestInfoCard';
import CancellationPolicyCard from '@/modules/checkout/components/CancellationPolicyCard/CancellationPolicyCard';
import CartSidebar from '@/modules/checkout/components/CartSidebar/CartSidebar';
import type { GuestInfo } from '@/modules/checkout/types';
import { CardList } from './CartPage.styles';

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const createBooking = useCreateBooking();
  const navigate = useNavigate();
  const { showError } = useSnackbar();
  const { t } = useTranslation('travelers');

  const handleContinueToPayment = useDebouncedCallback(() => {
    if (createBooking.isPending || !cart) return;
    createBooking.mutate(
      {
        roomId: cart.roomId,
        hotelId: cart.hotelId,
        checkIn: cart.checkIn,
        checkOut: cart.checkOut,
        guests: cart.guests,
      },
      {
        onSuccess: () => navigate('/checkout/payment'),
        onError: (error: unknown) => showError(t(getBookingErrorKey(error))),
      }
    );
  });

  if (isLoading || !cart) return <CartPageSkeleton />;

  // TODO: from auth context
  const guest: GuestInfo = {
    name: 'Carlos Martinez',
    email: 'carlos.martinez@email.com',
    phone: '+57 310 000 0000',
    initials: 'CM',
  };

  return (
    <CheckoutLayout
      currentStep={2}
      sidebar={
        <CartSidebar
          cart={cart}
          isPending={createBooking.isPending}
          onContinue={handleContinueToPayment}
        />
      }
    >
      <CardList>
        <HotelSummaryCard cart={cart} />
        <GuestInfoCard guest={guest} />
        <CancellationPolicyCard />
      </CardList>
    </CheckoutLayout>
  );
}
