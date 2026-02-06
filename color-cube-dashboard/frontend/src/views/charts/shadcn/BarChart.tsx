import ChartBarActive from 'src/components/charts/shadcn/bar/Active';
import ChartBarLabelCustom from 'src/components/charts/shadcn/bar/CustomLabel';
import ChartBarDefault from 'src/components/charts/shadcn/bar/Default';
import ChartBarHorizontal from 'src/components/charts/shadcn/bar/Horizontal';
import ChartBarInteractive from 'src/components/charts/shadcn/bar/Interactive';
import ChartBarLabel from 'src/components/charts/shadcn/bar/Label';
import ChartBarMixed from 'src/components/charts/shadcn/bar/Mixed';
import ChartBarMultiple from 'src/components/charts/shadcn/bar/Multiple';
import ChartBarNegative from 'src/components/charts/shadcn/bar/Negative';
import ChartBarStacked from 'src/components/charts/shadcn/bar/StackedLegend';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Shadcn Bar Chart',
  },
];

const BarChart = () => {
  return (
    <>
      <BreadcrumbComp title="Shadcn Bar Chart" items={BCrumb} />
      <div className="flex flex-col gap-6">
        {/* Default */}
        <div>
          <ChartBarDefault />
        </div>
        {/* Horizontal */}
        <div>
          <ChartBarHorizontal />
        </div>
        {/* Multiple */}
        <div>
          <ChartBarMultiple />
        </div>
        {/* Stacked */}
        <div>
          <ChartBarStacked />
        </div>
        {/* Label */}
        <div>
          <ChartBarLabel />
        </div>
        {/* Custom Label */}
        <div>
          <ChartBarLabelCustom />
        </div>
        {/* Mixed */}
        <div>
          <ChartBarMixed />
        </div>
        {/* Active */}
        <div>
          <ChartBarActive />
        </div>
        {/* Negative */}
        <div>
          <ChartBarNegative />
        </div>
        {/* Interactive */}
        <div>
          <ChartBarInteractive />
        </div>
      </div>
    </>
  );
};

export default BarChart;
