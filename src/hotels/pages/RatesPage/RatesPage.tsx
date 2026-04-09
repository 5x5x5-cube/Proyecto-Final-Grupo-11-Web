import { Box, CircularProgress } from '@mui/material';
import Text from '@/design-system/components/Text';
import { PrimaryPillButton, OutlinedPillButton } from '@/design-system/components/PillButton';
import SellIcon from '@mui/icons-material/Sell';
import KingBedIcon from '@mui/icons-material/KingBed';
import HotelIcon from '@mui/icons-material/Hotel';
import SingleBedIcon from '@mui/icons-material/SingleBed';
import StarIcon from '@mui/icons-material/Star';
import WeekendIcon from '@mui/icons-material/Weekend';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import { palette } from '@/design-system/theme/palette';
import { useTariffs } from '@/api/hooks/useTariffs';
import {
  FilterBar,
  SearchBox,
  FilterDivider,
  FilterChip,
  ContentGrid,
  TableCard,
  TableCardHeader,
  TableCardTitle,
  StyledTable,
  TableHeaderCell,
  RateRow,
  RateCell,
  RoomIconBox,
  RoomName,
  RoomLocation,
  TypeChip,
  PriceText,
  PriceUnit,
  ValidityText,
  ActionButton,
  DeleteButton,
  PaginationBar,
  PageButton,
  EditPanel,
  EditPanelHeader,
  EditPanelTitle,
  CloseButton,
  PanelBody,
  FloatingLabel,
  FormSelect,
  RateTypeOption,
  RateTypeLabel,
  RateTypeDesc,
  CurrencyPrefix,
  PriceInput,
  FormInput,
  PanelFooter,
} from './RatesPage.styles';

const typeChipStyles: Record<string, { bg: string; color: string }> = {
  standard: { bg: palette.primaryContainer, color: palette.primary },
  weekend: { bg: palette.warningContainer, color: palette.warning },
  season: { bg: '#E8F0FE', color: '#1A73E8' },
  promo: { bg: palette.successContainer, color: palette.success },
};

export default function RatesPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();

  const { isLoading } = useTariffs();

  if (isLoading) {
    return (
      <HotelAdminLayout activeNav="tarifas" title={t('rates.title')} subtitle={t('rates.subtitle')}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
          <CircularProgress sx={{ color: palette.primary }} />
        </Box>
      </HotelAdminLayout>
    );
  }

  const rates = [
    {
      id: 1,
      name: 'Suite Deluxe King',
      location: 'Piso 4 · Vista al mar',
      icon: KingBedIcon,
      type: 'standard',
      typeLabel: t('rates.typeStandard'),
      typeIcon: StarIcon,
      price: formatPrice(888000),
      validity: t('rates.allYear'),
      selected: true,
    },
    {
      id: 2,
      name: 'Suite Deluxe King',
      location: 'Piso 4 · Vista al mar',
      icon: KingBedIcon,
      type: 'weekend',
      typeLabel: t('rates.typeWeekend'),
      typeIcon: WeekendIcon,
      price: formatPrice(1050000),
      validity: t('rates.allYear'),
      selected: false,
    },
    {
      id: 3,
      name: 'Suite Deluxe King',
      location: 'Piso 4 · Vista al mar',
      icon: KingBedIcon,
      type: 'season',
      typeLabel: t('rates.typeSeason'),
      typeIcon: WbSunnyIcon,
      price: formatPrice(1280000),
      validityStart: '2025-12-20',
      validityEnd: '2026-01-10',
      selected: false,
    },
    {
      id: 4,
      name: 'Junior Suite',
      location: 'Piso 3 · Vista jardin',
      icon: HotelIcon,
      type: 'standard',
      typeLabel: t('rates.typeStandard'),
      typeIcon: StarIcon,
      price: formatPrice(560000),
      validity: t('rates.allYear'),
      selected: false,
    },
    {
      id: 5,
      name: 'Junior Suite',
      location: 'Piso 3 · Vista jardin',
      icon: HotelIcon,
      type: 'promo',
      typeLabel: t('rates.typePromo'),
      typeIcon: LocalOfferIcon,
      price: formatPrice(420000),
      validityStart: '2026-03-01',
      validityEnd: '2026-03-31',
      selected: false,
    },
    {
      id: 6,
      name: 'Habitacion Estandar',
      location: 'Piso 2 · Vista interior',
      icon: SingleBedIcon,
      type: 'standard',
      typeLabel: t('rates.typeStandard'),
      typeIcon: StarIcon,
      price: formatPrice(320000),
      validity: t('rates.allYear'),
      selected: false,
    },
  ];

  const filterChips = [
    t('rates.filterAll'),
    t('rates.filterStandard'),
    t('rates.filterWeekend'),
    t('rates.filterSeason'),
    t('rates.filterPromo'),
  ];

  const rateTypeOptions = [
    {
      icon: StarIcon,
      label: t('rates.typeStandard'),
      desc: t('rates.typeStandardDesc'),
      selected: true,
    },
    {
      icon: WeekendIcon,
      label: t('rates.typeWeekend'),
      desc: t('rates.typeWeekendDesc'),
      selected: false,
    },
    {
      icon: WbSunnyIcon,
      label: t('rates.typeSeason'),
      desc: t('rates.typeSeasonDesc'),
      selected: false,
    },
    {
      icon: LocalOfferIcon,
      label: t('rates.typePromo'),
      desc: t('rates.typePromoDesc'),
      selected: false,
    },
  ];

  return (
    <HotelAdminLayout
      activeNav="tarifas"
      title={t('rates.title')}
      subtitle={t('rates.subtitle')}
      topbarActions={
        <PrimaryPillButton pillSize="sm" startIcon={<AddIcon sx={{ fontSize: 16 }} />}>
          {t('rates.newRate')}
        </PrimaryPillButton>
      }
    >
      {/* Filter bar */}
      <FilterBar>
        <SearchBox>
          <SearchIcon sx={{ fontSize: 18, color: palette.outline }} />
          {t('rates.searchPlaceholder')}
        </SearchBox>

        <FilterDivider />

        <Box sx={{ display: 'flex', gap: '8px' }}>
          {filterChips.map((chip, i) => (
            <FilterChip key={chip} ownerState={{ active: i === 0 }}>
              {chip}
            </FilterChip>
          ))}
        </Box>
      </FilterBar>

      {/* Content layout: table + edit panel */}
      <ContentGrid>
        {/* Rates table card */}
        <TableCard>
          {/* Card header */}
          <TableCardHeader>
            <TableCardTitle>
              <SellIcon sx={{ fontSize: 18, color: palette.primary }} />
              {t('rates.configuredRates')}
            </TableCardTitle>
            <Text textVariant="caption">{t('rates.ratesSummary', { rates: 12, rooms: 4 })}</Text>
          </TableCardHeader>

          {/* Table */}
          <StyledTable component="table">
            <Box component="thead">
              <Box component="tr">
                {[
                  t('rates.tableHeaders.room'),
                  t('rates.tableHeaders.rateType'),
                  t('rates.tableHeaders.pricePerNight'),
                  t('rates.tableHeaders.validity'),
                  t('rates.tableHeaders.actions'),
                ].map(header => (
                  <TableHeaderCell component="th" key={header}>
                    {header}
                  </TableHeaderCell>
                ))}
              </Box>
            </Box>
            <Box component="tbody">
              {rates.map(rate => {
                const IconComp = rate.icon;
                const TypeIcon = rate.typeIcon;
                const chipStyle = typeChipStyles[rate.type];
                return (
                  <RateRow component="tr" key={rate.id} ownerState={{ selected: rate.selected }}>
                    {/* Room cell */}
                    <RateCell component="td">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <RoomIconBox>
                          <IconComp sx={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }} />
                        </RoomIconBox>
                        <Box>
                          <RoomName>{rate.name}</RoomName>
                          <RoomLocation>{rate.location}</RoomLocation>
                        </Box>
                      </Box>
                    </RateCell>
                    {/* Type chip */}
                    <RateCell component="td">
                      <TypeChip ownerState={chipStyle}>
                        <TypeIcon sx={{ fontSize: 13 }} />
                        {rate.typeLabel}
                      </TypeChip>
                    </RateCell>
                    {/* Price */}
                    <RateCell component="td">
                      <PriceText>
                        {rate.price} <PriceUnit component="span">{t('rates.perNight')}</PriceUnit>
                      </PriceText>
                    </RateCell>
                    {/* Validity */}
                    <ValidityText component="td">
                      {rate.validityStart && rate.validityEnd
                        ? `${formatDate(rate.validityStart, 'short')} - ${formatDate(rate.validityEnd, 'short')}`
                        : rate.validity}
                    </ValidityText>
                    {/* Actions */}
                    <RateCell component="td">
                      <Box sx={{ display: 'flex', gap: '4px' }}>
                        <ActionButton ownerState={{ active: rate.selected }}>
                          <EditIcon
                            sx={{
                              fontSize: 16,
                              color: rate.selected ? palette.onPrimary : palette.onSurfaceVariant,
                            }}
                          />
                        </ActionButton>
                        <DeleteButton>
                          <DeleteOutlineIcon
                            className="delete-icon"
                            sx={{ fontSize: 16, color: palette.onSurfaceVariant }}
                          />
                        </DeleteButton>
                      </Box>
                    </RateCell>
                  </RateRow>
                );
              })}
            </Box>
          </StyledTable>

          {/* Pagination */}
          <PaginationBar>
            <span>{t('rates.showingRates', { from: 1, to: 6, total: 12 })}</span>
            <Box sx={{ display: 'flex', gap: '4px' }}>
              <PageButton>
                <ChevronLeftIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
              </PageButton>
              <PageButton ownerState={{ active: true }}>1</PageButton>
              <PageButton>2</PageButton>
              <PageButton>
                <ChevronRightIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
              </PageButton>
            </Box>
          </PaginationBar>
        </TableCard>

        {/* Edit panel */}
        <EditPanel>
          {/* Panel header */}
          <EditPanelHeader>
            <EditPanelTitle>
              <EditIcon sx={{ fontSize: 18 }} />
              {t('rates.editRate')}
            </EditPanelTitle>
            <CloseButton>
              <CloseIcon sx={{ fontSize: 16, color: palette.onPrimary }} />
            </CloseButton>
          </EditPanelHeader>

          {/* Panel body */}
          <PanelBody>
            {/* Room section */}
            <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
              {t('rates.roomLabel')}
            </Text>
            <Box sx={{ position: 'relative' }}>
              <FloatingLabel>{t('rates.roomLabel')}</FloatingLabel>
              <FormSelect component="select" defaultValue="Suite Deluxe King — Piso 4">
                <option>Suite Deluxe King -- Piso 4</option>
              </FormSelect>
            </Box>

            {/* Rate type section */}
            <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
              {t('rates.rateTypeLabel')}
            </Text>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {rateTypeOptions.map(opt => {
                const OptIcon = opt.icon;
                return (
                  <RateTypeOption key={opt.label} ownerState={{ selected: opt.selected }}>
                    <OptIcon sx={{ fontSize: 18, color: palette.primary, mb: '2px' }} />
                    <RateTypeLabel>{opt.label}</RateTypeLabel>
                    <RateTypeDesc>{opt.desc}</RateTypeDesc>
                  </RateTypeOption>
                );
              })}
            </Box>

            {/* Price section */}
            <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
              {t('rates.priceLabel')}
            </Text>
            <Box sx={{ position: 'relative' }}>
              <FloatingLabel>{t('rates.pricePerNightLabel')}</FloatingLabel>
              <Box sx={{ display: 'flex' }}>
                <CurrencyPrefix>COP</CurrencyPrefix>
                <PriceInput component="input" defaultValue="888.000" />
              </Box>
            </Box>

            {/* Validity section */}
            <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
              {t('rates.validityLabel')}
            </Text>
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Box sx={{ position: 'relative' }}>
                <FloatingLabel>{t('rates.startDate')}</FloatingLabel>
                <FormInput component="input" defaultValue="01/01/2026" />
              </Box>
              <Box sx={{ position: 'relative' }}>
                <FloatingLabel>{t('rates.endDate')}</FloatingLabel>
                <FormInput component="input" defaultValue="31/12/2026" />
              </Box>
            </Box>
          </PanelBody>

          {/* Panel footer */}
          <PanelFooter>
            <OutlinedPillButton pillSize="xs">{t('rates.cancel')}</OutlinedPillButton>
            <PrimaryPillButton
              pillSize="xs"
              startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
              sx={{ flex: 1 }}
            >
              {t('rates.saveRate')}
            </PrimaryPillButton>
          </PanelFooter>
        </EditPanel>
      </ContentGrid>
    </HotelAdminLayout>
  );
}
