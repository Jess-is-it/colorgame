import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartBaractive from './code/ActiveCode';
import ChartBaractiveCode from './code/ActiveCode.tsx?raw';

const ChartBarActive = () => {
  return (
    <Card className="p-0">
      <div>
        <div className="p-6">
          <h4 className="text-lg font-semibold mb-4">Active</h4>
          <ChartBaractive />
        </div>
        <CodeDialog>{ChartBaractiveCode}</CodeDialog>
      </div>
    </Card>
  );
};

export default ChartBarActive;
