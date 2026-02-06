import React, { useState } from 'react';
import TitleCard from '../../shared/TitleBorderCard';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'src/components/ui/select';

const SelectValidation = () => {
  // Select Button
  const [selectedValue, setSelectedValue] = useState('');
  const handleSelectChange = (value: React.SetStateAction<string>) => {
    setSelectedValue(value);
  };

  const handleSubmitt = () => {
    alert(Number(selectedValue));
  };
  return (
    <div>
      <TitleCard title="Select">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <div className="mb-2 block">
              <Label htmlFor="age">Age</Label>
            </div>
            <Select onValueChange={handleSelectChange} value={selectedValue}>
              <SelectTrigger className="w-fit">
                <SelectValue placeholder="None" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Ten</SelectItem>
                <SelectItem value="20">Twenty</SelectItem>
                <SelectItem value="30">Thirty</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-12 flex items-center">
            <Button type="submit" onClick={handleSubmitt}>
              Submit
            </Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default SelectValidation;
