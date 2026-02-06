

import CardBox from '../../shared/CardBox'
import Basiccombobox from './code/BasicComboCode'
import BasicComboboxCode from './code/BasicComboCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const BasicCombobox = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Basic Combobox</h4>
          <Basiccombobox />
        </div>
        <CodeDialog>{BasicComboboxCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default BasicCombobox
