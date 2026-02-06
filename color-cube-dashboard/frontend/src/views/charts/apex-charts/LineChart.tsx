import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ApexLineChart from 'src/components/charts/apex-charts/ApexLineChart';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Chart Apex Line',
  },
];

const LineChart = () => {
  return (
    <>
      <BreadcrumbComp title="Chart Apex Line" items={BCrumb} />
      <ApexLineChart />
    </>
  );
};

export default LineChart;
