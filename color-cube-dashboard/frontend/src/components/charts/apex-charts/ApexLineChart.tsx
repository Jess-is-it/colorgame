import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ApexLinechart from './code/ApexLineChartCode';
import ApexLineChartCode from './code/ApexLineChartCode.tsx?raw';

const ApexLineChart = () => {
  return (
    <>
      <Card className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Line Chart</h4>
            <ApexLinechart />
          </div>
          <CodeDialog>{ApexLineChartCode}</CodeDialog>
        </div>
      </Card>
    </>
  );
};

export default ApexLineChart;
