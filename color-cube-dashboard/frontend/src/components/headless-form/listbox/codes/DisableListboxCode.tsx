import { useState } from 'react'
import { Icon } from '@iconify/react'
import {
  Field,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'

const people = [
  { id: 1, name: 'Durward Reynolds' },
  { id: 2, name: 'Kenton Towne' },
  { id: 3, name: 'Therese Wunsch' },
  { id: 4, name: 'Benedict Kessler' },
  { id: 5, name: 'Katelyn Rohan' },
]

const DisableListboxCode = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <div>
      <div>
        <Field className='flex gap-3 items-center w-fit' disabled>
          <Listbox value={selectedPerson} onChange={setSelectedPerson}>
            <ListboxButton className='ui-button bg-slate-500 justify-between items-center gap-3 w-full'>
              {selectedPerson.name}{' '}
              <Icon icon='solar:alt-arrow-down-outline' height={18} />
            </ListboxButton>
            <ListboxOptions anchor='bottom' className='ui-dropdown'>
              {people.map((person) => (
                <ListboxOption
                  key={person.id}
                  value={person}
                  className='ui-dropdown-item'>
                  {person.name}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>
        </Field>
      </div>
    </div>
  )
}

export default DisableListboxCode
