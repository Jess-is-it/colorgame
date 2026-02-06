import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartPieDonutactive from './code/DonutActiveCode'
import ChartPieDonutactiveCode from './code/DonutActiveCode.tsx?raw'

const ChartPieDonutActive = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Donut active</h4>
          <ChartPieDonutactive />
        </div>
        <CodeDialog>{ChartPieDonutactiveCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartPieDonutActive
