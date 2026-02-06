import { useState } from 'react';
import { format } from 'date-fns';
import TitleCard from '../../shared/TitleBorderCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from 'src/components/ui/tabs';
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
import { cn } from 'src/lib/utils';
import { Calendar } from 'src/components/ui/calendar';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from 'src/components/ui/popover';

const FormWithTabs = () => {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <div>
      <TitleCard title="Form with Tabs">
        <Tabs defaultValue="personal-info" className="gap-6">
          <TabsList className="mb-6">
            <TabsTrigger value="personal-info">Personal Info</TabsTrigger>
            <TabsTrigger value="account-details">Account Details</TabsTrigger>
            <TabsTrigger value="social-links">Social Links</TabsTrigger>
          </TabsList>

          <TabsContent value="personal-info">
            <div className="grid grid-cols-12 gap-6">
              <div className="lg:col-span-6 col-span-12 flex flex-col gap-6">
                {/* First Name */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input id="firstname" type="text" placeholder="John" />
                </div>

                {/* Country */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="france">France</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Birth Date */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="birthdate">Birth Date</Label>
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

              <div className="lg:col-span-6 col-span-12 flex flex-col gap-6">
                {/* Last Name */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input id="lastname" type="text" placeholder="Deo" />
                </div>

                {/* Language */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="language">Language</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone No */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="phone">Phone No</Label>
                  <Input id="phone" type="text" placeholder="958 1475 458" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 mt-8">
              <Button type="submit">Submit</Button>
              <Button type="reset" variant="error">
                Cancel
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="account-details">
            <div className="grid grid-cols-12 gap-6">
              <div className="lg:col-span-6 col-span-12 flex flex-col gap-6">
                {/* Username */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" type="text" placeholder="John.Deo" />
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="john.deo" />
                </div>
              </div>

              <div className="lg:col-span-6 col-span-12 flex flex-col gap-6">
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john.deo@example.com" />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="confirm">Confirm</Label>
                  <Input id="confirm" type="password" placeholder="john.deo" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 mt-8">
              <Button type="submit">Submit</Button>
              <Button type="reset" variant="error">
                Cancel
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="social-links">
            <div className="grid grid-cols-12 gap-6">
              <div className="lg:col-span-6 col-span-12 flex flex-col gap-6">
                {/* Twitter */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input id="twitter" type="url" placeholder="https://twitter.com/abc" />
                </div>

                {/* Google */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="google">Google</Label>
                  <Input id="google" type="url" placeholder="https://plus.google.com/abc" />
                </div>

                {/* Instagram */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input id="instagram" type="url" placeholder="https://instagram.com/abc" />
                </div>
              </div>

              <div className="lg:col-span-6 col-span-12 flex flex-col gap-6">
                {/* Facebook */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input id="facebook" type="url" placeholder="https://facebook.com/abc" />
                </div>

                {/* Linkedin */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="linkedin">Linkedin</Label>
                  <Input id="linkedin" type="url" placeholder="https://linkedin.com/abc" />
                </div>

                {/* Quora */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="quora">Quora</Label>
                  <Input id="quora" type="url" placeholder="https://quora.com/abc" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-5 mt-8">
              <Button type="submit">Submit</Button>
              <Button type="reset" variant="error">
                Cancel
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </TitleCard>
    </div>
  );
};

export default FormWithTabs;
