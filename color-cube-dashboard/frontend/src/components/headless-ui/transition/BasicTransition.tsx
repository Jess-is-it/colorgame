import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Basictransaction from './codes/BasicTransactionCode';
import BasictransactionCode from './codes/BasicTransactionCode.tsx?raw';

const BasicTransition = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Basic Transition</h4>
            <Basictransaction />
          </div>
          <CodeDialog>{BasictransactionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default BasicTransition;
