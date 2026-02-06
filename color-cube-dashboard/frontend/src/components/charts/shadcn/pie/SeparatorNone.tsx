import { Card } from 'src/components/ui/card';
import CodeDialog from 'src/components/shared/CodeDialog';
import ChartPieSeparatornone from './code/SeparatorNoneCode'
import ChartPieSeparatornoneCode from './code/SeparatorNoneCode.tsx?raw'

const ChartPieSeparatorNone = () => {
  return (
    <Card className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Separator None</h4>
          <ChartPieSeparatornone />
        </div>
        <CodeDialog>{ChartPieSeparatornoneCode}</CodeDialog>
      </div>
    </Card>
  )
}

export default ChartPieSeparatorNone
