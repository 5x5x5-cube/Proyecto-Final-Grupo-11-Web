import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAvailablePeriods } from '@/api/hooks/useReports';

interface MonthYearPickerProps {
  value: string; // Format: "YYYY-MM"
  onChange: (value: string) => void;
}

export default function MonthYearPicker({ value, onChange }: MonthYearPickerProps) {
  const { data: periodsData, isLoading } = useAvailablePeriods();
  const periods = (periodsData as any)?.periods ?? [];

  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  if (isLoading) {
    return (
      <Select value={value} disabled size="small" sx={{ minWidth: 200 }}>
        <MenuItem value={value}>Cargando...</MenuItem>
      </Select>
    );
  }

  return (
    <Select value={value} onChange={handleChange} size="small" sx={{ minWidth: 200 }}>
      {periods.map((period: any) => {
        const periodValue = `${period.year}-${String(period.month).padStart(2, '0')}`;
        return (
          <MenuItem key={periodValue} value={periodValue}>
            {period.label} ({period.booking_count} reservas)
          </MenuItem>
        );
      })}
    </Select>
  );
}
