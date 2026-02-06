import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import BasicButton from 'src/components/shadcn-ui/button/BasicButton';
import OutlineButton from 'src/components/shadcn-ui/button/OutlineButton';
import GhostButton from 'src/components/shadcn-ui/button/GhostButton';
import ButtonWithIcon from 'src/components/shadcn-ui/button/ButtonWithIcon';
import LoadingButton from 'src/components/shadcn-ui/button/LoadingButton';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Button',
  },
];

const ShadcnButton = () => {
  return (
    <>
      <BreadcrumbComp title="Button" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <BasicButton />
        </div>
        <div className="col-span-12">
          <OutlineButton />
        </div>
        <div className="col-span-12">
          <GhostButton />
        </div>
        <div className="col-span-12">
          <ButtonWithIcon />
        </div>
        <div className="col-span-12">
          <LoadingButton />
        </div>
      </div>
    </>
  );
};

export default ShadcnButton;
