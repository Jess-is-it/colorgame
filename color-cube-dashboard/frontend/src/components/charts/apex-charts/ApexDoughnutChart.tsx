import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ApexDoughnutchart from './code/ApexDoughnutChartCode';
import ApexDoughnutChartCode from './code/ApexDoughnutChartCode.tsx?raw';

const ApexDoughnutChart = () => {
  return (
    <>
      <Card className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Doughnut Chart</h4>
            <ApexDoughnutchart />
          </div>
          <CodeDialog>{ApexDoughnutChartCode}</CodeDialog>
        </div>
      </Card>
    </>
  );
};

export default ApexDoughnutChart;
