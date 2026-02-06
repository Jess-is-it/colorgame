import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'src/components/ui/select';
import { Popover, PopoverTrigger, PopoverContent } from 'src/components/ui/popover';
import { Calendar } from 'src/components/ui/calendar';
import { cn } from 'src/lib/utils';
import TitleCard from '../../shared/TitleBorderCard';

const FormLableAlignment = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <div>
      <TitleCard title="Form Label Alignment">
        {/* Section Title */}
        <div className="grid grid-cols-12 items-center pb-6">
          <div className="col-span-3">
            <h6 className="text-lg font-semibold">Account Details</h6>
          </div>
          <div className="col-span-9" />
        </div>

        {/* Username */}
        <div className="flex pb-6">
          <div className="basis-1/4 flex items-center pr-[1.875rem] justify-end">
            <Label htmlFor="username">Username</Label>
          </div>
          <div className="basis-3/4">
            <Input id="username" type="text" placeholder="John Deo" />
          </div>
        </div>

        {/* Email */}
        <div className="flex pb-6">
          <div className="basis-1/4 flex items-center pr-[1.875rem] justify-end">
            <Label htmlFor="email">Email</Label>
          </div>
          <div className="basis-3/4">
            <Input id="email" type="email" placeholder="john.deo@example.com" />
          </div>
        </div>

        {/* Password */}
        <div className="flex pb-6">
          <div className="basis-1/4 flex items-center pr-[1.875rem] justify-end">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="basis-3/4">
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </div>

        {/* Section Title */}
        <div className="grid grid-cols-12 items-center pb-6 border-t border-border pt-5 dark:border-darkborder">
          <div className="col-span-3">
            <h6 className="text-lg font-semibold">Personal Info</h6>
          </div>
          <div className="col-span-9" />
        </div>

        {/* Full Name */}
        <div className="flex pb-6">
          <div className="basis-1/4 flex items-center pr-[1.875rem] justify-end">
            <Label htmlFor="fullname">Full Name</Label>
          </div>
          <div className="basis-3/4">
            <Input id="fullname" type="text" placeholder="John Deo" />
          </div>
        </div>

        {/* Country */}
        <div className="flex pb-6">
          <div className="basis-1/4 flex items-center pr-[1.875rem] justify-end">
            <Label htmlFor="country">Country</Label>
          </div>
          <div className="basis-3/4">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="europe">Europe</SelectItem>
                <SelectItem value="france">France</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* DatePicker */}
        <div className="flex pb-6">
          <div className="basis-1/4 flex items-center pr-[1.875rem] justify-end">
            <Label htmlFor="birthdate">Birth Date</Label>
          </div>
          <div className="basis-3/4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal border-ld hover:border-primary hover:bg-transparent text-ld hover:text-ld',
                    !date && 'text-muted-foreground hover:text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Phone */}
        <div className="flex pb-6">
          <div className="basis-1/4 flex items-center pr-[1.875rem] justify-end">
            <Label htmlFor="phone">Phone No</Label>
          </div>
          <div className="basis-3/4">
            <Input id="phone" type="text" placeholder="512 2250 551" />
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-3" />
          <div className="col-span-9 flex items-center gap-[1rem]">
            <Button type="submit">Submit</Button>
            <Button type="reset" variant="destructive">
              Cancel
            </Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default FormLableAlignment;
