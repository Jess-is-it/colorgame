import TitleCard from '../../shared/TitleBorderCard';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';

const DisableForm = () => {
  return (
    <div>
      <TitleCard title="Disabled Form">
        <div className="flex flex-col gap-6">
          {/* Name Field (Disabled) */}
          <div className="space-y-1">
            <div>
              <Label htmlFor="disabledInput1">Name</Label>
            </div>
            <Input id="disabledInput1" type="text" disabled />
          </div>

          {/* Email Field (Disabled) */}
          <div className="space-y-1">
            <div>
              <Label htmlFor="disabledInput2">Email</Label>
            </div>
            <Input id="disabledInput2" type="email" disabled required />
            <p className="mt-1 text-sm text-muted-foreground">
              We’ll never share your details. Read our
              <a href="#" className="ml-1 font-medium text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Password Field (Disabled) */}
          <div className="space-y-1">
            <div>
              <Label htmlFor="disabledInput3">Password</Label>
            </div>
            <Input id="disabledInput3" type="password" disabled />
          </div>

          {/* Submit Button (Disabled) */}
          <div>
            <Button type="submit" disabled>
              Submit
            </Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default DisableForm;
