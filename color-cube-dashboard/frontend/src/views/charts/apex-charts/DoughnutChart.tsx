import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import ApexDoughnutChart from 'src/components/charts/apex-charts/ApexDoughnutChart';
import ApexPieChart from 'src/components/charts/apex-charts/ApexPieChart';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    href: '',
    text: 'Chart Apex Doughtnut & Pie',
  },
];

const DoughnutChart = () => {
  return (
    <>
      <BreadcrumbComp title="Chart Apex Doughtnut & Pie" items={BCrumb} />
      <div className="flex flex-col gap-6">
        <div>
          <ApexDoughnutChart />
        </div>
        <div>
          <ApexPieChart />
        </div>
      </div>
    </>
  );
};

export default DoughnutChart;
