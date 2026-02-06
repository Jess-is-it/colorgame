import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadardots from './code/DotsCode'
import ChartRadardotsCode from './code/DotsCode.tsx?raw'

const ChartRadarDots = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Dots</h4>
          <ChartRadardots />
        </div>
        <CodeDialog>{ChartRadardotsCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadarDots
