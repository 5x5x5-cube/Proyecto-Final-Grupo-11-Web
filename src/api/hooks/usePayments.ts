import { useQuery, useMutation } from '@tanstack/react-query';
import { httpClient } from '../httpClient';

interface TokenizeRequest {
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

interface TokenizeResponse {
  token: string;
  cardLast4: string;
  cardBrand: string;
  expiresAt: string;
}

interface InitiatePaymentRequest {
  token: string;
  bookingId: string;
  amount: number;
  currency: string;
  method: string;
}

interface InitiatePaymentResponse {
  paymentId: string;
  status: string;
}

interface PaymentStatusResponse {
  paymentId: string;
  status: 'processing' | 'approved' | 'declined';
  bookingCode?: string;
}

export function useTokenizeCard() {
  return useMutation<TokenizeResponse, Error, TokenizeRequest>({
    mutationFn: data => httpClient.post('/payments/tokenize', { body: data }),
  });
}

export function useInitiatePayment() {
  return useMutation<InitiatePaymentResponse, Error, InitiatePaymentRequest>({
    mutationFn: data => httpClient.post('/payments/initiate', { body: data }),
  });
}

export function usePaymentStatus(paymentId: string) {
  return useQuery<PaymentStatusResponse>({
    queryKey: ['payments', paymentId, 'status'],
    queryFn: () => httpClient.get(`/payments/${paymentId}/status`),
    enabled: !!paymentId,
    refetchInterval: query => {
      const status = query.state.data?.status;
      if (status === 'approved' || status === 'declined') return false;
      return 1000;
    },
  });
}
