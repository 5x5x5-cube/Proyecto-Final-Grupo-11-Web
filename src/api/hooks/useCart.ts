import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';
import type { Cart } from '@/modules/checkout/types';

export function useCart() {
  return useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: () => httpClient.get<Cart>('/cart'),
  });
}

export function useSetCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      roomId: number;
      hotelId: number;
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
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}
