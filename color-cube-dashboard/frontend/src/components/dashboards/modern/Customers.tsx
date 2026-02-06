import { Icon } from '@iconify/react/dist/iconify.js';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { Card } from 'src/components/ui/card';

const Customers = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: 'Customers',
        color: 'var(--color-secondary)',
        data: [30, 25, 35, 20, 30, 40],
      },
    ],
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 80,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.1,
        opacityTo: 0,
        stops: [20, 180],
      },
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px',
      },
      x: {
        show: false,
      },
    },
  };
  return (
    <>
      <Card className="p-0 h-full">
        <div className="p-6">
          <p>Customers</p>
          <h4 className="my-2 text-2xl">36,358</h4>
          <div className="flex items-center mb-3 gap-2">
            <span className="rounded-full p-1 bg-lighterror dark:bg-darkerror flex items-center justify-center ">
              <Icon icon="tabler:arrow-down-right" className="text-error" />
            </span>
            <p className="text-dark dark:text-darklink  mb-0">+9%</p>
          </div>
        </div>
        <Chart
          options={ChartData}
          series={ChartData.series}
          type="area"
          height="60px"
          width={'100%'}
        />
      </Card>
    </>
  );
};
export { Customers };
