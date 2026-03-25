import React, { createContext, useContext, useState } from 'react';

type Language = 'ES' | 'EN';
type Currency = 'COP' | 'USD' | 'MXN' | 'ARS' | 'CLP' | 'PEN';

interface LocaleContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (cur: Currency) => void;
  formatPrice: (copAmount: number) => string;
}

const exchangeRates: Record<Currency, { rate: number; symbol: string; decimals: number }> = {
  COP: { rate: 1, symbol: 'COP', decimals: 0 },
  USD: { rate: 0.00024, symbol: 'USD', decimals: 2 },
  MXN: { rate: 0.0041, symbol: 'MXN', decimals: 0 },
  ARS: { rate: 0.21, symbol: 'ARS', decimals: 0 },
  CLP: { rate: 0.22, symbol: 'CLP', decimals: 0 },
  PEN: { rate: 0.00089, symbol: 'PEN', decimals: 2 },
};

const currencyNames: Record<Currency, string> = {
  COP: 'Peso colombiano',
  USD: 'Dólar estadounidense',
  MXN: 'Peso mexicano',
  ARS: 'Peso argentino',
  CLP: 'Peso chileno',
  PEN: 'Sol peruano',
};

const languageNames: Record<Language, string> = {
  ES: 'Español',
  EN: 'English',
};

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ES');
  const [currency, setCurrency] = useState<Currency>('COP');

  const formatPrice = (copAmount: number): string => {
    const { rate, symbol, decimals } = exchangeRates[currency];
    const converted = copAmount * rate;
    const formatted = converted.toLocaleString('es-CO', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    return `${symbol} ${formatted}`;
  };

  return (
    <LocaleContext.Provider value={{ language, currency, setLanguage, setCurrency, formatPrice }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}

export { currencyNames, languageNames };
export type { Language, Currency };
