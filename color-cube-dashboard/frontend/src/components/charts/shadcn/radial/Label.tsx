import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadiallabel from './code/LabelCode'
import ChartRadiallabelCode from './code/LabelCode.tsx?raw'

const ChartRadialLabel = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Label</h4>
          <ChartRadiallabel />
        </div>
        <CodeDialog>{ChartRadiallabelCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadialLabel
