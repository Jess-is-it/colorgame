import BasicCarousel from 'src/components/shadcn-ui/carousel/BasicCarousel';
import CarouselWithultipleItem from 'src/components/shadcn-ui/carousel/CarouselWithultipleItem';
import { VerticalCarousel } from 'src/components/shadcn-ui/carousel/VerticalCarousel';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Curosel',
  },
];
const page = () => {
  return (
    <>
      <BreadcrumbComp title="Curosel" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicCarousel />
        </div>
        <div className="col-span-12">
          <VerticalCarousel />
        </div>
        <div className="col-span-12">
          <CarouselWithultipleItem />
        </div>
      </div>
    </>
  );
};

export default page;
