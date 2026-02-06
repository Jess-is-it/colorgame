import { Card } from 'src/components/ui/card';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useContext } from 'react';
import { CustomizerContext } from 'src/context/CustomizerContext';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export default function CustomerSegmentation() {
  const { activeMode } = useContext(CustomizerContext);

  const ChartData: ApexOptions = {
    series: [60, 20, 20],
    labels: ['2.758', '350', '458'],
    chart: {
      height: 300,
      type: 'donut',
      fontFamily: 'inherit',
      foreColor: `${activeMode === 'light' ? 'var(--color-black40)' : 'var(--color-white40)'}`,
    },
    stroke: {
      show: true,
      colors: [`${activeMode === 'light' ? 'var(--color-white)' : 'var(--color-dark)'}`],
      width: 0,
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    colors: ['var(--color-primary)', 'var(--color-lightprimary', 'var(--color-secondary'],

    plotOptions: {
      pie: {
        donut: {
          size: '80%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              formatter: function (w: { globals: { seriesTotals: any[] } }) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0);
              },
            },
          },
        },
      },
    },

    tooltip: {
      theme: `${activeMode === 'light' ? 'light' : 'dark'}`,
      fillSeriesColor: false,
    },
  };
  return (
    <Card className="h-full">
      <div className="flex flex-col justify-between h-full gap-6">
        <div>
          <h5 className="text-lg font-semibold">Customer Segmentation</h5>
          <p className="card-subtitle">Customer Category Breakdown</p>
        </div>
        <div>
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="donut"
            height="300px"
            width="100%"
          />
        </div>
        <div className="flex items-center justify-between px-6">
          <div className="flex gap-3 items-center">
            <div className="bg-lightprimary dark:bg-darkprimary h-10 w-10 flex justify-center items-center rounded-md">
              <Icon icon="tabler:grid-dots" className="text-primary text-xl" />
            </div>
            <div>
              <p className="dark:text-darklink ">Business</p>
              <h6 className="text-base">$36,358</h6>
            </div>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-lightgray dark:bg-darkgray h-10 w-10 flex justify-center items-center rounded-md">
              <Icon icon="tabler:grid-dots" className="opacity-70 dark:opacity-100 text-xl" />
            </div>
            <div>
              <p className="dark:text-darklink ">Individuals</p>
              <h6 className="text-base">$5,296</h6>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
