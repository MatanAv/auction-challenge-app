import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectFieldProps {
  label: string;
  options: string[];
  setValue: (value: string) => void;
}

export default function SelectField({ label, options, setValue }: SelectFieldProps) {
  const labelId = `select-label-${label.toLowerCase()}`;

  const handleSelect = (event: SelectChangeEvent<string>) => setValue(event.target.value);

  return (
    <FormControl>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select sx={{ textAlign: 'left' }} defaultValue='' labelId={labelId} label={label} onChange={handleSelect}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
