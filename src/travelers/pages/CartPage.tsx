import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';
import CartPageSkeleton from './CartPage.skeleton';
import { useCart } from '@/api/hooks/useCart';
import { useCreateBooking } from '@/api/hooks/useBookings';
import { getBookingErrorKey } from '@/api/errorMessages';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useDebouncedCallback } from '@/hooks/useDebouncedCallback';
import HotelSummaryCard from '@/modules/checkout/components/HotelSummaryCard';
import GuestInfoCard from '@/modules/checkout/components/GuestInfoCard';
import CancellationPolicyCard from '@/modules/checkout/components/CancellationPolicyCard';
import CartSidebar from '@/modules/checkout/components/CartSidebar';
import type { CartItem, CartPriceBreakdown, GuestInfo } from '@/modules/checkout/types';

export default function CartPage() {
  const { data: cart, isLoading } = useCart();
  const createBooking = useCreateBooking();
  const navigate = useNavigate();
  const { showError } = useSnackbar();
  const { t } = useTranslation('travelers');

  const handleContinueToPayment = useDebouncedCallback(() => {
    if (createBooking.isPending) return;
    createBooking.mutate(
      {
        roomId: cartItem.roomId,
        hotelId: cartItem.hotelId,
        checkIn: cartItem.checkIn,
        checkOut: cartItem.checkOut,
        guests: cartItem.guests,
        userId: 'c1000000-0000-0000-0000-000000000001', // TODO: from auth context
      },
      {
        onSuccess: () => navigate('/checkout/payment'),
        onError: (error: unknown) => showError(t(getBookingErrorKey(error))),
      }
    );
  });

  if (isLoading || !cart) return <CartPageSkeleton />;

  // Map cart data to typed structures
  const cartData = cart as Record<string, unknown>;
  const items = (cartData.items as Record<string, unknown>[]) || [];
  const firstItem = items[0] || {};

  const cartItem: CartItem = {
    roomId: (firstItem.roomId as string) || 'b1000000-0000-0000-0000-000000000001',
    hotelId: (firstItem.hotelId as string) || 'a1000000-0000-0000-0000-000000000001',
    hotel: {
      name: (firstItem.hotelName as string) || 'Hotel Caribe Plaza',
      location: (firstItem.location as string) || 'Centro Historico, Cartagena',
      rating: (firstItem.rating as number) || 4.5,
      reviewCount: (firstItem.reviewCount as number) || 312,
      type: (firstItem.hotelType as string) || 'Hotel · 5 estrellas',
    },
    room: {
      id: (firstItem.roomId as string) || 'b1000000-0000-0000-0000-000000000001',
      name: (firstItem.roomName as string) || 'Standard',
      features: (firstItem.roomFeatures as string) || '1 cama King · 32 m² · Vista al jardin',
      pricePerNight: (firstItem.pricePerNight as number) || 250000,
    },
    checkIn: (firstItem.checkIn as string) || '2026-04-01',
    checkOut: (firstItem.checkOut as string) || '2026-04-03',
    guests: (firstItem.guests as number) || 2,
    nights: (firstItem.nights as number) || 2,
  };

  const priceBreakdown: CartPriceBreakdown = {
    pricePerNight: cartItem.room.pricePerNight,
    nights: cartItem.nights,
    basePrice: cartItem.room.pricePerNight * cartItem.nights,
    vat: Math.round(cartItem.room.pricePerNight * cartItem.nights * 0.19),
    serviceFee: 0,
    totalPrice: Math.round(cartItem.room.pricePerNight * cartItem.nights * 1.19),
  };

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
          priceBreakdown={priceBreakdown}
          isPending={createBooking.isPending}
          onContinue={handleContinueToPayment}
        />
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <HotelSummaryCard item={cartItem} />
        <GuestInfoCard guest={guest} />
        <CancellationPolicyCard />
      </Box>
    </CheckoutLayout>
  );
}
