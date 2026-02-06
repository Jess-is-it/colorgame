import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadarmultiple from './code/MultipleCode';
import ChartRadarmultipleCode from './code/MultipleCode.tsx?raw';

const ChartRadarMultiple = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Multiple</h4>
          <ChartRadarmultiple />
        </div>
        <CodeDialog>{ChartRadarmultipleCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartRadarMultiple;
