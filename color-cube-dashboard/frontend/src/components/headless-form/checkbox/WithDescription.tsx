import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Withdescription from './codes/WithDescriptionCode';
import WithdescriptionCode from './codes/WithDescriptionCode.tsx?raw';

const WithDescription = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">With Discription</h4>
            <Withdescription />
          </div>
          <CodeDialog>{WithdescriptionCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default WithDescription;
