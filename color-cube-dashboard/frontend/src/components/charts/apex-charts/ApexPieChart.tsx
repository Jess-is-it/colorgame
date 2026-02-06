import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ApexPiechart from './code/ApexPieChartCode';
import ApexPieChartCode from './code/ApexPieChartCode.tsx?raw';

const ApexPieChart = () => {
  return (
    <>
      <Card className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Pie Chart</h4>
            <ApexPiechart />
          </div>
          <CodeDialog>{ApexPieChartCode}</CodeDialog>
        </div>
      </Card>
    </>
  );
};

export default ApexPieChart;
