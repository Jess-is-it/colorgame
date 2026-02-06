import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from 'src/components/ui/dialog';

type GenerateApiKeyModalProps = {
  open: boolean;
  onClose: () => void;
};

const GenerateApiKeyModal: React.FC<GenerateApiKeyModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate New API Key</DialogTitle>
          <DialogDescription>
            To enable secure access to the web services, your app requires an API key with
            permissions for resources such as the S3 bucket.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-2">
          <Label htmlFor="app-name" className="capitalize text-link dark:text-darklink">
            Enter your application name
          </Label>
          <Input id="app-name" name="app-name" type="text" required />
          <p className="text-sm text-muted-foreground">
            Naming your application makes it easier to recognize your API key in the future.
          </p>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="secondary">Generate API Key</Button>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateApiKeyModal;
