
import Basicaccordian from './code/BasicAccordiancode'
import BasicAccordiancode from './code/BasicAccordiancode.tsx?raw'
import CardBox from '../../shared/CardBox'
import CodeDialog from '../../shared/CodeDialog'

const BasicAccordion = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Accordion</h4>
          <Basicaccordian />
        </div>
        <CodeDialog>{BasicAccordiancode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default BasicAccordion
