import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import EnterLeavetransition from './codes/EnterLeaveTransitionCode';
import EnterLeavetransitionCode from './codes/EnterLeaveTransitionCode.tsx?raw';

const EnterLeaveTransition = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Different Transition</h4>
            <EnterLeavetransition />
          </div>
          <CodeDialog>{EnterLeavetransitionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default EnterLeaveTransition;
