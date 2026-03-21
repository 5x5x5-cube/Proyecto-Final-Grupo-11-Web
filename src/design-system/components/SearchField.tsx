import React from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { outlineVariant, onSurface, onSurfaceVariant } from '../theme/palette';

interface SearchFieldProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ placeholder = 'Buscar...', value, onChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        backgroundColor: '#ffffff',
        border: `1px solid ${outlineVariant}`,
        borderRadius: '100px',
        padding: '8px 16px',
      }}
    >
      <SearchIcon sx={{ fontSize: '20px', color: onSurfaceVariant }} />
      <InputBase
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        sx={{
          flex: 1,
          fontSize: '14px',
          color: onSurface,
          '& input::placeholder': {
            color: onSurfaceVariant,
            opacity: 1,
          },
        }}
      />
    </Box>
  );
};

export default SearchField;
