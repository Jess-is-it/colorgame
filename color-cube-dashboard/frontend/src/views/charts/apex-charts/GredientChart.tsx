import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ApexGradientChart from 'src/components/charts/apex-charts/ApexGradientChart';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Chart Apex Gradient',
  },
];

const GradientChart = () => {
  return (
    <>
      <BreadcrumbComp title="Chart Apex Gradient" items={BCrumb} />
      <ApexGradientChart />
    </>
  );
};

export default GradientChart;
