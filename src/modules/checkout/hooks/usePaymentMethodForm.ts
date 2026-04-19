import { useState } from 'react';
import type { PaymentMethod, WalletProvider } from '@/modules/checkout/types';
import type { TokenizeRequest } from '@/api/hooks/usePayments';
import { isValidLuhn } from '@/modules/checkout/utils/luhn';

export function usePaymentMethodForm() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit_card');

  // Card fields
  const [rawCardDigits, setRawCardDigits] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [, setCurrency] = useState('COP');

  // Wallet fields
  const [walletProvider, setWalletProvider] = useState<WalletProvider | ''>('');
  const [walletEmail, setWalletEmail] = useState('');

  // Transfer fields
  const [bankCode, setBankCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountHolder, setAccountHolder] = useState('');

  // Card validation
  const isCardNumberComplete = rawCardDigits.length === 16;
  const isCardNumberValid = isCardNumberComplete && isValidLuhn(rawCardDigits);

  const isExpiryFormatValid = /^\d{2}\/\d{2}$/.test(expiry);
  const isExpiryNotExpired = (() => {
    if (!isExpiryFormatValid) return true;
    const [mm, yy] = expiry.split('/').map(Number);
    const expiryDate = new Date(2000 + yy, mm);
    return expiryDate > new Date();
  })();
  const isExpiryValid = isExpiryFormatValid && isExpiryNotExpired;

  const isCardFormValid =
    isCardNumberValid && isExpiryValid && cvv.length === 3 && cardHolder.trim().length > 0;

  // Wallet validation
  const isWalletFormValid = walletProvider !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(walletEmail);

  // Transfer validation
  const isTransferFormValid =
    bankCode !== '' && accountNumber.length >= 6 && accountHolder.trim().length > 0;

  const isFormValid =
    (selectedMethod === 'credit_card' && isCardFormValid) ||
    (selectedMethod === 'digital_wallet' && isWalletFormValid) ||
    (selectedMethod === 'transfer' && isTransferFormValid);

  const buildTokenizePayload = (): TokenizeRequest | null => {
    if (selectedMethod === 'credit_card') {
      return { method: 'credit_card', cardNumber: rawCardDigits, cardHolder, expiry, cvv };
    }
    if (selectedMethod === 'digital_wallet' && walletProvider !== '') {
      return { method: 'digital_wallet', walletProvider, walletEmail };
    }
    if (selectedMethod === 'transfer') {
      return { method: 'transfer', bankCode, accountNumber, accountHolder };
    }
    return null;
  };

  return {
    // Method
    selectedMethod,
    setSelectedMethod,

    // Card
    rawCardDigits,
    setRawCardDigits,
    cardHolder,
    setCardHolder,
    expiry,
    setExpiry,
    cvv,
    setCvv,
    setCurrency,
    cardNumberError: isCardNumberComplete && !isCardNumberValid,
    expiryError: isExpiryFormatValid && !isExpiryNotExpired,

    // Wallet
    walletProvider,
    setWalletProvider,
    walletEmail,
    setWalletEmail,

    // Transfer
    bankCode,
    setBankCode,
    accountNumber,
    setAccountNumber,
    accountHolder,
    setAccountHolder,

    // Computed
    isFormValid,
    buildTokenizePayload,
  };
}
