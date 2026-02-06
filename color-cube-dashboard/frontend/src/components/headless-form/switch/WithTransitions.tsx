import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import WithTransition from './codes/WithTransitionCode';
import WithTransitionCode from './codes/WithTransitionCode.tsx?raw';

const WithTransitionsSwitch = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Adding Transitions</h4>
            <WithTransition />
          </div>
          <CodeDialog>{WithTransitionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default WithTransitionsSwitch;
