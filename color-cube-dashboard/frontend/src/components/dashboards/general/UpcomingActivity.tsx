import { Icon } from '@iconify/react/dist/iconify.js';
import SimpleBar from 'simplebar-react';
import AnimatedItem from 'src/components/animated-component/ListAnimation';
import { Card } from 'src/components/ui/card';

export const UpcomingActivity = () => {
  const Activities = [
    {
      key: 'Activity1',
      icon: 'tabler:map-pin',
      title: 'Trip to Singapore',
      desc: 'working on',
      time: '12:00 AM',
      bgColor: 'bg-lightprimary',
      color: 'text-primary',
    },
    {
      key: 'Activity2',
      icon: 'tabler:bookmark',
      title: 'Archived Data',
      desc: 'working on',
      time: '3:52 PM',
      bgColor: 'bg-lighterror',
      color: 'text-error',
    },
    {
      key: 'Activity3',
      icon: 'tabler:microphone',
      title: 'Meeting with Client',
      desc: 'working on',
      time: '4:50 PM',
      bgColor: 'bg-lightsuccess',
      color: 'text-success',
    },
    {
      key: 'Activity4',
      icon: 'tabler:cast',
      title: 'Screening Task Team',
      desc: 'working on',
      time: '5:10 PM',
      bgColor: 'bg-lightwarning',
      color: 'text-warning',
    },
    {
      key: 'Activity5',
      icon: 'tabler:mail',
      title: 'Send envelope to John',
      desc: 'working on',
      time: '6:00 PM',
      bgColor: 'bg-lightinfo dark:bg-darkinfo',
      color: 'text-info',
    },
  ];
  return (
    <>
      <Card>
        <h4 className="card-title">Upcoming Activity</h4>
        <p className="card-subtitle">Preparation for the upcoming activity</p>
        <SimpleBar className="mt-10 max-h-[248px] pr-4 -mr-4">
          <div className="flex flex-col gap-6">
            {Activities.map((item, index) => {
              return (
                <AnimatedItem key={index} index={index}>
                  <div key={item.key} className="flex items-center justify-between">
                    <div className="flex gap-3 items-center">
                      <div
                        className={`h-11 w-11 rounded-full ${item.bgColor} ${item.color} flex justify-center items-center`}
                      >
                        <Icon icon={item.icon} className="text-xl" />
                      </div>
                      <div>
                        <h6 className="text-sm">{item.title}</h6>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                    <span className="text-xs">{item.time}</span>
                  </div>
                </AnimatedItem>
              );
            })}
          </div>
        </SimpleBar>
      </Card>
    </>
  );
};
