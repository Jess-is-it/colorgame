import { useContext } from 'react';
import { EmailContext } from 'src/context/email-context/index';
import EmailCompose from './EmailCompose';
import { Icon } from '@iconify/react';
import SimpleBar from 'simplebar-react';

interface fitlerType {
  id?: number;
  filterbyTitle?: string;
  icon?: string;
  name?: string;
  divider?: boolean;
  color?: string;
}
const EmailFilter = () => {
  const filterData: fitlerType[] = [
    {
      id: 2,
      name: 'inbox',
      icon: 'tabler:inbox',
    },
    {
      id: 3,
      name: 'sent',
      icon: 'tabler:send',
    },
    {
      id: 4,
      name: 'draft',
      icon: 'tabler:file-text',
    },
    {
      id: 5,
      name: 'spam',
      icon: 'tabler:inbox',
    },
    {
      id: 6,
      name: 'trash',
      icon: 'tabler:trash',
    },
    {
      id: 7,
      divider: true,
    },
    {
      id: 8,
      filterbyTitle: 'Sort By',
    },
    {
      id: 9,
      name: 'starred',
      icon: 'tabler:star',
    },
    {
      id: 10,
      name: 'important',
      icon: 'tabler:badge',
    },
    {
      id: 11,
      divider: true,
    },
    {
      id: 12,
      filterbyTitle: 'Labels',
    },
    {
      id: 13,
      name: 'Promotional',
      icon: 'tabler:bookmark',
      color: 'primary',
    },
    {
      id: 14,
      name: 'Social',
      icon: 'tabler:bookmark',
      color: 'error',
    },
    {
      id: 15,
      name: 'Health',
      icon: 'tabler:bookmark',
      color: 'success',
    },
  ];

  const { setFilter, filter } = useContext(EmailContext);

  const handleFilterClick = (filterName: string | any) => {
    setFilter(filterName);
  };

  return (
    <>
      <div className="left-part max-w-60 h-full w-full p-0">
        <div className="p-6">
          <EmailCompose />
        </div>
        <SimpleBar className="h-[570px]">
          <ul className="mb-20 flex flex-col gap-0.5  p-6 pt-0">
            {filterData.map((item) => {
              if (item.filterbyTitle) {
                return (
                  <h6 className="uppercase text-xs pb-3" key={item.id}>
                    {item.filterbyTitle}
                  </h6>
                );
              } else if (item.divider) {
                return (
                  <div key={item.id} className="my-4">
                    <hr className="border-border" />
                  </div>
                );
              }
              return (
                <li
                  key={item.id}
                  className={`py-2.5 gap-2 px-4 rounded-md cursor-pointer capitalize flex  ${
                    filter === item.name
                      ? 'text-primary bg-lightprimary'
                      : 'bg-hover rounded-md text-bodytext dark:text-darklink hover:text-primary dark:hover:text-primary'
                  }`}
                  onClick={() => handleFilterClick(item.name)}
                >
                  {item.icon && (
                    <Icon icon={item.icon} height={18} className={`text-${item.color}`} />
                  )}
                  {item.name}
                </li>
              );
            })}
          </ul>
        </SimpleBar>
      </div>
    </>
  );
};

export default EmailFilter;
