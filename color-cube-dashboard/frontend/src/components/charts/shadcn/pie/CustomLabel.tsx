import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartPieLabelcustom from './code/CustomLabelCode'
import ChartPieLabelcustomCode from './code/CustomLabelCode.tsx?raw'

const ChartPieLabelCustom = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Custom Label</h4>
          <ChartPieLabelcustom />
        </div>
        <CodeDialog>{ChartPieLabelcustomCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartPieLabelCustom
