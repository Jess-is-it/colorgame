import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartLineDotscolors from './code/DotsColorsCode'
import ChartLineDotscolorsCode from './code/DotsColorsCode.tsx?raw'

const ChartLineDotsColors = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Dots Colors</h4>
          <ChartLineDotscolors />
        </div>
        <CodeDialog>{ChartLineDotscolorsCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartLineDotsColors
