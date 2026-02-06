import { useState } from 'react';
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { Icon } from '@iconify/react';
import clsx from 'clsx';

// Define the type for the person object
interface Person {
  id: number;
  name: string;
}

const people: Person[] = [
  { id: 1, name: 'Tom Cook' },
  { id: 2, name: 'Wade Cooper' },
  { id: 3, name: 'Tanya Fox' },
  { id: 4, name: 'Arlene Mccoy' },
  { id: 5, name: 'Devon Webb' },
];

const BasicComboCode = () => {
  const [query, setQuery] = useState<string>('');
  const [selected, setSelected] = useState<Person>(people[1]);

  const filteredPeople =
    query === ''
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div>
      <div className="max-w-sm">
        <Combobox
          value={selected}
          onChange={(value: Person | null) => {
            if (value) {
              setSelected(value);
            }
          }}
          onClose={() => setQuery('')}
        >
          <div className="relative">
            <ComboboxInput
              className={clsx(
                'w-full ui-form-control rounded-md p-2',
                'focus:outline-none focus:dark:ring-2 focus:dark:ring-white/25',
              )}
              displayValue={(person: Person) => person?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
              <Icon icon="solar:alt-arrow-down-outline" height={20} />
            </ComboboxButton>
          </div>

          <ComboboxOptions
            anchor="bottom"
            transition
            className={clsx(
              'absolute z-10 mt-1 max-h-60 w-[var(--input-width)] overflow-auto rounded-md bg-white dark:bg-dark py-1 text-base shadow-md dark:shadow-dark-md ring-1 ring-border ring-opacity-5 focus:outline-none sm:text-sm',
              'transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0',
            )}
          >
            {filteredPeople.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="group flex cursor-pointer ui-dropdown-item bg-hover dark:bg-hover hover:text-primary text-primary dark:text-primary data-[focus]:bg-hover data-[focus]:text-primary"
              >
                <Icon
                  icon="solar:check-read-linear"
                  className="invisible  group-data-[selected]:visible"
                  height={20}
                />
                <div className="text-sm text-ld hover:text-primary data-[focus]:text-primary">
                  {person.name}
                </div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      </div>
    </div>
  );
};

export default BasicComboCode;
