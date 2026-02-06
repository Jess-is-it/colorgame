import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import FriendsApp from 'src/components/apps/userprofile/friends';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Friends',
  },
];

const Friends = () => {
  return (
    <>
      <BreadcrumbComp title="Friends" items={BCrumb} />
      <FriendsApp />
    </>
  );
};

export default Friends;
