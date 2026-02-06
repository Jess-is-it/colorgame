import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartArealegend from './code/LegendCode';
import ChartArealegendCode from './code/LegendCode.tsx?raw';

const ChartAreaLegend = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Legend</h4>
          <ChartArealegend />
        </div>
        <CodeDialog>{ChartArealegendCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartAreaLegend;
