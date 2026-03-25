import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';

export function useDiscounts() {
  return useQuery({
    queryKey: ['discounts'],
    queryFn: () => httpClient.get('/bookings/discounts'),
  });
}

export function useCreateDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) =>
      httpClient.post('/bookings/discounts', { body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
    },
  });
}

export function useUpdateDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: number; [key: string]: unknown }) =>
      httpClient.put(`/bookings/discounts/${id}`, { body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
    },
  });
}

export function useDeleteDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) =>
      httpClient.delete(`/bookings/discounts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
    },
  });
}
