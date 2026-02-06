import BasicCommand from 'src/components/shadcn-ui/command/BasicCommand';
import DialogCommand from 'src/components/shadcn-ui/command/DialogCommand';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Command',
  },
];
const page = () => {
  return (
    <div>
      <BreadcrumbComp title="Command" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicCommand />
        </div>
        <div className="col-span-12">
          <DialogCommand />
        </div>
      </div>
    </div>
  );
};

export default page;
