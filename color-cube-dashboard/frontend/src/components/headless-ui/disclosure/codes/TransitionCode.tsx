import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Icon } from '@iconify/react'

const TransitionCode = () => {
  return (
    <div>
      <div className='ui-disclosure'>
        <Disclosure as='div' className='py-4 px-6' defaultOpen={true}>
          <DisclosureButton className='group flex w-full items-center justify-between hover:cursor-pointer'>
            <span className='ui-disclosure-btn'>
              What is your refund policy?
            </span>
            <Icon
              icon='solar:alt-arrow-down-outline'
              height={18}
              className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'
            />
          </DisclosureButton>
          <DisclosurePanel
            transition
            className='mt-2 text-xs origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'>
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete
            text) is dummy text that is not meant to mean anything. It is used
            as a placeholder in magazine
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as='div' className='py-4 px-6'>
          <DisclosureButton className='group flex w-full items-center justify-between hover:cursor-pointer'>
            <span className='ui-disclosure-btn'>Can I reserve a magazine?</span>
            <Icon
              icon='solar:alt-arrow-down-outline'
              height={18}
              className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'
            />
          </DisclosureButton>
          <DisclosurePanel
            transition
            className='mt-2 text-xs origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'>
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete
            text) is dummy text that is not meant to mean anything. It is used
            as a placeholder in magazine
          </DisclosurePanel>
        </Disclosure>
        <Disclosure as='div' className='py-4 px-6'>
          <DisclosureButton className='group flex w-full items-center justify-between hover:cursor-pointer'>
            <span className='ui-disclosure-btn'>
              Do I have the right to return an item?
            </span>
            <Icon
              icon='solar:alt-arrow-down-outline'
              height={18}
              className='size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180'
            />
          </DisclosureButton>
          <DisclosurePanel
            transition
            className='mt-2 text-xs origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'>
            Lorem ipsum dolor sit amet, consectetur adipisici elit…’ (complete
            text) is dummy text that is not meant to mean anything. It is used
            as a placeholder in magazine
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  )
}

export default TransitionCode
