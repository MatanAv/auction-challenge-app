import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

interface RadioGroupFieldProps {
  label: string;
  options: string[];
  setValue: (value: string) => void;
}

export default function RadioGroupField({ label, options, setValue }: RadioGroupFieldProps) {
  const labelId = `radio-buttons-group-${label}`;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value);

  return (
    <FormControl>
      <RadioGroup aria-labelledby={labelId} defaultValue='' name='radio-buttons-group' onChange={handleOnChange}>
        {options.map((option) => (
          <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
