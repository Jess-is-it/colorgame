import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const ApexDoughnutChartCode = () => {
  const ChartData: ApexOptions = {
    series: [44, 55, 41, 17, 15],
    chart: {
      type: 'donut',
      height: 300,
      fontFamily: `inherit`,
      foreColor: 'var(--color-lightmuted)',
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70px',
        },
      },
    },
    stroke: {
      width: 2,
      colors: ["var(--color-surface-ld)"],
    },
    legend: {
      show: true,
      position: 'bottom',

    },
    colors: [
      'var(--color-info)',
      'var(--color-primary)',
      'var(--color-error)',
      'var(--color-success)',
      'var(--color-warning )',
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <>
      <Chart
        options={ChartData}
        series={ChartData.series}
        type="donut"
        height="300px"
        width="100%"
      />
    </>
  );
};

export default ApexDoughnutChartCode;
