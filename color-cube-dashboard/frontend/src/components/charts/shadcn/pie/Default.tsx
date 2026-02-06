import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartPiesimple from './code/DefaultCode';
import ChartPiesimpleCode from './code/DefaultCode.tsx?raw';

const ChartPieSimple = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Default</h4>
          <ChartPiesimple />
        </div>
        <CodeDialog>{ChartPiesimpleCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartPieSimple;
