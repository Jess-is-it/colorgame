import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import FollowersApp from 'src/components/apps/userprofile/followers';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Followers',
  },
];

const Followers = () => {
  return (
    <>
      <BreadcrumbComp title="Followers" items={BCrumb} />
      <FollowersApp />
    </>
  );
};

export default Followers;
