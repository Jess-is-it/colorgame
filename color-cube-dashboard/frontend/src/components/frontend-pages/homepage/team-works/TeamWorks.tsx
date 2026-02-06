import featurebg from 'src/assets/images/frontend-pages/background/feature-bg.jpg';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from "src/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/components/ui/accordion"

export const TeamWorks = () => {
  const [workType, setWorkType] = useState('Team Scheduling');

  const handleWork = (work: string) => {
    setWorkType(work);
  };
  const WorkTypes = [
    {
      key: 'work1',
      work: 'Team Scheduling',
      icon: 'tabler:user-circle',
      isBorder: true,
    },
    {
      key: 'work2',
      work: 'Payments',
      icon: 'tabler:credit-card-pay',
      isBorder: true,
    },
    {
      key: 'work3',
      work: 'Embedding',
      icon: 'tabler:layout-sidebar-right',
      isBorder: true,
    },
    {
      key: 'work4',
      work: 'Workflows',
      icon: 'tabler:topology-star-3',
      isBorder: false,
    },
  ];

  return (
    <>
      <div className="w-full border-t border-border dark:border-darkborder mb-16 custom-shadow mt-0">
        <div className="container-md">
          <div className="overflow-x-auto">
            <div className="grid grid-cols-12 min-w-[900px]">
              {WorkTypes.map((item) => {
                return (
                  <div className="col-span-3" key={item.key}>
                    <div
                      onClick={() => handleWork(item.work)}
                      className={`cursor-pointer py-7 px-4 flex justify-center ${
                        workType === item.work
                          ? 'text-primary border-t-2 border-t-primary dark:border-t-primary'
                          : ''
                      } ${
                        item.isBorder
                          ? 'justify-center border-r border-r-border dark:border-r-darkborder'
                          : ''
                      }`}
                    >
                      <div className="flex gap-2 items-center">
                        <Icon icon={item.icon} className="shrink-0 text-2xl" />
                        <h2
                          className={`text-lg font-semibold ${
                            workType === item.work ? 'text-primary dark:text-primary' : ''
                          }`}
                        >
                          {item.work}
                        </h2>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="container-md px-4">
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-6 col-span-12">
            <img src={featurebg} alt="feature-img" />
          </div>
          <div className="lg:col-span-6 col-span-12 flex items-center">
            {workType === 'Team Scheduling' ? (
              <div className="flex flex-col ps-10 items-start w-full">
                <h1 className="mb-6 md:text-40 text-32 leading-normal text-link dark:text-white font-bold">
                  Defend your focus
                </h1>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className='text-base font-semibold'>
                        Combine teammate schedules 1
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className='text-base font-semibold'>
                        Factor in outside colleagues
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className='text-base font-semibold'>
                        Round robin pooling
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button color={"primary"} asChild className="mt-6" >
                    <Link to="/frontend-pages/about">
                      Learn More
                    </Link>
                  </Button>
              </div>
            ) : workType === 'Payments' ? (
              <div className="flex flex-col ps-10 items-start w-full">
                <h1 className="mb-6 md:text-40 text-32 leading-normal text-link dark:text-darklink font-bold">
                  Reactjs Templates
                </h1>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className='text-base font-semibold'>
                        Combine teammate schedules 2
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className='text-base font-semibold'>
                        Factor in outside colleagues
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className='text-base font-semibold'>
                        Round robin pooling
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button color={"primary"} asChild className="mt-6" >
                    <Link to="/frontend-pages/about">
                      Learn More
                    </Link>
                  </Button>
              </div>
            ) : workType === 'Embedding' ? (
              <div className="flex flex-col ps-10 items-start w-full">
                <h1 className="mb-6 md:text-40 text-32 leading-normal text-link dark:text-darklink font-bold">
                  Tailwind Templates
                </h1>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className='text-base font-semibold'>
                        Combine teammate schedules 3
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className='text-base font-semibold'>
                        Factor in outside colleagues
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className='text-base font-semibold'>
                        Round robin pooling
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button color={"primary"} asChild className="mt-6" >
                    <Link to="/frontend-pages/about">
                      Learn More
                    </Link>
                  </Button>
              </div>
            ) : (
              <div className="flex flex-col ps-10 items-start w-full">
                <h1 className="mb-6 md:text-40 text-32 leading-normal text-link dark:text-darklink font-bold">
                  {' '}
                  TailwindAdmin Templates
                </h1>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className='text-base font-semibold'>
                        Combine teammate schedules 4
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger className='text-base font-semibold'>
                        Factor in outside colleagues
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger className='text-base font-semibold'>
                        Round robin pooling
                      </AccordionTrigger>
                      <AccordionContent>
                        Factor in availability for required attendees, and skip checking for conflicts for optional attendees.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button color={"primary"} asChild className="mt-6" >
                    <Link to="/frontend-pages/about">
                      Learn More
                    </Link>
                  </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
