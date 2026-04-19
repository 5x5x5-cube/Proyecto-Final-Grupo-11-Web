import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePaymentMethodForm } from './usePaymentMethodForm';

describe('usePaymentMethodForm', () => {
  it('defaults to credit_card method', () => {
    const { result } = renderHook(() => usePaymentMethodForm());
    expect(result.current.selectedMethod).toBe('credit_card');
  });

  it('starts with invalid form', () => {
    const { result } = renderHook(() => usePaymentMethodForm());
    expect(result.current.isFormValid).toBe(false);
  });

  it('validates a complete card form with valid Luhn', () => {
    const { result } = renderHook(() => usePaymentMethodForm());

    act(() => {
      result.current.setRawCardDigits('4242424242424242');
      result.current.setCardHolder('Test User');
      result.current.setExpiry('12/28');
      result.current.setCvv('123');
    });

    expect(result.current.isFormValid).toBe(true);
    expect(result.current.cardNumberError).toBe(false);
  });

  it('shows card number error for invalid Luhn', () => {
    const { result } = renderHook(() => usePaymentMethodForm());

    act(() => {
      result.current.setRawCardDigits('1233233234324323');
    });

    expect(result.current.cardNumberError).toBe(true);
    expect(result.current.isFormValid).toBe(false);
  });

  it('shows expiry error for past date', () => {
    const { result } = renderHook(() => usePaymentMethodForm());

    act(() => {
      result.current.setExpiry('01/20');
    });

    expect(result.current.expiryError).toBe(true);
  });

  it('does not show expiry error for future date', () => {
    const { result } = renderHook(() => usePaymentMethodForm());

    act(() => {
      result.current.setExpiry('12/30');
    });

    expect(result.current.expiryError).toBe(false);
  });

  it('validates wallet form', () => {
    const { result } = renderHook(() => usePaymentMethodForm());

    act(() => {
      result.current.setSelectedMethod('digital_wallet');
      result.current.setWalletProvider('paypal');
      result.current.setWalletEmail('test@example.com');
    });

    expect(result.current.isFormValid).toBe(true);
  });

  it('validates transfer form', () => {
    const { result } = renderHook(() => usePaymentMethodForm());

    act(() => {
      result.current.setSelectedMethod('transfer');
      result.current.setBankCode('007');
      result.current.setAccountNumber('123456789');
      result.current.setAccountHolder('Test User');
    });

    expect(result.current.isFormValid).toBe(true);
  });

  it('builds correct tokenize payload for card', () => {
    const { result } = renderHook(() => usePaymentMethodForm());

    act(() => {
      result.current.setRawCardDigits('4242424242424242');
      result.current.setCardHolder('Test');
      result.current.setExpiry('12/28');
      result.current.setCvv('123');
    });

    const payload = result.current.buildTokenizePayload();
    expect(payload).toEqual({
      method: 'credit_card',
      cardNumber: '4242424242424242',
      cardHolder: 'Test',
      expiry: '12/28',
      cvv: '123',
    });
  });

  it('builds correct tokenize payload for wallet', () => {
    const { result } = renderHook(() => usePaymentMethodForm());

    act(() => {
      result.current.setSelectedMethod('digital_wallet');
      result.current.setWalletProvider('paypal');
      result.current.setWalletEmail('a@b.com');
    });

    expect(result.current.buildTokenizePayload()).toEqual({
      method: 'digital_wallet',
      walletProvider: 'paypal',
      walletEmail: 'a@b.com',
    });
  });

  it('builds correct tokenize payload for transfer', () => {
    const { result } = renderHook(() => usePaymentMethodForm());

    act(() => {
      result.current.setSelectedMethod('transfer');
      result.current.setBankCode('007');
      result.current.setAccountNumber('123456');
      result.current.setAccountHolder('Ada');
    });

    expect(result.current.buildTokenizePayload()).toEqual({
      method: 'transfer',
      bankCode: '007',
      accountNumber: '123456',
      accountHolder: 'Ada',
    });
  });
});
