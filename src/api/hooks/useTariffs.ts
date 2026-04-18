import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';

export function useTariffs() {
  return useQuery({
    queryKey: ['tariffs'],
    queryFn: () => httpClient.get('/inventory/tariffs'),
  });
}

export function useHotelAdminRooms() {
  return useQuery({
    queryKey: ['hotelAdminRooms'],
    queryFn: () => httpClient.get('/inventory/rooms'),
  });
}

export function useCreateTariff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => httpClient.post('/inventory/tariffs', { body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tariffs'] });
    },
  });
}

export function useUpdateTariff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string; [key: string]: unknown }) =>
      httpClient.put(`/inventory/tariffs/${id}`, { body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tariffs'] });
    },
  });
}

export function useDeleteTariff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => httpClient.delete(`/inventory/tariffs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tariffs'] });
    },
  });
}
