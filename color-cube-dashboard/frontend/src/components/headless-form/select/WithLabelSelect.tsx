import CardBox from '../../shared/CardBox';
import CodeDialog from '../../shared/CodeDialog';
import WithLabelselect from './codes/WithLabelSelectCode';
import WithLabelselectCode from './codes/WithLabelSelectCode.tsx?raw';

const WithLabelSelect = () => {
  return (
    <div>
      <CardBox className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">With Label Select</h4>
            <WithLabelselect />
          </div>
          <CodeDialog>{WithLabelselectCode}</CodeDialog>
        </div>
      </CardBox>
    </div>
  );
};

export default WithLabelSelect;
