import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartPielegend from './code/LegendCode';
import ChartPielegendCode from './code/LegendCode.tsx?raw';

const ChartPieLegend = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Legend</h4>
          <ChartPielegend />
        </div>
        <CodeDialog>{ChartPielegendCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartPieLegend;
