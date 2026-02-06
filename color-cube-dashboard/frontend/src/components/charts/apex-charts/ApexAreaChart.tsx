import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ApexAreachart from './code/ApexAreaChartCode';
import ApexAreaChartCode from './code/ApexAreaChartCode.tsx?raw';

const ApexAreaChart = () => {
  return (
    <>
      <Card className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Area Chart</h4>
            <ApexAreachart />
          </div>
          <CodeDialog>{ApexAreaChartCode}</CodeDialog>
        </div>
      </Card>
    </>
  );
};

export default ApexAreaChart;
