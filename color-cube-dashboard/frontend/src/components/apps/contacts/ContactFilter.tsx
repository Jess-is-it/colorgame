import { useContext } from 'react';
import { Icon } from '@iconify/react';
import ContactAdd from './ContactAdd';
import { ContactContext } from 'src/context/conatact-context/index';

interface DataType {
  id: number;
  name?: string | any;
  sort?: string;
  icon?: string;
  filterbyTitle?: string;
  devider?: boolean;
  color?: string;
}

const ContactFilter = () => {
  const { setSelectedDepartment, updateSearchTerm, selectedDepartment } =
    useContext(ContactContext);
  const filterData: DataType[] = [
    {
      id: 2,
      name: 'All',
      sort: 'show_all',
      icon: 'tabler:inbox',
    },
    {
      id: 3,
      name: 'Frequent',
      sort: 'frequent_contact',
      icon: 'tabler:send',
    },
    {
      id: 4,
      name: 'Starred',
      sort: 'starred_contact',
      icon: 'tabler:chalkboard',
    },
    {
      id: 6,
      devider: true,
    },
    {
      id: 5,
      filterbyTitle: 'Categories',
    },

    {
      id: 7,
      name: 'Engineering',
      sort: 'engineering_department',
      icon: 'tabler:folder-minus',
      color: 'primary',
    },
    {
      id: 8,
      name: 'Support',
      sort: 'support_department',
      icon: 'tabler:alert-circle',
      color: 'error',
    },
    {
      id: 9,
      name: 'Sales',
      sort: 'sales_department',
      icon: 'tabler:credit-card',
      color: 'success',
    },
  ];

  const handleDepartmentClick = (department: string) => {
    setSelectedDepartment(department);
    updateSearchTerm('');
  };

  return (
    <>
      <div className="left-part max-w-[235px] h-full w-full ">
        <ContactAdd />
        <ul className="my-4 flex flex-col gap-0.5">
          {filterData.map((filter) => {
            if (filter.filterbyTitle) {
              return (
                <h6 className="uppercase text-xs pb-3" key={filter.id}>
                  {filter.filterbyTitle}
                </h6>
              );
            } else if (filter.devider) {
              return (
                <div key={filter.id} className="my-4">
                  <hr className="border-border" />
                </div>
              );
            }
            return (
              <li
                key={filter.id}
                className={`py-[10px] gap-2 px-4 flex bg-hover  hover:text-primary dark:hover:text-primary rounded-md text-ld cursor-pointer ${
                  selectedDepartment === filter.name
                    ? 'text-primary bg-lightprimary dark:bg-lightprimary dark:text-primary'
                    : 'text-bodytext dark:text-darklink'
                }`}
                onClick={() => handleDepartmentClick(filter.name)}
              >
                {filter.icon && <Icon icon={filter.icon} height={18} />}

                {filter.name}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
export default ContactFilter;
