import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import InputWithLabel from 'src/components/headless-form/input/InputWithLabel';
import SquareInputWithLabel from 'src/components/headless-form/input/SquareInputWithLabel';
import InputWithDescription from 'src/components/headless-form/input/InputWithDescription';
import DisabledInput from 'src/components/headless-form/input/DisableInput';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'input',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="input" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <InputWithLabel />
        </div>
        <div className="col-span-12">
          <SquareInputWithLabel />
        </div>
        <div className="col-span-12">
          <InputWithDescription />
        </div>
        <div className="col-span-12">
          <DisabledInput />
        </div>
      </div>
    </>
  );
};

export default page;
