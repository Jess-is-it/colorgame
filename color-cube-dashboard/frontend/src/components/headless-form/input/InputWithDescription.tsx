import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import InputWithdescription from './codes/InputWithDescriptionCode';
import InputWithdescriptionCode from './codes/InputWithDescriptionCode.tsx?raw';

const InputWithDescription = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Input With Description</h4>
            <InputWithdescription />
          </div>
          <CodeDialog>{InputWithdescriptionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default InputWithDescription;
