import Chart from 'react-apexcharts';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Card } from 'src/components/ui/card';
import { ApexOptions } from 'apexcharts';

export const SalesGrowth = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: 'Sales',
        data: [0, 10, 10, 10, 35, 45, 30, 30, 30, 50, 52, 30, 25, 45, 50, 80, 60, 65],
      },
    ],
    chart: {
      id: 'growth',
      type: 'area',
      height: 100,
      sparkline: {
        enabled: true,
      },
      group: 'growth',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      colors: ['var(--color-secondary)'],
      opacity: 0,
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0,
        opacityTo: 0,
        stops: [20, 280],
      },
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
      y: {
        formatter: function (value: number) {
          return `$${value.toLocaleString()}K`;
        },
      },
    },
  };

  return (
    <>
      {/*  */}
      <Card className="h-full">
        <div className="flex flex-col gap-4">
          <div className="flex 2xl:flex-row lg:flex-col 2xl:items-center justify-between gap-3">
            <div className="2xl:order-1 lg:order-2 order-1">
              <h3 className="text-lg">$16.5k</h3>
              <p>Growth</p>
            </div>
            <div className="h-10 w-10 bg-lightsecondary dark:bg-lightsecondary rounded-md flex justify-center items-center 2xl:order-2 lg:order-1 order-2">
              <Icon icon={'solar:chart-bold-duotone'} className="text-secondary text-2xl" />
            </div>
          </div>
          {/* chart */}
          <div className="rounded-bars">
            <Chart
              options={ChartData}
              series={ChartData.series}
              type="area"
              width={'100%'}
              height={'100px'}
            />
          </div>
        </div>
      </Card>
    </>
  );
};
