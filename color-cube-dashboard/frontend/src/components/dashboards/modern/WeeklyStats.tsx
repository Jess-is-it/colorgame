import { Icon } from '@iconify/react/dist/iconify.js';
import Chart from 'react-apexcharts';
import { Card } from 'src/components/ui/card';
import { Badge } from 'src/components/ui/badge';
import type { BadgeProps } from 'src/components/ui/badge';
import AnimatedItem from 'src/components/animated-component/ListAnimation';
import { ApexOptions } from 'apexcharts';

export const WeeklyStats = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: 'Sales Per Week',
        color: 'var(--color-primary)',
        data: [5, 15, 10, 20],
      },
    ],
    chart: {
      id: 'sparkline3',
      type: 'area',
      height: 180,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
      fontFamily: 'inherit',
      foreColor: '#adb0bb',
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
        stops: [20, 280],
      },
    },

    markers: {
      size: 0,
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: true,
        position: 'right',
      },
      x: {
        show: false,
      },
    },
  };

  const SalesData = [
    {
      key: 'topSales',
      title: 'Top Sales',
      subtitle: 'Johnathan Doe',
      badgeColor: 'lightPrimary',
      bgcolor: 'bg-lightprimary text-primary',
    },
    {
      key: 'topSeller',
      title: 'Best Seller',
      subtitle: 'MaterialPro Admin',
      badgeColor: 'lightSuccess',
      bgcolor: 'bg-lightsuccess text-success',
    },
    {
      key: 'topCommented',
      title: ' Most Commented',
      subtitle: 'Ample Admin',
      badgeColor: 'lightError',
      bgcolor: 'bg-lighterror text-error',
    },
  ];
  return (
    <Card className="h-full">
      <div className="flex flex-col justify-between h-full">
        <div>
          <h5 className="card-title">Weekly Status</h5>
          <p className="card-subtitle">Average sales</p>
        </div>
        <div>
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="area"
            height="170px"
            width={'100%'}
          />
        </div>
        <div className="flex flex-col gap-6">
          {SalesData.map((item, index) => {
            return (
              <AnimatedItem key={item.key} index={index}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`${item.bgcolor} h-10 w-10 flex justify-center items-center rounded-md`}
                    >
                      <Icon icon="tabler:grid-dots" className="text-xl" />
                    </div>
                    <div>
                      <h6 className="text-base">{item.title}</h6>
                      <p className="text-sm">{item.subtitle}</p>
                    </div>
                  </div>
                  <Badge
                    variant={item.badgeColor as BadgeProps['variant']}
                    className="py-1.1 rounded-md text-sm"
                  >
                    +68
                  </Badge>
                </div>
              </AnimatedItem>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
