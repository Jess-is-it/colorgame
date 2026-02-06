import { useState } from 'react';
import OutlineCard from 'src/components/shared/OutlineCard';
import { Icon } from '@iconify/react';
import { Switch } from 'src/components/ui/switch';
import { Button } from 'src/components/ui/button';
import { Label } from 'src/components/ui/label';
import { Input } from 'src/components/ui/input';
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from 'src/components/ui/tooltip';

const NotificationTab = () => {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(true);
  const [switch4, setSwitch4] = useState(false);
  const [switch5, setSwitch5] = useState(true);
  const [switch6, setSwitch6] = useState(false);

  const notificationTb = [
    {
      title: 'Our newsletter',
      subtitle: 'We will always let you know about important changes',
      icon: 'solar:notification-unread-lines-outline',
      switch: switch1,
      switchfun: setSwitch1,
    },
    {
      title: 'Order Confirmation',
      subtitle: 'You will be notified when customer order any product',
      icon: 'solar:check-square-outline',
      switch: switch2,
      switchfun: setSwitch2,
    },
    {
      title: 'Order Status Changed',
      subtitle: 'You will be notified when customer make changes to the order',
      icon: 'solar:clock-circle-outline',
      switch: switch3,
      switchfun: setSwitch3,
    },
    {
      title: 'Order Delivered',
      subtitle: 'You will be notified once the order is delivered',
      icon: 'solar:rewind-15-seconds-forward-linear',
      switch: switch4,
      switchfun: setSwitch4,
    },
    {
      title: 'Email Notification',
      subtitle: 'Turn on email notificaiton to get updates through email',
      icon: 'solar:bookmark-square-minimalistic-linear',
      switch: switch5,
      switchfun: setSwitch5,
    },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="lg:w-3/4 w-full flex flex-col gap-7">
          <OutlineCard>
            <h5 className="card-title">Notification Preferences</h5>
            <p className="card-subtitle -mt-1">
              Select the notificaitons ou would like to receive via email. Please note that you
              cannot opt out of receving service messages, such as payment, security or legal
              notifications.
            </p>
            <div className="my-4">
              <div className="mb-2 block">
                <Label htmlFor="eml">Email</Label>
              </div>
              <Input id="eml" type="email" />
              <small className="text-sm text-bodytext">Required for notificaitons.</small>
            </div>

            <div>
              {notificationTb.map((item, i) => (
                <div className="flex mb-6 items-center" key={i}>
                  <div className="flex gap-3.5">
                    <div className="flex justify-center h-12 w-12 rounded-md bg-lightgray dark:bg-darkmuted items-center text-ld">
                      <Icon icon={item.icon} height={22} />
                    </div>
                    <div>
                      <h6 className="text-base">{item.title}</h6>
                      <p className="text-sm text-bodytext">{item.subtitle}</p>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <Switch checked={item.switch} onCheckedChange={item.switchfun} />
                  </div>
                </div>
              ))}
            </div>
          </OutlineCard>
          <OutlineCard>
            <h5 className="card-title">Date & Time</h5>
            <p className="card-subtitle -mt-1">Time zones and calendar display settings.</p>
            <div className="flex items-center mt-6">
              <div className="flex gap-3.5">
                <div className="flex justify-center h-12 w-12 rounded-md bg-lightgray dark:bg-darkmuted items-center text-ld">
                  <Icon icon="solar:clock-circle-outline" height={22} />
                </div>
                <div>
                  <p className="text-sm text-bodytext">Time zone</p>
                  <h6 className="text-base">(UTC + 02:00) Athens, Bucharet</h6>
                </div>
              </div>
              <div className="ms-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Icon
                        icon="solar:download-minimalistic-outline"
                        height={18}
                        className="text-dark dark:text-darklink cursor-pointer"
                      />
                    </TooltipTrigger>
                    <TooltipContent>Download</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </OutlineCard>
          <OutlineCard>
            <h5 className="card-title">Ignore Tracking</h5>
            <div className="flex items-center mt-5">
              <div className="flex gap-3.5">
                <div className="flex justify-center h-12 w-12 rounded-md bg-lightgray dark:bg-darkmuted items-center text-ld">
                  <Icon icon="solar:stopwatch-pause-outline" height={22} />
                </div>
                <div>
                  <h6 className="text-base">Ignore Browser Tracking</h6>
                  <p className="text-sm text-bodytext">Browser Cookie</p>
                </div>
              </div>
              <div className="ms-auto">
                <Switch checked={switch6} onCheckedChange={setSwitch6} />
              </div>
            </div>
          </OutlineCard>
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-7">
        <Button>Save</Button>
        <Button variant={'lighterror'}>Cancel</Button>
      </div>
    </>
  );
};

export default NotificationTab;
