import { useState } from 'react';
import TitleCard from '../../shared/TitleBorderCard';
import { HiInformationCircle } from 'react-icons/hi';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';
import { Alert, AlertTitle } from 'src/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { format } from 'date-fns';
import { cn } from 'src/lib/utils';
import { Calendar } from 'src/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from 'src/components/ui/popover';

const BasicHeaderForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  return (
    <div>
      <TitleCard title="Basic Header Form">
        <div className="pb-6">
          <Alert variant={'lightprimary'}>
            <HiInformationCircle className="h-4 w-4 !text-inherit" />
            <AlertTitle className="text-inherit">Person Info</AlertTitle>
          </Alert>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* First Name */}
          <div className="sm:col-span-6 col-span-12">
            <Label htmlFor="firstname" className="mb-2 block">
              First Name
            </Label>
            <Input id="firstname" type="text" />
          </div>

          {/* Last Name */}
          <div className="sm:col-span-6 col-span-12">
            <Label htmlFor="lastname" className="mb-2 block">
              Last Name
            </Label>
            <Input id="lastname" type="text" />
          </div>

          {/* Gender Select */}
          <div className="sm:col-span-6 col-span-12">
            <Label htmlFor="gender" className="mb-2 block">
              Select Gender
            </Label>
            <Select required>
              <SelectTrigger id="gender" className="select-md">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date of Birth */}
          <div className="sm:col-span-6 col-span-12">
            <Label htmlFor="birth" className="mb-2 block">
              Date of Birth
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal hover:bg-transparent text-ld hover:text-ld',
                    !date && 'text-muted-foreground hover:text-muted-foreground',
                  )}
                >
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          {/* Membership Radio */}
          <div className="col-span-12">
            <Label htmlFor="membership" className="mb-3 inline-block">
              Membership
            </Label>
            <RadioGroup defaultValue="free" className="flex items-center gap-6">
              <div className="flex items-center gap-2 pb-2">
                <RadioGroupItem value="free" id="free" />
                <Label htmlFor="free" className='mb-0'>Free</Label>
              </div>
              <div className="flex items-center gap-2 pb-2">
                <RadioGroupItem value="paid" id="paid" />
                <Label htmlFor="paid" className='mb-0'>Paid</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Address Alert */}
          <div className="col-span-12">
            <Alert variant={'lightprimary'}>
              <HiInformationCircle className="h-4 w-4 !text-inherit" />
              <AlertTitle className="text-inherit">Address</AlertTitle>
            </Alert>
          </div>

          {/* Street */}
          <div className="col-span-12">
            <Label htmlFor="street" className="mb-2 block">
              Street
            </Label>
            <Input id="street" type="text" />
          </div>

          {/* City */}
          <div className="sm:col-span-6 col-span-12">
            <Label htmlFor="city" className="mb-2 block">
              City
            </Label>
            <Input id="city" type="text" />
          </div>

          {/* State */}
          <div className="sm:col-span-6 col-span-12">
            <Label htmlFor="state" className="mb-2 block">
              State
            </Label>
            <Input id="state" type="text" />
          </div>

          {/* Post Code */}
          <div className="sm:col-span-6 col-span-12">
            <Label htmlFor="postcode" className="mb-2 block">
              Post Code
            </Label>
            <Input id="postcode" type="text" />
          </div>

          {/* Country Select */}
          <div className="sm:col-span-6 col-span-12">
            <Label htmlFor="country" className="mb-2 block">
              Country
            </Label>
            <Select required>
              <SelectTrigger id="country" className="select-md">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="united-states">United States</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Buttons */}
          <div className="col-span-12 flex items-center gap-[1rem]">
            <Button type="reset" variant="destructive">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default BasicHeaderForm;
