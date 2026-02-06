import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ApexColumnChart from 'src/components/charts/apex-charts/ApexColumnChart';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Chart Apex Column',
  },
];

const ColumnChart = () => {
  return (
    <>
      <BreadcrumbComp title="Chart Apex Column" items={BCrumb} />
      <ApexColumnChart />
    </>
  );
};

export default ColumnChart;
