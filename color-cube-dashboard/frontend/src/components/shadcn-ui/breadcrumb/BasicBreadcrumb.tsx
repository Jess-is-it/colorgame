

import CardBox from '../../shared/CardBox'
import Basicbreadcrumb from './code/BasicBreadcrumbCode'
import BasicBreadcrumbCode from './code/BasicBreadcrumbCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const BasicBreadcrumb = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Basic Breadcrumb</h4>
          <Basicbreadcrumb />
        </div>
        <CodeDialog>{BasicBreadcrumbCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default BasicBreadcrumb
