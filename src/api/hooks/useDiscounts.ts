import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { httpClient } from '../httpClient';

export interface Discount {
  id: string;
  tariff_id: string;
  name: string;
  discount_type: 'percentage' | 'fixed';
  value: number;
  start_date: string;
  end_date: string;
  status: 'active' | 'inactive';
  created_at: string;
}

export interface DiscountCreate {
  tariff_id: string;
  name: string;
  discount_type: 'percentage' | 'fixed';
  value: number;
  start_date: string;
  end_date: string;
}

export interface DiscountUpdate {
  name?: string;
  discount_type?: 'percentage' | 'fixed';
  value?: number;
  start_date?: string;
  end_date?: string;
}

export function useDiscounts() {
  return useQuery<Discount[]>({
    queryKey: ['discounts'],
    queryFn: () => httpClient.get('/inventory/discounts'),
  });
}

export function useCreateDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DiscountCreate) => httpClient.post('/inventory/discounts', { body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
    },
  });
}

export function useUpdateDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & DiscountUpdate) =>
      httpClient.put(`/inventory/discounts/${id}`, { body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
    },
  });
}

export function useDeleteDiscount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => httpClient.delete(`/inventory/discounts/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['discounts'] });
    },
  });
}
