import ChartAreaAxes from 'src/components/charts/shadcn/area/Axes';
import ChartAreaDefault from 'src/components/charts/shadcn/area/Default';
import ChartAreaGradient from 'src/components/charts/shadcn/area/Gradient';
import ChartAreaIcons from 'src/components/charts/shadcn/area/Icons';
import ChartAreaInteractive from 'src/components/charts/shadcn/area/Interactive';
import ChartAreaLegend from 'src/components/charts/shadcn/area/Legend';
import ChartAreaLinear from 'src/components/charts/shadcn/area/Linear';
import ChartAreaStacked from 'src/components/charts/shadcn/area/Stacked';
import ChartAreaStackedExpand from 'src/components/charts/shadcn/area/StackedExpanded';
import ChartAreaStep from 'src/components/charts/shadcn/area/Step';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Shadcn Area Chart',
  },
];

const AreaChart = () => {
  return (
    <>
      <BreadcrumbComp title="Shadcn Area Chart" items={BCrumb} />
      <div className="flex flex-col gap-6">
        {/* default */}
        <div>
          <ChartAreaDefault />
        </div>
        {/* Linear */}
        <div>
          <ChartAreaLinear />
        </div>
        {/* Step */}
        <div>
          <ChartAreaStep />
        </div>
        {/* Legend */}
        <div>
          <ChartAreaLegend />
        </div>
        {/* Stacked */}
        <div>
          <ChartAreaStacked />
        </div>
        {/* Stacked expanded */}
        <div>
          <ChartAreaStackedExpand />
        </div>
        {/* Icons */}
        <div>
          <ChartAreaIcons />
        </div>
        {/* Gradient */}
        <div>
          <ChartAreaGradient />
        </div>
        {/* Axes */}
        <div>
          <ChartAreaAxes />
        </div>
        {/* Interactive */}
        <div>
          <ChartAreaInteractive />
        </div>
      </div>
    </>
  );
};

export default AreaChart;
