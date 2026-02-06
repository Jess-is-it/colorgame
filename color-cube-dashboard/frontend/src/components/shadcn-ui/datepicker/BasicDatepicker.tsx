

import CardBox from '../../shared/CardBox'
import Basicdatepicker from './code/BasicDatepickerCode'
import BasicDatepickerCode from './code/BasicDatepickerCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const BasicDatepicker = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Basic Datepicker</h4>
          <Basicdatepicker />
        </div>
        <CodeDialog>{BasicDatepickerCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default BasicDatepicker
