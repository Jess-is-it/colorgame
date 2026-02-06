import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadialtext from './code/TextCode'
import ChartRadialtextCode from './code/TextCode.tsx?raw'

const ChartRadialText = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Text</h4>
          <ChartRadialtext />
        </div>
        <CodeDialog>{ChartRadialtextCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadialText
