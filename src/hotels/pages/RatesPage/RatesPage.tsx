import { useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import Text from '@/design-system/components/Text';
import { PrimaryPillButton, OutlinedPillButton } from '@/design-system/components/PillButton';
import SellIcon from '@mui/icons-material/Sell';
import KingBedIcon from '@mui/icons-material/KingBed';
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
import {
  useTariffs,
  useCreateTariff,
  useUpdateTariff,
  useDeleteTariff,
  useHotelAdminRooms,
} from '@/api/hooks/useTariffs';
import { useSnackbar } from '@/contexts/SnackbarContext';
import type { RateType, Tariff } from '@/hotels/data/mockRates';
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

const TYPE_ICONS: Record<RateType, typeof StarIcon> = {
  standard: StarIcon,
  weekend: WeekendIcon,
  season: WbSunnyIcon,
  promo: LocalOfferIcon,
};

interface FormState {
  roomId: string;
  rateType: RateType | '';
  pricePerNight: string;
  startDate: string;
  endDate: string;
}

interface TouchedState {
  roomId: boolean;
  rateType: boolean;
  pricePerNight: boolean;
  startDate: boolean;
  endDate: boolean;
}

const EMPTY_FORM: FormState = {
  roomId: '',
  rateType: '',
  pricePerNight: '',
  startDate: '',
  endDate: '',
};
const EMPTY_TOUCHED: TouchedState = {
  roomId: false,
  rateType: false,
  pricePerNight: false,
  startDate: false,
  endDate: false,
};

function validate(form: FormState, t: (k: string) => string) {
  const errors: Partial<Record<keyof FormState, string>> = {};
  if (!form.roomId) errors.roomId = t('rates.errors.roomRequired');
  if (!form.rateType) errors.rateType = t('rates.errors.rateTypeRequired');
  if (!form.pricePerNight) errors.pricePerNight = t('rates.errors.priceRequired');
  else if (Number(form.pricePerNight) <= 0) errors.pricePerNight = t('rates.errors.pricePositive');
  if (!form.startDate) errors.startDate = t('rates.errors.startDateRequired');
  if (!form.endDate) errors.endDate = t('rates.errors.endDateRequired');
  else if (form.startDate && form.endDate <= form.startDate)
    errors.endDate = t('rates.errors.endDateAfterStart');
  return errors;
}

const PAGE_SIZE = 6;

export default function RatesPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();
  const { showSuccess, showError } = useSnackbar();

  const { data: tariffsRaw, isLoading } = useTariffs();
  const { data: roomsRaw } = useHotelAdminRooms();
  const createTariff = useCreateTariff();
  const updateTariff = useUpdateTariff();
  const deleteTariff = useDeleteTariff();

  const [panelOpen, setPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterChip, setFilterChip] = useState<'all' | RateType>('all');
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [touched, setTouched] = useState<TouchedState>(EMPTY_TOUCHED);

  if (isLoading) {
    return (
      <HotelAdminLayout activeNav="tarifas" title={t('rates.title')} subtitle={t('rates.subtitle')}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
          <CircularProgress sx={{ color: palette.primary }} />
        </Box>
      </HotelAdminLayout>
    );
  }

  const tariffs = (Array.isArray(tariffsRaw) ? tariffsRaw : []) as Tariff[];
  const rooms = (Array.isArray(roomsRaw) ? roomsRaw : []) as Array<{
    id: number;
    name: string;
    location: string;
  }>;

  // Filter + search
  let filtered = tariffs;
  if (filterChip !== 'all') filtered = filtered.filter(r => r.rateType === filterChip);
  if (searchText)
    filtered = filtered.filter(r => r.roomName.toLowerCase().includes(searchText.toLowerCase()));

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const errors = validate(form, t);
  const isFormValid = Object.keys(errors).length === 0;

  const filterChips: Array<{ key: 'all' | RateType; label: string }> = [
    { key: 'all', label: t('rates.filterAll') },
    { key: 'standard', label: t('rates.filterStandard') },
    { key: 'weekend', label: t('rates.filterWeekend') },
    { key: 'season', label: t('rates.filterSeason') },
    { key: 'promo', label: t('rates.filterPromo') },
  ];

  const rateTypeOptions = [
    {
      type: 'standard' as RateType,
      icon: StarIcon,
      label: t('rates.typeStandard'),
      desc: t('rates.typeStandardDesc'),
    },
    {
      type: 'weekend' as RateType,
      icon: WeekendIcon,
      label: t('rates.typeWeekend'),
      desc: t('rates.typeWeekendDesc'),
    },
    {
      type: 'season' as RateType,
      icon: WbSunnyIcon,
      label: t('rates.typeSeason'),
      desc: t('rates.typeSeasonDesc'),
    },
    {
      type: 'promo' as RateType,
      icon: LocalOfferIcon,
      label: t('rates.typePromo'),
      desc: t('rates.typePromoDesc'),
    },
  ];

  const openCreate = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setTouched(EMPTY_TOUCHED);
    setPanelOpen(true);
  };

  const openEdit = (tariff: Tariff) => {
    setEditingId(tariff.id);
    setForm({
      roomId: String(tariff.roomId),
      rateType: tariff.rateType,
      pricePerNight: String(tariff.pricePerNight),
      startDate: tariff.startDate ?? '',
      endDate: tariff.endDate ?? '',
    });
    setTouched(EMPTY_TOUCHED);
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setTouched(EMPTY_TOUCHED);
  };

  const touchAll = () =>
    setTouched({
      roomId: true,
      rateType: true,
      pricePerNight: true,
      startDate: true,
      endDate: true,
    });

  const handleSave = async () => {
    touchAll();
    if (!isFormValid) return;
    const room = rooms.find(r => String(r.id) === form.roomId);
    const payload = {
      roomId: Number(form.roomId),
      roomName: room?.name ?? '',
      roomLocation: room?.location ?? '',
      rateType: form.rateType,
      pricePerNight: Number(form.pricePerNight),
      startDate: form.startDate || null,
      endDate: form.endDate || null,
    };
    try {
      if (editingId !== null) {
        await updateTariff.mutateAsync({ id: editingId, ...payload });
        showSuccess(t('rates.successUpdated'));
      } else {
        await createTariff.mutateAsync(payload);
        showSuccess(t('rates.successCreated'));
      }
      closePanel();
    } catch {
      showError(t('errors.generic'));
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTariff.mutateAsync(id);
    } catch {
      showError(t('errors.generic'));
    }
  };

  return (
    <HotelAdminLayout
      activeNav="tarifas"
      title={t('rates.title')}
      subtitle={t('rates.subtitle')}
      topbarActions={
        <PrimaryPillButton
          pillSize="sm"
          startIcon={<AddIcon sx={{ fontSize: 16 }} />}
          onClick={openCreate}
        >
          {t('rates.newRate')}
        </PrimaryPillButton>
      }
    >
      {/* Filter bar */}
      <FilterBar>
        <SearchBox>
          <SearchIcon sx={{ fontSize: 18, color: palette.outline }} />
          <input
            placeholder={t('rates.searchPlaceholder')}
            value={searchText}
            onChange={e => {
              setSearchText(e.target.value);
              setPage(1);
            }}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontFamily: "'Roboto', sans-serif",
              fontSize: 13,
              color: palette.onSurface,
              width: '100%',
            }}
          />
        </SearchBox>

        <FilterDivider />

        <Box sx={{ display: 'flex', gap: '8px' }}>
          {filterChips.map(chip => (
            <FilterChip
              key={chip.key}
              ownerState={{ active: filterChip === chip.key }}
              onClick={() => {
                setFilterChip(chip.key);
                setPage(1);
              }}
            >
              {chip.label}
            </FilterChip>
          ))}
        </Box>
      </FilterBar>

      {/* Content layout */}
      <ContentGrid>
        {/* Rates table */}
        <TableCard>
          <TableCardHeader>
            <TableCardTitle>
              <SellIcon sx={{ fontSize: 18, color: palette.primary }} />
              {t('rates.configuredRates')}
            </TableCardTitle>
            <Text textVariant="caption">
              {t('rates.ratesSummary', {
                rates: filtered.length,
                rooms: new Set(filtered.map(r => r.roomId)).size,
              })}
            </Text>
          </TableCardHeader>

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
              {paginated.map(rate => {
                const TypeIcon = TYPE_ICONS[rate.rateType];
                const chipStyle = typeChipStyles[rate.rateType];
                return (
                  <RateRow
                    component="tr"
                    key={rate.id}
                    ownerState={{ selected: rate.id === editingId }}
                  >
                    <RateCell component="td">
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <RoomIconBox>
                          <KingBedIcon sx={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }} />
                        </RoomIconBox>
                        <Box>
                          <RoomName>{rate.roomName}</RoomName>
                          <RoomLocation>{rate.roomLocation}</RoomLocation>
                        </Box>
                      </Box>
                    </RateCell>
                    <RateCell component="td">
                      <TypeChip ownerState={chipStyle}>
                        <TypeIcon sx={{ fontSize: 13 }} />
                        {t(
                          `rates.type${rate.rateType.charAt(0).toUpperCase() + rate.rateType.slice(1)}`
                        )}
                      </TypeChip>
                    </RateCell>
                    <RateCell component="td">
                      <PriceText>
                        {formatPrice(rate.pricePerNight)}{' '}
                        <PriceUnit component="span">{t('rates.perNight')}</PriceUnit>
                      </PriceText>
                    </RateCell>
                    <ValidityText component="td">
                      {rate.startDate && rate.endDate
                        ? `${formatDate(rate.startDate, 'short')} - ${formatDate(rate.endDate, 'short')}`
                        : t('rates.allYear')}
                    </ValidityText>
                    <RateCell component="td">
                      <Box sx={{ display: 'flex', gap: '4px' }}>
                        <ActionButton
                          ownerState={{ active: rate.id === editingId }}
                          onClick={() => openEdit(rate)}
                        >
                          <EditIcon
                            sx={{
                              fontSize: 16,
                              color:
                                rate.id === editingId
                                  ? palette.onPrimary
                                  : palette.onSurfaceVariant,
                            }}
                          />
                        </ActionButton>
                        <DeleteButton onClick={() => handleDelete(rate.id)}>
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

          <PaginationBar>
            <span>
              {t('rates.showingRates', {
                from: filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1,
                to: Math.min(page * PAGE_SIZE, filtered.length),
                total: filtered.length,
              })}
            </span>
            <Box sx={{ display: 'flex', gap: '4px' }}>
              <PageButton onClick={() => setPage(p => Math.max(1, p - 1))}>
                <ChevronLeftIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
              </PageButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <PageButton key={p} ownerState={{ active: p === page }} onClick={() => setPage(p)}>
                  {p}
                </PageButton>
              ))}
              <PageButton onClick={() => setPage(p => Math.min(totalPages, p + 1))}>
                <ChevronRightIcon sx={{ fontSize: 16, color: palette.onSurfaceVariant }} />
              </PageButton>
            </Box>
          </PaginationBar>
        </TableCard>

        {/* Create panel */}
        {panelOpen && (
          <EditPanel>
            <EditPanelHeader>
              <EditPanelTitle>
                {editingId !== null ? (
                  <EditIcon sx={{ fontSize: 18 }} />
                ) : (
                  <AddIcon sx={{ fontSize: 18 }} />
                )}
                {editingId !== null ? t('rates.editRate') : t('rates.createRate')}
              </EditPanelTitle>
              <CloseButton onClick={closePanel}>
                <CloseIcon sx={{ fontSize: 16, color: palette.onPrimary }} />
              </CloseButton>
            </EditPanelHeader>

            <PanelBody>
              {/* Room */}
              <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
                {t('rates.roomLabel')}
              </Text>
              <Box sx={{ position: 'relative' }}>
                <FloatingLabel>{t('rates.roomLabel')}</FloatingLabel>
                <FormSelect
                  value={form.roomId}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setForm(f => ({ ...f, roomId: e.target.value }));
                    setTouched(t => ({ ...t, roomId: true }));
                  }}
                >
                  <option value="">{t('rates.selectRoom')}</option>
                  {rooms.map(r => (
                    <option key={r.id} value={String(r.id)}>
                      {r.name} — {r.location}
                    </option>
                  ))}
                </FormSelect>
                {touched.roomId && errors.roomId && (
                  <Text textVariant="hint" sx={{ color: palette.error, mt: '4px' }}>
                    {errors.roomId}
                  </Text>
                )}
              </Box>

              {/* Rate type */}
              <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
                {t('rates.rateTypeLabel')}
              </Text>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {rateTypeOptions.map(opt => {
                  const OptIcon = opt.icon;
                  return (
                    <RateTypeOption
                      key={opt.type}
                      ownerState={{ selected: form.rateType === opt.type }}
                      onClick={() => {
                        setForm(f => ({ ...f, rateType: opt.type }));
                        setTouched(t => ({ ...t, rateType: true }));
                      }}
                    >
                      <OptIcon sx={{ fontSize: 18, color: palette.primary, mb: '2px' }} />
                      <RateTypeLabel>{opt.label}</RateTypeLabel>
                      <RateTypeDesc>{opt.desc}</RateTypeDesc>
                    </RateTypeOption>
                  );
                })}
              </Box>
              {touched.rateType && errors.rateType && (
                <Text textVariant="hint" sx={{ color: palette.error, mt: '-4px' }}>
                  {errors.rateType}
                </Text>
              )}

              {/* Price */}
              <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
                {t('rates.priceLabel')}
              </Text>
              <Box>
                <Box sx={{ display: 'flex' }}>
                  <CurrencyPrefix>COP</CurrencyPrefix>
                  <PriceInput
                    type="number"
                    placeholder="0"
                    value={form.pricePerNight}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setForm(f => ({ ...f, pricePerNight: e.target.value }));
                      setTouched(t => ({ ...t, pricePerNight: true }));
                    }}
                  />
                </Box>
                {touched.pricePerNight && errors.pricePerNight && (
                  <Text textVariant="hint" sx={{ color: palette.error, mt: '4px' }}>
                    {errors.pricePerNight}
                  </Text>
                )}
              </Box>

              {/* Validity */}
              <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
                {t('rates.validityLabel')}
              </Text>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Box>
                  <Box sx={{ position: 'relative' }}>
                    <FloatingLabel>{t('rates.startDate')}</FloatingLabel>
                    <FormInput
                      type="date"
                      value={form.startDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setForm(f => ({ ...f, startDate: e.target.value }));
                        setTouched(t => ({ ...t, startDate: true }));
                      }}
                    />
                  </Box>
                  {touched.startDate && errors.startDate && (
                    <Text textVariant="hint" sx={{ color: palette.error, mt: '4px' }}>
                      {errors.startDate}
                    </Text>
                  )}
                </Box>
                <Box>
                  <Box sx={{ position: 'relative' }}>
                    <FloatingLabel>{t('rates.endDate')}</FloatingLabel>
                    <FormInput
                      type="date"
                      value={form.endDate}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setForm(f => ({ ...f, endDate: e.target.value }));
                        setTouched(t => ({ ...t, endDate: true }));
                      }}
                    />
                  </Box>
                  {touched.endDate && errors.endDate && (
                    <Text textVariant="hint" sx={{ color: palette.error, mt: '4px' }}>
                      {errors.endDate}
                    </Text>
                  )}
                </Box>
              </Box>
            </PanelBody>

            <PanelFooter>
              <OutlinedPillButton pillSize="xs" onClick={closePanel}>
                {t('rates.cancel')}
              </OutlinedPillButton>
              <PrimaryPillButton
                pillSize="xs"
                startIcon={<SaveIcon sx={{ fontSize: 16 }} />}
                loading={editingId !== null ? updateTariff.isPending : createTariff.isPending}
                onClick={handleSave}
                sx={{ flex: 1 }}
              >
                {t('rates.saveRate')}
              </PrimaryPillButton>
            </PanelFooter>
          </EditPanel>
        )}
      </ContentGrid>
    </HotelAdminLayout>
  );
}
