import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from '@/contexts/SnackbarContext';
import { useTokenize, useInitiatePayment, usePaymentStatus } from '@/api/hooks/usePayments';
import type { TokenizeRequest } from '@/api/hooks/usePayments';
import { useCart } from '@/api/hooks/useCart';
import type { PaymentMethod } from '@/modules/checkout/types';

export function usePaymentFlow() {
  const navigate = useNavigate();
  const { t } = useTranslation('travelers');
  const { showError } = useSnackbar();

  const tokenize = useTokenize();
  const initiate = useInitiatePayment();
  const { data: cart, pricing } = useCart();

  const [paymentId, setPaymentId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const paymentStatus = usePaymentStatus(paymentId);

  const showPaymentError = useCallback(() => {
    showError(t('payment.errors.declined'));
  }, [showError, t]);

  useEffect(() => {
    if (!paymentStatus.data) return;

    if (paymentStatus.data.status === 'approved') {
      setIsProcessing(false);
      navigate(`/checkout/confirmation/${paymentId}`);
    } else if (paymentStatus.data.status === 'declined') {
      setIsProcessing(false);
      setPaymentId('');
      showPaymentError();
    }
  }, [paymentStatus.data, navigate, showPaymentError, paymentId]);

  const submitPayment = (payload: TokenizeRequest, method: PaymentMethod) => {
    if (isProcessing) return;

    setIsProcessing(true);

    tokenize.mutate(payload, {
      onSuccess: tokenData => {
        initiate.mutate(
          { token: tokenData.token, cartId: cart?.id ?? '', method },
          {
            onSuccess: paymentData => setPaymentId(paymentData.paymentId),
            onError: () => {
              setIsProcessing(false);
              showError(t('payment.errors.generic'));
            },
          }
        );
      },
      onError: () => {
        setIsProcessing(false);
        showError(t('payment.errors.tokenFailed'));
      },
    });
  };

  return {
    cart,
    pricing,
    isProcessing,
    isFormValid,
    setIsFormValid,
    submitPayment,
  };
}
