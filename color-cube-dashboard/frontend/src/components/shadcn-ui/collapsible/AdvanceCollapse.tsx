

import CardBox from '../../shared/CardBox'
import Advancecollpse from './code/AdvanceCollpaseCode'
import AdvanceCollpseCode from './code/AdvanceCollpaseCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const AdvanceCollapse = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold mb-4'>Advance Collapse</h4>
          <Advancecollpse />
        </div>
        <CodeDialog>{AdvanceCollpseCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default AdvanceCollapse
