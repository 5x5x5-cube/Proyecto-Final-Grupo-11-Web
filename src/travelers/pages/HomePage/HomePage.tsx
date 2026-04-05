import { useState } from 'react';
import { Popover, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TravelerNav from '@/design-system/layouts/TravelerNav';
import { useDestinations } from '@/api/hooks/useSearch';
import { useLocale } from '@/contexts/LocaleContext';
import {
  PageRoot,
  HeroSection,
  HeroEyebrow,
  HeroTitle,
  HeroSubtitle,
  SearchCard,
  SearchField,
  SearchFieldNoBorder,
  SearchFieldLabel,
  SearchFieldValue,
  SearchButton,
  SearchErrorHint,
  GuestCounterBox,
  GuestCounterButton,
  GuestCountText,
  DestinationsSection,
  DestinationsTitle,
  DestinationsGrid,
  DestinationCard,
  DestinationGradient,
  DestinationOverlay,
  DestinationName,
  DestinationMeta,
} from './HomePage.styles';

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
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
  const { data: destinationsData, isLoading: isLoadingDestinations } = useDestinations();
  const mockDestinations = (
    isLoadingDestinations || !Array.isArray(destinationsData) ? [] : destinationsData
  ) as Array<{
    name: string;
    country: string;
    hotelCount: number;
    gradient: string;
    minPrice?: number;
  }>;

  // Search state
  const [destination, setDestination] = useState<string | null>(null);
  const [destinationName, setDestinationName] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(1);

  // Validation errors
  const [errors, setErrors] = useState({ destination: false, checkIn: false, checkOut: false });

  // Popover anchors
  const [destAnchor, setDestAnchor] = useState<HTMLElement | null>(null);
  const [checkInAnchor, setCheckInAnchor] = useState<HTMLElement | null>(null);
  const [checkOutAnchor, setCheckOutAnchor] = useState<HTMLElement | null>(null);
  const [guestsAnchor, setGuestsAnchor] = useState<HTMLElement | null>(null);

  const handleSelectDestination = (name: string, country: string) => {
    setDestination(`${name}, ${country}`);
    setDestinationName(name);
    setErrors(e => ({ ...e, destination: false }));
    setDestAnchor(null);
  };

  const handleSelectCheckIn = (date: Date) => {
    setCheckIn(date);
    setErrors(e => ({ ...e, checkIn: false }));
    if (checkOut && checkOut <= date) {
      setCheckOut(null);
    }
    setCheckInAnchor(null);
  };

  const handleSelectCheckOut = (date: Date) => {
    setCheckOut(date);
    setErrors(e => ({ ...e, checkOut: false }));
    setCheckOutAnchor(null);
  };

  const handleSearch = () => {
    const nextErrors = {
      destination: !destination,
      checkIn: !checkIn,
      checkOut: !checkOut,
    };
    setErrors(nextErrors);
    if (nextErrors.destination || nextErrors.checkIn || nextErrors.checkOut) return;

    const params = new URLSearchParams({
      destination: destinationName ?? '',
      checkIn: checkIn!.toISOString().split('T')[0],
      checkOut: checkOut!.toISOString().split('T')[0],
      guests: String(guests),
    });
    navigate(`/results?${params.toString()}`);
  };

  const checkOutOptions = checkIn ? getCheckOutOptions(checkIn) : getCheckOutOptions(today);
  const hasErrors = errors.destination || errors.checkIn || errors.checkOut;

  return (
    <PageRoot>
      <TravelerNav variant="home" />

      {/* HERO */}
      <HeroSection>
        <HeroEyebrow>{t('home.hero.eyebrow')}</HeroEyebrow>

        <HeroTitle component="h1">{t('home.hero.title')}</HeroTitle>

        <HeroSubtitle>{t('home.hero.subtitle')}</HeroSubtitle>

        {/* Search card */}
        <SearchCard>
          {/* Destino */}
          <SearchField onClick={e => setDestAnchor(e.currentTarget)} error={errors.destination}>
            <SearchFieldLabel>{t('home.search.destination')}</SearchFieldLabel>
            <SearchFieldValue hasValue={!!destination}>
              {destination ?? t('home.search.destinationPlaceholder')}
            </SearchFieldValue>
          </SearchField>

          <Popover
            open={Boolean(destAnchor)}
            anchorEl={destAnchor}
            onClose={() => setDestAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{ paper: { sx: { mt: '4px', borderRadius: '12px', minWidth: 220 } } }}
          >
            <List dense disablePadding>
              {mockDestinations.map(dest => (
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
          <SearchField onClick={e => setCheckInAnchor(e.currentTarget)} error={errors.checkIn}>
            <SearchFieldLabel>{t('home.search.checkIn')}</SearchFieldLabel>
            <SearchFieldValue hasValue={!!checkIn}>
              {checkIn ? formatDisplayDate(checkIn) : t('home.search.selectDate')}
            </SearchFieldValue>
          </SearchField>

          <Popover
            open={Boolean(checkInAnchor)}
            anchorEl={checkInAnchor}
            onClose={() => setCheckInAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{ paper: { sx: { mt: '4px', borderRadius: '12px', minWidth: 200 } } }}
          >
            <List dense disablePadding>
              {CHECK_IN_OPTIONS.map(opt => (
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
          <SearchField onClick={e => setCheckOutAnchor(e.currentTarget)} error={errors.checkOut}>
            <SearchFieldLabel>{t('home.search.checkOut')}</SearchFieldLabel>
            <SearchFieldValue hasValue={!!checkOut}>
              {checkOut ? formatDisplayDate(checkOut) : t('home.search.selectDate')}
            </SearchFieldValue>
          </SearchField>

          <Popover
            open={Boolean(checkOutAnchor)}
            anchorEl={checkOutAnchor}
            onClose={() => setCheckOutAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            slotProps={{ paper: { sx: { mt: '4px', borderRadius: '12px', minWidth: 200 } } }}
          >
            <List dense disablePadding>
              {checkOutOptions.map(opt => (
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
          <SearchFieldNoBorder onClick={e => setGuestsAnchor(e.currentTarget)}>
            <SearchFieldLabel>{t('home.search.guests')}</SearchFieldLabel>
            <SearchFieldValue hasValue>
              {t('home.search.guestsCount', { count: guests })}
            </SearchFieldValue>
          </SearchFieldNoBorder>

          <Popover
            open={Boolean(guestsAnchor)}
            anchorEl={guestsAnchor}
            onClose={() => setGuestsAnchor(null)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{ paper: { sx: { mt: '4px', borderRadius: '12px' } } }}
          >
            <GuestCounterBox>
              <GuestCounterButton
                size="small"
                onClick={() => setGuests(g => Math.max(1, g - 1))}
                disabled={guests <= 1}
              >
                <RemoveIcon fontSize="small" />
              </GuestCounterButton>
              <GuestCountText>{guests}</GuestCountText>
              <GuestCounterButton
                size="small"
                onClick={() => setGuests(g => Math.min(10, g + 1))}
                disabled={guests >= 10}
              >
                <AddIcon fontSize="small" />
              </GuestCounterButton>
            </GuestCounterBox>
          </Popover>

          {/* Buscar button */}
          <SearchButton
            variant="contained"
            disableElevation
            startIcon={<SearchIcon sx={{ fontSize: '20px !important' }} />}
            onClick={handleSearch}
          >
            {t('home.search.searchButton')}
          </SearchButton>
        </SearchCard>

        {hasErrors && (
          <SearchErrorHint>
            {errors.destination
              ? t('home.search.errors.destination')
              : errors.checkIn
                ? t('home.search.errors.checkIn')
                : t('home.search.errors.checkOut')}
          </SearchErrorHint>
        )}
      </HeroSection>

      {/* POPULAR DESTINATIONS */}
      <DestinationsSection>
        <DestinationsTitle>{t('home.destinations.title')}</DestinationsTitle>

        <DestinationsGrid>
          {mockDestinations.map(dest => (
            <DestinationCard
              key={dest.name}
              onClick={() => navigate(`/results?destination=${encodeURIComponent(dest.name)}`)}
            >
              <DestinationGradient sx={{ background: dest.gradient }} />
              <DestinationOverlay>
                <DestinationName>{dest.name}</DestinationName>
                <DestinationMeta>
                  {dest.country} ·{' '}
                  {dest.minPrice
                    ? t('home.destinations.fromPerNight', { price: formatPrice(dest.minPrice) })
                    : null}
                </DestinationMeta>
              </DestinationOverlay>
            </DestinationCard>
          ))}
        </DestinationsGrid>
      </DestinationsSection>
    </PageRoot>
  );
}
