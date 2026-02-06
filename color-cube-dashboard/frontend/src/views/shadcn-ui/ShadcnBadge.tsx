import DefaultBadge from 'src/components/shadcn-ui/badge/DefaultBadge';
import OutlineBadge from 'src/components/shadcn-ui/badge/OutlineBadge';
import LinkBadge from 'src/components/shadcn-ui/badge/LinkBadge';
import BadgeWithIconText from 'src/components/shadcn-ui/badge/BadgeWithIconText';
import Iconbadge from 'src/components/shadcn-ui/badge/IconBadge';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    to: '/',
    text: 'Badge',
  },
];

const ShadcnBadge = () => {
  return (
    <>
      <BreadcrumbComp title="Badges" items={BCrumb} />
      <div className="grid grid-cols-12 gap-6">
        {/* Basic */}
        <div className="col-span-12">
          <DefaultBadge />
        </div>
        <div className="col-span-12">
          <OutlineBadge />
        </div>
        <div className="col-span-12">
          <LinkBadge />
        </div>
        <div className="col-span-12">
          <BadgeWithIconText />
        </div>
        <div className="col-span-12">
          <Iconbadge />
        </div>
      </div>
    </>
  );
};

export default ShadcnBadge;
