import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartBarstacked from './code/StackedLegendCode';
import ChartBarstackedCode from './code/StackedLegendCode.tsx?raw';

const ChartBarStacked = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Stacked + Legend</h4>
          <ChartBarstacked />
        </div>
        <CodeDialog>{ChartBarstackedCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartBarStacked;
