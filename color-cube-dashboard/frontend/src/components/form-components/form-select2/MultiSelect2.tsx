import Select, { CSSObjectWithLabel, MultiValue, StylesConfig } from 'react-select';
import TitleCard from 'src/components/shared/TitleBorderCard';
import { Label } from 'src/components/ui/label';

interface OptionType {
  value: string;
  label: string;
}

const options: OptionType[] = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'users', label: 'Users' },
  { value: 'settings', label: 'Settings' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'support', label: 'Support' },
];

const customStyles: StylesConfig<OptionType, true> = {
  control: (base: CSSObjectWithLabel) => ({
    ...base,
    backgroundColor: 'transparent',
    borderColor: `var(--color-border)`,
    minHeight: '38px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: 'var(--color-primary)', // gray-400
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: 'var(--color-lightprimary)', // blue-100
    color: 'var(--color-primary)', // blue-600
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: 'var(--color-primary)', // blue-700
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: 'var(--color-primary)',
    ':hover': {
      backgroundColor: 'var(--color-lightprimary)',
      color: 'var(--color-primary)',
    },
  }),
  option: (base, state: { isFocused: boolean }) => ({
    ...base,
    backgroundColor: state.isFocused ? 'var(--color-lightprimary)' : 'var(--color-background)',
    borderColor: 'var(--color-primary)',
    cursor: 'pointer',
    ':active': {
      backgroundColor: 'var(--color-primary)', // darker shade or same as selected
      color: 'white',
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
    backgroundColor: 'var(--color-background)',
  }),
};

const MultiSelect2 = () => {
  const handleChange = (selectedOptions: MultiValue<OptionType>) => {
    console.log('Selected:', selectedOptions);
  };

  return (
    <TitleCard title="Multi Select2">
      <div className="w-full flex flex-col">
        <Label>Select Permissions</Label>
        <Select
          options={options}
          isMulti
          styles={customStyles}
          placeholder="Select permissions..."
          onChange={handleChange}
          closeMenuOnSelect={false}
        />
      </div>
    </TitleCard>
  );
};

export default MultiSelect2;
