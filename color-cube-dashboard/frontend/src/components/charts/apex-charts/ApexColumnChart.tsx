import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ApexColumnchart from './code/ApexColumnChartCode';
import ApexColumnChartCode from './code/ApexColumnChartCode.tsx?raw';

const ApexColumnChart = () => {
  
  return (
    <>
      <Card className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Column Chart</h4>
            <ApexColumnchart />
          </div>
          <CodeDialog>{ApexColumnChartCode}</CodeDialog>
        </div>
      </Card>
    </>
  );
};

export default ApexColumnChart;
