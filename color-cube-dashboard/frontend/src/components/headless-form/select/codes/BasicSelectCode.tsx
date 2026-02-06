import { Select } from '@headlessui/react'

const BasicSelectCode = () => {
  return (
    <>
      <div className='max-w-sm'>
        <Select
          name='status'
          aria-label='Project status'
          className='ui-form-control rounded-md my-4 !p-2 dark:focus:bg-dark hover:cursor-pointer'>
          <option value='active'>Active</option>
          <option value='paused'>Paused</option>
          <option value='delayed'>Delayed</option>
          <option value='canceled'>Canceled</option>
        </Select>
      </div>
    </>
  )
}

export default BasicSelectCode
