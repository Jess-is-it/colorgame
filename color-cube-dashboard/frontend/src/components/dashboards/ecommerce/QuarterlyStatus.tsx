import { Icon } from '@iconify/react/dist/iconify.js';
import Chart from 'react-apexcharts';
import { Card } from 'src/components/ui/card';
import { Badge } from 'src/components/ui/badge';
import type { BadgeProps } from 'src/components/ui/badge';
import { ApexOptions } from 'apexcharts';

export const QuarterlyStatus = () => {
  const ChartData: ApexOptions = {
    series: [
      {
        name: 'Sales',
        color: 'var(--color-primary)',
        data: [5, 15, 5, 10, 5],
      },
    ],
    chart: {
      id: 'weekly-stats2',
      type: 'area',
      height: 120,
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
        stops: [20, 180],
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
      record: 76,
    },
    {
      key: 'topSeller',
      title: 'Best Seller',
      subtitle: 'Footware',
      badgeColor: 'lightSuccess',
      bgcolor: 'bg-lightsuccess text-success',
      record: 68,
    },
    {
      key: 'topCommented',
      title: ' Most Commented',
      subtitle: 'Fashionware',
      badgeColor: 'lightSecondary',
      bgcolor: 'bg-lightsecondary text-secondary',
      record: 52,
    },
  ];
  return (
    <Card className="h-full">
      <div className="flex flex-col justify-between gap-6 h-full">
        <div>
          <h5 className="card-title">Quarterly status</h5>
          <p className="card-subtitle">Average sales</p>
        </div>
        <div>
          <Chart
            options={ChartData}
            series={ChartData.series}
            type="area"
            height="130px"
            width={'100%'}
          />
        </div>
        <div className="flex flex-col gap-5">
          {SalesData.map((item) => {
            return (
              <div key={item.key} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`${item.bgcolor} h-10
                         w-10 flex justify-center items-center rounded-md`}
                  >
                    <Icon icon="tabler:grid-dots" className=" text-xl" />
                  </div>
                  <div>
                    <h6 className="text-base">{item.title}</h6>
                    <p>{item.subtitle}</p>
                  </div>
                </div>
                <Badge
                  variant={item.badgeColor as BadgeProps['variant']}
                  className="py-1.1 rounded-md text-sm"
                >
                  +{item.record}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
