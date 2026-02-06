import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartAreaaxes from './code/AxesCode';
import ChartAreaaxesCode from './code/AxesCode.tsx?raw';

const ChartAreaAxes = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Axes</h4>
          <ChartAreaaxes />
        </div>
        <CodeDialog>{ChartAreaaxesCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartAreaAxes;
