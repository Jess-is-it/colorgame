import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import SquareInputWithLbl from './codes/SquareInputCode';
import SquareInputWithLblCode from './codes/SquareInputCode.tsx?raw';

const SquareInputWithLabel = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Square Input With Label</h4>
            <SquareInputWithLbl />
          </div>
          <CodeDialog>{SquareInputWithLblCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default SquareInputWithLabel;
