import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartPieLabellist from './code/LabelListCode';
import ChartPieLabellistCode from './code/LabelListCode.tsx?raw';

const ChartPieLabelList = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Label List</h4>
          <ChartPieLabellist />
        </div>
        <CodeDialog>{ChartPieLabellistCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartPieLabelList;
