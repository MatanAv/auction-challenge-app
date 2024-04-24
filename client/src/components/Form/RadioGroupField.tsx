import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

interface RadioGroupFieldProps {
  label: string;
  onChange: (value: string) => void;
  options?: string[];
  controlledOptions?: React.ReactNode;
}

export default function RadioGroupField({ label, options = [], onChange, controlledOptions }: RadioGroupFieldProps) {
  const labelId = `radio-buttons-group-${label}`;

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value);

  const renderedOptions =
    controlledOptions ||
    options.map((option, index) => <FormControlLabel key={index} value={option} control={<Radio />} label={option} />);

  return (
    <FormControl>
      <RadioGroup aria-labelledby={labelId} defaultValue='' name='radio-buttons-group' onChange={handleOnChange}>
        {renderedOptions}
      </RadioGroup>
    </FormControl>
  );
}
