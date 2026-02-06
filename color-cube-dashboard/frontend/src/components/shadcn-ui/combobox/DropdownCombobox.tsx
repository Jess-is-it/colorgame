

import CardBox from '../../shared/CardBox'
import CodeDialog from '../../shared/CodeDialog'
import DropdownCombo from './code/DropdownComboCode'
import DropdownComboCode from './code/DropdownComboCode.tsx?raw'

const DropdownCombobox = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Dropdown Combobox</h4>
          <DropdownCombo />
        </div>
        <CodeDialog>{DropdownComboCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default DropdownCombobox
