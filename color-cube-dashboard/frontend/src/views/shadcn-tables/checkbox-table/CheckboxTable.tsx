import CheckboxTable from 'src/components/shadcn-table/CheckboxTable';
import TitleCard from 'src/components/shared/TitleBorderCard';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Checkbox Table',
  },
];
function page() {
  return (
    <>
      <BreadcrumbComp title="Shadcn Checkbox Table" items={BCrumb} />
      <TitleCard title="Checkbox Table">
        <div className="grid grid-cols-12 gap-7">
          <div className="col-span-12">
            <CheckboxTable />
          </div>
        </div>
      </TitleCard>
    </>
  );
}

export default page;
