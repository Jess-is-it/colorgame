import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Badge } from 'src/components/ui/badge';
import { Card } from 'src/components/ui/card';

const ProductrChart = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: 'Sales',
        data: [20, 15, 30, 25, 10, 18, 20, 25, 10],
      },
    ],
    chart: {
      type: 'bar',
      height: 80,
      fontFamily: `inherit`,
      sparkline: {
        enabled: true,
      },
    },
    colors: ['var(--color-primary)'],

    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '60%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2.5,
      colors: ['rgba(0,0,0,0.01)'],
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },

    fill: {
      opacity: 1,
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: false,
      },
    },
  };
  return (
    <>
      <Card>
        <h5 className="card-title mb-2">$2,420</h5>
        <p className="flex gap-2 items-center">
          Average Daily Sales
          <Badge variant={'lightSuccess'}>5.6%</Badge>
        </p>
        <Chart
          options={ChartData}
          series={ChartData.series}
          type="bar"
          height="80px"
          width="100%"
          className="mt-8"
        />
      </Card>
    </>
  );
};

export default ProductrChart;
