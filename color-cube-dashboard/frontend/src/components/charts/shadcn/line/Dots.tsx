import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartLinedots from './code/DotsCode'
import ChartLinedotsCode from './code/DotsCode.tsx?raw'

const ChartLineDots = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Dots</h4>
          <ChartLinedots />
        </div>
        <CodeDialog>{ChartLinedotsCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartLineDots
