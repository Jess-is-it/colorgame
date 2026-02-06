import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadarGridfill from './code/GridFilledCode'
import ChartRadarGridfillCode from './code/GridFilledCode.tsx?raw'

const ChartRadarGridFill = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Grid Filled</h4>
          <ChartRadarGridfill />
        </div>
        <CodeDialog>{ChartRadarGridfillCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadarGridFill
