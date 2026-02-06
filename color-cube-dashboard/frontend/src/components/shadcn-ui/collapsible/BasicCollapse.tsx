

import CardBox from '../../shared/CardBox'
import Basiccollapse from './code/BasicCollapseCode'
import BasicCollapseCode from './code/BasicCollapseCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const BasicCollapse = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Basic Collapse</h4>
          <Basiccollapse />
        </div>
        <CodeDialog>{BasicCollapseCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default BasicCollapse
