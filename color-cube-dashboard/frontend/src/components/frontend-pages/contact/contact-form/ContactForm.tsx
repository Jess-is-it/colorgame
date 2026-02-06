import CardBox from 'src/components/shared/CardBox';
import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { Textarea } from "src/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "src/components/ui/select";

const ContactForm = () => {
  return (
    <>
      <div className="container-md mx-auto px-4 lg:py-24 py-12">
        <div className="grid grid-cols-12 lg:gap-7 gap-6">
          <div className="lg:col-span-8 col-span-12">
            <CardBox>
              <div className="grid grid-cols-12 lg:gap-7 gap-6">
                <div className="lg:col-span-6 col-span-12">                  
                  <Label htmlFor="nm">First Name *</Label>
                  <Input
                    id="nm"
                    type="text"
                    placeholder="Name"
                    required
                    className="mt-2"
                  />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <Label htmlFor="lnm">Last Name *</Label>
                  <Input
                    id="lnm"
                    type="text"
                    placeholder="Last Name"
                    required
                    className="mt-2"
                  />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <Label htmlFor="ph">Phone Number *</Label>
                  <Input
                    id="ph"
                    type="tel"
                    placeholder="xxx xxx xxxx"
                    required
                    className="mt-2"
                  />
                </div>
                <div className="lg:col-span-6 col-span-12">
                  <Label htmlFor="em">Email *</Label>
                  <Input
                    id="em"
                    type="email"
                    placeholder="Email address"
                    required
                    className="mt-2"
                  />
                </div>
                <div className="col-span-12">
                  <div className="mb-2 block">
                    <Label htmlFor="inq">Enquire related to *</Label>
                  </div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Enquiry</SelectItem>
                      <SelectItem value="other">Other Enquiry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-12">
                  <Label htmlFor="msg">Message</Label>
                  <Textarea
                    id="msg"
                    placeholder="Write your message here..."
                    required
                    className="mt-2"
                    rows={4}
                  />
                </div>
                <div className="col-span-12">
                  <div className="block ">
                    <Button className="sm:w-auto w-full ms-auto">
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </CardBox>
          </div>
          <div className="lg:col-span-4 col-span-12">
            <div className="overflow-hidden rounded-xl bg-primary relative p-7 after:absolute after:bg-[url('/images/frontend-pages/background/contact-icon.png')] after:bg-no-repeat after:bg-right-top after:top-0 after:right-0 after:w-[325px] after:h-[325px]">
              <h5 className="text-lg font-bold text-white pb-4">Reach Out Today</h5>
              <p className="text-base text-white leading-7">
                Have questions or need assistance? We're just a message away.
              </p>
              <hr className="my-8 border-white/50" />
              <h5 className="text-lg font-bold text-white pb-4">Our Location</h5>
              <p className="text-base text-white leading-7">
                Visit us in person or find our contact details to connect with us directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
