import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import ComboWithLable from './codes/ComboWithLableCode';
import ComboWithLableCode from './codes/ComboWithLableCode.tsx?raw';

const WithLabel = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">With Label</h4>
            <ComboWithLable />
          </div>
          <CodeDialog>{ComboWithLableCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default WithLabel;
