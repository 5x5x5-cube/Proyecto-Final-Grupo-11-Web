import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';
import type { Cart, CartPricing, NormalizedCart } from '@/modules/checkout/types';
import { EMPTY_PRICING } from '@/modules/checkout/types';
import { DEFAULT_CURRENCY } from '@/contexts/LocaleContext';
import type { Currency } from '@/contexts/LocaleContext';
import { getCartSelection, clearCartSelection } from '@/modules/checkout/cartStorage';

function normalizeCart(cart: Cart): NormalizedCart {
  const bp = cart.priceBreakdown;
  const pricePerNight = Number(bp?.pricePerNight ?? cart.pricePerNight ?? 0);
  const nights = bp?.nights ?? cart.nights ?? 0;
  const subtotal = Number(bp?.subtotal ?? cart.subtotal ?? 0);
  const taxes =
    Number(bp?.vat ?? cart.vat ?? 0) +
    Number(bp?.tourismTax ?? cart.tourismTax ?? 0) +
    Number(bp?.serviceFee ?? cart.serviceFee ?? 0);
  const total = Number(bp?.total ?? cart.total ?? 0);
  const currency = (bp?.currency as Currency) ?? DEFAULT_CURRENCY;

  return { ...cart, pricing: { pricePerNight, nights, subtotal, taxes, total, currency } };
}

export function useCart() {
  const query = useQuery<Cart, Error, NormalizedCart>({
    queryKey: ['cart'],
    queryFn: () => httpClient.get<Cart>('/cart'),
    select: normalizeCart,
    placeholderData: () => {
      const selection = getCartSelection();
      if (!selection) return undefined;
      return {
        id: '',
        userId: '',
        roomId: selection.roomId,
        hotelId: selection.hotelId,
        hotelName: '',
        roomName: '',
        checkIn: selection.checkIn,
        checkOut: selection.checkOut,
        guests: selection.guests,
        createdAt: selection.savedAt,
      } as Cart;
    },
    retry: 2,
    retryDelay: 1000,
  });

  const pricing: CartPricing = query.data?.pricing ?? EMPTY_PRICING;

  return { ...query, pricing };
}

export function useSetCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      roomId: string;
      hotelId: string;
      checkIn: string;
      checkOut: string;
      guests: number;
    }) => httpClient.put<Cart>('/cart', { body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => httpClient.delete('/cart'),
    onSuccess: () => {
      clearCartSelection();
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
