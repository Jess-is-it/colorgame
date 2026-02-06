import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from 'src/components/ui/dialog';

type DeatilModalProps = {
  open: boolean;
  onClose: () => void;
};

const authDetails = [
  { label: 'App Name', value: 'Example App' },
  {
    label: 'Client ID',
    value: 'e3b2c7f4-1234-5678-9abc-def012345678',
  },
  {
    label: 'Client Secret',
    value: 's3cr3tK3y@9LmNopQR!2xYz',
  },
  {
    label: 'Authentication base URI',
    value: 'https://auth.example.com',
  },
];

const DetailModal: React.FC<DeatilModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Integration details</DialogTitle>
          <DialogDescription>
            Check the credentials and settings for your connected app.
          </DialogDescription>
        </DialogHeader>

        {/* Detail Card */}
        <div className="mt-6">
          {authDetails.map((item, idx) => (
            <div
              key={idx}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-4 border-b border-border dark:border-darkborder"
            >
              <p className="card-subtitle">{item.label}</p>
              <p className="text-link dark:text-darklink text-sm font-medium break-all">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailModal;
