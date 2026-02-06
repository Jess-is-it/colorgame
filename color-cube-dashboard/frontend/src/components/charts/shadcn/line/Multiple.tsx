import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartLinemultiple from './code/MultipleCode';
import ChartLinemultipleCode from './code/MultipleCode.tsx?raw';

const ChartLineMultiple = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Multiple</h4>
          <ChartLinemultiple />
        </div>
        <CodeDialog>{ChartLinemultipleCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartLineMultiple;
