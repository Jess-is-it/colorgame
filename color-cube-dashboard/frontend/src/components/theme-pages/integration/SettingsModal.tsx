import { Button } from 'src/components/ui/button';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from 'src/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from 'src/components/ui/dialog';

type SettingModalProps = {
  open: boolean;
  onClose: () => void;
};

const SettingsModal: React.FC<SettingModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Integration settings</DialogTitle>
          <DialogDescription>
            Manage and configure your connected apps and services.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div>
            <Label
              htmlFor="select-app"
              className="mb-2 block capitalize text-link dark:text-darklink"
            >
              Select App
            </Label>
            <Select disabled>
              <SelectTrigger id="apps" className="select-md">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Select an option">Select an option</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label
              htmlFor="client-id"
              className="mb-2 block capitalize text-link dark:text-darklink"
            >
              Client ID
            </Label>
            <Input
              id="client-id"
              name="clientid"
              className="!form-control"
              type="text"
              value="e3b2c7f4-1234-5678-9abc-def012345678"
              readOnly
            />
          </div>

          <div>
            <Label
              htmlFor="client-secret"
              className="mb-2 block capitalize text-link dark:text-darklink"
            >
              Client Secret
            </Label>
            <Input
              id="client-secret"
              name="clientsecret"
              className="!form-control"
              type="text"
              value="s3cr3tK3y@9LmNopQR!2xYz"
              readOnly
            />
          </div>

          <div>
            <Label
              htmlFor="authentication-url"
              className="mb-2 block capitalize text-link dark:text-darklink"
            >
              Authentication base URI
            </Label>
            <Input
              id="authentication-url"
              name="authenticationurl"
              className="!form-control"
              type="text"
              value="https://auth.example.com"
              readOnly
            />
          </div>

          <p className="text-sm mt-3">Save your changes.</p>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="secondary">Save</Button>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsModal;
