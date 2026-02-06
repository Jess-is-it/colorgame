import BasicPopover from 'src/components/headless-ui/popover/BasicPopover';
import ClosingPopoverManual from 'src/components/headless-ui/popover/ClosingPopoverManual';
import FramerMotionPopover from 'src/components/headless-ui/popover/FramerMotionPopover';
import GroupingPopover from 'src/components/headless-ui/popover/GroupingPopover';
import PopoverBackdrops from 'src/components/headless-ui/popover/PopoverBackdrop';
import PopoverPositioning from 'src/components/headless-ui/popover/PopoverPositioning';
import PopoverTransition from 'src/components/headless-ui/popover/PopoverTransition';
import PopoverWidth from 'src/components/headless-ui/popover/PopoverWidth';
import RenderAsElement from 'src/components/headless-ui/popover/RenderAsElement';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Popover',
  },
];

const Popover = () => {
  return (
    <>
      <BreadcrumbComp title="Popover" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicPopover />
        </div>
        <div className="col-span-12">
          <GroupingPopover />
        </div>
        <div className="col-span-12">
          <PopoverWidth />
        </div>
        <div className="col-span-12">
          <PopoverPositioning />
        </div>
        <div className="col-span-12">
          <PopoverBackdrops />
        </div>
        <div className="col-span-12">
          <PopoverTransition />
        </div>
        <div className="col-span-12">
          <FramerMotionPopover />
        </div>
        <div className="col-span-12">
          <ClosingPopoverManual />
        </div>
        <div className="col-span-12">
          <RenderAsElement />
        </div>
      </div>
    </>
  );
};

export default Popover;
