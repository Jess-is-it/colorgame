import { useState } from 'react';
import TitleCard from '../../shared/TitleBorderCard';
import { Checkbox } from 'src/components/ui/checkbox';
import { Button } from 'src/components/ui/button';

const CheckBoxValidation = () => {
  // Checkbox
  const [checkboxStates, setCheckboxStates] = useState({
    primary: false,
    secondary: false,
    error: false,
  });

  const [error, setError] = useState('');

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [key]: checked,
    }));

    if (checked) {
      setError('');
    }
  };

  const handleSubmitcheck = () => {
    const { primary, secondary, error } = checkboxStates;

    const selectedColors = [];
    if (primary) selectedColors.push('Primary');
    if (secondary) selectedColors.push('Secondary');
    if (error) selectedColors.push('Error');

    if (selectedColors.length > 0) {
      alert(selectedColors.join(', '));
    } else {
      setError('At least one checkbox must be checked');
    }
  };
  return (
    <div>
      <TitleCard title="Checkboxes">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 flex items-center gap-5">
            <Checkbox
              id="primary"
              color="primary"
              checked={checkboxStates.primary}
              // onChange={handleCheckboxChange}
              onCheckedChange={(checked) => handleCheckboxChange('primary', Boolean(checked))}
            />
            <Checkbox
              id="secondary"
              color="secondary"
              checked={checkboxStates.secondary}
              // onChange={handleCheckboxChange}
              onCheckedChange={(checked) => handleCheckboxChange('secondary', Boolean(checked))}
            />
            <Checkbox
              id="error"
              color="error"
              checked={checkboxStates.error}
              // onChange={handleCheckboxChange}
              onCheckedChange={(checked) => handleCheckboxChange('error', Boolean(checked))}
            />
          </div>
          {error && <div className="col-span-12 text-red-500">{error}</div>}
          <div className="col-span-12 flex items-center">
            <Button type="submit" onClick={handleSubmitcheck}>
              Submit
            </Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default CheckBoxValidation;
