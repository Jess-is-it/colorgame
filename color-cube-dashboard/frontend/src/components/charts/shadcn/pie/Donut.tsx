import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartPiedonut from './code/DonutCode'
import ChartPiedonutCode from './code/DonutCode.tsx?raw'

const ChartPieDonut = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Donut</h4>
          <ChartPiedonut />
        </div>
        <CodeDialog>{ChartPiedonutCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartPieDonut
