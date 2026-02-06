import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import TitleCard from 'src/components/shared/TitleBorderCard';
import HoverTable from 'src/components/shadcn-table/HoverTable';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Hover Table',
  },
];

function page() {
  return (
    <>
      <BreadcrumbComp title="Shadcn Hover Table" items={BCrumb} />
      <TitleCard title="Hover Table">
        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-12">
            <HoverTable />
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default page;
