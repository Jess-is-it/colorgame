import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ApexRadarchart from './code/ApexRadarChartCode';
import ApexRadarChartCode from './code/ApexRadarChartCode.tsx?raw';

const ApexRadarChart = () => {
  return (
    <>
      <Card className="p-0">
        <div>
          <div className="p-6">
            <h4 className="text-lg font-semibold mb-4">Radar Chart</h4>
            <ApexRadarchart />
          </div>
          <CodeDialog>{ApexRadarChartCode}</CodeDialog>
        </div>
      </Card>
    </>
  );
};

export default ApexRadarChart;
