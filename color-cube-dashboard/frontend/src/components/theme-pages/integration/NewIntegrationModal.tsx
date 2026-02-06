import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';

type NewModalProps = {
  open: boolean;
  onClose: () => void;
};

const NewIntegrationModal: React.FC<NewModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Integration</DialogTitle>
          <DialogDescription>
            Set up an integration and add a brief explanation for the team.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="select-app" className="capitalize text-link dark:text-darklink">
              Select App
            </Label>
            <Select>
              <SelectTrigger id="select-app">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="google-meet">Google Meet</SelectItem>
                <SelectItem value="mailchimp">Mailchimp</SelectItem>
                <SelectItem value="zoom">Zoom</SelectItem>
                <SelectItem value="loom-1">Loom</SelectItem>
                <SelectItem value="loom-2">Loom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-id" className="capitalize text-link dark:text-darklink">
              Client ID
            </Label>
            <Input id="client-id" name="clientid" type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="client-secret" className="capitalize text-link dark:text-darklink">
              Client Secret
            </Label>
            <Input id="client-secret" name="clientsecret" type="text" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="authentication-url" className="capitalize text-link dark:text-darklink">
              Authentication base URI
            </Label>
            <Input id="authentication-url" name="authenticationurl" type="text" />
          </div>
          <p className="text-sm">
            Paste the full URI, and we’ll automatically pull out and show only the subdomain for
            quick reference.
          </p>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="secondary" className="leading-0">
            Add Integration
          </Button>
          <Button className="leading-0" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewIntegrationModal;
