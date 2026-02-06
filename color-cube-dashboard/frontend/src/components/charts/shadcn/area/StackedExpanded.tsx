import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartAreaStackedexpand from './code/StackedExpandedCode';
import ChartAreaStackedexpandCode from './code/StackedExpandedCode.tsx?raw';

const ChartAreaStackedExpand = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Stacked Expanded</h4>
          <ChartAreaStackedexpand />
        </div>
        <CodeDialog>{ChartAreaStackedexpandCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartAreaStackedExpand;
