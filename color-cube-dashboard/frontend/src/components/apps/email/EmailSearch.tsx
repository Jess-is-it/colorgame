import React, { useContext } from 'react';
import { EmailContext } from 'src/context/email-context/index';
import { Icon } from '@iconify/react';
import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

type Props = {
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};
const EmailSearch = ({ onClick }: Props) => {
  const { setSearchQuery, searchQuery } = useContext(EmailContext);

  const handleSearchChange = (event: { target: { value: string } }) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
  };

  return (
    <>
      <div className="flex gap-3 bg-white dark:bg-transparent px-6 py-5 items-center">
        <Button
          variant={'lightprimary'}
          className="btn-circle p-0 lg:!hidden flex"
          onClick={onClick}
        >
          <Icon icon="tabler:menu-2" height={18} />
        </Button>
        <div className="relative w-full">
          <Icon
            icon="solar:magnifer-line-duotone"
            height={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-bodytext dark:text-darklink"
          />
          <Input
            id="search"
            placeholder="Search Emails"
            className="pl-10 w-full"
            value={searchQuery}
            onChange={handleSearchChange}
            required
          />
        </div>
      </div>
    </>
  );
};

export default EmailSearch;
