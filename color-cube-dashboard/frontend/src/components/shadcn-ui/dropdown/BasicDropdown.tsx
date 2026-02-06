

import CardBox from '../../shared/CardBox'
import Basicdropdown from './code/BasicDropdownCode'
import BasicDropdownCode from './code/BasicDropdownCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const BasicDropdown = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Basic Dropdown</h4>
          <Basicdropdown />
        </div>
        <CodeDialog>{BasicDropdownCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default BasicDropdown
