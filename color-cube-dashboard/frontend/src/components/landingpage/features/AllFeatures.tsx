import * as listFeatureData from '../data';
import { Icon } from '@iconify/react';
import { Card } from 'src/components/ui/card';

const AllFeatures = () => {
  return (
    <>
      <div className="md:py-20 py-12 relative bg-white dark:bg-dark">
        <div className="container">
          <div className="lg:w-2/5 w-full mx-auto text-center">
            <p
              className="text-sm font-medium text-primary uppercase "
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
            >
              Almost covered everything
            </p>
            <h2
              className="text-center sm:text-4xl text-2xl font-bold sm:!leading-[45px]"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="1000"
            >
              Other Amazing Features & Flexibility Provided
            </h2>
          </div>
          <div className="grid grid-cols-12 gap-[30px] mt-20">
            {listFeatureData.listFeature.map((item, index) => (
              <div
                className="xl:col-span-3 lg:col-span-4 md:col-span-6 col-span-12"
                key={index}
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
              >
                <Card
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-duration="1000"
                  className="p-4 text-center !shadow-none"
                >
                  <span className="flex items-center justify-center">
                    <Icon icon={item.featureicon} height={40} className="text-primary" />
                  </span>
                  <h5 className="font-semibold text-lg text-dark dark:text-white mt-2 ">
                    {item.title}
                  </h5>
                  <p className="text-sm text-ld opacity-90">{item.subtitle}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllFeatures;
