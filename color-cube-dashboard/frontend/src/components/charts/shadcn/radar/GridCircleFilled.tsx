import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadarGridCirclefill from './code/GridCircleFilledCode'
import ChartRadarGridCirclefillCode from './code/GridCircleFilledCode.tsx?raw'

const ChartRadarGridCircleFill = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Grid Circle Filled</h4>
          <ChartRadarGridCirclefill />
        </div>
        <CodeDialog>{ChartRadarGridCirclefillCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadarGridCircleFill
