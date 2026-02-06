import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartRadarLabelcustom from './code/CustomLabelCode'
import ChartRadarLabelcustomCode from './code/CustomLabelCode.tsx?raw'

const ChartRadarLabelCustom = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Custom Label</h4>
          <ChartRadarLabelcustom />
        </div>
        <CodeDialog>{ChartRadarLabelcustomCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartRadarLabelCustom
