import Chart from 'react-apexcharts';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Card } from 'src/components/ui/card';
import { ApexOptions } from 'apexcharts';

export const IncrementedSales = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: '',
        data: [100, 60, 35, 90, 35, 100],
      },
    ],
    chart: {
      type: 'bar',
      height: 100,
      fontFamily: 'inherit',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      width: '100%',
    },
    colors: ['var(--color-primary)'],
    grid: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4,
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
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
      y: {
        formatter: function (value: number) {
          return `$${value.toLocaleString()}K`;
        },
      },
    },
  };

  return (
    <>
      <Card className="h-full">
        <div className="flex flex-col gap-4">
          <div className="flex 2xl:flex-row lg:flex-col 2xl:items-center justify-between gap-3">
            <div className="2xl:order-1 lg:order-2 order-1">
              <h3 className="text-lg">$16.5k</h3>
              <p>Sales</p>
            </div>
            <div className="h-10 w-10 bg-lightprimary dark:bg-lightprimary rounded-md flex justify-center items-center 2xl:order-2 lg:order-1 order-2">
              <Icon icon={'solar:cart-4-bold-duotone'} className="text-primary text-2xl" />
            </div>
          </div>
          {/* chart */}
          <div>
            <Chart
              options={ChartData}
              series={ChartData.series}
              type="bar"
              width={'100%'}
              height={'100px'}
            />
          </div>
        </div>
      </Card>
    </>
  );
};
