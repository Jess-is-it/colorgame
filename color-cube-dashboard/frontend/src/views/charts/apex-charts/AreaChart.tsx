import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ApexAreaChart from 'src/components/charts/apex-charts/ApexAreaChart';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Chart Apex Area',
  },
];

const AreaChart = () => {
  return (
    <>
      <BreadcrumbComp title="Chart Apex Area" items={BCrumb} />
      <ApexAreaChart />
    </>
  );
};

export default AreaChart;
