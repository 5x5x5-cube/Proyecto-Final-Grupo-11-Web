import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';
import type { Cart } from '@/modules/checkout/types';
import { getCartSelection, clearCartSelection } from '@/modules/checkout/cartStorage';

export function useCart() {
  return useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: () => httpClient.get<Cart>('/cart'),
    placeholderData: () => {
      const selection = getCartSelection();
      if (!selection) return undefined;
      // Return a partial Cart object from localStorage for instant display
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
