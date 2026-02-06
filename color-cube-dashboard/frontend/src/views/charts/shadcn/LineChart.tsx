import ChartLineDotsCustom from 'src/components/charts/shadcn/line/CustomDots';
import ChartLineLabelCustom from 'src/components/charts/shadcn/line/CustomLabel';
import ChartLineDefault from 'src/components/charts/shadcn/line/Default';
import ChartLineDots from 'src/components/charts/shadcn/line/Dots';
import ChartLineDotsColors from 'src/components/charts/shadcn/line/DotsColors';
import ChartLineInteractive from 'src/components/charts/shadcn/line/Interactive';
import ChartLineLabel from 'src/components/charts/shadcn/line/Label';
import ChartLineLinear from 'src/components/charts/shadcn/line/Linear';
import ChartLineMultiple from 'src/components/charts/shadcn/line/Multiple';
import ChartLineStep from 'src/components/charts/shadcn/line/Step';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Shadcn Line Chart',
  },
];

const LineChart = () => {
  return (
    <>
      <BreadcrumbComp title="Shadcn Line Chart" items={BCrumb} />
      <div className="flex flex-col gap-6">
        {/* Default */}
        <div>
          <ChartLineDefault />
        </div>
        {/* Linear */}
        <div>
          <ChartLineLinear />
        </div>
        {/* Step */}
        <div>
          <ChartLineStep />
        </div>
        {/* Multiple */}
        <div>
          <ChartLineMultiple />
        </div>
        {/* Dots */}
        <div>
          <ChartLineDots />
        </div>
        {/* Custom Dots */}
        <div>
          <ChartLineDotsCustom />
        </div>
        {/* Dots Colors */}
        <div>
          <ChartLineDotsColors />
        </div>
        {/* Label */}
        <div>
          <ChartLineLabel />
        </div>
        {/* Custom Label */}
        <div>
          <ChartLineLabelCustom />
        </div>
        {/* Interactive */}
        <div>
          <ChartLineInteractive />
        </div>
      </div>
    </>
  );
};

export default LineChart;
