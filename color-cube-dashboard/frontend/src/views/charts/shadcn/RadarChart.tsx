import ChartRadarLabelCustom from 'src/components/charts/shadcn/radar/CustomLabel';
import ChartRadarDefault from 'src/components/charts/shadcn/radar/Default';
import ChartRadarDots from 'src/components/charts/shadcn/radar/Dots';
import ChartRadarGridCircle from 'src/components/charts/shadcn/radar/GridCircle';
import ChartRadarGridCircleFill from 'src/components/charts/shadcn/radar/GridCircleFilled';
import ChartRadarGridCircleNoLines from 'src/components/charts/shadcn/radar/GridCircleNoLines';
import ChartRadarGridCustom from 'src/components/charts/shadcn/radar/GridCustom';
import ChartRadarGridFill from 'src/components/charts/shadcn/radar/GridFilled';
import ChartRadarGridNone from 'src/components/charts/shadcn/radar/GridNone';
import ChartRadarLegend from 'src/components/charts/shadcn/radar/Legend';
import ChartRadarLinesOnly from 'src/components/charts/shadcn/radar/LinesOnly';
import ChartRadarMultiple from 'src/components/charts/shadcn/radar/Multiple';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Shadcn Radar Chart',
  },
];

const RadarChart = () => {
  return (
    <>
      <BreadcrumbComp title="Shadcn Radar Chart" items={BCrumb} />
      <div className="flex flex-col gap-6">
        {/* Default */}
        <div>
          <ChartRadarDefault />
        </div>
        {/* Dots */}
        <div>
          <ChartRadarDots />
        </div>
        {/* Lines Only */}
        <div>
          <ChartRadarLinesOnly />
        </div>
        {/* Custom Label */}
        <div>
          <ChartRadarLabelCustom />
        </div>
        {/* Grid Custom */}
        <div>
          <ChartRadarGridCustom />
        </div>
        {/* Grid None */}
        <div>
          <ChartRadarGridNone />
        </div>
        {/* Grid Circle */}
        <div>
          <ChartRadarGridCircle />
        </div>
        {/* Grid Circle - No lines */}
        <div>
          <ChartRadarGridCircleNoLines />
        </div>
        {/* Grid Circle Filled */}
        <div>
          <ChartRadarGridCircleFill />
        </div>
        {/* Grid Filled */}
        <div>
          <ChartRadarGridFill />
        </div>
        {/* Multiple */}
        <div>
          <ChartRadarMultiple />
        </div>
        {/* Legend */}
        <div>
          <ChartRadarLegend />
        </div>
      </div>
    </>
  );
};

export default RadarChart;
