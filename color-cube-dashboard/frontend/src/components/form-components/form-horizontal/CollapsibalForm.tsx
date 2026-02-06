import TitleCard from '../../shared/TitleBorderCard';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from 'src/components/ui/accordion';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from 'src/components/ui/radio-group';
import { Button } from 'src/components/ui/button';

const CollapsibalForm = () => {
  return (
    <div>
      <TitleCard title="Collapsible Section">
        <div>
          <Accordion type="multiple">
            {/* Delivery Address */}
            <AccordionItem value="delivery-address">
              <AccordionTrigger className="text-lg font-semibold">
                Delivery Address
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-12 gap-[1.875rem]">
                  <div className="lg:col-span-6 col-span-12 flex flex-col gap-[1.875rem]">
                    {/* Full Name */}
                    <div className="grid grid-cols-12 gap-7 items-center">
                      <div className="col-span-3">
                        <Label htmlFor="fullname">Full Name</Label>
                      </div>
                      <div className="col-span-9">
                        <Input id="fullname" type="text" placeholder="John Deo" />
                      </div>
                    </div>

                    {/* Address */}
                    <div className="grid grid-cols-12 gap-7 items-center">
                      <div className="col-span-3">
                        <Label htmlFor="address">Address</Label>
                      </div>
                      <div className="col-span-9">
                        <Textarea id="address" placeholder="150, Ring Road" required rows={3} />
                      </div>
                    </div>

                    {/* City */}
                    <div className="grid grid-cols-12 gap-7 items-center">
                      <div className="col-span-3">
                        <Label htmlFor="city">City</Label>
                      </div>
                      <div className="col-span-9">
                        <Input id="city" type="text" placeholder="Jackson" />
                      </div>
                    </div>

                    {/* Address Type */}
                    <div className="grid grid-cols-12 gap-7 items-start">
                      <div className="col-span-3">
                        <Label htmlFor="addresstype">Address Type</Label>
                      </div>
                      <div className="col-span-9 space-y-2">
                        <RadioGroup defaultValue="home" name="membership" className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem id="home" value="home" />
                            <Label htmlFor="home" className="cursor-pointer mb-0">
                              Home (All day delivery)
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem id="office" value="office" />
                            <Label htmlFor="office" className="cursor-pointer mb-0">
                              Office (Delivery between 10 AM - 5 PM)
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 col-span-12 flex flex-col gap-[1.875rem]">
                    {/* Phone */}
                    <div className="grid grid-cols-12 gap-7 items-center">
                      <div className="col-span-3">
                        <Label htmlFor="phone">Phone No</Label>
                      </div>
                      <div className="col-span-9">
                        <Input id="phone" type="text" placeholder="425 7545 6321" />
                      </div>
                    </div>

                    {/* Pincode */}
                    <div className="grid grid-cols-12 gap-7 items-center">
                      <div className="col-span-3">
                        <Label htmlFor="pincode">Pincode</Label>
                      </div>
                      <div className="col-span-9">
                        <Input id="pincode" type="text" placeholder="687541" />
                      </div>
                    </div>

                    {/* Landmark */}
                    <div className="grid grid-cols-12 gap-7 items-center">
                      <div className="col-span-3">
                        <Label htmlFor="landmark">Landmark</Label>
                      </div>
                      <div className="col-span-9">
                        <Input id="landmark" type="text" placeholder="Nr. Wall Street" />
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Delivery Options */}
            <AccordionItem value="delivery-options">
              <AccordionTrigger className="text-lg font-semibold">
                Delivery Options
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup
                  defaultValue="standard"
                  name="parcel"
                  className="flex items-center gap-5"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="standard" value="standard" />
                    <Label htmlFor="standard" className="cursor-pointer mb-0">
                      Standard 3-5 Days
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="express" value="express" />
                    <Label htmlFor="express" className="cursor-pointer mb-0">
                      Express
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem id="overnight" value="overnight" />
                    <Label htmlFor="overnight" className="cursor-pointer mb-0">
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
                <div className="flex items-center gap-5 py-[1.875rem]">
                  <RadioGroup
                    defaultValue="card"
                    name="payment"
                    className="flex items-center gap-5"
                  >
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="cardpayment" value="card" />
                      <Label htmlFor="cardpayment" className="cursor-pointer mb-0">
                        Credit/Debit/ATM Card
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem id="cashondelivery" value="cod" />
                      <Label htmlFor="cashondelivery" className="cursor-pointer mb-0">
                        Cash on Delivery
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid grid-cols-12 gap-[1.875rem]">
                  <div className="lg:col-span-7 col-span-12">
                    <div className="col-span-3 mb-2">
                      <Label htmlFor="cardnumber">Card Number</Label>
                    </div>
                    <div className="col-span-9">
                      <Input id="cardnumber" type="text" placeholder="1250 4521 5630 2390" />
                    </div>
                  </div>

                  <div className="lg:col-span-7 col-span-12 grid grid-cols-9 gap-[1.875rem]">
                    <div className="lg:col-span-5 col-span-12">
                      <div className="mb-2">
                        <Label htmlFor="name">Name</Label>
                      </div>
                      <Input id="name" type="text" placeholder="Name" />
                    </div>

                    <div className="lg:col-span-2 col-span-12">
                      <div className="mb-2">
                        <Label htmlFor="expiredate">Exp. Date</Label>
                      </div>
                      <Input id="expiredate" type="text" placeholder="MM/YY" />
                    </div>

                    <div className="lg:col-span-2 col-span-12">
                      <div className="mb-2">
                        <Label htmlFor="cvvnumber">CVV Code</Label>
                      </div>
                      <Input id="cvvnumber" type="text" placeholder="528" />
                    </div>
                  </div>

                  <div className="col-span-7 flex items-center gap-4">
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
        </div>
      </TitleCard>
    </div>
  );
};

export default CollapsibalForm;
