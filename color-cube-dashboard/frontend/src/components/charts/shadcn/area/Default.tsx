import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartAreadefault from './code/DefaultCode';
import ChartAreadefaultCode from './code/DefaultCode.tsx?raw';

const ChartAreaDefault = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Default</h4>
          <ChartAreadefault />
        </div>
        <CodeDialog>{ChartAreadefaultCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartAreaDefault;
