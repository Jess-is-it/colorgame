import TitleCard from '../../shared/TitleBorderCard';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';
import { Button } from 'src/components/ui/button';

const BasicLayout = () => {
  return (
    <div>
      <TitleCard title="Basic Layout">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Label htmlFor="name" className="mb-2 block">
              Name
            </Label>
            <Input id="name" type="text" placeholder="Jordan Powell" required />
          </div>
          <div className="col-span-12">
            <Label htmlFor="company" className="mb-2 block">
              Company
            </Label>
            <Input id="company" type="text" placeholder="ACME Inc." required />
          </div>
          <div className="col-span-12">
            <Label htmlFor="email" className="mb-2 block">
              Email
            </Label>
            <Input id="email" type="email" placeholder="jordan.powell@example.com" required />
          </div>
          <div className="col-span-12">
            <Label htmlFor="phoneno" className="mb-2 block">
              Phone No
            </Label>
            <Input id="phoneno" type="number" placeholder="125 7545 645" required />
          </div>
          <div className="col-span-12">
            <Label htmlFor="message" className="mb-2 block">
              Message
            </Label>
            <Textarea
              id="message"
              placeholder="Hi, Do you have a moment to talk Jeo?"
              required
              rows={4}
            />
          </div>
          <div className="col-span-12">
            <Button type="submit">Send</Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default BasicLayout;
