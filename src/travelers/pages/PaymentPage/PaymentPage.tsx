import { useRef, useCallback } from 'react';
import CheckoutLayout from '@/design-system/layouts/CheckoutLayout';
import { usePaymentFlow } from '@/modules/checkout/hooks/usePaymentForm';
import PaymentSidebar from '@/modules/checkout/components/PaymentSidebar/PaymentSidebar';
import ProcessingOverlay from '@/modules/checkout/components/ProcessingOverlay/ProcessingOverlay';
import PaymentMethodForm from '@/modules/checkout/components/PaymentMethodForm/PaymentMethodForm';
import type { PaymentMethodFormHandle } from '@/modules/checkout/components/PaymentMethodForm/PaymentMethodForm';

export default function PaymentPage() {
  const formRef = useRef<PaymentMethodFormHandle>(null);
  const flow = usePaymentFlow();

  const handlePay = useCallback(() => {
    const handle = formRef.current;
    if (!handle?.isFormValid) return;

    const payload = handle.buildTokenizePayload();
    if (!payload) return;

    flow.submitPayment(payload, handle.selectedMethod);
  }, [flow]);

  return (
    <CheckoutLayout
      currentStep={3}
      sidebar={
        <PaymentSidebar
          cart={flow.cart}
          pricing={flow.pricing}
          isFormValid={flow.isFormValid}
          isProcessing={flow.isProcessing}
          onPay={handlePay}
        />
      }
    >
      <ProcessingOverlay visible={flow.isProcessing} />
      <PaymentMethodForm ref={formRef} onValidityChange={flow.setIsFormValid} />
    </CheckoutLayout>
  );
}
