import ChartPieLabelCustom from 'src/components/charts/shadcn/pie/CustomLabel';
import ChartPieSimple from 'src/components/charts/shadcn/pie/Default';
import ChartPieDonut from 'src/components/charts/shadcn/pie/Donut';
import ChartPieDonutActive from 'src/components/charts/shadcn/pie/DonutActive';
import ChartPieDonutText from 'src/components/charts/shadcn/pie/DonutWithText';
import ChartPieInteractive from 'src/components/charts/shadcn/pie/Interactive';
import ChartPieLabel from 'src/components/charts/shadcn/pie/Label';
import ChartPieLabelList from 'src/components/charts/shadcn/pie/LabelList';
import ChartPieLegend from 'src/components/charts/shadcn/pie/Legend';
import ChartPieSeparatorNone from 'src/components/charts/shadcn/pie/SeparatorNone';
import ChartPieStacked from 'src/components/charts/shadcn/pie/Stacked';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Shadcn Pie Chart',
  },
];

const PieChart = () => {
  return (
    <>
      <BreadcrumbComp title="Shadcn Pie Chart" items={BCrumb} />
      <div className="flex flex-col gap-6">
        {/* Default */}
        <div>
          <ChartPieSimple />
        </div>
        {/* Separator None */}
        <div>
          <ChartPieSeparatorNone />
        </div>
        {/* Label */}
        <div>
          <ChartPieLabel />
        </div>
        {/* Custom Label */}
        <div>
          <ChartPieLabelCustom />
        </div>
        {/* Label List */}
        <div>
          <ChartPieLabelList />
        </div>
        {/* Legend */}
        <div>
          <ChartPieLegend />
        </div>
        {/* Donut */}
        <div>
          <ChartPieDonut />
        </div>
        {/* Donut Active */}
        <div>
          <ChartPieDonutActive />
        </div>
        {/* Donut With Text */}
        <div>
          <ChartPieDonutText />
        </div>
        {/* Stacked */}
        <div>
          <ChartPieStacked />
        </div>
        {/* Interactive */}
        <div>
          <ChartPieInteractive />
        </div>
      </div>
    </>
  );
};

export default PieChart;
