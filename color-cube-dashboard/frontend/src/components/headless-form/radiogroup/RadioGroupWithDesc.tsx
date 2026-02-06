import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import RadioGroupWithdesc from './codes/RadioGroupWithDescCode';
import RadioGroupWithdescCode from './codes/RadioGroupWithDescCode.tsx?raw';

const RadioGroupWithDesc = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">With Description</h4>
            <RadioGroupWithdesc />
          </div>
          <CodeDialog>{RadioGroupWithdescCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default RadioGroupWithDesc;
