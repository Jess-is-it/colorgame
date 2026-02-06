import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import IntialTransition from './codes/IntialTransitionCode';
import IntialTransitionCode from './codes/IntialTransitionCode.tsx?raw';

const OnIntialAmmount = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Transitioning On Initial Mount</h4>
            <IntialTransition />
          </div>
          <CodeDialog>{IntialTransitionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default OnIntialAmmount;
