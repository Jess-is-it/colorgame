import { PopoverButton, PopoverPanel, Popover } from '@headlessui/react'

const GroupingPopoverCode = () => {
  return (
    <div>
      <div className='w-fit'>
        <div className='flex gap-8 bg-lightprimary dark:bg-darkprimary py-2 px-4 rounded-sm'>
          <Popover>
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white hover:cursor-pointer'>
              Products
            </PopoverButton>
            <PopoverPanel
              transition
              anchor='bottom'
              className='divide-y divide-border dark:divide-darkborder rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>
              <div className='p-3'>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary'
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Insights</p>
                  <p className='text-sm'>Measure actions your users take</p>
                </a>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary '
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Automations</p>
                  <p className='text-sm'>Create your own targeted content</p>
                </a>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary '
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Reports</p>
                  <p className='text-sm'>Keep track of your growth</p>
                </a>
              </div>
              <div className='p-3'>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary '
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Documentation</p>
                  <p className='text-sm'>
                    Start integrating products and tools
                  </p>
                </a>
              </div>
            </PopoverPanel>
          </Popover>
          <Popover>
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white hover:cursor-pointer'>
              Solutions
            </PopoverButton>
            <PopoverPanel
              transition
              anchor='bottom'
              className='divide-y divide-border dark:divide-darkborder rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>
              <div className='p-3'>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary'
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Insights</p>
                  <p className='text-sm'>Measure actions your users take</p>
                </a>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary '
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Automations</p>
                  <p className='text-sm'>Create your own targeted content</p>
                </a>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary '
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Reports</p>
                  <p className='text-sm'>Keep track of your growth</p>
                </a>
              </div>
              <div className='p-3'>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary'
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Documentation</p>
                  <p className='text-sm'>
                    Start integrating products and tools
                  </p>
                </a>
              </div>
            </PopoverPanel>
          </Popover>
          <Popover>
            <PopoverButton className='block text-sm font-semibold text-ld focus:outline-none data-[active]:text-primary data-[hover]:text-primary data-[focus]:outline-1 data-[focus]:outline-white hover:cursor-pointer'>
              Pricing
            </PopoverButton>
            <PopoverPanel
              transition
              anchor='bottom'
              className='divide-y divide-border dark:divide-darkborder rounded-sm bg-white dark:bg-dark text-sm shadow-md dark:shadow-dark-md transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>
              <div className='p-3'>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary'
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Insights</p>
                  <p className='text-sm'>Measure actions your users take</p>
                </a>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary '
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Automations</p>
                  <p className='text-sm'>Create your own targeted content</p>
                </a>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary '
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Reports</p>
                  <p className='text-sm'>Keep track of your growth</p>
                </a>
              </div>
              <div className='p-3'>
                <a
                  className='block rounded-sm py-2 px-3 transition hover:bg-lightprimary dark:hover:bg-darkprimary '
                  href='#'>
                  <p className='text-sm font-semibold text-ld'>Documentation</p>
                  <p className='text-sm'>
                    Start integrating products and tools
                  </p>
                </a>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </div>
    </div>
  )
}

export default GroupingPopoverCode
