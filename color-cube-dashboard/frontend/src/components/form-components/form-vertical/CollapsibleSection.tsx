import TitleCard from '../../shared/TitleBorderCard';
import { Button } from 'src/components/ui/button';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'src/components/ui/select';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from 'src/components/ui/accordion';

const CollapsibleSection = () => {
  return (
    <div>
      <TitleCard title="Collapsible Section">
        <Accordion type="multiple">
          {/* Delivery Address */}
          <AccordionItem value="delivery-address">
            <AccordionTrigger className="text-lg font-semibold">Delivery Address</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-12 gap-6">
                <div className="lg:col-span-6 col-span-12">
                  <Label htmlFor="fullname" className="mb-2 block">
                    Full Name
                  </Label>
                  <Input id="fullname" type="text" placeholder="John Deo" className="w-full" />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <Label htmlFor="phone" className="mb-2 block">
                    Phone No
                  </Label>
                  <Input id="phone" type="text" placeholder="425 7545 6321" className="w-full" />
                </div>
                <div className="col-span-12">
                  <Label htmlFor="address" className="mb-2 block">
                    Address
                  </Label>
                  <Textarea id="address" placeholder="150, Ring Road" rows={3} className="w-full" />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <Label htmlFor="pincode" className="mb-2 block">
                    Pincode
                  </Label>
                  <Input id="pincode" type="text" placeholder="687541" className="w-full" />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <Label htmlFor="landmark" className="mb-2 block">
                    Landmark
                  </Label>
                  <Input
                    id="landmark"
                    type="text"
                    placeholder="Nr. Wall Street"
                    className="w-full"
                  />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <Label htmlFor="city" className="mb-2 block">
                    City
                  </Label>
                  <Input id="city" type="text" placeholder="Jackson" className="w-full" />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <Label htmlFor="state" className="mb-2 block">
                    State
                  </Label>
                  <Select defaultValue="">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dubai">Dubai</SelectItem>
                      <SelectItem value="poland">Poland</SelectItem>
                      <SelectItem value="bangladesh">Bangladesh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-12">
                  <Label className="mb-2 block">Address Type</Label>
                  <RadioGroup defaultValue="home" className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home" className="mb-0">
                        Home (All day delivery)
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="office" id="office" />
                      <Label htmlFor="office" className="mb-0">
                        Office (Delivery between 10 AM - 5 PM)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Delivery Options */}
          <AccordionItem value="delivery-options">
            <AccordionTrigger className="text-lg font-semibold">Delivery Options</AccordionTrigger>
            <AccordionContent>
              <RadioGroup defaultValue="standard" className="flex gap-5">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="mb-0">
                    Standard 3-5 Days
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="mb-0">
                    Express
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="overnight" id="overnight" />
                  <Label htmlFor="overnight" className="mb-0">
                    Overnight
                  </Label>
                </div>
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>

          {/* Payment Method */}
          <AccordionItem value="payment-method">
            <AccordionTrigger className="text-lg font-semibold">Payment Method</AccordionTrigger>
            <AccordionContent>
              <RadioGroup defaultValue="card" className="flex gap-5 py-6">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="card" id="cardpayment" />
                  <Label htmlFor="cardpayment" className="mb-0">
                    Credit/Debit/ATM Card
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="cod" id="cashondelivery" />
                  <Label htmlFor="cashondelivery" className="mb-0">
                    Cash on Delivery
                  </Label>
                </div>
              </RadioGroup>
              <div className="grid grid-cols-12 gap-6">
                <div className="lg:col-span-7 col-span-12">
                  <Label htmlFor="cardnumber" className="mb-2 block">
                    Card Number
                  </Label>
                  <Input
                    id="cardnumber"
                    type="number"
                    placeholder="1250 4521 5630 2390"
                    className="w-full"
                  />
                </div>
                <div className="lg:col-span-7 col-span-12 grid grid-cols-9 gap-6">
                  <div className="lg:col-span-5 col-span-12">
                    <Label htmlFor="name" className="mb-2 block">
                      Name
                    </Label>
                    <Input id="name" type="text" placeholder="Name" className="w-full" />
                  </div>
                  <div className="lg:col-span-2 col-span-12">
                    <Label htmlFor="expiredate" className="mb-2 block">
                      Exp. Date
                    </Label>
                    <Input id="expiredate" type="text" placeholder="MM/YY" className="w-full" />
                  </div>
                  <div className="lg:col-span-2 col-span-12">
                    <Label htmlFor="cvvnumber" className="mb-2 block">
                      CVV Code
                    </Label>
                    <Input id="cvvnumber" type="number" placeholder="528" className="w-full" />
                  </div>
                </div>
                <div className="lg:col-span-7 col-span-12 flex items-center gap-4 mt-4">
                  <Button type="submit" variant="default">
                    Submit
                  </Button>
                  <Button type="reset" variant="destructive">
                    Cancel
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TitleCard>
    </div>
  );
};

export default CollapsibleSection;
