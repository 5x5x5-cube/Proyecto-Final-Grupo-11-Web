import React, { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../i18n';

type Language = 'ES' | 'EN';
type Currency = 'COP' | 'USD' | 'MXN' | 'ARS' | 'CLP' | 'PEN';
type DateFormat = 'short' | 'shortWithDay' | 'medium' | 'mediumWithDay' | 'monthYear' | 'monthOnly';

const dateFormatOptions: Record<DateFormat, Intl.DateTimeFormatOptions> = {
  short: { day: 'numeric', month: 'short' },
  shortWithDay: { weekday: 'short', day: 'numeric', month: 'short' },
  medium: { day: 'numeric', month: 'short', year: 'numeric' },
  mediumWithDay: { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' },
  monthYear: { month: 'short', year: 'numeric' },
  monthOnly: { month: 'short' },
};

interface LocaleContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (cur: Currency) => void;
  formatPrice: (copAmount: number) => string;
  formatDate: (date: string | Date, format: DateFormat) => string;
  /** Set by ?open=language|currency URL param — consumed once by LocaleSelector */
  autoOpen: 'language' | 'currency' | null;
  clearAutoOpen: () => void;
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

export const LANGUAGES: Language[] = Object.keys(languageNames) as Language[];
export const CURRENCIES: Currency[] = Object.keys(currencyNames) as Currency[];

const LocaleContext = createContext<LocaleContextType | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const params = new URLSearchParams(window.location.search);
  const initLang = params.get('lang')?.toUpperCase();
  const initCur = params.get('currency')?.toUpperCase();
  const openParam = params.get('open');

  const [language, setLanguage] = useState<Language>(initLang === 'EN' ? 'EN' : 'ES');
  const [currency, setCurrency] = useState<Currency>(
    initCur && initCur in exchangeRates ? (initCur as Currency) : 'COP'
  );
  const [autoOpen, setAutoOpen] = useState<'language' | 'currency' | null>(
    openParam === 'language' || openParam === 'currency' ? openParam : null
  );
  const clearAutoOpen = () => setAutoOpen(null);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  const formatDate = (date: string | Date, format: DateFormat): string => {
    const d = typeof date === 'string' ? new Date(date) : date;
    const locale = language === 'ES' ? 'es' : 'en';
    return new Intl.DateTimeFormat(locale, dateFormatOptions[format]).format(d);
  };

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
    <LocaleContext.Provider
      value={{
        language,
        currency,
        setLanguage,
        setCurrency,
        formatPrice,
        formatDate,
        autoOpen,
        clearAutoOpen,
      }}
    >
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
export type { Language, Currency, DateFormat };
