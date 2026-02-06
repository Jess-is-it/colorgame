import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import BasicTextarea from 'src/components/headless-form/textarea/BasicTextarea';
import WithLabelTextarea from 'src/components/headless-form/textarea/WithLabel';
import WithDescriptionTextarea from 'src/components/headless-form/textarea/WithDescriptionTextarea';
import DisableTextarea from 'src/components/headless-form/textarea/DisableTextArea';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Textarea',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Textarea" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicTextarea />
        </div>
        <div className="col-span-12">
          <WithLabelTextarea />
        </div>
        <div className="col-span-12">
          <WithDescriptionTextarea />
        </div>
        <div className="col-span-12">
          <DisableTextarea />
        </div>
      </div>
    </>
  );
};

export default page;
