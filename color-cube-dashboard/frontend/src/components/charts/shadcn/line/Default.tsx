import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartLinedefault from './code/DefaultCode';
import ChartLinedefaultCode from './code/DefaultCode.tsx?raw';

const ChartLineDefault = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Default</h4>
          <ChartLinedefault />
        </div>
        <CodeDialog>{ChartLinedefaultCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartLineDefault;
