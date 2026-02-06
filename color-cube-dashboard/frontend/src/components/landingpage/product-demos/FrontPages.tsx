import React from 'react';
import { Link } from 'react-router';
import * as DemosName from '../data';
import { Button } from 'src/components/ui/button';

const FrontPages = () => {
  return (
    <>
      {/* Demos */}
      <div className="grid grid-cols-12 gap-[30px]">
        {DemosName.FrontDemos.map((item, index) => (
          <React.Fragment key={index}>
            <div
              className="lg:col-span-4 md:col-span-6 col-span-12 "
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              <div className="relative overflow-hidden rounded-md group border border-ld ">
                <div className="overflow-hidden rounded-md relative after:opacity-0 rounded-b-none after:top-0 after:absolute after:w-full after:h-full after:bg-lightprimary group-hover:after:opacity-100  flex justify-center items-center group">
                  <img src={item.img} alt="TailwindAdmin" className="w-full" />
                  <Button
                    asChild
                    className="!text-sm absolute z-50 hidden group-hover:!flex top-1/2 end-1/2 translate-x-1/2 -translate-y-1/2"
                  >
                    <Link to={item.link}>Live Preview</Link>
                  </Button>
                </div>

                <div className="rounded-t-none rounded-md p-4 flex justify-between items-center">
                  <div>
                    <Link
                      to={item.link}
                      className="text-base text-dark dark:text-white hover:text-primary font-semibold "
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs mt-1">Application</p>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default FrontPages;
