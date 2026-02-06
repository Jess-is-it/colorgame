import { Icon } from '@iconify/react/dist/iconify.js';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card } from 'src/components/ui/card';

const Sales = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: 'PRODUCT A',
        data: [11, 17, 15, 15, 21, 14, 11],
      },
    ],
    colors: ['var(--color-secondary)'],
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 3,
        borderRadiusApplication: 'around',
      },
    },
    dataLabels: {
      enabled: false,
    },
    chart: {
      type: 'bar',
      height: 100,
      stacked: false,
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
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
    legend: {
      show: false,
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
      <Card className="h-full">
        <div className="flex flex-col gap-4">
          <div className="flex 2xl:flex-row lg:flex-col 2xl:items-center justify-between gap-3">
            <div className="2xl:order-1 lg:order-2 order-1">
              <h4 className="text-lg">$65,432</h4>
              <p>Sales</p>
            </div>
            <div className="h-10 w-10 bg-lightsecondary dark:bg-lightsecondary rounded-md flex justify-center items-center 2xl:order-2 lg:order-1 order-2">
              <Icon icon={'solar:wallet-money-bold-duotone'} className="text-secondary text-2xl" />
            </div>
          </div>
          <div className="rounded-bars -ms-3 -me-2">
            <Chart options={ChartData} series={ChartData.series} type="bar" height={'100px'} />
          </div>
        </div>
      </Card>
    </>
  );
};
export { Sales };
