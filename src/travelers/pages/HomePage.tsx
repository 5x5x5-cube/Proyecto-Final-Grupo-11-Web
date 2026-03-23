import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TravelerNav from '../../design-system/layouts/TravelerNav';
import { palette } from '../../design-system/theme/palette';
import { mockDestinations } from '../data/mockDestinations';
import { useLocale } from '../../contexts/LocaleContext';

const basePrices = [120000, 95000, 85000, 110000, 78000];

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const CHECK_IN_OPTIONS = [
  { label: 'Today', date: addDays(today, 0) },
  { label: 'Tomorrow', date: addDays(today, 1) },
  { label: 'In 3 days', date: addDays(today, 3) },
  { label: 'In 1 week', date: addDays(today, 7) },
  { label: 'In 2 weeks', date: addDays(today, 14) },
];

function getCheckOutOptions(checkIn: Date): { label: string; date: Date }[] {
  return [
    { label: '+1 day', date: addDays(checkIn, 1) },
    { label: '+2 days', date: addDays(checkIn, 2) },
    { label: '+3 days', date: addDays(checkIn, 3) },
    { label: '+1 week', date: addDays(checkIn, 7) },
    { label: '+2 weeks', date: addDays(checkIn, 14) },
  ];
}

export default function HomePage() {
  const navigate = useNavigate();
  const { formatPrice } = useLocale();
  const { t } = useTranslation('travelers');

  // Search state
  const [destination, setDestination] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  // Popover anchors
  const [destAnchor, setDestAnchor] = useState<HTMLElement | null>(null);
  const [checkInAnchor, setCheckInAnchor] = useState<HTMLElement | null>(null);
  const [checkOutAnchor, setCheckOutAnchor] = useState<HTMLElement | null>(null);
  const [guestsAnchor, setGuestsAnchor] = useState<HTMLElement | null>(null);

  const handleSelectDestination = (name: string, country: string) => {
    setDestination(`${name}, ${country}`);
    setDestAnchor(null);
  };

  const handleSelectCheckIn = (date: Date) => {
    setCheckIn(date);
    // Reset check-out if it's no longer after the new check-in
    if (checkOut && checkOut <= date) {
      setCheckOut(null);
    }
    setCheckInAnchor(null);
  };

  const handleSelectCheckOut = (date: Date) => {
    setCheckOut(date);
    setCheckOutAnchor(null);
  };

  const checkOutOptions = checkIn ? getCheckOutOptions(checkIn) : getCheckOutOptions(today);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: palette.background,
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <TravelerNav variant="home" />

      {/* HERO */}
      <Box
        sx={{
          mt: '72px',
          height: 560,
          position: 'relative',
          background: 'linear-gradient(135deg, #003740 0%, #006874 45%, #4A6267 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.1)',
            top: -120,
            right: -80,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: 320,
            height: 320,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.04)',
            bottom: -80,
            left: 60,
          },
        }}
      >
        {/* Eyebrow */}
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '1.5px',
            color: palette.primaryContainer,
            textTransform: 'uppercase',
          }}
        >
          {t('home.hero.eyebrow')}
        </Typography>

        {/* Title */}
        <Typography
          component="h1"
          sx={{
            fontSize: 57,
            fontWeight: 700,
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: '-0.25px',
            maxWidth: 720,
          }}
        >
          {t('home.hero.title')}
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            textAlign: 'center',
            maxWidth: 560,
            lineHeight: 1.5,
          }}
        >
          {t('home.hero.subtitle')}
        </Typography>

        {/* Search card */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 10,
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 4px 32px rgba(0,104,116,0.18)',
            p: '8px',
            display: 'flex',
            alignItems: 'stretch',
            width: 880,
            maxWidth: '90%',
            mt: '16px',
          }}
        >
          {/* Destino */}
          <Box
            onClick={(e) => setDestAnchor(e.currentTarget)}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 20px',
              borderRight: `1px solid ${palette.outlineVariant}`,
              cursor: 'pointer',
              borderRadius: '12px',
              '&:hover': { backgroundColor: 'rgba(0,104,116,0.04)' },
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: '4px',
              }}
            >
              {t('home.search.destination')}
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: destination ? 500 : 400,
                color: destination ? palette.onSurface : palette.outline,
              }}
            >
              {destination ?? t('home.search.destinationPlaceholder')}
            </Typography>
          </Box>

          <Popover
            open={Boolean(destAnchor)}
            anchorEl={destAnchor}
            onClose={() => setDestAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{ paper: { sx: { mt: '4px', borderRadius: '12px', minWidth: 220 } } }}
          >
            <List dense disablePadding>
              {mockDestinations.map((dest) => (
                <ListItem key={dest.name} disablePadding>
                  <ListItemButton onClick={() => handleSelectDestination(dest.name, dest.country)}>
                    <ListItemText
                      primary={dest.name}
                      secondary={dest.country}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                      secondaryTypographyProps={{ fontSize: 12 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Popover>

          {/* Llegada */}
          <Box
            onClick={(e) => setCheckInAnchor(e.currentTarget)}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 20px',
              borderRight: `1px solid ${palette.outlineVariant}`,
              cursor: 'pointer',
              borderRadius: '12px',
              '&:hover': { backgroundColor: 'rgba(0,104,116,0.04)' },
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: '4px',
              }}
            >
              {t('home.search.checkIn')}
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: checkIn ? 500 : 400,
                color: checkIn ? palette.onSurface : palette.outline,
              }}
            >
              {checkIn ? formatDisplayDate(checkIn) : t('home.search.selectDate')}
            </Typography>
          </Box>

          <Popover
            open={Boolean(checkInAnchor)}
            anchorEl={checkInAnchor}
            onClose={() => setCheckInAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{ paper: { sx: { mt: '4px', borderRadius: '12px', minWidth: 200 } } }}
          >
            <List dense disablePadding>
              {CHECK_IN_OPTIONS.map((opt) => (
                <ListItem key={opt.label} disablePadding>
                  <ListItemButton onClick={() => handleSelectCheckIn(opt.date)}>
                    <ListItemText
                      primary={opt.label}
                      secondary={formatDisplayDate(opt.date)}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                      secondaryTypographyProps={{ fontSize: 12 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Popover>

          {/* Salida */}
          <Box
            onClick={(e) => setCheckOutAnchor(e.currentTarget)}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 20px',
              borderRight: `1px solid ${palette.outlineVariant}`,
              cursor: 'pointer',
              borderRadius: '12px',
              '&:hover': { backgroundColor: 'rgba(0,104,116,0.04)' },
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: '4px',
              }}
            >
              {t('home.search.checkOut')}
            </Typography>
            <Typography
              sx={{
                fontSize: 15,
                fontWeight: checkOut ? 500 : 400,
                color: checkOut ? palette.onSurface : palette.outline,
              }}
            >
              {checkOut ? formatDisplayDate(checkOut) : t('home.search.selectDate')}
            </Typography>
          </Box>

          <Popover
            open={Boolean(checkOutAnchor)}
            anchorEl={checkOutAnchor}
            onClose={() => setCheckOutAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{ paper: { sx: { mt: '4px', borderRadius: '12px', minWidth: 200 } } }}
          >
            <List dense disablePadding>
              {checkOutOptions.map((opt) => (
                <ListItem key={opt.label} disablePadding>
                  <ListItemButton onClick={() => handleSelectCheckOut(opt.date)}>
                    <ListItemText
                      primary={opt.label}
                      secondary={formatDisplayDate(opt.date)}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                      secondaryTypographyProps={{ fontSize: 12 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Popover>

          {/* Huespedes */}
          <Box
            onClick={(e) => setGuestsAnchor(e.currentTarget)}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 20px',
              cursor: 'pointer',
              borderRadius: '12px',
              '&:hover': { backgroundColor: 'rgba(0,104,116,0.04)' },
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 500,
                color: palette.primary,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                mb: '4px',
              }}
            >
              {t('home.search.guests')}
            </Typography>
            <Typography sx={{ fontSize: 15, fontWeight: 500, color: palette.onSurface }}>
              {t('home.search.defaultGuests', { count: guests })}
            </Typography>
          </Box>

          <Popover
            open={Boolean(guestsAnchor)}
            anchorEl={guestsAnchor}
            onClose={() => setGuestsAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{ paper: { sx: { mt: '4px', borderRadius: '12px' } } }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                px: '20px',
                py: '16px',
              }}
            >
              <IconButton
                size="small"
                onClick={() => setGuests((g) => Math.max(1, g - 1))}
                disabled={guests <= 1}
                sx={{
                  border: `1px solid ${palette.outlineVariant}`,
                  borderRadius: '8px',
                  color: palette.primary,
                  '&:disabled': { borderColor: palette.outlineVariant, opacity: 0.4 },
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography sx={{ fontSize: 18, fontWeight: 600, color: palette.onSurface, minWidth: 24, textAlign: 'center' }}>
                {guests}
              </Typography>
              <IconButton
                size="small"
                onClick={() => setGuests((g) => Math.min(10, g + 1))}
                disabled={guests >= 10}
                sx={{
                  border: `1px solid ${palette.outlineVariant}`,
                  borderRadius: '8px',
                  color: palette.primary,
                  '&:disabled': { borderColor: palette.outlineVariant, opacity: 0.4 },
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          </Popover>

          {/* Buscar button */}
          <Button
            variant="contained"
            disableElevation
            startIcon={<SearchIcon sx={{ fontSize: '20px !important' }} />}
            onClick={() => navigate('/results')}
            sx={{
              minWidth: 120,
              backgroundColor: palette.primary,
              borderRadius: '12px',
              fontFamily: "'Roboto', sans-serif",
              fontSize: 15,
              fontWeight: 500,
              color: '#ffffff',
              textTransform: 'none',
              letterSpacing: '0.1px',
              px: '24px',
              flexShrink: 0,
              '&:hover': {
                backgroundColor: palette.primary,
              },
            }}
          >
            {t('home.search.searchButton')}
          </Button>
        </Box>
      </Box>

      {/* POPULAR DESTINATIONS */}
      <Box sx={{ padding: '40px 48px 0' }}>
        <Typography
          sx={{
            fontSize: 22,
            fontWeight: 600,
            color: palette.onSurface,
            mb: '20px',
          }}
        >
          {t('home.destinations.title')}
        </Typography>

        <Box sx={{ display: 'flex', gap: '16px' }}>
          {mockDestinations.map((dest, idx) => (
            <Box
              key={dest.name}
              onClick={() => navigate('/results')}
              sx={{
                flex: 1,
                height: 164,
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              {/* Gradient background */}
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  background: dest.gradient,
                }}
              />
              {/* Overlay */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.55) 40%, transparent)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '16px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#ffffff',
                  }}
                >
                  {dest.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  {dest.country} · {t('home.destinations.fromPerNight', { price: formatPrice(basePrices[idx]) })}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
