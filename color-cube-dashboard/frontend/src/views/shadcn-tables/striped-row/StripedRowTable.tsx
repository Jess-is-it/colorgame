import TitleCard from 'src/components/shared/TitleBorderCard';

import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import StripedRowTable from 'src/components/shadcn-table/StripedRowTable';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Striped Raw',
  },
];

function page() {
  return (
    <>
      <BreadcrumbComp title="Shadcn Striped Table" items={BCrumb} />
      <TitleCard title="Striped Table">
        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-12">
            <StripedRowTable />
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default page;
