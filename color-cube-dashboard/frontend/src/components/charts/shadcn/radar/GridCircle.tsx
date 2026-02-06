import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadarGridcircle from './code/GridCircleCode'
import ChartRadarGridcircleCode from './code/GridCircleCode.tsx?raw'

const ChartRadarGridCircle = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Grid Circle</h4>
          <ChartRadarGridcircle />
        </div>
        <CodeDialog>{ChartRadarGridcircleCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadarGridCircle
