import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadarlegend from './code/LegendCode';
import ChartRadarlegendCode from './code/LegendCode.tsx?raw';

const ChartRadarLegend = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Legend</h4>
          <ChartRadarlegend />
        </div>
        <CodeDialog>{ChartRadarlegendCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartRadarLegend;
