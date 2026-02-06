import BasicDropdown from 'src/components/headless-ui/dropdown/BasicDropdown';
import ButtonDropdown from 'src/components/headless-ui/dropdown/ButtonDropdown';
import ClosingManually from 'src/components/headless-ui/dropdown/ClosingManually';
import DisablingItem from 'src/components/headless-ui/dropdown/DisablingItem';
import DropDownPosition from 'src/components/headless-ui/dropdown/DropDownPosition';
import DropdownWidth from 'src/components/headless-ui/dropdown/DropdownWidth';
import FramerMotion from 'src/components/headless-ui/dropdown/FramerMotion';
import GroupingItems from 'src/components/headless-ui/dropdown/GroupingItems';
import LinkDropdown from 'src/components/headless-ui/dropdown/LinkDropdown';
import RendringElements from 'src/components/headless-ui/dropdown/RendringElements';
import SepratorDropdown from 'src/components/headless-ui/dropdown/SepraterDropdown';
import TransitionDropdown from 'src/components/headless-ui/dropdown/TransitionDropdown';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Dropdown',
  },
];

const Dropdown = () => {
  return (
    <>
      <BreadcrumbComp title="Dropdown" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicDropdown />
        </div>
        <div className="col-span-12">
          <LinkDropdown />
        </div>
        <div className="col-span-12">
          <ButtonDropdown />
        </div>
        <div className="col-span-12">
          <DisablingItem />
        </div>
        <div className="col-span-12">
          <SepratorDropdown />
        </div>
        <div className="col-span-12">
          <GroupingItems />
        </div>
        <div className="col-span-12">
          <DropDownPosition />
        </div>
        <div className="col-span-12">
          <DropdownWidth />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <TransitionDropdown />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <FramerMotion />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <ClosingManually />
        </div>
        <div className="lg:col-span-6 col-span-12">
          <RendringElements />
        </div>
      </div>
    </>
  );
};

export default Dropdown;
