import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Transition from './codes/TransitionCode';
import TransitionCode from './codes/TransitionCode.tsx?raw';

const TransitionDisclosure = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Transitions Disclosure</h4>
            <Transition />
          </div>
          <CodeDialog>{TransitionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default TransitionDisclosure;
