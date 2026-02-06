import { Icon } from '@iconify/react/dist/iconify.js';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card } from 'src/components/ui/card';

const SalesOverview = () => {
  const ChartData: ApexOptions = {
    series: [55, 55, 55],
    labels: ['Expance', 'Revenue', 'Profit'],
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
    },
    plotOptions: {
      pie: {
        donut: {
          size: '88%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 7,
            },
            value: {
              show: false,
            },
            total: {
              show: true,
              color: '#7C8FAC',
              fontSize: '20px',
              fontWeight: '600',
              label: '$500,458',
            },
          },
        },
      },
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    colors: ['var(--color-primary)', '#EAEFF4', 'var(--color-secondary)'],
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
      <Card>
        <h5 className="card-title">Sales Overview</h5>
        <p className="card-subtitle mb-5">Every month</p>
        <div className="mb-4">
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="donut"
            height="243px"
            width={'100%'}
          />
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-3 items-center">
            <div className="bg-lightprimary dark:bg-lightprimary h-10 w-10 flex justify-center items-center rounded-md">
              <Icon icon="tabler:grid-dots" className="text-primary text-xl" />
            </div>
            <div>
              <h6 className="text-base">$23,450</h6>
              <p className=" dark:text-darklink   ">Profit</p>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-lightsecondary dark:bg-lightsecondary h-10 w-10 flex justify-center items-center rounded-md">
              <Icon icon="tabler:grid-dots" className="text-secondary text-xl" />
            </div>
            <div>
              <h6 className="text-base">$23,450</h6>
              <p className=" dark:text-darklink ">Expense</p>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
export { SalesOverview };
