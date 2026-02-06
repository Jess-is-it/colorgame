import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartBarLabelcustom from './code/CustomLabelCode'
import ChartBarLabelcustomCode from './code/CustomLabelCode.tsx?raw'

const ChartBarLabelCustom = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Custom Label</h4>
          <ChartBarLabelcustom />
        </div>
        <CodeDialog>{ChartBarLabelcustomCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartBarLabelCustom
