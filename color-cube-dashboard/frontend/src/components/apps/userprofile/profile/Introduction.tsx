import { Icon } from '@iconify/react';
import { Card } from 'src/components/ui/card';

const Introduction = () => {
  return (
    <>
      <Card>
        <h5 className="card-title">Introduction</h5>
        <p className="card-subtitle">
          Hello, I am Mathew Anderson. I love making websites and graphics. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit.
        </p>
        <div className="flex flex-col gap-3 mt-4">
          <div className="flex gap-3 items-center">
            <Icon
              icon="tabler:briefcase"
              height="20"
              className="text-bodytext dark:text-darklink"
            />
            <p className="text-dark dark:text-white font-semibold">Sir, P P Institute Of Science</p>
          </div>
          <div className="flex gap-3 items-center">
            <Icon icon="tabler:mail" height="20" className="text-bodytext dark:text-darklink" />
            <p className="text-dark dark:text-white font-semibold">xyzjonathan@gmail.com</p>
          </div>
          <div className="flex gap-3 items-center">
            <Icon
              icon="tabler:device-desktop"
              height="20"
              className="text-bodytext dark:text-darklink"
            />
            <p className="text-dark dark:text-white font-semibold">www.xyz.com</p>
          </div>
          <div className="flex gap-3 items-center">
            <Icon icon="tabler:map-pin" height="20" className="text-bodytext dark:text-darklink" />
            <p className="text-dark dark:text-white font-semibold">Newyork, USA - 100001</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Introduction;
