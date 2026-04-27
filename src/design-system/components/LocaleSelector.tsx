import { useState, useRef, useEffect } from 'react';
import { Menu, MenuItem } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  useLocale,
  currencyNames,
  languageNames,
  LANGUAGES,
  CURRENCIES,
} from '@/contexts/LocaleContext';
import { onSurfaceVariant } from '../theme/palette';
import { SelectorRow, SelectorPill, SelectorLabel } from './LocaleSelector.styles';

export default function LocaleSelector() {
  const { language, currency, setLanguage, setCurrency, autoOpen, clearAutoOpen } = useLocale();
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);
  const [curAnchor, setCurAnchor] = useState<null | HTMLElement>(null);
  const langRef = useRef<HTMLDivElement>(null);
  const curRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoOpen === 'language' && langRef.current) {
      setLangAnchor(langRef.current);
      clearAutoOpen();
    } else if (autoOpen === 'currency' && curRef.current) {
      setCurAnchor(curRef.current);
      clearAutoOpen();
    }
  }, [autoOpen, clearAutoOpen]);

  return (
    <SelectorRow>
      {/* Language */}
      <SelectorPill ref={langRef} onClick={e => setLangAnchor(e.currentTarget)}>
        <LanguageIcon sx={{ fontSize: 16, color: onSurfaceVariant }} />
        <SelectorLabel>{language}</SelectorLabel>
        <KeyboardArrowDownIcon sx={{ fontSize: 16, color: onSurfaceVariant }} />
      </SelectorPill>
      <Menu
        anchorEl={langAnchor}
        open={Boolean(langAnchor)}
        onClose={() => setLangAnchor(null)}
        slotProps={{ paper: { sx: { borderRadius: '12px', mt: '4px', minWidth: 180 } } }}
      >
        {LANGUAGES.map(lang => (
          <MenuItem
            key={lang}
            selected={lang === language}
            onClick={() => {
              setLanguage(lang);
              setLangAnchor(null);
            }}
            sx={{ fontSize: 13 }}
          >
            {lang} — {languageNames[lang]}
          </MenuItem>
        ))}
      </Menu>

      {/* Currency */}
      <SelectorPill ref={curRef} onClick={e => setCurAnchor(e.currentTarget)}>
        <SelectorLabel>{currency}</SelectorLabel>
        <KeyboardArrowDownIcon sx={{ fontSize: 16, color: onSurfaceVariant }} />
      </SelectorPill>
      <Menu
        anchorEl={curAnchor}
        open={Boolean(curAnchor)}
        onClose={() => setCurAnchor(null)}
        slotProps={{ paper: { sx: { borderRadius: '12px', mt: '4px', minWidth: 220 } } }}
      >
        {CURRENCIES.map(cur => (
          <MenuItem
            key={cur}
            selected={cur === currency}
            onClick={() => {
              setCurrency(cur);
              setCurAnchor(null);
            }}
            sx={{ fontSize: 13 }}
          >
            {cur} — {currencyNames[cur]}
          </MenuItem>
        ))}
      </Menu>
    </SelectorRow>
  );
}
