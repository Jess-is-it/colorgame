import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartBarinteractive from './code/InteractiveCode';
import ChartBarinteractiveCode from './code/InteractiveCode.tsx?raw';

const ChartBarInteractive = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Interactive</h4>
          <ChartBarinteractive />
        </div>
        <CodeDialog>{ChartBarinteractiveCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartBarInteractive;
