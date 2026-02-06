import TitleCard from '../../shared/TitleBorderCard';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Textarea } from 'src/components/ui/textarea';
import { Checkbox } from 'src/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

const DefaultForm = () => {
  return (
    <div>
      <TitleCard title="Default Form">
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <div>
              <Label htmlFor="Default Text">Default Text</Label>
            </div>
            <Input id="default" type="text" placeholder="Marcal" />
          </div>
          <div className="space-y-1">
            <div>
              <Label htmlFor="email1">Email</Label>
            </div>
            <Input id="email1" type="email" placeholder="name@tailwindadmin.com" required />
          </div>
          <div className="space-y-1">
            <div>
              <Label htmlFor="password1">Password</Label>
            </div>
            <Input id="password1" type="password" required />
          </div>
          <div className="space-y-1">
            <div>
              <Label htmlFor="comment">Your message</Label>
            </div>
            <Textarea id="comment" placeholder="Leave a comment..." required rows={4} />
          </div>
          <div className="sm:flex items-center gap-[1.875rem] col-span-12">
            <div className="flex flex-col gap-[1rem]">
              <div className="flex items-center gap-2">
                <Checkbox id="promotion" />
                <Label htmlFor="promotion" className='mb-0'>I want to get promotional offers</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="promotion1" />
                <Label htmlFor="promotion1" className='mb-0'>I want to get promotional offers</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="promotion2" />
                <Label htmlFor="promotion2" className='mb-0'>I want to get promotional offers</Label>
              </div>
            </div>
            <RadioGroup defaultValue="USA" className="flex flex-col gap-[1rem] md:mt-0 mt-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="USA" id="usa" />
                <Label htmlFor="usa" className='mb-0'>United States</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Germany" id="germany" />
                <Label htmlFor="germany" className='mb-0'>Germany</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="Spain" id="spain" />
                <Label htmlFor="spain" className='mb-0'>Spain</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-1">
            <div>
              <Label htmlFor="countries">Select</Label>
            </div>
            <Select required>
              <SelectTrigger id="countries">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="united-states">United States</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
              </SelectContent>
            </Select>
            <div className="pt-5">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default DefaultForm;
