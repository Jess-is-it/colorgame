import { useState } from 'react';
import user1 from 'src/assets/images/profile/user-1.jpg';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Badge } from 'src/components/ui/badge';
import { Card } from 'src/components/ui/card';
import Chart from 'react-apexcharts';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import CountUp from 'src/components/animated-component/CountUp';
import { ApexOptions } from 'apexcharts';

export const FinancialIncomeCard = () => {
  const [selectedYear, setSelectedYear] = useState<'2025' | '2024' | '2023'>('2025');
  const yearlySeriesData: Record<'2025' | '2024' | '2023', { name: string; data: number[] }[]> = {
    '2025': [
      {
        name: 'Selling Product',
        data: [0, 0.4, 2.1, 0.4, 1.3, 4.0, 0.9],
      },
      {
        name: 'Followers',
        data: [0, 2.1, 0.9, 2.6, 1.3, 1.7, 0.4],
      },
      {
        name: 'Campaign',
        data: [0, 0.9, 1.6, 0.4, 3.1, 1.7, 0.6],
      },
    ],
    '2024': [
      {
        name: 'Selling Product',
        data: [3.1, 3.5, 2.8, 3.3, 4.0, 2.5, 3.7],
      },
      {
        name: 'Followers',
        data: [1.5, 2.2, 2.9, 3.0, 2.4, 3.3, 3.1],
      },
      {
        name: 'Campaign',
        data: [2.5, 3.1, 2.3, 2.8, 3.6, 2.7, 2.9],
      },
    ],
    '2023': [
      {
        name: 'Selling Product',
        data: [2.0, 1.8, 2.4, 2.9, 3.1, 2.2, 2.6],
      },
      {
        name: 'Followers',
        data: [1.0, 1.4, 1.6, 2.2, 2.1, 2.5, 2.3],
      },
      {
        name: 'Campaign',
        data: [1.5, 1.9, 2.0, 1.7, 2.3, 2.4, 1.8],
      },
    ],
  };

  const ChartData: ApexOptions = {
    series: yearlySeriesData[selectedYear],
    colors: ['var(--color-primary)', 'var(--color-secondary)', 'rgba(90, 106, 133,0.5)'],
    dataLabels: {
      enabled: false,
    },
    chart: {
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
      height: 245,
      width: '100%',
      type: 'area',
      offsetX: -5,
      toolbar: {
        show: false,
      },
      stacked: false,
    },
    legend: {
      show: false,
    },
    fill: {
      type: 'solid',
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: '#90A4AE50',
    },
    stroke: {
      curve: 'smooth',
      width: 0,
    },
    markers: {
      size: 0,
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontSize: '12px',
        },
      },
      type: 'category',
      categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'Jul'],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      max: 5,
      tickAmount: 5,
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (value: number) {
          return value === 0 ? '0' : value + 'k';
        },
        style: {
          fontSize: '12px',
        },
      },
    },
    tooltip: {
      theme: 'dark',
    },
  };
  const ProfileActivity = [
    {
      key: 'activity1',
      title: 'Selling Product',
      quantity: 335000,
      color: 'text-primary',
    },
    {
      key: 'activity2',
      title: 'Followers',
      quantity: 1500,
      color: 'text-secondary',
    },
    {
      key: 'activity3',
      title: 'Campaign',
      quantity: 560,
      color: 'text-success',
    },
  ];
  return (
    <>
      <div className="flex gap-5 mb-6 items-center">
        <div className="p-1 shrink-0 border-primary border-2 h-[60px] w-[60px] box-content rounded-full relative">
          <img src={user1} alt="user-image" className="rounded-full" />
          <Badge className="rounded-full text-sm absolute -top-[8px] -end-[10px]">3</Badge>
        </div>
        <div className="flex flex-col">
          <h5 className="text-2xl">Mathew Anderson</h5>
          <p className="text-sm">Cheers, and happy activities - July 6 2025</p>
        </div>
      </div>
      <Card className="p-0">
        <div className="p-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="lg:col-span-4 col-span-12 flex">
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <h5 className="card-title">Financial Income</h5>
                  <p className="card-subtitle font-normal">Aug 1, 2025 - Nov 1, 2025</p>
                </div>
                <div className="flex flex-col sm:gap-2">
                  <p className="text-sm">
                    Total Revenue <span className="text-success">+9.78%</span>
                  </p>
                  <h5 className="text-fs_28">$8,240,00</h5>
                  <p className="text-sm">Increased 15% from last month</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8 col-span-12">
              <div className="flex md:gap-0 gap-4 items-start justify-between">
                <div className="flex flex-col gap-2">
                  <h3 className="text-sm font-medium">Product Condition</h3>
                  <div className="flex gap-3 items-center">
                    <h3 className="text-fs_28">75%</h3>
                    <Badge color={'primary'} className="rounded-md flex items-center py-1">
                      <Icon icon="tabler:chevron-down" className="text-lg shrink-0 inline-block" />
                      <span className="text-sm ms-1">2.8%</span>
                    </Badge>
                  </div>
                </div>
                <Select
                  value={selectedYear}
                  onValueChange={(value) => setSelectedYear(value as '2025' | '2024' | '2023')}
                >
                  <SelectTrigger className="w-fit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="2025">2025</SelectItem>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2023">2023</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4">
                <Chart
                  options={ChartData}
                  series={ChartData.series}
                  type="area"
                  height="300px"
                  width={'100%'}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 border-t border-border dark:border-darkborder">
          {ProfileActivity.map((item) => {
            return (
              <div
                className="lg:col-span-4 col-span-12 lg:border-r lg:border-b-0 border-b lg:last:border-r-0 last:border-b-0 border-border dark:border-darkborder"
                key={item.key}
              >
                <div className="p-6">
                  <div className="flex gap-1 items-center">
                    <span className={`text-lg ${item.color}`}>{item.title}</span>
                  </div>
                  <h3 className="text-2xl font-medium mt-1">
                    {item.key === 'activity1' && <span>$</span>}
                    <CountUp to={item.quantity} />
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
};
