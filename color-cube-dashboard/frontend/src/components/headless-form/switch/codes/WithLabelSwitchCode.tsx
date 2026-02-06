import { useState } from 'react'
import { Switch, Field, Label } from '@headlessui/react'

const WithLabelSwitchCode = () => {
  const [enabledSwith1, setEnabledSwitch1] = useState(true)
  const [enabledSwith2, setEnabledSwitch2] = useState(true)
  const [enabledSwith3, setEnabledSwitch3] = useState(true)
  const [enabledSwith4, setEnabledSwitch4] = useState(true)
  const [enabledSwith5, setEnabledSwitch5] = useState(true)

  return (
    <div>
      <div className='flex flex-wrap gap-3'>
        <Field>
          <Label className='block text-ld mb-2'>Enable</Label>
          <Switch
            checked={enabledSwith1}
            onChange={setEnabledSwitch1}
            className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-primary hover:cursor-pointer'>
            <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />
          </Switch>
        </Field>
        <Field>
          <Label className='block text-ld mb-2'>Enable</Label>
          <Switch
            checked={enabledSwith2}
            onChange={setEnabledSwitch2}
            className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-secondary hover:cursor-pointer'>
            <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />
          </Switch>
        </Field>
        <Field>
          <Label className='block text-ld mb-2'>Enable</Label>
          <Switch
            checked={enabledSwith3}
            onChange={setEnabledSwitch3}
            className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-error hover:cursor-pointer'>
            <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />
          </Switch>
        </Field>
        <Field>
          <Label className='block text-ld mb-2'>Enable</Label>
          <Switch
            checked={enabledSwith4}
            onChange={setEnabledSwitch4}
            className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-warning hover:cursor-pointer'>
            <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />
          </Switch>
        </Field>
        <Field>
          <Label className='block text-ld mb-2'>Enable</Label>
          <Switch
            checked={enabledSwith5}
            onChange={setEnabledSwitch5}
            className='group inline-flex h-6 w-11 items-center rounded-md bg-gray-200 transition data-[checked]:bg-info hover:cursor-pointer'>
            <span className='size-4 translate-x-1 rounded-md bg-white transition group-data-[checked]:translate-x-6' />
          </Switch>
        </Field>
      </div>
    </div>
  )
}

export default WithLabelSwitchCode
