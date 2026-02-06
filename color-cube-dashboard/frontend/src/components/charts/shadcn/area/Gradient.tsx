import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartAreagradient from './code/GradientCode';
import ChartAreagradientCode from './code/GradientCode.tsx?raw';

const ChartAreaGradient = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Gradient</h4>
          <ChartAreagradient />
        </div>
        <CodeDialog>{ChartAreagradientCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartAreaGradient;
