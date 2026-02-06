import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const ApexAreaChartCode = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: 'Sales Summery 1',
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: 'Sales Summery 2',
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    chart: {
      id: 'area-chart',
      fontFamily: `inherit`,
      foreColor: 'var(--color-lightmuted)',
      zoom: {
        enabled: true,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.2,

      },
    },
    stroke: {
      width: 3,
      curve: 'smooth',
    },
    colors: ['var(--color-primary)', 'var(--color-secondary)'],
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00',
        '2018-09-19T01:30:00',
        '2018-09-19T02:30:00',
        '2018-09-19T03:30:00',
        '2018-09-19T04:30:00',
        '2018-09-19T05:30:00',
        '2018-09-19T06:30:00',
      ],
      axisBorder: {
        color: 'rgba(173,181,189,0.3)',
      },
    },
    yaxis: {
      opposite: false,
      labels: {
        show: true,
      },
    },
    legend: {
      show: true,
      position: 'bottom',

    },
    grid: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };
  return (
    <>
      <Chart
        options={ChartData}
        series={ChartData.series}
        type="area"
        height="300px"
        width="100%"
      />
    </>
  );
};

export default ApexAreaChartCode;
