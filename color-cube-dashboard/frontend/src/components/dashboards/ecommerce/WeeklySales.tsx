import { Icon } from '@iconify/react/dist/iconify.js';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card } from 'src/components/ui/card';

const WeeklySales = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: 'Employee Salary',
        data: [20, 15, 30, 25, 10, 15, 20],
      },
    ],
    chart: {
      toolbar: {
        show: false,
      },
      height: 260,
      type: 'bar',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
    },
    colors: [
      'var(--color-lightprimary)',
      'var(--color-lightprimary)',
      'var(--color-primary)',
      'var(--color-lightprimary)',
      'var(--color-lightprimary)',
      'var(--color-lightprimary)',
      'var(--color-lightprimary)',
    ],
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '55%',
        distributed: true,
      },
    },

    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: false,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    xaxis: {
      categories: [['Mon'], ['Tue'], ['Wed'], ['Thu'], ['Fri'], ['Sat'], ['Sun']],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
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
      <Card className="p-0 h-full">
        <div className="p-6 pb-0">
          <h5 className="card-title">Weekly Sales</h5>
          <p className="card-subtitle">Every day</p>
        </div>
        <div className="-ml-[11px]">
          <div className="mb-0 pb-6">
            <Chart
              options={ChartData}
              series={ChartData.series}
              type="bar"
              height="285px"
              width={'100%'}
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-6 pt-0">
          <div className="flex gap-3 items-center">
            <div className="bg-lightprimary dark:bg-darkprimary h-10 w-10 flex justify-center items-center rounded-md">
              <Icon icon="tabler:grid-dots" className="text-primary text-xl" />
            </div>
            <div>
              <p>Total Sales</p>
              <h6 className="text-base">$36,358</h6>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-lightgray dark:bg-darkgray h-10 w-10 flex justify-center items-center rounded-md">
              <Icon icon="tabler:grid-dots" className="opacity-70 dark:opacity-100 text-xl" />
            </div>
            <div>
              <p>Expenses</p>
              <h6 className="text-base">$5,296</h6>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
export { WeeklySales };
