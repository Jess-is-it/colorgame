import TitleCard from '../../shared/TitleBorderCard';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';

const ReadOnlyForm = () => {
  return (
    <div>
      <TitleCard title="Readonly Form">
        <div className="flex flex-col gap-6">
          {/* Name Field */}
          <div className="space-y-1">
            <div>
              <Label htmlFor="name">Name</Label>
            </div>
            <Input id="name" type="text" value="Wrappixel" onChange={() => {}} />
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <div>
              <Label htmlFor="emailid">Email</Label>
            </div>
            <Input
              id="emailid"
              type="email"
              value="info@wrappixel.com"
              onChange={() => {}}
              required
            />
            <p className="mt-1 text-sm text-muted-foreground">
              We’ll never share your details. Read our
              <a href="#" className="ml-1 font-medium text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <div>
              <Label htmlFor="password1">Password</Label>
            </div>
            <Input
              id="password1"
              type="password"
              value="info@wrappixel.com"
              onChange={() => {}}
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </div>
      </TitleCard>
    </div>
  );
};

export default ReadOnlyForm;
