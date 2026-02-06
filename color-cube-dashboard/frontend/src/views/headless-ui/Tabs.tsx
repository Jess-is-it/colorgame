import BasicTabs from 'src/components/headless-ui/tabs/BasicTabs';
import ControllTabSelect from 'src/components/headless-ui/tabs/ControllTabSelect';
import DisableTab from 'src/components/headless-ui/tabs/DisableTab';
import ListingForChangeTab from 'src/components/headless-ui/tabs/ListingForChangeTab';
import MannuallActiveTab from 'src/components/headless-ui/tabs/MannuallActiveTab';
import RenderAsElementTab from 'src/components/headless-ui/tabs/RenderAsElementTab';
import SpecifiedTab from 'src/components/headless-ui/tabs/SpecifiedTab';
import VerticalTabs from 'src/components/headless-ui/tabs/VerticalTabs';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Tabs',
  },
];

const Tabs = () => {
  return (
    <>
      <BreadcrumbComp title="Tabs" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicTabs />
        </div>
        <div className="col-span-12">
          <VerticalTabs />
        </div>
        <div className="col-span-12">
          <DisableTab />
        </div>
        <div className="col-span-12">
          <MannuallActiveTab />
        </div>
        <div className="col-span-12">
          <SpecifiedTab />
        </div>
        <div className="col-span-12">
          <ListingForChangeTab />
        </div>
        <div className="col-span-12">
          <ControllTabSelect />
        </div>
        <div className="col-span-12">
          <RenderAsElementTab />
        </div>
      </div>
    </>
  );
};

export default Tabs;
