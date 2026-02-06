import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import WithDescriptionselect from './codes/WithDescriptionSelectCode';
import WithDescriptionselectCode from './codes/WithDescriptionSelectCode.tsx?raw';

const WithDescriptionSelect = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">With Descrioption Select</h4>
            <WithDescriptionselect />
          </div>
          <CodeDialog>{WithDescriptionselectCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default WithDescriptionSelect;
