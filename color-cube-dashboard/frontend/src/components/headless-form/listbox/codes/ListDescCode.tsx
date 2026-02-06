import { useState } from 'react'
import { Icon } from '@iconify/react'
import {
  Description,
  Field,

  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react'

const people = [
  { id: 1, name: 'Durward Reynolds', available: true },
  { id: 2, name: 'Kenton Towne', available: true },
  { id: 3, name: 'Therese Wunsch', available: false },
  { id: 4, name: 'Benedict Kessler', available: false },
  { id: 5, name: 'Katelyn Rohan', available: true },
]

const ListDescCode = () => {
  const [selectedPerson, setSelectedPerson] = useState(people[0])

  return (
    <div>
      <Field className='w-fit'>
        <Description className='text-xs mb-2'>
          This person will have full access to this project. This person will
          have full access to this project.
        </Description>
        <Listbox value={selectedPerson} onChange={setSelectedPerson}>
          <ListboxButton className='ui-button bg-warning  justify-between items-center gap-3 w-full'>
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
  )
}

export default ListDescCode
