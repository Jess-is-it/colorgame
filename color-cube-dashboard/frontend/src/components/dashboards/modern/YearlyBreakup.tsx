import { Icon } from '@iconify/react/dist/iconify.js';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import CountUp from 'src/components/animated-component/CountUp';
import { Card } from 'src/components/ui/card';

const YearlyBreakup = () => {
  const ChartData: ApexOptions = {
    series: [38, 40, 25],

    labels: ['2023', '2025', '2024'],
    chart: {
      type: 'donut',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
      height: 155,
      offsetX: 18,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
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
    colors: ['var(--color-primary)', 'var(--color-lightprimary)', 'var(--color-secondary)'],
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
      <Card className="h-full">
        <div className="grid grid-cols-12">
          <div className="lg:col-span-6 md:col-span-6 col-span-6">
            <h5 className="card-title mb-4 lg:whitespace-nowrap">Yearly Breakup</h5>
            <h4 className="text-xl mb-3">
              {' '}
              $<CountUp to={36358} />
            </h4>
            <div className="flex items-center mb-3 gap-2">
              <span className="rounded-full p-1 bg-lightsuccess dark:bg-darksuccess flex items-center justify-center ">
                <Icon icon="tabler:arrow-up-left" className="text-success" />
              </span>
              <p className="text-dark dark:text-darklink  mb-0">+9%</p>
              <p className=" dark:text-darklink mb-0 ">last year</p>
            </div>
            <div className="flex gap-3 items-center">
              <div className="flex items-center">
                <Icon icon="tabler:point-filled" className="text-primary text-xl me-1" />
                <span className="text-xs  dark:text-darklink">2023</span>
              </div>
              <div className="flex items-center">
                <Icon icon="tabler:point-filled" className="text-lightprimary text-xl me-1" />
                <span className="text-xs  dark:text-darklink">2024</span>
              </div>
              <div className="flex items-center">
                <Icon icon="tabler:point-filled" className="text-secondary text-xl me-1" />
                <span className="text-xs  dark:text-darklink">2025</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6 md:col-span-6 col-span-4">
            <div>
              <Chart
                options={ChartData}
                series={ChartData.series}
                type="donut"
                height="180px"
                width={'100%'}
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
export { YearlyBreakup };
