import BasicButtons from 'src/components/headless-form/button/BasicButtons';
import LightButtons from 'src/components/headless-form/button/LightButtons';
import RoundedOutlineBtn from 'src/components/headless-form/button/RoundedOutlineBtn';
import SquareOutlineBtn from 'src/components/headless-form/button/SquareOutlineBtn';
import DisableButton from 'src/components/headless-form/button/DisableButton';
import DisableOutlineButtons from 'src/components/headless-form/button/DisableOutlineButtons';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Button',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Button" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicButtons />
        </div>
        <div className="col-span-12">
          <LightButtons />
        </div>
        <div className="col-span-12">
          <RoundedOutlineBtn />
        </div>
        <div className="col-span-12">
          <SquareOutlineBtn />
        </div>
        <div className="col-span-12">
          <DisableButton />
        </div>
        <div className="col-span-12">
          <DisableOutlineButtons />
        </div>
      </div>
    </>
  );
};

export default page;
