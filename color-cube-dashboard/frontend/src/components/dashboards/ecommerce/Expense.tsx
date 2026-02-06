import { Icon } from '@iconify/react/dist/iconify.js';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card } from 'src/components/ui/card';

const Expense = () => {
  const ChartData: ApexOptions = {
    series: [60, 25, 15],
    labels: ['', '', ''],
    chart: {
      height: 120,
      type: 'donut',
      fontFamily: 'inherit',
      foreColor: '#c6d1e9',
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
    colors: ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-success)'],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      show: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '75%',
          background: 'none',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '18px',
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: false,
              color: '#98aab4',
            },
          },
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
              <h4 className="text-lg">$10,230</h4>
              <p>Expense</p>
            </div>
            <div className="h-10 w-10 bg-lightprimary dark:bg-lightprimary rounded-md flex justify-center items-center 2xl:order-2 lg:order-1 order-2">
              <Icon icon={'solar:card-bold-duotone'} className="text-primary text-2xl" />
            </div>
          </div>
          {/* chart */}
          <div>
            <Chart options={ChartData} series={ChartData.series} type="donut" height={'120px'} />
          </div>
        </div>
      </Card>
    </>
  );
};
export { Expense };
