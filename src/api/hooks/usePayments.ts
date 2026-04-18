import { useQuery, useMutation } from '@tanstack/react-query';
import { httpClient } from '../httpClient';
import type { PaymentMethod } from '@/modules/checkout/types';

export interface CardTokenizeRequest {
  method: 'credit_card' | 'debit_card';
  cardNumber: string;
  cardHolder: string;
  expiry: string;
  cvv: string;
}

export interface WalletTokenizeRequest {
  method: 'digital_wallet';
  walletProvider: string;
  walletEmail: string;
}

export interface TransferTokenizeRequest {
  method: 'transfer';
  bankCode: string;
  accountNumber: string;
  accountHolder: string;
}

export type TokenizeRequest = CardTokenizeRequest | WalletTokenizeRequest | TransferTokenizeRequest;

export interface TokenizeResponse {
  token: string;
  method: PaymentMethod;
  displayLabel: string;
  expiresAt: string;
  cardLast4: string | null;
  cardBrand: string | null;
  walletProvider: string | null;
  bankCode: string | null;
}

interface InitiatePaymentRequest {
  token: string;
  bookingId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
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

export function useTokenize() {
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
