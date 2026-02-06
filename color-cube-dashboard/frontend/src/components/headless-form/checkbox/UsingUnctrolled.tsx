import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import UsingUnControlled from './codes/UsingUncontrolledCode';
import UsingUnControlledCode from './codes/UsingUncontrolledCode.tsx?raw';

const UsingUncontrolled = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Using as Uncontrolled </h4>
            <UsingUnControlled />
          </div>
          <CodeDialog>{UsingUnControlledCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default UsingUncontrolled;
