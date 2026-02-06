import BasicTransition from 'src/components/headless-ui/transition/BasicTransition';
import ClickTransition from 'src/components/headless-ui/transition/ClickTransition';
import CoordinationTransition from 'src/components/headless-ui/transition/CoordinationTransition';
import EnterLeaveTransition from 'src/components/headless-ui/transition/EnterLeaveTransition';
import OnIntialAmmount from 'src/components/headless-ui/transition/OnIntialAmmount';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Transition',
  },
];

const Transition = () => {
  return (
    <>
      <BreadcrumbComp title="Transition" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <BasicTransition />
        </div>
        <div className="col-span-12">
          <EnterLeaveTransition />
        </div>
        <div className="col-span-12">
          <CoordinationTransition />
        </div>
        <div className="col-span-12">
          <ClickTransition />
        </div>
        <div className="col-span-12">
          <OnIntialAmmount />
        </div>
      </div>
    </>
  );
};

export default Transition;
