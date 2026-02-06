import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

const ApexLineChartCode = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: "High - 2025",
        data: [28, 29, 33, 36, 32, 32, 33],
      },
      {
        name: "Low - 2025",
        data: [12, 11, 14, 18, 17, 13, 13],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      foreColor: "#adb0bb",
      fontFamily: `inherit`,
      offsetX: -5,
      zoom: {
        type: "x",
        enabled: true,
      },
      toolbar: {
        show: false,
      },

    },
    colors: ["var(--color-primary)", "var(--color-secondary)"],
    markers: {
      size: 1,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      title: {
        text: "Month",
      },
      axisBorder: {
        color: "rgba(173,181,189,0.3)",
      },
    },
    grid: {
      show: false,
      padding: {
        left: 20,
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
      width: 2,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    tooltip: {
      theme: "dark",
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };
  return (
    <>
      <Chart
        options={ChartData}
        series={ChartData.series}
        type="line"
        height="350px"
        width="100%"
      />
    </>
  );
};

export default ApexLineChartCode;
