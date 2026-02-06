import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import TitleCard from '../../shared/TitleBorderCard';
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
import { Popover, PopoverTrigger, PopoverContent } from 'src/components/ui/popover';
import { Calendar } from 'src/components/ui/calendar';
import { cn } from 'src/lib/utils';

const FormSeprator = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <>
      <TitleCard title="Form Separator">
        {/* Section: Account Details */}
        <div className="grid grid-cols-12 items-center pb-[1.875rem]">
          <div className="col-span-3">
            <h6 className="text-lg font-semibold">Account Details</h6>
          </div>
          <div className="col-span-9" />
        </div>

        <div className="grid grid-cols-12 items-center pb-[1.875rem]">
          <div className="col-span-3">
            <Label htmlFor="username">Username</Label>
          </div>
          <div className="col-span-9">
            <Input id="username" type="text" placeholder="John Deo" />
          </div>
        </div>

        <div className="grid grid-cols-12 items-center pb-[1.875rem]">
          <div className="col-span-3">
            <Label htmlFor="email">Email</Label>
          </div>
          <div className="col-span-9">
            <Input id="email" type="email" placeholder="john.deo@example.com" />
          </div>
        </div>

        <div className="grid grid-cols-12 items-center pb-[1.875rem]">
          <div className="col-span-3">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="col-span-9">
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </div>

        {/* Section: Personal Info */}
        <div className="grid grid-cols-12 items-center pb-[1.875rem] border-t border-border pt-5 dark:border-darkborder">
          <div className="col-span-3">
            <h6 className="text-lg font-semibold">Personal Info</h6>
          </div>
          <div className="col-span-9" />
        </div>

        <div className="grid grid-cols-12 items-center pb-[1.875rem]">
          <div className="col-span-3">
            <Label htmlFor="fullname">Full Name</Label>
          </div>
          <div className="col-span-9">
            <Input id="fullname" type="text" placeholder="John Deo" />
          </div>
        </div>

        <div className="grid grid-cols-12 items-center pb-[1.875rem]">
          <div className="col-span-3">
            <Label htmlFor="country">Country</Label>
          </div>
          <div className="col-span-9">
            <Select>
              <SelectTrigger id="country" className="w-full">
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
        <div className="grid grid-cols-12 items-center pb-[1.875rem]">
          <div className="col-span-3">
            <Label htmlFor="birthdate">Birth Date</Label>
          </div>
          <div className="col-span-9">
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
        {/* End DatePicker */}

        <div className="grid grid-cols-12 items-center pb-[1.875rem]">
          <div className="col-span-3">
            <Label htmlFor="phone">Phone No</Label>
          </div>
          <div className="col-span-9">
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
    </>
  );
};

export default FormSeprator;
