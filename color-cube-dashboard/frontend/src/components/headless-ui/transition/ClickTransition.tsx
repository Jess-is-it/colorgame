import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Clicktransition from './codes/ClickTransitionCode';
import ClicktransitionCode from './codes/ClickTransitionCode.tsx?raw';

const ClickTransition = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Click To Transition</h4>
            <Clicktransition />
          </div>
          <CodeDialog>{ClicktransitionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};
export default ClickTransition;
