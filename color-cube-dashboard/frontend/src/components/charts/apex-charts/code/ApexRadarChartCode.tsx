import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const ApexRadarChartCode = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: "Sales",
        data: [80, 50, 30, 40, 100, 20],
      },
    ],
    chart: {
      type: "radar",
      height: 300,
      fontFamily: `inherit`,
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0,
        inverseColors: false,
        opacityFrom: 0.2,

        stops: [100],
      },
    },
    colors: ["var(--color-primary)"],
    labels: ["January", "February", "March", "April", "May", "June"],
  };

  return (
    <>
      <Chart
        options={ChartData}
        series={ChartData.series}
        type="radar"
        height="300px"
        width="100%"
      />
    </>
  );
};

export default ApexRadarChartCode;
