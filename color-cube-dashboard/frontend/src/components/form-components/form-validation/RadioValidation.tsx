import React, { useState } from 'react';
import TitleCard from '../../shared/TitleBorderCard';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';

const RadioValidation = () => {
  // Radio Button
  const [radioValue, setRadioValue] = useState('');

  const handleRadioChange = (value: React.SetStateAction<string>) => {
    setRadioValue(value);
  };
  const handleSubmitradio = () => {
    alert(radioValue);
  };
  return (
    <div>
      <TitleCard title="Radio">
        <form onSubmit={handleSubmitradio} className="grid grid-cols-12 gap-6">
          <RadioGroup
            onValueChange={handleRadioChange}
            value={radioValue}
            name="primarycolor"
            className="col-span-12 lg:col-span-6 flex flex-wrap gap-6"
          >
            <div className="lg:col-span-2 col-span-12 flex items-center gap-2">
              <RadioGroupItem value="Primary" id="primary" className="shrink-0" />
              <Label htmlFor="primary" className="mb-0">
                Primary
              </Label>
            </div>

            <div className="lg:col-span-2 col-span-12 flex items-center gap-2">
              <RadioGroupItem value="Error" id="error" className="shrink-0" />
              <Label htmlFor="error" className="mb-0">
                Error
              </Label>
            </div>

            <div className="lg:col-span-2 col-span-12 flex items-center gap-2">
              <RadioGroupItem value="Secondary" id="secondary" className="shrink-0" />
              <Label htmlFor="secondary" className="mb-0">
                Secondary
              </Label>
            </div>
          </RadioGroup>

          <div className="col-span-12 flex items-center">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </TitleCard>
    </div>
  );
};

export default RadioValidation;
