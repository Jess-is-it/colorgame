import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartBarlabel from './code/LabelCode';
import ChartBarlabelCode from './code/LabelCode.tsx?raw';

const ChartBarLabel = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Label</h4>
          <ChartBarlabel />
        </div>
        <CodeDialog>{ChartBarlabelCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartBarLabel;
