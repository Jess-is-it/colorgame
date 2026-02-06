import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import Basicselect from './codes/BasicSelectCode';
import BasicselectCode from './codes/BasicSelectCode.tsx?raw';

const BasicSelect = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Basic Select</h4>
            <Basicselect />
          </div>
          <CodeDialog>{BasicselectCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default BasicSelect;
