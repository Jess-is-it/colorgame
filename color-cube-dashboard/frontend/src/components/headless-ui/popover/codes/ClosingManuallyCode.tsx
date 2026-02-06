import {
  CloseButton,
  Popover,
  PopoverButton,
  PopoverPanel,
} from '@headlessui/react'
import MyLink from '../MyLink'

const ClosingManuallyCode = () => {
  return (
    <div>
      <div className='w-fit'>
        <div className='gap-8 bg-lightprimary dark:bg-darkprimary py-2 px-4 rounded-sm flex justify-center'>
          <Popover>
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white hover:cursor-pointer'>
              Open Popover
            </PopoverButton>
            <PopoverPanel
              anchor='bottom'
              className='w-52 py-4 rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>
              <CloseButton as={MyLink}>Insights</CloseButton>
            </PopoverPanel>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default ClosingManuallyCode
