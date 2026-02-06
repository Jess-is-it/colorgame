import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ApexRadialChart from 'src/components/charts/apex-charts/ApexRadialBarChart';
import ApexRadarChart from 'src/components/charts/apex-charts/ApexRadarChart';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Chart Apex Radialbar & Radar',
  },
];

const RadialChart = () => {
  return (
    <>
      <BreadcrumbComp title="Chart Apex Radialbar & Radar" items={BCrumb} />
      <div className="flex flex-col gap-6">
        <div>
          <ApexRadialChart />
        </div>
        <div>
          <ApexRadarChart />
        </div>
      </div>
    </>
  );
};

export default RadialChart;
