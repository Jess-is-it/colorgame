import React from 'react';
import { Link } from 'react-router';
import * as DemosName from '../data';
import { Button } from 'src/components/ui/button';

const AllDemos = () => {
  return (
    <>
      {/* Demos */}
      <div className="grid grid-cols-12 gap-[30px] mt-20">
        {DemosName.Demos.map((item, index) => (
          <React.Fragment key={index}>
            {item.type == true ? (
              <div
                className="lg:col-span-4 md:col-span-6 col-span-12 "
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
              >
                <div className="relative group overflow-hidden rounded-md border border-ld ">
                  <div
                    className={`overflow-hidden rounded-md  after:opacity-0 rounded-b-none after:top-0 after:absolute after:w-full after:h-full after:bg-lightprimary relative flex justify-center items-center group ${
                      item.include !== 'Included With The package'
                        ? 'group-hover:after:opacity-100'
                        : null
                    }`}
                  >
                    <img src={item.img} alt="tailwindadmin" className="w-full" />
                    <Button
                      asChild
                      className={`absolute z-50 hidden ${
                        item.include !== 'Included With The package' ? 'group-hover:!flex' : null
                      } top-1/2 end-1/2 translate-x-1/2 -translate-y-1/2`}
                    >
                      <Link to={item.link} target="_blank">
                        Live Preview
                      </Link>
                    </Button>
                  </div>
                  <div className="rounded-t-none rounded-md p-4 flex justify-between items-center">
                    <div>
                      <Link
                        to={item.link}
                        className="text-base text-dark dark:text-white hover:text-primary font-semibold"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm">{item.include}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default AllDemos;
