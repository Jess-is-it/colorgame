import { Icon } from '@iconify/react/dist/iconify.js';
import { Card } from 'src/components/ui/card';

interface StatusType {
  title: string;
  status: string;
  icon: string;
  iconColor: string;
  cardColor: string;
}

export default function StatusCard({ title, status, icon, iconColor, cardColor }: StatusType) {
  return (
    <Card
      className={`bg-${cardColor} ${
        cardColor === 'blue-100'
          ? 'dark:bg-blue-500/20'
          : cardColor === 'lightprimary'
          ? 'dark:bg-darkprimary'
          : `dark:bg-${cardColor}`
      } p-3 !shadow-none border-0`}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h6 className="text-base font-semibold">{title}</h6>
          <p className="text-sm">{status}</p>
        </div>
        <div>
          <Icon icon={icon} className={`text-${iconColor}`} width={20} height={20} />
        </div>
      </div>
    </Card>
  );
}
