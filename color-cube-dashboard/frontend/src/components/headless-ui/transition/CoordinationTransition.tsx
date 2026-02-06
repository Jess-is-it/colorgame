import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Coordination from './codes/CoordinationCode';
import CoordinationCode from './codes/CoordinationCode.tsx?raw';

const CoordinationTransition = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Coordinating Transition</h4>
            <Coordination />
          </div>
          <CodeDialog>{CoordinationCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default CoordinationTransition;
