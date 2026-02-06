import ChartRadialSimple from 'src/components/charts/shadcn/radial/Default';
import ChartRadialGrid from 'src/components/charts/shadcn/radial/Grid';
import ChartRadialLabel from 'src/components/charts/shadcn/radial/Label';
import ChartRadialShape from 'src/components/charts/shadcn/radial/Shape';
import ChartRadialStacked from 'src/components/charts/shadcn/radial/Stacked';
import ChartRadialText from 'src/components/charts/shadcn/radial/Text';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Shadcn Radial Chart',
  },
];

const RadialChart = () => {
  return (
    <>
      <BreadcrumbComp title="Shadcn Radial Chart" items={BCrumb} />
      <div className="flex flex-col gap-6">
        {/* Default */}
        <div>
          <ChartRadialSimple />
        </div>
        {/* Label */}
        <div>
          <ChartRadialLabel />
        </div>
        {/* Grid */}
        <div>
          <ChartRadialGrid />
        </div>
        {/* Text */}
        <div>
          <ChartRadialText />
        </div>
        {/* Shape */}
        <div>
          <ChartRadialShape />
        </div>
        {/* Stacked */}
        <div>
          <ChartRadialStacked />
        </div>
      </div>
    </>
  );
};

export default RadialChart;
