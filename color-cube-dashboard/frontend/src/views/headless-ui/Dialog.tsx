import BasicDialog from 'src/components/headless-ui/dialog/BasicDialog';
import DialogWithBackdrop from 'src/components/headless-ui/dialog/DialogWithBackdrop';
import FramerAnimationDialog from 'src/components/headless-ui/dialog/FramerAnimationDialog';
import ScrollableDialog from 'src/components/headless-ui/dialog/ScrollableDialog';
import TranstionDialog from 'src/components/headless-ui/dialog/TranstionDialog';
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

const Dialog = () => {
  return (
    <>
      <BreadcrumbComp title="Dialog" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicDialog />
        </div>
        <div className="col-span-12">
          <DialogWithBackdrop />
        </div>
        <div className="col-span-12">
          <ScrollableDialog />
        </div>
        <div className="col-span-12">
          <TranstionDialog />
        </div>
        <div className="col-span-12">
          <FramerAnimationDialog />
        </div>
      </div>
    </>
  );
};

export default Dialog;
