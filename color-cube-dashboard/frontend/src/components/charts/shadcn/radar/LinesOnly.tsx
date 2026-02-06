import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadarLinesonly from './code/LinesOnlyCode'
import ChartRadarLinesonlyCode from './code/LinesOnlyCode.tsx?raw'

const ChartRadarLinesOnly = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Lines Only</h4>
          <ChartRadarLinesonly />
        </div>
        <CodeDialog>{ChartRadarLinesonlyCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadarLinesOnly
