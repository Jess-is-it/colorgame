import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartLineDotscustom from './code/CustomDotsCode'
import ChartLineDotscustomCode from './code/CustomDotsCode.tsx?raw'

const ChartLineDotsCustom = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Custom Dots</h4>
          <ChartLineDotscustom />
        </div>
        <CodeDialog>{ChartLineDotscustomCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartLineDotsCustom
