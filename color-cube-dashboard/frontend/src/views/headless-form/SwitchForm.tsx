import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import BasicSwitches from 'src/components/headless-form/switch/BasicSwitches';
import DefaultOnSwitches from 'src/components/headless-form/switch/DefaultOnSwitches';
import DisabledSwitches from 'src/components/headless-form/switch/DisabledSwitches';
import WithLabelSwitch from 'src/components/headless-form/switch/WithLabelSwitch';
import WithTransitionsSwitch from 'src/components/headless-form/switch/WithTransitions';
import RenderSwitches from 'src/components/headless-form/switch/RenderSwitches';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Switch',
  },
];

const page = () => {
  return (
    <>
      <BreadcrumbComp title="Switch" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicSwitches />
        </div>
        <div className="col-span-12">
          <DefaultOnSwitches />
        </div>
        <div className="col-span-12">
          <DisabledSwitches />
        </div>
        <div className="col-span-12">
          <WithLabelSwitch />
        </div>
        <div className="col-span-12">
          <WithTransitionsSwitch />
        </div>
        <div className="col-span-12">
          <RenderSwitches />
        </div>
      </div>
    </>
  );
};

export default page;
