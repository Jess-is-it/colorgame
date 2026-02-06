

import CardBox from '../../shared/CardBox'
import Rangedatepicker from './code/DateRangePickerCode'
import RangeDatepickerCode from './code/DateRangePickerCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const DateRangePicker = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Date Range Picker</h4>
          <Rangedatepicker />
        </div>
        <CodeDialog>{RangeDatepickerCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default DateRangePicker
