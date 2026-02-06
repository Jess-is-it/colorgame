import React, { useState } from 'react';
import { HiOutlinePlusSm, HiOutlineX } from 'react-icons/hi';
import { Card } from 'src/components/ui/card';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

const Variation = () => {
  const [variations, setVariations] = useState([{ id: 1, type: 'Size', value: '' }]);
  const [nextId, setNextId] = useState(2);

  const addVariation = () => {
    const newVariation = { id: nextId, type: 'Size', value: '' };
    setVariations([...variations, newVariation]);
    setNextId(nextId + 1);
  };

  const removeVariation = (id: number) => {
    if (window.confirm('Are you sure you want to remove this item?')) {
      const updatedVariations = variations.filter((variance) => variance.id !== id);
      setVariations(updatedVariations);
    }
  };

  const handleValueChange = (id: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedVariations = variations.map((variance) =>
      variance.id === id ? { ...variance, value: event.target.value } : variance,
    );
    setVariations(updatedVariations);
  };

  const handleTypeChange = (id: number, newType: string) => {
    const updatedVariations = variations.map((variance) =>
      variance.id === id ? { ...variance, type: newType } : variance,
    );
    setVariations(updatedVariations);
  };

  return (
    <>
      <Card>
        <h5 className="card-title mb-4">Variation</h5>
        {variations.map((variation) => (
          <div key={variation.id} className="grid grid-cols-12 md:gap-6 gap-5 items-end mb-3">
            <div className="md:col-span-4 col-span-12">
              <div className="">
                <div className="flex">
                  <Label htmlFor={`variation-type-${variation.id}`}>Product Name</Label>
                  <span className="text-error ms-1">*</span>
                </div>
                <Select
                  value={variation.type}
                  onValueChange={(value) => handleTypeChange(variation.id, value)}
                >
                  <SelectTrigger className="select-md w-full">
                    <SelectValue placeholder="Select variation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Size">Size</SelectItem>
                    <SelectItem value="Color">Color</SelectItem>
                    <SelectItem value="Material">Material</SelectItem>
                    <SelectItem value="Style">Style</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="md:col-span-4 col-span-12">
              <Input
                type="text"
                placeholder="Variation"
                value={variation.value}
                onChange={(e) => handleValueChange(variation.id, e)}
              />
            </div>
            <div className="md:col-span-4 col-span-12">
              <Button
                variant={'lighterror'}
                className="rounded-md"
                onClick={() => removeVariation(variation.id)}
              >
                <HiOutlineX size={20} />
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant={'lightprimary'}
          className="w-fit flex items-center gap-2 mt-4 rounded-md"
          onClick={addVariation}
        >
          <HiOutlinePlusSm size={18} /> Add another variation
        </Button>
      </Card>
    </>
  );
};

export default Variation;
