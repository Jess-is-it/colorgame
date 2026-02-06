import SimpleInput from 'src/components/shadcn-form/input/SimpleInput';
import InputWithLabel from 'src/components/shadcn-form/input/InputWithLabel';
import Forminput from 'src/components/shadcn-form/input/Forminput';
import OtpInput from 'src/components/shadcn-form/input/OtpInput';
import DisabledInput from 'src/components/shadcn-form/input/DisabledInput';
import OtpInputSeprator from 'src/components/shadcn-form/input/OtpInputSeprator';
import ControlledOtpInput from 'src/components/shadcn-form/input/ControlledOtpInput';
import DefaultTextarea from 'src/components/shadcn-form/input/DefaultTextarea';
import TextareaWithText from 'src/components/shadcn-form/input/TextareaWithText';
import FormwithTextarea from 'src/components/shadcn-form/input/FormwithTextarea';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Input',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Input" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <SimpleInput />
        </div>
        <div className="col-span-12">
          <InputWithLabel />
        </div>
        <div className="col-span-12">
          <Forminput />
        </div>
        <div className="col-span-12">
          <DisabledInput />
        </div>
        <div className="col-span-12">
          <DefaultTextarea />
        </div>
        <div className="col-span-12">
          <TextareaWithText />
        </div>
        <div className="col-span-12">
          <FormwithTextarea />
        </div>
        <div className="col-span-12">
          <OtpInput />
        </div>
        <div className="col-span-12">
          <OtpInputSeprator />
        </div>
        <div className="col-span-12">
          <ControlledOtpInput />
        </div>
      </div>
    </>
  );
};

export default page;
