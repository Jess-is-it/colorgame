import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartPieinteractive from './code/InteractiveCode'
import ChartPieinteractiveCode from './code/InteractiveCode.tsx?raw'

const ChartPieInteractive = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Interactive</h4>
          <ChartPieinteractive />
        </div>
        <CodeDialog>{ChartPieinteractiveCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartPieInteractive
