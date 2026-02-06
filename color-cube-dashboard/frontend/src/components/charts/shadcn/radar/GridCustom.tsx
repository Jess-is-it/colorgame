import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadarGridcustom from './code/GridCustomCode'
import ChartRadarGridcustomCode from './code/GridCustomCode.tsx?raw'

const ChartRadarGridCustom = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Grid Custom</h4>
          <ChartRadarGridcustom />
        </div>
        <CodeDialog>{ChartRadarGridcustomCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadarGridCustom
