import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import Text from '@/design-system/components/Text';
import { PrimaryPillButton, OutlinedPillButton } from '@/design-system/components/PillButton';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ScheduleIcon from '@mui/icons-material/Schedule';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import BoltIcon from '@mui/icons-material/Bolt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { useTranslation } from 'react-i18next';
import { useLocale } from '@/contexts/LocaleContext';
import HotelAdminLayout from '@/design-system/layouts/HotelAdminLayout';
import { palette } from '@/design-system/theme/palette';
import {
  useDiscounts,
  useCreateDiscount,
  useUpdateDiscount,
  useDeleteDiscount,
  type Discount,
  type DiscountCreate,
} from '@/api/hooks/useDiscounts';
import { useTariffs } from '@/api/hooks/useTariffs';
import { useSnackbar } from '@/contexts/SnackbarContext';
import {
  ContentLayout,
  DiscountGrid,
  DiscountCard,
  CardHeader,
  DiscountValue,
  DiscountPercent,
  TypeChip,
  CardBody,
  CardTitle,
  DetailRow,
  DetailStrong,
  CardFooter,
  StatusBadge,
  SmallActionButton,
  FormPanel,
  PanelHeader,
  PanelTitle,
  CloseButton,
  PanelBody,
  FloatingLabel,
  FormInput,
  ToggleButton,
  PanelFooter,
} from './DiscountsPage.styles';

export default function DiscountsPage() {
  const { t } = useTranslation('hotels');
  const { formatPrice, formatDate } = useLocale();
  const { showError } = useSnackbar();

  const { data: discountsData = [], isLoading } = useDiscounts();
  const { data: tariffsData = [] } = useTariffs();
  const createDiscount = useCreateDiscount();
  const updateDiscount = useUpdateDiscount();
  const deleteDiscount = useDeleteDiscount();

  const [panelOpen, setPanelOpen] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [form, setForm] = React.useState<Partial<DiscountCreate>>({ discount_type: 'percentage' });
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  const handleEdit = (discount: Discount) => {
    setEditingId(discount.id);
    setForm({
      tariff_id: discount.tariff_id,
      name: discount.name,
      discount_type: discount.discount_type,
      value: discount.value,
      start_date: discount.start_date,
      end_date: discount.end_date,
    });
    setErrors({});
    setPanelOpen(true);
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.tariff_id) errs.tariff_id = t('discounts.errorTariffRequired');
    if (!form.name?.trim()) errs.name = t('discounts.errorNameRequired');
    if (!form.value || form.value <= 0) errs.value = t('discounts.errorValuePositive');
    if (form.discount_type === 'percentage' && form.value && form.value > 100)
      errs.value = t('discounts.errorPercentageMax');
    if (!form.start_date) errs.start_date = t('discounts.errorStartRequired');
    if (!form.end_date) errs.end_date = t('discounts.errorEndRequired');
    if (form.start_date && form.end_date && form.end_date <= form.start_date)
      errs.end_date = t('discounts.errorEndAfterStart');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    const onSuccess = () => {
      setPanelOpen(false);
      setEditingId(null);
      setForm({ discount_type: 'percentage' });
      setErrors({});
    };
    if (editingId) {
      updateDiscount.mutate(
        { id: editingId, ...form },
        {
          onSuccess,
          onError: () => showError(t('discounts.errorCreate')),
        }
      );
    } else {
      createDiscount.mutate(form as DiscountCreate, {
        onSuccess,
        onError: () => showError(t('discounts.errorCreate')),
      });
    }
  };

  const handleDelete = (id: string) => {
    deleteDiscount.mutate(id, {
      onError: () => showError(t('discounts.errorDelete')),
    });
  };

  if (isLoading) {
    return (
      <HotelAdminLayout
        activeNav="descuentos"
        title={t('discounts.title')}
        subtitle={t('discounts.subtitle')}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }}>
          <CircularProgress sx={{ color: palette.primary }} />
        </Box>
      </HotelAdminLayout>
    );
  }

  const getStatusStyle = (status: string) => statusStyles[status] ?? statusStyles['expired'];

  const statusStyles: Record<
    string,
    { bg: string; color: string; icon: React.ElementType; label: string }
  > = {
    active: {
      bg: palette.successContainer,
      color: palette.success,
      icon: CheckCircleIcon,
      label: t('discounts.statusActive'),
    },
    scheduled: {
      bg: '#E8F0FE',
      color: '#1A73E8',
      icon: ScheduleIcon,
      label: t('discounts.statusScheduled'),
    },
    expired: {
      bg: palette.errorContainer,
      color: palette.error,
      icon: CancelIcon,
      label: t('discounts.statusExpired'),
    },
  };

  return (
    <HotelAdminLayout
      activeNav="descuentos"
      title={t('discounts.title')}
      subtitle={t('discounts.subtitle')}
      topbarActions={
        <PrimaryPillButton
          pillSize="sm"
          startIcon={<AddIcon sx={{ fontSize: 16 }} />}
          onClick={() => setPanelOpen(true)}
        >
          {t('discounts.newDiscount')}
        </PrimaryPillButton>
      }
    >
      {/* Content layout: discount cards + form panel */}
      <ContentLayout>
        {/* Left: discount grid */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
          <DiscountGrid>
            {discountsData.map((discount: Discount) => {
              const TypeIcon =
                discount.discount_type === 'percentage' ? EventAvailableIcon : BoltIcon;
              const chipStyle =
                discount.discount_type === 'percentage'
                  ? { bg: '#E8F0FE', color: '#1A73E8' }
                  : { bg: palette.warningContainer, color: palette.warning };
              const status = getStatusStyle(discount.status);
              const StatusIcon = status.icon;
              const expired = discount.status === 'inactive';

              return (
                <DiscountCard key={discount.id} ownerState={{ expired }}>
                  <CardHeader>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                      <DiscountValue ownerState={{ expired }}>
                        {discount.discount_type === 'percentage'
                          ? discount.value
                          : formatPrice(discount.value)}
                      </DiscountValue>
                      {discount.discount_type === 'percentage' && (
                        <DiscountPercent ownerState={{ expired }}>%</DiscountPercent>
                      )}
                    </Box>
                    <TypeChip ownerState={chipStyle}>
                      <TypeIcon sx={{ fontSize: 13 }} />
                      {discount.discount_type === 'percentage'
                        ? t('discounts.percentage')
                        : t('discounts.fixedValue')}
                    </TypeChip>
                  </CardHeader>

                  <CardBody>
                    <CardTitle>{discount.name}</CardTitle>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <DetailRow>
                        <CalendarTodayIcon sx={{ fontSize: 13, color: palette.outline }} />
                        {t('discounts.validity')}{' '}
                        <DetailStrong component="strong">
                          {formatDate(discount.start_date, 'short')} -{' '}
                          {formatDate(discount.end_date, 'medium')}
                        </DetailStrong>
                      </DetailRow>
                    </Box>
                  </CardBody>

                  <CardFooter>
                    <StatusBadge ownerState={{ bg: status.bg, color: status.color }}>
                      <StatusIcon sx={{ fontSize: 12 }} />
                      {status.label}
                    </StatusBadge>
                    <Box sx={{ display: 'flex', gap: '4px' }}>
                      <SmallActionButton onClick={() => handleEdit(discount)}>
                        <EditIcon sx={{ fontSize: 13 }} />
                        {t('discounts.edit')}
                      </SmallActionButton>
                      <SmallActionButton onClick={() => handleDelete(discount.id)}>
                        <DeleteOutlineIcon sx={{ fontSize: 13 }} />
                        {t('discounts.delete')}
                      </SmallActionButton>
                    </Box>
                  </CardFooter>
                </DiscountCard>
              );
            })}
          </DiscountGrid>
        </Box>

        {/* Right: form panel */}
        {panelOpen && (
          <FormPanel>
            <PanelHeader>
              <PanelTitle>
                <AddCircleIcon sx={{ fontSize: 18 }} />
                {editingId ? t('discounts.editDiscount') : t('discounts.panelTitle')}
              </PanelTitle>
              <CloseButton
                onClick={() => {
                  setPanelOpen(false);
                  setEditingId(null);
                  setErrors({});
                }}
              >
                <CloseIcon sx={{ fontSize: 16, color: palette.onPrimary }} />
              </CloseButton>
            </PanelHeader>

            <PanelBody>
              {/* Tariff selector */}
              <Box sx={{ position: 'relative' }}>
                <FloatingLabel>{t('discounts.tariffId')}</FloatingLabel>
                <FormInput
                  component="select"
                  value={form.tariff_id ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setForm(f => ({ ...f, tariff_id: e.target.value }))
                  }
                >
                  <option value="">{t('discounts.tariffIdPlaceholder')}</option>
                  {Array.isArray(tariffsData) &&
                    tariffsData.map(
                      (tariff: {
                        id: string;
                        roomName: string;
                        rateType: string;
                        pricePerNight: number;
                      }) => (
                        <option key={tariff.id} value={tariff.id}>
                          {tariff.roomName} — {tariff.rateType}
                        </option>
                      )
                    )}
                </FormInput>
                {errors.tariff_id && (
                  <Text textVariant="hint" sx={{ color: palette.error, mt: '4px' }}>
                    {errors.tariff_id}
                  </Text>
                )}
              </Box>

              {/* Discount name */}
              <Box sx={{ position: 'relative' }}>
                <FloatingLabel>{t('discounts.discountName')}</FloatingLabel>
                <FormInput
                  component="input"
                  placeholder={t('discounts.discountNamePlaceholder')}
                  value={form.name ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm(f => ({ ...f, name: e.target.value }))
                  }
                />
                {errors.name && (
                  <Text textVariant="hint" sx={{ color: palette.error, mt: '4px' }}>
                    {errors.name}
                  </Text>
                )}
              </Box>

              {/* Discount type */}
              <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
                {t('discounts.discountValue')}
              </Text>
              <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <ToggleButton
                  ownerState={{ active: form.discount_type === 'percentage' }}
                  onClick={() => setForm(f => ({ ...f, discount_type: 'percentage' }))}
                >
                  {t('discounts.percentage')}
                </ToggleButton>
                <ToggleButton
                  ownerState={{ active: form.discount_type === 'fixed' }}
                  onClick={() => setForm(f => ({ ...f, discount_type: 'fixed' }))}
                >
                  {t('discounts.fixedValue')}
                </ToggleButton>
              </Box>
              <Box sx={{ position: 'relative', mt: '8px' }}>
                <FloatingLabel>
                  {form.discount_type === 'percentage'
                    ? t('discounts.discountPercentage')
                    : t('discounts.discountFixed')}
                </FloatingLabel>
                <FormInput
                  component="input"
                  type="number"
                  placeholder={
                    form.discount_type === 'percentage' ? t('discounts.percentagePlaceholder') : '0'
                  }
                  value={form.value ?? ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setForm(f => ({ ...f, value: parseFloat(e.target.value) }))
                  }
                />
                {errors.value && (
                  <Text textVariant="hint" sx={{ color: palette.error, mt: '4px' }}>
                    {errors.value}
                  </Text>
                )}
              </Box>

              {/* Validity */}
              <Text textVariant="miniLabel" sx={{ mb: '-4px' }}>
                {t('discounts.validityLabel')}
              </Text>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <Box sx={{ position: 'relative' }}>
                  <FloatingLabel>{t('discounts.startDate')}</FloatingLabel>
                  <FormInput
                    component="input"
                    type="date"
                    value={form.start_date ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm(f => ({ ...f, start_date: e.target.value }))
                    }
                  />
                  {errors.start_date && (
                    <Text textVariant="hint" sx={{ color: palette.error, mt: '4px' }}>
                      {errors.start_date}
                    </Text>
                  )}
                </Box>
                <Box sx={{ position: 'relative' }}>
                  <FloatingLabel>{t('discounts.endDate')}</FloatingLabel>
                  <FormInput
                    component="input"
                    type="date"
                    value={form.end_date ?? ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setForm(f => ({ ...f, end_date: e.target.value }))
                    }
                  />
                  {errors.end_date && (
                    <Text textVariant="hint" sx={{ color: palette.error, mt: '4px' }}>
                      {errors.end_date}
                    </Text>
                  )}
                </Box>
              </Box>
            </PanelBody>

            <PanelFooter>
              <OutlinedPillButton
                pillSize="xs"
                onClick={() => {
                  setPanelOpen(false);
                  setErrors({});
                }}
              >
                {t('discounts.cancel')}
              </OutlinedPillButton>
              <PrimaryPillButton
                pillSize="xs"
                startIcon={
                  createDiscount.isPending || updateDiscount.isPending ? (
                    <CircularProgress size={14} sx={{ color: palette.onPrimary }} />
                  ) : (
                    <CheckCircleIcon sx={{ fontSize: 16 }} />
                  )
                }
                sx={{ flex: 1 }}
                onClick={handleSave}
                disabled={createDiscount.isPending || updateDiscount.isPending}
              >
                {editingId ? t('discounts.saveDiscount') : t('discounts.createDiscount')}
              </PrimaryPillButton>
            </PanelFooter>
          </FormPanel>
        )}
      </ContentLayout>
    </HotelAdminLayout>
  );
}
