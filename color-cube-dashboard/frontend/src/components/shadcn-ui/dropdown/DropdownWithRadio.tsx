

import CardBox from '../../shared/CardBox'
import DropdownwithRadio from './code/DropdownWithRadioCode'
import DropdownWithRadioCode from './code/DropdownWithRadioCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const DropdownWithRadio = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Dropdown With Radio Group</h4>
          <DropdownwithRadio />
        </div>
        <CodeDialog>{DropdownWithRadioCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default DropdownWithRadio
