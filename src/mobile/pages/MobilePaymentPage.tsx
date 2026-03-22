import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MobileShell from '../components/MobileShell';
import { palette } from '../../design-system/theme/palette';

export default function MobilePaymentPage() {
  const { t } = useTranslation('mobile');
  const [selected, setSelected] = useState<string>('credit');

  const paymentMethods = [
    { key: 'credit', label: t('payment.creditCard'), icon: CreditCardIcon },
    { key: 'debit', label: t('payment.debitCard'), icon: AccountBalanceIcon },
    { key: 'wallet', label: t('payment.digitalWallet'), icon: AccountBalanceWalletIcon },
    { key: 'transfer', label: t('payment.transfer'), icon: SwapHorizIcon },
  ] as const;

  return (
    <MobileShell hideNav>
      {/* Top Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          px: '16px',
          py: '12px',
          borderBottom: `1px solid ${palette.outlineVariant}`,
          background: '#fff',
        }}
      >
        <Box component={Link} to="/mobile/checkout" sx={{ color: palette.onSurface, display: 'flex' }}>
          <ArrowBackIcon sx={{ fontSize: 22 }} />
        </Box>
        <Typography sx={{ fontSize: 16, fontWeight: 600, color: palette.onSurface }}>
          {t('payment.title')}
        </Typography>
      </Box>

      <Box sx={{ px: '16px', pt: '16px', pb: '90px' }}>
        {/* Payment method grid */}
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.onSurface, mb: '10px' }}>
          {t('payment.selectMethod')}
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', mb: '20px' }}>
          {paymentMethods.map((method) => {
            const isActive = selected === method.key;
            const Icon = method.icon;
            return (
              <Box
                key={method.key}
                onClick={() => setSelected(method.key)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                  py: '16px',
                  borderRadius: '12px',
                  border: `2px solid ${isActive ? palette.primary : palette.outlineVariant}`,
                  background: isActive ? palette.primaryContainer : '#fff',
                  cursor: 'pointer',
                }}
              >
                <Icon sx={{ fontSize: 24, color: isActive ? palette.primary : palette.onSurfaceVariant }} />
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? palette.primary : palette.onSurfaceVariant,
                    textAlign: 'center',
                  }}
                >
                  {method.label}
                </Typography>
              </Box>
            );
          })}
        </Box>

        {/* Card Form (shown for credit/debit) */}
        {(selected === 'credit' || selected === 'debit') && (
          <Box
            sx={{
              background: '#fff',
              borderRadius: '12px',
              border: `1px solid ${palette.outlineVariant}`,
              p: '16px',
              mb: '16px',
            }}
          >
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.onSurface, mb: '14px' }}>
              {t('payment.cardDetails')}
            </Typography>

            {/* Numero */}
            <Box sx={{ mb: '12px' }}>
              <Typography sx={{ fontSize: 11, fontWeight: 600, color: palette.onSurfaceVariant, mb: '4px' }}>
                {t('payment.cardNumber')}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  border: `1px solid ${palette.outlineVariant}`,
                  borderRadius: '10px',
                  px: '12px',
                  py: '10px',
                }}
              >
                <CreditCardIcon sx={{ fontSize: 18, color: palette.onSurfaceVariant }} />
                <Typography sx={{ fontSize: 14, color: palette.onSurface }}>
                  4242 •••• •••• ••••
                </Typography>
              </Box>
            </Box>

            {/* Titular */}
            <Box sx={{ mb: '12px' }}>
              <Typography sx={{ fontSize: 11, fontWeight: 600, color: palette.onSurfaceVariant, mb: '4px' }}>
                {t('payment.cardHolder')}
              </Typography>
              <Box
                sx={{
                  border: `1px solid ${palette.outlineVariant}`,
                  borderRadius: '10px',
                  px: '12px',
                  py: '10px',
                }}
              >
                <Typography sx={{ fontSize: 14, color: palette.onSurface }}>
                  Carlos Martinez
                </Typography>
              </Box>
            </Box>

            {/* Vencimiento + CVV row */}
            <Box sx={{ display: 'flex', gap: '10px' }}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 600, color: palette.onSurfaceVariant, mb: '4px' }}>
                  {t('payment.expiry')}
                </Typography>
                <Box
                  sx={{
                    border: `1px solid ${palette.outlineVariant}`,
                    borderRadius: '10px',
                    px: '12px',
                    py: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: 14, color: palette.onSurface }}>12/28</Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: 11, fontWeight: 600, color: palette.onSurfaceVariant, mb: '4px' }}>
                  {t('payment.cvv')}
                </Typography>
                <Box
                  sx={{
                    border: `1px solid ${palette.outlineVariant}`,
                    borderRadius: '10px',
                    px: '12px',
                    py: '10px',
                  }}
                >
                  <Typography sx={{ fontSize: 14, color: palette.onSurface }}>•••</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* Mini summary */}
        <Box
          sx={{
            background: '#fff',
            borderRadius: '12px',
            border: `1px solid ${palette.outlineVariant}`,
            p: '14px',
            mb: '14px',
          }}
        >
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.onSurface, mb: '6px' }}>
            Hotel Estelar Cartagena
          </Typography>
          <Typography sx={{ fontSize: 12, color: palette.onSurfaceVariant }}>
            Sab 15 mar – Jue 20 mar · {t('payment.nights', { count: 5 })}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: '8px' }}>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: palette.onSurface }}>{t('payment.total')}</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 700, color: palette.primary }}>COP 2.664.000</Typography>
          </Box>
        </Box>

        {/* Security note */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', mb: '8px' }}>
          <LockOutlinedIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
          <Typography sx={{ fontSize: 11, color: palette.onSurfaceVariant }}>
            {t('payment.securityNote')}
          </Typography>
        </Box>
      </Box>

      {/* Sticky Bottom */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: '#fff',
          borderTop: `1px solid ${palette.outlineVariant}`,
          px: '16px',
          py: '12px',
        }}
      >
        <Box
          component={Link}
          to="/mobile/success"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: palette.primary,
            color: '#fff',
            borderRadius: '12px',
            py: '14px',
            textDecoration: 'none',
            fontSize: 15,
            fontWeight: 600,
            width: '100%',
          }}
        >
          {t('payment.payButton', { amount: 'COP 2.664.000' })}
        </Box>
      </Box>
    </MobileShell>
  );
}
