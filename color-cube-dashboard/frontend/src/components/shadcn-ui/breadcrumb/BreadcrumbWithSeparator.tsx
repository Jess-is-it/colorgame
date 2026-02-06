

import CardBox from '../../shared/CardBox'
import BreadcrumbWithseparator from './code/BreadcrumbWithSeparatorCode'
import BreadcrumbWithSeparatorCode from './code/BreadcrumbWithSeparatorCode.tsx?raw'
import CodeDialog from '../../shared/CodeDialog'

const BreadcrumbWithSeparator = () => {
  return (
    <CardBox className='p-0'>
      <div>
        <div className='p-6'>
          <h4 className='text-lg font-semibold'>
            Breadcrumb With Custom Separator
          </h4>
          <BreadcrumbWithseparator />
        </div>
        <CodeDialog>{BreadcrumbWithSeparatorCode}</CodeDialog>
      </div>
    </CardBox>
  )
}

export default BreadcrumbWithSeparator
