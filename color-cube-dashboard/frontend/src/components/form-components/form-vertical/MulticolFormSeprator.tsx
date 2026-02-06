import { useState } from 'react';
import { format } from 'date-fns';
import TitleCard from '../../shared/TitleBorderCard';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'src/components/ui/select';
import { cn } from 'src/lib/utils';
import { Calendar } from 'src/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from 'src/components/ui/popover';

const MulticolFormSeprator = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <div>
      <TitleCard title="Multi Column With Form Separator">
        <div className="col-span-12 pb-6">
          <h6 className="text-lg">Account Details</h6>
        </div>
        <div className="grid lg:grid-cols-2    gap-6 pb-6">
          <div className="col-span-1">
            <div className="col-span-3 mb-2">
              <Label htmlFor="username">Username</Label>
            </div>
            <div className="col-span-9">
              <Input id="username" type="text" placeholder="John Deo" />
            </div>
          </div>
          <div className="col-span-1">
            <div className="col-span-3 mb-2">
              <Label htmlFor="email">Email</Label>
            </div>
            <div className="col-span-9">
              <Input id="email" type="text" placeholder="john.deo@example.com" />
            </div>
          </div>
          <div className="col-span-1">
            <div className="col-span-3 mb-2">
              <Label htmlFor="password">Password</Label>
            </div>
            <div className="col-span-9">
              <Input id="password" type="password" placeholder="john.deo" />
            </div>
          </div>
          <div className="col-span-1">
            <div className="col-span-3 mb-2">
              <Label htmlFor="confirmpassword">Confirm Password</Label>
            </div>
            <div className="col-span-9">
              <Input id="confirmpassword" type="password" placeholder="john.deo" />
            </div>
          </div>
        </div>

        <div className="col-span-12 pb-6 border-t border-border pt-5 dark:border-darkborder">
          <h6 className="text-lg">Personal Info</h6>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
              <Label htmlFor="firstname">First Name</Label>
            </div>
            <div className="col-span-9">
              <Input id="firstname" type="text" placeholder="Jordan" />
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
              <Label htmlFor="lastname">Last Name</Label>
            </div>
            <div className="col-span-9">
              <Input id="lastname" type="text" placeholder="Powell" />
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
              <Label htmlFor="country">Country</Label>
            </div>
            <div className="lg:col-span-6 col-span-12">
              <Select defaultValue="" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="franch">Franch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
              <Label htmlFor="languange">Language</Label>
            </div>
            <div className="lg:col-span-6 col-span-12">
              <Select defaultValue="" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Spanish</SelectItem>
                  <SelectItem value="chinese">Chinese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
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
          <div className="lg:col-span-6 col-span-12">
            <div className="col-span-3 mb-2">
              <Label htmlFor="phone">Phone No</Label>
            </div>
            <div className="col-span-9">
              <Input id="phone" type="text" placeholder="124 456 741" />
            </div>
          </div>
          <div className="grid grid-cols-12 items-center">
            <div className="col-span-3"></div>
            <div className="col-span-9 flex items-center gap-[1rem]">
              <Button type="submit">Submit</Button>
              <Button type="reset" variant="error">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default MulticolFormSeprator;
