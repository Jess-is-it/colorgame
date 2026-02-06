

import CardBox from '../../shared/CardBox'
import BreadcrumbWithellipsis from './code/BreadcrumbWithEllipsisCode'
import BreadcrumbWithEllipsisCode from './code/BreadcrumbWithEllipsisCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const BreadcrumbWithEllipsis = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>Breadcrumb Ellipsis</h4>
          <BreadcrumbWithellipsis />
        </div>
        <CodeDialog>{BreadcrumbWithEllipsisCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default BreadcrumbWithEllipsis
