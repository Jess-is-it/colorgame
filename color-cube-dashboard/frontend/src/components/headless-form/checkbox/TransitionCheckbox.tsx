import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Transitioncheck from './codes/TransitionCheckCode';
import TransitioncheckCode from './codes/TransitionCheckCode.tsx?raw';

const TransitionCheckbox = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Transitions Checkbox</h4>
            <Transitioncheck />
          </div>
          <CodeDialog>{TransitioncheckCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default TransitionCheckbox;
