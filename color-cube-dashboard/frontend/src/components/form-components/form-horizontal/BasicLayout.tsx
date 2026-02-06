import TitleCard from '../../shared/TitleBorderCard';
import { Input } from 'src/components/ui/input';
import { Textarea } from 'src/components/ui/textarea';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';

const BasicLayout = () => {
  return (
    <div>
      <TitleCard title="Basic Layout">
        <div className="grid grid-cols-12 items-center pb-6">
          <div className="col-span-3">
            <Label htmlFor="name">Name</Label>
          </div>
          <div className="col-span-9">
            <Input id="name" type="text" placeholder="John Deo" />
          </div>
        </div>

        <div className="grid grid-cols-12 items-center pb-6">
          <div className="col-span-3">
            <Label htmlFor="company">Company</Label>
          </div>
          <div className="col-span-9">
            <Input id="company" type="text" placeholder="ACME Inc." />
          </div>
        </div>

        <div className="grid grid-cols-12 items-center pb-6">
          <div className="col-span-3">
            <Label htmlFor="email">Email</Label>
          </div>
          <div className="col-span-9">
            <Input id="email" type="email" placeholder="john.deo" />
          </div>
        </div>

        <div className="grid grid-cols-12 items-center pb-6">
          <div className="col-span-3">
            <Label htmlFor="phone">Phone No</Label>
          </div>
          <div className="col-span-9">
            <Input id="phone" type="text" placeholder="412 2150 451" />
          </div>
        </div>

        <div className="grid grid-cols-12 items-center pb-6">
          <div className="col-span-3">
            <Label htmlFor="message">Message</Label>
          </div>
          <div className="col-span-9">
            <Textarea id="message" placeholder="Hi, Do you have a moment to talk Jeo?" rows={3} />
          </div>
        </div>

        <div className="grid grid-cols-12 items-center pb-6">
          <div className="col-span-3"></div>
          <div className="col-span-9">
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default BasicLayout;
