import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

interface SelectFieldProps {
  label: string;
  options: string[];
  handleSelect: (value: string) => void;
}

export default function SelectField({ label, options, handleSelect }: SelectFieldProps) {
  const labelId = `select-label-${label.toLowerCase()}`;

  return (
    <FormControl>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        sx={{ textAlign: 'left' }}
        defaultValue=''
        labelId={labelId}
        label={label}
        onChange={(e) => handleSelect(e.target.value as string)}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
