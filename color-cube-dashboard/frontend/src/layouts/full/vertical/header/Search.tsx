import { useState } from 'react';
import { Link } from 'react-router';
import { Icon } from '@iconify/react';
import SimpleBar from 'simplebar-react';
import * as SearchData from './data';
import AnimatedItem from 'src/components/animated-component/ListAnimation';
import InputPlaceholderAnimate from 'src/components/animated-component/AnimatedInputPlaceholder';
import { Dialog, DialogContent, DialogTrigger } from 'src/components/ui/dialog';

const Search = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchLink, setSearchLink] = useState('');

  // Filter the data based on search input
  const filteredLinks = SearchData.SearchLinks.filter(
    (link) =>
      link.title.toLowerCase().includes(searchLink.toLowerCase()) ||
      link.href.toLowerCase().includes(searchLink.toLowerCase()),
  );

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <button className="px-[15px] hover:text-primary text-link dark:text-darklink dark:hover:text-primary relative after:absolute after:w-10 after:h-10 after:rounded-full hover:after:bg-lightprimary  after:bg-transparent rounded-full flex justify-center items-center cursor-pointer">
          <Icon icon="solar:magnifer-line-duotone" height={20} />
        </button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl p-0 gap-0 [&>button]:hidden">
        <div className=" p-6 border-b border-ld">
          <InputPlaceholderAnimate
            value={searchLink}
            onChange={setSearchLink}
            placeholders={['Search links...', 'Find dashboards...', 'Look up links...']}
            className="flex-1 pl-4"
          />
        </div>

        <div className="flex-1 overflow-auto p-6 pt-0">
          <SimpleBar className="max-h-72">
            <h5 className="text-lg pt-5">Quick Page Links</h5>
            {filteredLinks.length > 0 ? (
              filteredLinks.map((link, index) => (
                <Link to={link.href} className="py-1 px-3 group relative" key={index}>
                  <AnimatedItem key={index} index={index}>
                    <h6 className="group-hover:text-primary mb-1 font-medium text-sm">
                      {link.title}
                    </h6>
                    <p className="text-xs text-link dark:text-darklink opacity-90 font-medium">
                      {link.href}
                    </p>
                  </AnimatedItem>
                </Link>
              ))
            ) : (
              <p className="text-sm text-center text-gray-500 py-4">No results found.</p>
            )}
          </SimpleBar>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Search;
