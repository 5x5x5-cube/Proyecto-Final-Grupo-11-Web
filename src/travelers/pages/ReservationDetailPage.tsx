import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HotelIcon from '@mui/icons-material/Hotel';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PlaceIcon from '@mui/icons-material/Place';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import WifiIcon from '@mui/icons-material/Wifi';
import FreeBreakfastIcon from '@mui/icons-material/FreeBreakfast';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import TvIcon from '@mui/icons-material/Tv';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import EmailIcon from '@mui/icons-material/Email';
import DownloadIcon from '@mui/icons-material/Download';
import ScheduleIcon from '@mui/icons-material/Schedule';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LuggageIcon from '@mui/icons-material/Luggage';
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../../contexts/LocaleContext';
import TravelerLayout from '../../design-system/layouts/TravelerLayout';
import StatusChip from '../../design-system/components/StatusChip';
import ReservationDetailPageSkeleton from './ReservationDetailPage.skeleton';
import SectionCard from '../../design-system/components/SectionCard';
import InfoGrid from '../../design-system/components/InfoGrid';
import RatingBadge from '../../design-system/components/RatingBadge';
import ModalOverlay from '../../design-system/components/ModalOverlay';
import {
  primary,
  onSurface,
  onSurfaceVariant,
  outline,
  outlineVariant,
  background,
  secondaryContainer,
  primaryContainer,
  success,
  successContainer,
  error,
  errorContainer,
  star,
} from '../../design-system/theme/palette';

/* ─── Main Page ─── */
const ReservationDetailPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const [confirmedOpen, setConfirmedOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);
  const { t } = useTranslation('travelers');
  const { formatPrice, formatDate, language } = useLocale();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const modal = params.get('modal');
    if (modal === 'confirmation') setConfirmedOpen(true);
    if (modal === 'cancel') setCancelOpen(true);
  }, []);

  if (loading) return <ReservationDetailPageSkeleton />;

  /* ─── Left Sidebar ─── */
  const UserSidebar: React.FC = () => {
    const menuItems = [
      { icon: <LuggageIcon sx={{ fontSize: 20 }} />, label: t('myReservations.sidebar.myReservations'), active: true, badge: '3' },
    ];

    const bottomItems = [
      { icon: <LogoutIcon sx={{ fontSize: 20 }} />, label: t('myReservations.sidebar.logout') },
    ];

    return (
      <Box
        sx={{
          width: 280,
          flexShrink: 0,
          background: '#fff',
          borderRight: `1px solid ${outlineVariant}`,
          padding: '32px 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {/* User card */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 12px',
            background: background,
            borderRadius: '12px',
            mb: '16px',
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: secondaryContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: 700,
              color: primary,
              flexShrink: 0,
            }}
          >
            C
          </Box>
          <Box>
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: onSurface }}>
              Carlos Mart&iacute;nez
            </Typography>
            <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>carlos.m@email.com</Typography>
          </Box>
        </Box>

        {/* Section title */}
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: onSurfaceVariant,
            letterSpacing: '0.8px',
            textTransform: 'uppercase',
            padding: '0 12px',
            mb: '8px',
          }}
        >
          {t('myReservations.sidebar.myAccount')}
        </Typography>

        {/* Menu items */}
        {menuItems.map((item) => (
          <Box
            key={item.label}
            component={item.active ? Link : 'div'}
            {...(item.active ? { to: '/reservations' } : {})}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '100px',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500,
              color: item.active ? primary : onSurfaceVariant,
              background: item.active ? secondaryContainer : 'transparent',
              textDecoration: 'none',
              '&:hover': {
                background: item.active ? secondaryContainer : 'rgba(0,0,0,0.04)',
              },
            }}
          >
            {item.icon}
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'inherit' }}>
              {item.label}
            </Typography>
            {item.badge && (
              <Box
                sx={{
                  ml: 'auto',
                  background: primary,
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '100px',
                }}
              >
                {item.badge}
              </Box>
            )}
          </Box>
        ))}

        {/* Divider */}
        <Box sx={{ height: 1, background: outlineVariant, my: '12px' }} />

        {/* Bottom items */}
        {bottomItems.map((item) => (
          <Box
            key={item.label}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              borderRadius: '100px',
              cursor: 'pointer',
              color: onSurfaceVariant,
              '&:hover': { background: 'rgba(0,0,0,0.04)' },
            }}
          >
            {item.icon}
            <Typography sx={{ fontSize: 14, fontWeight: 500, color: 'inherit' }}>
              {item.label}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  /* ─── Right Sidebar ─── */
  const RightSidebar: React.FC = () => (
    <Box
      sx={{
        width: 380,
        flexShrink: 0,
        background: '#fff',
        borderLeft: `1px solid ${outlineVariant}`,
        padding: '32px 28px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Price summary */}
      <Typography sx={{ fontSize: 17, fontWeight: 700, color: onSurface }}>{t('reservationDetail.priceSummary.title')}</Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {[
          { label: `${formatPrice(480000)} \u00D7 5 ${t('reservationDetail.priceSummary.nightsLabel')}`, value: formatPrice(2400000) },
          { label: t('reservationDetail.priceSummary.tourismTax'), value: formatPrice(96000) },
          { label: t('reservationDetail.priceSummary.vat'), value: formatPrice(168000) },
        ].map((row) => (
          <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontSize: 14, color: onSurfaceVariant }}>{row.label}</Typography>
            <Typography sx={{ fontSize: 14, color: onSurface }}>{row.value}</Typography>
          </Box>
        ))}
        <Divider sx={{ borderColor: outlineVariant }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography sx={{ fontSize: 16, fontWeight: 600, color: onSurface }}>{t('reservationDetail.priceSummary.totalPaid')}</Typography>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: primary }}>{formatPrice(2664000)}</Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: outlineVariant }} />

      {/* Cancel box */}
      <Box
        sx={{
          background: errorContainer,
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CancelIcon sx={{ fontSize: 18, color: error }} />
          <Typography sx={{ fontSize: 15, fontWeight: 600, color: error }}>{t('reservationDetail.cancelBox.title')}</Typography>
        </Box>
        <Typography sx={{ fontSize: 13, color: onSurfaceVariant, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: t('reservationDetail.cancelBox.description') }} />
        <Typography sx={{ fontSize: 14, fontWeight: 500, color: onSurface }}>
          {t('reservationDetail.cancelBox.estimatedRefund')} <strong style={{ color: success }}>{formatPrice(2664000)}</strong>
        </Typography>
        <Button
          onClick={() => setCancelOpen(true)}
          sx={{
            width: '100%',
            height: 44,
            background: 'transparent',
            border: `1.5px solid ${error}`,
            borderRadius: '100px',
            fontSize: 14,
            fontWeight: 600,
            color: error,
            textTransform: 'none',
            '&:hover': { background: 'rgba(179,38,30,0.04)' },
          }}
        >
          {t('reservationDetail.cancelBox.cancelButton')}
        </Button>
      </Box>

      {/* Download button */}
      <Button
        sx={{
          width: '100%',
          height: 40,
          background: 'transparent',
          border: `1px solid ${outline}`,
          borderRadius: '100px',
          fontSize: 13,
          fontWeight: 500,
          color: primary,
          textTransform: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          '&:hover': { background: 'rgba(0,104,116,0.04)' },
        }}
      >
        <DownloadIcon sx={{ fontSize: 16 }} />
        {t('reservationDetail.downloadReceipt')}
      </Button>
    </Box>
  );

  /* ─── Confirmed Modal ─── */
  const ReservationConfirmedModal: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
  }) => (
    <ModalOverlay
      open={open}
      onClose={onClose}
      icon={<CheckCircleIcon sx={{ fontSize: 24, color: success }} />}
      iconBg={successContainer}
      title={t('reservationDetail.confirmedModal.title')}
      subtitle={t('reservationDetail.confirmedModal.subtitle')}
      footer={
        <>
          <Button
            onClick={onClose}
            sx={{
              padding: '10px 24px',
              borderRadius: '100px',
              border: `1px solid ${outline}`,
              background: 'transparent',
              fontSize: 13,
              fontWeight: 600,
              color: onSurfaceVariant,
              textTransform: 'none',
            }}
          >
            {t('reservationDetail.confirmedModal.close')}
          </Button>
          <Button
            component={Link}
            to="/reservations"
            sx={{
              padding: '10px 24px',
              borderRadius: '100px',
              background: primary,
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              '&:hover': { background: primary, opacity: 0.9 },
            }}
          >
            <LuggageIcon sx={{ fontSize: 16 }} />
            {t('reservationDetail.confirmedModal.viewReservations')}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Email banner */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: primaryContainer,
            borderRadius: '12px',
          }}
        >
          <MarkEmailReadIcon sx={{ fontSize: 22, color: primary }} />
          <Box>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: primary }}>
              {t('reservationDetail.confirmedModal.emailSent')}
            </Typography>
            <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>
              carlos.mendoza@email.com
            </Typography>
          </Box>
        </Box>

        {/* Booking summary section */}
        <Box sx={{ background: background, borderRadius: '12px', padding: '16px' }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: outline,
              mb: '10px',
            }}
          >
            {t('reservationDetail.confirmedModal.bookingSummary')}
          </Typography>
          {[
            { label: t('reservationDetail.confirmedModal.hotel'), value: 'Hotel Santa Clara Sofitel' },
            { label: t('reservationDetail.confirmedModal.checkIn'), value: `${formatDate('2026-03-15T15:00:00', 'mediumWithDay')} \u2014 ${new Date('2026-03-15T15:00:00').toLocaleTimeString(language === 'ES' ? 'es' : 'en', { hour: 'numeric', minute: '2-digit' })}` },
            { label: t('reservationDetail.confirmedModal.checkOut'), value: `${formatDate('2026-03-20T12:00:00', 'mediumWithDay')} \u2014 ${new Date('2026-03-20T12:00:00').toLocaleTimeString(language === 'ES' ? 'es' : 'en', { hour: 'numeric', minute: '2-digit' })}` },
            { label: t('reservationDetail.confirmedModal.duration'), value: '5 noches' },
            { label: t('reservationDetail.confirmedModal.room'), value: 'Habitaci\u00f3n Superior' },
            { label: t('reservationDetail.confirmedModal.guests'), value: '2 adultos' },
          ].map((row) => (
            <Box
              key={row.label}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 0',
              }}
            >
              <Typography sx={{ fontSize: 13, color: onSurfaceVariant }}>{row.label}</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: onSurface }}>{row.value}</Typography>
            </Box>
          ))}
          <Divider sx={{ borderColor: outlineVariant, my: '4px' }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '4px 0',
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: onSurface }}>{t('reservationDetail.confirmedModal.total')}</Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: primary }}>{formatPrice(2664000)}</Typography>
          </Box>
        </Box>

        {/* Next steps */}
        <Box sx={{ background: background, borderRadius: '12px', padding: '16px' }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: outline,
              mb: '10px',
            }}
          >
            {t('reservationDetail.confirmedModal.whatsNext')}
          </Typography>
          {[
            {
              icon: <EmailIcon sx={{ fontSize: 14, color: success }} />,
              text: t('reservationDetail.confirmedModal.voucherSent'),
            },
            {
              icon: <MeetingRoomIcon sx={{ fontSize: 14, color: success }} />,
              text: t('reservationDetail.confirmedModal.roomReserved'),
            },
          ].map((step, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '6px 0' }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: successContainer,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </Box>
              <Typography sx={{ fontSize: 13, color: onSurfaceVariant, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: step.text }} />
            </Box>
          ))}
        </Box>
      </Box>
    </ModalOverlay>
  );

  /* ─── Cancel Modal ─── */
  const ReservationCancelModal: React.FC<{ open: boolean; onClose: () => void }> = ({
    open,
    onClose,
  }) => (
    <ModalOverlay
      open={open}
      onClose={onClose}
      icon={<CancelIcon sx={{ fontSize: 24, color: error }} />}
      iconBg={errorContainer}
      title={t('reservationDetail.cancelModal.title')}
      subtitle={t('reservationDetail.cancelModal.subtitle')}
      footer={
        <>
          <Button
            onClick={onClose}
            sx={{
              padding: '10px 24px',
              borderRadius: '100px',
              border: `1px solid ${outline}`,
              background: 'transparent',
              fontSize: 13,
              fontWeight: 600,
              color: onSurfaceVariant,
              textTransform: 'none',
            }}
          >
            {t('reservationDetail.cancelModal.goBack')}
          </Button>
          <Button
            sx={{
              padding: '10px 24px',
              borderRadius: '100px',
              background: error,
              fontSize: 13,
              fontWeight: 600,
              color: '#fff',
              textTransform: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              '&:hover': { background: error, opacity: 0.9 },
            }}
          >
            <CancelIcon sx={{ fontSize: 16 }} />
            {t('reservationDetail.cancelModal.confirmCancellation')}
          </Button>
        </>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Cancellation policy section */}
        <Box sx={{ background: background, borderRadius: '12px', padding: '16px' }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: outline,
              mb: '10px',
            }}
          >
            {t('reservationDetail.cancelModal.policyApplied')}
          </Typography>
          {[
            { label: t('reservationDetail.cancelModal.cancellationType'), value: t('reservationDetail.cancelModal.cancellationTypeValue'), color: success },
            { label: t('reservationDetail.cancelModal.deadlineLabel'), value: formatDate('2026-03-12', 'medium'), color: onSurface },
            { label: t('reservationDetail.cancelModal.currentDateLabel'), value: formatDate('2026-03-05', 'medium'), color: onSurface },
            { label: t('reservationDetail.cancelModal.penaltyApplied'), value: t('reservationDetail.cancelModal.penaltyValue'), color: success },
          ].map((row) => (
            <Box
              key={row.label}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 0',
              }}
            >
              <Typography sx={{ fontSize: 13, color: onSurfaceVariant }}>{row.label}</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: row.color }}>{row.value}</Typography>
            </Box>
          ))}
        </Box>

        {/* Refund breakdown section */}
        <Box sx={{ background: background, borderRadius: '12px', padding: '16px' }}>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              color: outline,
              mb: '10px',
            }}
          >
            {t('reservationDetail.cancelModal.refundBreakdown')}
          </Typography>
          {[
            { label: t('reservationDetail.cancelModal.originalAmount'), value: formatPrice(2664000), color: onSurface },
            { label: t('reservationDetail.cancelModal.cancellationPenalty'), value: `-${formatPrice(0)}`, color: success },
          ].map((row) => (
            <Box
              key={row.label}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 0',
              }}
            >
              <Typography sx={{ fontSize: 13, color: onSurfaceVariant }}>{row.label}</Typography>
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: row.color }}>{row.value}</Typography>
            </Box>
          ))}
          <Divider sx={{ borderColor: outlineVariant, my: '4px' }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 14px',
              background: successContainer,
              borderRadius: '10px',
              mt: '4px',
            }}
          >
            <Typography sx={{ fontSize: 14, fontWeight: 600, color: success }}>
              {t('reservationDetail.cancelModal.totalRefund')}
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: 700, color: success }}>{formatPrice(2664000)}</Typography>
          </Box>
        </Box>

        {/* Refund method */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 14px',
            background: '#FAFDFE',
            borderRadius: '10px',
            border: `1px solid ${outlineVariant}`,
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #006874, #004F58)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CreditCardIcon sx={{ fontSize: 16, color: '#fff' }} />
          </Box>
          <Box>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: onSurface }}>
              {t('reservationDetail.cancelModal.refundMethod')}
            </Typography>
            <Typography sx={{ fontSize: 11, color: outline }}>
              {t('reservationDetail.cancelModal.samePaymentMethod')}
            </Typography>
          </Box>
        </Box>

        {/* Timeline */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ScheduleIcon sx={{ fontSize: 16, color: primary }} />
          <Typography sx={{ fontSize: 12, color: onSurfaceVariant }} dangerouslySetInnerHTML={{ __html: t('reservationDetail.cancelModal.estimatedTime') }} />
        </Box>
      </Box>
    </ModalOverlay>
  );

  const roomAmenities = [
    { icon: <WifiIcon sx={{ fontSize: 12 }} />, label: t('reservationDetail.roomAmenities.wifi') },
    { icon: <FreeBreakfastIcon sx={{ fontSize: 12 }} />, label: t('reservationDetail.roomAmenities.breakfast') },
    { icon: <AcUnitIcon sx={{ fontSize: 12 }} />, label: t('reservationDetail.roomAmenities.ac') },
    { icon: <TvIcon sx={{ fontSize: 12 }} />, label: t('reservationDetail.roomAmenities.smartTv') },
    { icon: <LocalBarIcon sx={{ fontSize: 12 }} />, label: t('reservationDetail.roomAmenities.minibar') },
  ];

  return (
    <TravelerLayout variant="reservations">
      <Box sx={{ display: 'flex', margin: '-32px -48px', minHeight: 'calc(100vh - 64px)' }}>
        {/* Left sidebar */}
        <UserSidebar />

        {/* Center: main content + right sidebar */}
        <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Main content */}
          <Box
            sx={{
              flex: 1,
              padding: '36px 48px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {/* Page header */}
            <Box>
              <Link
                to="/reservations"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: 14,
                  color: primary,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                <ArrowBackIcon sx={{ fontSize: 18 }} />
                {t('reservationDetail.backToReservations')}
              </Link>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', mt: '4px' }}>
                <Typography sx={{ fontSize: 26, fontWeight: 700, color: onSurface }}>
                  {t('reservationDetail.title')}
                </Typography>
                <StatusChip status="confirmed" />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Typography sx={{ fontSize: 14, color: onSurfaceVariant }}>
                  {t('reservationDetail.bookingCode')}{' '}
                  <strong style={{ color: primary, fontWeight: 600 }}>TH-2026-48291</strong>
                </Typography>
              </Box>

              {/* Trigger buttons for modals */}
              <Box sx={{ display: 'flex', gap: '12px', mt: '12px' }}>
                <Button
                  onClick={() => setConfirmedOpen(true)}
                  size="small"
                  sx={{
                    padding: '6px 16px',
                    borderRadius: '100px',
                    background: successContainer,
                    fontSize: 12,
                    fontWeight: 600,
                    color: success,
                    textTransform: 'none',
                    '&:hover': { background: successContainer, opacity: 0.9 },
                  }}
                >
                  <CheckCircleIcon sx={{ fontSize: 14, mr: '4px' }} />
                  {t('reservationDetail.viewConfirmation')}
                </Button>
              </Box>
            </Box>

            {/* Hotel info section */}
            <SectionCard icon={<HotelIcon sx={{ color: primary }} />} title={t('reservationDetail.accommodation')}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Hotel row */}
                <Box sx={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #003740, #006874)',
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: primary,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {t('reservationDetail.hotelType')}
                    </Typography>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, color: onSurface }}>
                      Hotel Santa Clara Sofitel
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <PlaceIcon sx={{ fontSize: 14, color: onSurfaceVariant }} />
                      <Typography sx={{ fontSize: 13, color: onSurfaceVariant }}>
                        Calle del Torno #39-29, Centro Hist&oacute;rico, Cartagena
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <RatingBadge rating={4.8} />
                      <Typography sx={{ color: star, fontSize: 13 }}>&#9733;&#9733;&#9733;&#9733;&#9733;</Typography>
                      <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>312 {t('reservationDetail.reviews')}</Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ borderColor: outlineVariant }} />

                {/* Info grid */}
                <InfoGrid
                  columns={4}
                  items={[
                    { label: t('reservationDetail.infoGrid.checkIn'), value: formatDate('2026-03-15', 'mediumWithDay'), sub: '3:00 PM' },
                    { label: t('reservationDetail.infoGrid.checkOut'), value: formatDate('2026-03-20', 'mediumWithDay'), sub: '12:00 PM' },
                    { label: t('reservationDetail.infoGrid.duration'), value: t('reservationDetail.infoGrid.durationValue'), sub: t('reservationDetail.infoGrid.durationSub') },
                    { label: t('reservationDetail.infoGrid.guests'), value: t('reservationDetail.infoGrid.guestsValue'), sub: t('reservationDetail.infoGrid.guestsSub') },
                  ]}
                />

                {/* Room row */}
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 18px',
                    background: background,
                    borderRadius: '12px',
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #006874, #4A9FAA)',
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 600, color: onSurface, mb: '4px' }}>
                      Habitaci&oacute;n Superior
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: onSurfaceVariant }}>
                      {t('reservationDetail.roomFeatures')}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: '8px', flexWrap: 'wrap', mt: '6px' }}>
                      {roomAmenities.map((amenity) => (
                        <Box
                          key={amenity.label}
                          sx={{
                            fontSize: 11,
                            color: onSurfaceVariant,
                            background: '#fff',
                            border: `1px solid ${outlineVariant}`,
                            padding: '3px 10px',
                            borderRadius: '100px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          {amenity.icon}
                          {amenity.label}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </SectionCard>

            {/* Payment history section */}
            <SectionCard icon={<ReceiptLongIcon sx={{ color: primary }} />} title={t('reservationDetail.paymentHistory.title')}>
              <Box sx={{ gap: 0, padding: '0' }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '14px 0',
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: successContainer,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <CheckCircleIcon sx={{ fontSize: 20, color: success }} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 500, color: onSurface }}>
                      {t('reservationDetail.paymentHistory.bookingPayment')}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>
                      {formatDate('2026-02-15', 'medium')} &middot; 10:34 a.m.
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CreditCardIcon sx={{ fontSize: 14, color: onSurfaceVariant }} />
                      <Typography sx={{ fontSize: 12, color: onSurfaceVariant }}>
                        VISA &bull;&bull;&bull;&bull; 4242
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      textAlign: 'right',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      alignItems: 'flex-end',
                    }}
                  >
                    <Typography sx={{ fontSize: 16, fontWeight: 600, color: success }}>
                      {formatPrice(2664000)}
                    </Typography>
                    <Box
                      sx={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: '100px',
                        background: successContainer,
                        color: success,
                      }}
                    >
                      {t('reservationDetail.paymentHistory.approved')}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </SectionCard>
          </Box>

          {/* Right sidebar */}
          <RightSidebar />
        </Box>
      </Box>

      {/* Modals */}
      <ReservationConfirmedModal open={confirmedOpen} onClose={() => setConfirmedOpen(false)} />
      <ReservationCancelModal open={cancelOpen} onClose={() => setCancelOpen(false)} />
    </TravelerLayout>
  );
};

export default ReservationDetailPage;
