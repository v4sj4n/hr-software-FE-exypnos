import React, { useState, useCallback, useEffect } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { debounce } from '@/Helpers/debounce';
interface FilterOption {
  value: string;
  label: string;
}
interface Filter {
  name: string;
  label: string;
  type: 'text' | 'select' | 'number';
  placeholder?: string;
  options?: FilterOption[];
}
interface FilterComponentProps {
  filters: Filter[];
  filterValues: Record<string, string>;
  onFilterChange: (name: string, value: string) => void;
}
const FilterComponent: React.FC<FilterComponentProps> = ({ filters, filterValues, onFilterChange }) => {
  const [localFilterValues, setLocalFilterValues] = useState(filterValues);
  const debouncedFilterChange = useCallback(
    debounce((name: string, value: string) => {
      onFilterChange(name, value);
    }, 300),
    [onFilterChange]
  );
  useEffect(() => {
    setLocalFilterValues(filterValues);
  }, [filterValues]);
  const handleInputChange = (name: string, value: string) => {
    setLocalFilterValues(prev => ({ ...prev, [name]: value }));
    debouncedFilterChange(name, value);
  };
  const renderFilter = (filter: Filter) => {
    switch (filter.type) {
      case 'text':
      case 'number':
        return (
          <TextField
            fullWidth
            id={filter.name}
            name={filter.name}
            label={filter.label}
            value={localFilterValues[filter.name] || ''}
            onChange={(e) => handleInputChange(filter.name, e.target.value)}
            placeholder={filter.placeholder}
            variant="outlined"
            margin="normal"
            type={filter.type}
          />
        );
      case 'select':
        return (
          <Select
            fullWidth
            id={filter.name}
            name={filter.name}
            value={localFilterValues[filter.name] || ''}
            onChange={(e) => handleInputChange(filter.name, e.target.value as string)}
            displayEmpty
            variant="outlined"
            margin="dense"
          >
            <MenuItem value="">
              <em>{filter.placeholder || 'Select...'}</em>
            </MenuItem>
            {filter.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      default:
        return null;
    }
  };
  const resetFilters = () => {
    const resetValues = Object.fromEntries(filters.map(filter => [filter.name, '']));
    setLocalFilterValues(resetValues);
    filters.forEach(filter => onFilterChange(filter.name, ''));
  };
  return (
    <Box sx={{ p: 2, border: '1px solid #E0E0E0', borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Grid container spacing={2}>
        {filters.map((filter) => (
          <Grid item xs={12} sm={6} md={4} key={filter.name}>
            {renderFilter(filter)}
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 2 }}>
        <Button variant="contained" color="primary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </Box>
    </Box>
  );
};
export default FilterComponent;