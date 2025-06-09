import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SelectFieldProps {
    value: string;
    label: string;
    options: string[];
    setValue: (value: string) => void;
}

export default function SelectField({ value, label, options, setValue }: SelectFieldProps) {
    const labelId = `select-label-${label.toLowerCase()}`;

    const handleSelect = (event: SelectChangeEvent<string>) => setValue(event.target.value);

    return (
        <FormControl sx={{ textAlign: 'right', direction: 'rtl' }}>
            {!value && <InputLabel id={labelId}>{label}</InputLabel>}
            <Select sx={{ textAlign: 'right', direction: 'rtl' }} defaultValue='' labelId={labelId} onChange={handleSelect}>
                {options.map((option) => (
                    <MenuItem sx={{ textAlign: 'right', direction: 'rtl' }} key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
