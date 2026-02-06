import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const ApexRadialChartCode = () => {
  const ChartData: ApexOptions = {
    series: [44, 55, 67, 83],
    chart: {
      type: "radialBar",
      height: 300,
      fontFamily: `inherit`,
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
    },
    colors: [
      "var(--color-accent)",
      "var(--color-primary)",
      "var(--color-destructive)",
      "var(--color-warning )",
    ],

    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: "22px",
          },
          value: {
            fontSize: "16px",
          },
          total: {
            show: true,
            label: "Total",
            formatter() {
              return "249";
            },
          },
        },
      },
    },
  };
  return (
    <>
      <Chart
        options={ChartData}
        series={ChartData.series}
        type="radialBar"
        height="300px"
        width="100%"
      />
    </>
  );
};

export default ApexRadialChartCode;
