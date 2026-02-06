import { Icon } from '@iconify/react/dist/iconify.js';
import { Card } from 'src/components/ui/card';
import { Badge } from 'src/components/ui/badge';
import type { BadgeProps } from 'src/components/ui/badge';
import AnimatedItem from 'src/components/animated-component/ListAnimation';
import SimpleBar from 'simplebar-react';

export const Tasks = () => {
  const Tasks = [
    {
      key: 'task1',
      status: 'Inprogress',
      date: '21 August 2025',
      title: 'NFT Landing Page',
      description: 'Designing an NFT-themed website with a creative concept so the lasts...',
      tasks: 2,
      comments: 13,
      badgeColor: 'lightPrimary',
    },
    {
      key: 'task2',
      status: 'Inpending',
      date: '28 August 2025',
      title: 'NFT Dashboard Finanace Management',
      description: 'Designing an NFT-themed website with a creative concept so the lasts...',
      tasks: 4,
      comments: 50,
      badgeColor: 'lightError',
    },
    {
      key: 'task3',
      status: 'Completed',
      date: '12 Jul 2025',
      title: 'NFT Logo Branding',
      description: 'Designing an NFT-themed website with a creative concept so the lasts...',
      tasks: 1,
      comments: 12,
      badgeColor: 'lightSuccess',
    },
    {
      key: 'task4',
      status: 'Inprogress',
      date: '21 August 2025',
      title: 'NFT Landing Page',
      description: 'Designing an NFT-themed website with a creative concept so the lasts...',
      tasks: 2,
      comments: 13,
      badgeColor: 'lightPrimary',
    },
  ];
  return (
    <Card className="h-full">
      <div className="flex flex-col gap-6 h-full">
        <div>
          <h4 className="card-title">Tasks</h4>
          <p className="card-subtitle">The power of prioritizing your tasks</p>
        </div>
        <SimpleBar className="max-h-[500px] pr-4 -mr-4">
          <div className="space-y-6">
            {Tasks.map((item, index) => {
              return (
                <AnimatedItem key={item.key} index={index}>
                  <div
                    key={item.key}
                    className="py-4 border-b last:border-b-0 last:pb-0 border-border dark:border-darkborder"
                  >
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={item.badgeColor as BadgeProps['variant']}
                        className="rounded-md py-1.1 text-sm"
                      >
                        {item.status}
                      </Badge>
                      <span className="text-sm">{item.date}</span>
                    </div>
                    <h6 className="mt-4 text-sm font-medium">{item.title}</h6>
                    <p className="pt-1">{item.description}</p>
                    <div className="flex gap-3 items-center mt-4">
                      <div className="flex gap-2 items-center">
                        <Icon icon="tabler:clipboard" className="shrink-0 text-lg text-primary" />
                        <span>{`${item.tasks} Tasks`}</span>
                      </div>
                      <div className="flex gap-2 items-center">
                        <Icon
                          icon="tabler:message-dots"
                          className="shrink-0 text-lg text-primary"
                        />
                        <span>{`${item.comments} Comments`}</span>
                      </div>
                    </div>
                  </div>
                </AnimatedItem>
              );
            })}
          </div>
        </SimpleBar>
      </div>
    </Card>
  );
};
