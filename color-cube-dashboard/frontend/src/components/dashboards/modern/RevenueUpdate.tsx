import { useState } from 'react';
import { Icon } from '@iconify/react/dist/iconify.js';
import Chart from 'react-apexcharts';
import { Card } from 'src/components/ui/card';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { Button } from 'src/components/ui/button';
import CountUp from 'src/components/animated-component/CountUp';

const RevenueUpdate = () => {
  const [selectedYear, setSelectedYear] = useState('Year 2025');

  // Chart data for each month
  const chartDataByMonth: Record<string, any> = {
    'Year 2025': {
      series: [
        { name: 'Earnings ', data: [1500, 2700, 2200, 3000, 1500, 1000, 1400] },
        { name: 'Expense ', data: [-1800, -1100, -2500, -1500, -600, -1800, -1200] },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
    },
    'Year 2024': {
      series: [
        { name: 'Earnings ', data: [2000, 2500, 2800, 3000, 2000, 1500, 2700] },
        { name: 'Expense ', data: [-1200, -1500, -2000, -1000, -800, -1300, -1500] },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
    },
    'Year 2023': {
      series: [
        { name: 'Earnings ', data: [1800, 2200, 2600, 3000, 1700, 1200, 2000] },
        { name: 'Expense ', data: [-1500, -1300, -2200, -1200, -700, -1600, -1200] },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      },
    },
  };

  // Base chart options (shared)
  const baseChartOptions = {
    chart: {
      toolbar: { show: false },
      type: 'bar' as const,
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
      height: 310,
      stacked: true,
      width: '100%',
      offsetX: -20,
      animations: {
        enabled: true,
        easing: 'easeinout' as const,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 800,
        },
      },
    },
    colors: ['var(--color-primary)', 'var(--color-secondary)'],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '20%',
        borderRadius: 6,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      } satisfies {
        borderRadiusApplication?: 'end' | 'around';
        borderRadiusWhenStacked?: 'all';
        horizontal?: boolean;
        barHeight?: string;
        columnWidth?: string;
        borderRadius?: number;
      },
    },
    dataLabels: { enabled: false },
    legend: { show: false },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
    },

    yaxis: {
      min: -3000,
      max: 3000,
      labels: {
        formatter: (val: number) => {
          return `${val / 1000}k`;
        },
      },
    },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => {
          return `${(val / 1000).toFixed(1)}k`;
        },
      },
    },
  };

  const ChartData = {
    ...baseChartOptions,
    xaxis: {
      ...chartDataByMonth[selectedYear].xaxis,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  };

  return (
    <>
      <Card>
        <div className="sm:flex items-center justify-between mb-6 h-full">
          <div>
            <h5 className="card-title">Revenue Updates</h5>
            <p className="card-subtitle">Overview of profit</p>
          </div>
          <div className="sm:mt-0 mt-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Select a Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Year 2025">Year 2025</SelectItem>
                  <SelectItem value="Year 2024">Year 2024</SelectItem>
                  <SelectItem value="Year 2023">Year 2023</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="lg:col-span-8 md:col-span-8 sm:col-span-12 col-span-12">
            <div className="-me-6">
              <Chart
                options={ChartData}
                series={chartDataByMonth[selectedYear].series}
                type="bar"
                height="316px"
                width={'100%'}
              />
            </div>
          </div>
          <div className="lg:col-span-4 md:col-span-4 sm:col-span-12 col-span-12">
            <div className="flex items-center gap-4 pt-6">
              <div className="bg-lightprimary dark:bg-lightprimary shrink-0 h-10 w-10 flex justify-center items-center rounded-md">
                <Icon icon="tabler:grid-dots" className="text-xl text-primary" />
              </div>
              <div>
                <h4 className="text-2xl text-dark dark:text-white font-semibold">
                  $<CountUp to={63489} />
                </h4>
                <p>Total Earnings</p>
              </div>
            </div>
            <div className="flex items-baseline gap-3 pt-9">
              <i className="h-2 w-2 rounded-full bg-primary" />
              <div>
                <p>Earnings this month</p>
                <h6 className="text-lg">$48,820</h6>
              </div>
            </div>
            <div className="flex items-baseline gap-3 pt-5">
              <i className="h-2 w-2  rounded-full bg-secondary" />
              <div>
                <p>Expense this month</p>
                <h6 className="text-lg">$26,498</h6>
              </div>
            </div>
            <a href="src/assets/revenue_expense_report.csv" download>
              <Button className="mt-7 rounded-md capitalize w-full">view full report</Button>
            </a>
          </div>
        </div>
      </Card>
    </>
  );
};
export { RevenueUpdate };
