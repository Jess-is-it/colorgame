import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

import ContactApp from 'src/components/apps/contacts/index';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Contact',
  },
];
const Contacts = () => {
  return (
    <>
      <BreadcrumbComp title="Contact App" items={BCrumb} />
      <ContactApp />
    </>
  );
};

export default Contacts;
