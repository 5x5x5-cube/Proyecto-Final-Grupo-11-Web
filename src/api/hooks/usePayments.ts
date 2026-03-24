import { useQuery, useMutation } from '@tanstack/react-query';
import { httpClient } from '../httpClient';

export function useInitiatePayment() {
  return useMutation({
    mutationFn: (data: unknown) =>
      httpClient.post('/payments/initiate', { body: data }),
  });
}

export function usePaymentStatus(paymentId: string) {
  return useQuery({
    queryKey: ['payments', paymentId, 'status'],
    queryFn: () => httpClient.get(`/payments/${paymentId}/status`),
    enabled: !!paymentId,
  });
}
