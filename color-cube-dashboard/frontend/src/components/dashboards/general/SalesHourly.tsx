import { Icon } from '@iconify/react/dist/iconify.js';
import Chart from 'react-apexcharts';
import { Card } from 'src/components/ui/card';
import { Button } from 'src/components/ui/button';
import { ApexOptions } from 'apexcharts';

export const SalesHourly = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: 'Sales',
        data: Array.from({ length: 7 }, () => Math.floor(Math.random() * (50 - 10 + 1)) + 10),
      },
    ],
    chart: {
      height: 350,
      type: 'area',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 0,
        blur: 5,
        color: '#000',
        opacity: 0.2,
      },
    },
    colors: ['#615dff'],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      colors: ['#615dff'],
      width: 2,
    },
    fill: {
      type: 'gradient',
    },

    grid: {
      show: false,
    },
    yaxis: {
      show: false,
    },
    xaxis: {
      type: 'category',
      categories: ['Su', 'Mo', 'Tu', 'Wed', 'Th', 'Fr', 'Sa'],

      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: function (value: number) {
          return value + 'K';
        },
      },
    },
  };
  return (
    <>
      <Card className="bg-lightprimary dark:bg-lightprimary p-0">
        <div className="flex justify-between items-center p-6">
          <div>
            <h4 className="card-title">Sales Weekly</h4>
            <p className="card-subtitle flex gap-2 items-center">
              <Icon icon="tabler:point-filled" className="text-primary text-xl" />
              Your data updates every week
            </p>
          </div>
          <a href="src/assets/weeklySales.csv" download>
            <Button>
              <Icon icon="tabler:download" className="text-xl" />
            </Button>
          </a>
        </div>
        <Chart
          options={ChartData}
          series={ChartData.series}
          type="area"
          height="355px"
          width={'100%'}
        />
      </Card>
    </>
  );
};
