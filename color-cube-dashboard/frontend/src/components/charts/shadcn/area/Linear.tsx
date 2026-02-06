import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartArealinear from './code/LinearCode';
import ChartArealinearCode from './code/LinearCode.tsx?raw';

const ChartAreaLinear = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Linear</h4>
          <ChartArealinear />
        </div>
        <CodeDialog>{ChartArealinearCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartAreaLinear;
