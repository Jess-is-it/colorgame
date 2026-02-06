import BasicDialog from 'src/components/shadcn-ui/dialog/BasicDialog';
import DialogWithCustomCloseButton from 'src/components/shadcn-ui/dialog/DialogWithCustomCloseButton';
import DialogWithForm from 'src/components/shadcn-ui/dialog/DialogWithForm';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Dialog',
  },
];
const ShadcnDialog = () => {
  return (
    <>
      <BreadcrumbComp title="Dialog" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicDialog />
        </div>
        <div className="col-span-12">
          <DialogWithCustomCloseButton />
        </div>
        <div className="col-span-12">
          <DialogWithForm />
        </div>
      </div>
    </>
  );
};

export default ShadcnDialog;
