import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartLinestep from './code/StepCode';
import ChartLinestepCode from './code/StepCode.tsx?raw';

const ChartLineStep = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Step</h4>
          <ChartLinestep />
        </div>
        <CodeDialog>{ChartLinestepCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartLineStep;
